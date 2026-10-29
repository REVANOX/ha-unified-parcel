"""DataUpdateCoordinator für Unified Parcel: Liest E-Mails via IMAP und bündelt DHL, Amazon, DPD, Hermes, UPS und FedEx."""
from __future__ import annotations

import base64
from datetime import datetime, timedelta
import email
from email.header import decode_header
import logging
import re
from typing import Any

import aioimaplib
from homeassistant.core import HomeAssistant
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator, UpdateFailed

from .const import (
    DOMAIN,
    CONF_IMAP_SERVER,
    CONF_IMAP_PORT,
    CONF_IMAP_SSL,
    CONF_EMAIL,
    CONF_PASSWORD,
    CONF_FOLDER,
    CONF_INCLUDE_DHL,
    CONF_INCLUDE_AMAZON,
    DEFAULT_FOLDER,
    DEFAULT_INCLUDE_DHL,
    DEFAULT_INCLUDE_AMAZON,
)

_LOGGER = logging.getLogger(__name__)

SCAN_INTERVAL = timedelta(minutes=5)


def decode_str(s: str | bytes | None) -> str:
    """Header-Text sauber dekodieren (z. B. UTF-8 oder ISO-8859)."""
    if not s:
        return ""
    if isinstance(s, bytes):
        return s.decode("utf-8", errors="replace")
    parts = decode_header(s)
    res = []
    for text, enc in parts:
        if isinstance(text, bytes):
            res.append(text.decode(enc or "utf-8", errors="replace"))
        else:
            res.append(str(text))
    return "".join(res)


def decode_base64_otto(text: str) -> str:
    """Extrahiert und dekodiert Base64-Links aus Otto-Weiterleitungs-URLs."""
    d_matches = re.findall(r"[?&]d=([A-Za-z0-9_=-]+)", text)
    decoded = []
    for dm in d_matches:
        try:
            chunk = dm.split("%7C")[0].split("|")[0]
            # Padding auffüllen
            missing_padding = len(chunk) % 4
            if missing_padding:
                chunk += "=" * (4 - missing_padding)
            decoded.append(base64.b64decode(chunk).decode("utf-8", errors="ignore"))
        except Exception:
            continue
    return " ".join(decoded)


class UnifiedParcelCoordinator(DataUpdateCoordinator[dict[str, Any]]):
    """Verwaltet den Datenabruf für alle Paketdienste."""

    def __init__(self, hass: HomeAssistant, entry_data: dict[str, Any], options: dict[str, Any]) -> None:
        """Initialisieren."""
        super().__init__(
            hass,
            _LOGGER,
            name="Unified Parcel Coordinator",
            update_interval=SCAN_INTERVAL,
        )
        self.entry_data = entry_data
        self.options = options
        self._email_parcels: dict[str, dict[str, Any]] = {}

    async def _async_update_data(self) -> dict[str, Any]:
        """Ruft neue E-Mails ab und synchronisiert DHL / Amazon Sensoren."""
        try:
            await self._fetch_imap_emails()
        except Exception as err:
            _LOGGER.warning("Fehler beim IMAP-Abruf (wird beim nächsten Intervall wiederholt): %s", err)

        # Kombinieren und anreichern
        all_parcels = self._combine_all_parcels()

        today_count = 0
        pickup_count = 0
        delivered_count = 0

        for p in all_parcels:
            if p.get("isDelivered"):
                delivered_count += 1
            elif p.get("isPickup"):
                pickup_count += 1
            elif p.get("isToday"):
                today_count += 1

        active_count = len(all_parcels) - delivered_count

        return {
            "parcels": all_parcels,
            "active": active_count,
            "today": today_count,
            "pickup": pickup_count,
            "delivered": delivered_count,
            "total": len(all_parcels),
        }

    async def _fetch_imap_emails(self) -> None:
        """Liest ungelesene Mails für Otto, DPD, Hermes, UPS und FedEx aus."""
        server = str(self.entry_data[CONF_IMAP_SERVER]).strip()
        port = int(self.entry_data[CONF_IMAP_PORT])
        ssl = bool(self.entry_data[CONF_IMAP_SSL])
        user_email = str(self.entry_data[CONF_EMAIL]).strip()
        password = str(self.entry_data[CONF_PASSWORD]).strip().replace(" ", "")
        folder = str(self.options.get(CONF_FOLDER, self.entry_data.get(CONF_FOLDER, DEFAULT_FOLDER))).strip() or DEFAULT_FOLDER

        client = aioimaplib.IMAP4_SSL(host=server, port=port) if ssl else aioimaplib.IMAP4(host=server, port=port)
        await client.wait_hello_from_server()
        try:
            login_res = await client.login(user_email, password)
            if login_res.result != "OK":
                raise UpdateFailed("IMAP-Anmeldung fehlgeschlagen")

            select_res = await client.select(folder)
            if select_res.result != "OK":
                await client.select("INBOX")
            # Suche nach ungelesenen Nachrichten
            search_res = await client.search("UNSEEN UNDELETED")
            if search_res.result != "OK" or not search_res.lines:
                return

            uids = search_res.lines[0].split()
            for uid_bytes in uids:
                uid = uid_bytes.decode("ascii", errors="ignore")
                fetch_res = await client.fetch(uid, "(RFC822)")
                if fetch_res.result != "OK":
                    continue

                raw_email_bytes = None
                for line in fetch_res.lines:
                    if isinstance(line, bytes) and b"Received:" in line or b"From:" in line:
                        raw_email_bytes = line
                        break
                    elif isinstance(line, bytearray):
                        raw_email_bytes = bytes(line)
                        break

                if not raw_email_bytes:
                    continue

                msg = email.message_from_bytes(raw_email_bytes)
                self._parse_email_message(msg)
        finally:
            try:
                await client.logout()
            except Exception:
                pass

    def _parse_email_message(self, msg: email.message.Message) -> None:
        """Analysiert Betreff, Absender und Inhalt nach Tracking-Nummern."""
        subject = decode_str(msg.get("Subject", ""))
        sender = decode_str(msg.get("From", "")).lower()

        body_text = ""
        if msg.is_multipart():
            for part in msg.walk():
                ctype = part.get_content_type()
                if ctype in ("text/plain", "text/html"):
                    payload = part.get_payload(decode=True)
                    if payload:
                        charset = part.get_content_charset() or "utf-8"
                        body_text += payload.decode(charset, errors="replace") + " "
        else:
            payload = msg.get_payload(decode=True)
            if payload:
                body_text = payload.decode(msg.get_content_charset() or "utf-8", errors="replace")

        decoded_otto = decode_base64_otto(body_text)
        extended_text = f"{body_text} {decoded_otto}"
        full_text = f"{subject} {extended_text}".lower()

        is_dpd = "dpd" in full_text or "mysendelivery.dpd.de" in full_text or "tracking.dpd.de" in full_text
        is_hermes = "hermes" in full_text or "myhermes.de" in full_text
        is_otto = "otto" in full_text or "otto.de" in sender
        is_ups = (
            "ups" in full_text
            or "ups.com" in sender
            or "pkginfo@ups.com" in sender
            or bool(re.search(r"\b1Z[0-9A-Za-z]{16}\b", extended_text))
        )
        is_fedex = (
            "fedex" in full_text
            or "fedex.com" in sender
            or "trackingupdates@fedex.com" in sender
        )

        if not (is_dpd or is_hermes or is_ups or is_fedex):
            return

        if is_fedex:
            carrier = "fedex"
            carrier_label = "FedEx"
        elif is_ups:
            carrier = "ups"
            carrier_label = "UPS"
        elif is_hermes:
            carrier = "hermes"
            carrier_label = "Hermes"
        else:
            carrier = "dpd"
            carrier_label = "DPD"

        # Trackingnummer ermitteln
        dpd_match = re.findall(r"(?:parcel/|Sendungsnummer[:\s]*|Paketnummer[:\s]*)([0-9]{14})", extended_text)
        hermes_match = re.findall(r"(?:sendungsdetails#|Sendungsnummer[:\s]*|Auftragsnummer[:\s]*)([0-9]{14}|H[0-9]{16})", extended_text)
        ups_match = re.findall(r"\b(1Z[0-9A-Za-z]{16})\b", extended_text)
        fedex_match = re.findall(r"(?:trknbr=|tracking\s*number[:\s]*|sendungsnummer[:\s]*)([0-9]{12,20})", extended_text, re.IGNORECASE) or re.findall(r"\b([0-9]{12})\b", extended_text)
        generic_match = re.findall(r"\b([0-9]{14})\b", extended_text)

        tracking_code = None
        if is_fedex and fedex_match:
            tracking_code = fedex_match[0]
        elif is_ups and ups_match:
            tracking_code = ups_match[0].upper()
        elif is_hermes and hermes_match:
            tracking_code = hermes_match[0]
        elif is_dpd and dpd_match:
            tracking_code = dpd_match[0]
        elif fedex_match:
            tracking_code = fedex_match[0]
        elif ups_match:
            tracking_code = ups_match[0].upper()
        elif hermes_match:
            tracking_code = hermes_match[0]
        elif dpd_match:
            tracking_code = dpd_match[0]
        elif generic_match:
            tracking_code = generic_match[0]

        if not tracking_code:
            return

        # Artikel / Shop Name
        imgs = re.findall(r"\[image:\s*([^\]]+)\]", body_text)
        clean_imgs = [i for i in imgs if not re.search(r"(?i)otto|shop|logo|prüfsiegel|siegel|ups|dpd|hermes|fedex", i)]

        if clean_imgs:
            shop_name = clean_imgs[0][:35]
        elif is_otto:
            shop_name = "OTTO Bestellung"
        elif "apple" in full_text or "apple.com" in sender:
            shop_name = "Apple Bestellung"
        elif "zalando" in full_text:
            shop_name = "Zalando Bestellung"
        elif "mediamarkt" in full_text:
            shop_name = "MediaMarkt Bestellung"
        elif "saturn" in full_text:
            shop_name = "Saturn Bestellung"
        else:
            shop_name = f"{carrier_label} Bestellung"

        # Lieferdatum / Heute / Abholung
        now = datetime.now()
        today_full = now.strftime("%d.%m.%Y")
        today_short = now.strftime("%d.%m.")

        eta_match = re.findall(r"(?:voraussichtlich bis zum|zustelldatum|geplant für|zustellung am)[:\s]*([0-9]{2}\.[0-9]{2}\.?[0-9]*)", full_text)
        eta = eta_match[0] if eta_match else "Unterwegs"

        is_delivered = any(k in full_text for k in ["wurde zugestellt", "erfolgreich zugestellt", "hat ihr paket zugestellt", "paket ist zugestellt"])
        is_pickup = any(k in full_text for k in ["access point", "abholbereit", "liegt zur abholung", "abholcode"])
        is_today = (
            not is_delivered
            and (
                "heute" in full_text
                or "zustellung heute" in full_text
                or "wird heute zugestellt" in full_text
                or today_full in eta
                or today_short in eta
                or is_pickup
            )
        )

        progress = 2
        if is_delivered or is_pickup:
            progress = 5
        elif is_today:
            progress = 4

        if is_pickup:
            status_text = "Abholbereit"
            eta = "Abholbereit"
        elif is_delivered:
            status_text = "Zugestellt"
            eta = "Zugestellt"
        elif is_today:
            status_text = "In Zustellung"
            eta = "Heute"
        else:
            status_text = "Paket unterwegs"

        if carrier == "fedex":
            tracking_url = f"https://www.fedex.com/fedextrack/?trknbr={tracking_code}"
        elif carrier == "ups":
            tracking_url = f"https://www.ups.com/track?loc=de_DE&tracknum={tracking_code}"
        elif carrier == "hermes":
            tracking_url = f"https://www.myhermes.de/empfangen/sendungsverfolgung/sendungsdetails#{tracking_code}"
        else:
            tracking_url = f"https://tracking.dpd.de/status/de_DE/parcel/{tracking_code}"

        sub_desc = f"{shop_name} · {carrier_label} · "
        if is_pickup:
            sub_desc += "Bereit zur Abholung"
        elif is_delivered:
            sub_desc += "Erfolgreich zugestellt"
        elif is_today:
            sub_desc += "Zustellung heute"
        else:
            sub_desc += f"Bis {eta}" if eta != "Unterwegs" else "Paket unterwegs"

        self._email_parcels[tracking_code] = {
            "id": f"{carrier}_{tracking_code}",
            "carrier": carrier,
            "carrierLabel": carrier_label,
            "name": shop_name,
            "barcode": tracking_code,
            "statusText": status_text,
            "sub": sub_desc,
            "eta": eta,
            "isToday": is_today,
            "progress": progress,
            "isPickup": is_pickup,
            "isDelivered": is_delivered,
            "url": tracking_url,
        }

    def _combine_all_parcels(self) -> list[dict[str, Any]]:
        """Kombiniert die E-Mail-Pakete mit vorhandenen DHL & Amazon Sensoren."""
        include_dhl = self.options.get(CONF_INCLUDE_DHL, self.entry_data.get(CONF_INCLUDE_DHL, DEFAULT_INCLUDE_DHL))
        include_amz = self.options.get(CONF_INCLUDE_AMAZON, self.entry_data.get(CONF_INCLUDE_AMAZON, DEFAULT_INCLUDE_AMAZON))

        dhl_parcels: list[dict[str, Any]] = []
        amz_parcels: list[dict[str, Any]] = []

        if include_dhl:
            for eid, state in self.hass.states.async_all():
                if "dhl_" in eid and "eingehende_pakete" in eid:
                    parcels = state.attributes.get("parcels")
                    if isinstance(parcels, list):
                        dhl_parcels.extend(parcels)

        if include_amz:
            for eid, state in self.hass.states.async_all():
                if "amazon_" in eid and "eingehende_pakete" in eid:
                    parcels = state.attributes.get("parcels")
                    if isinstance(parcels, list):
                        amz_parcels.extend(parcels)

        # Zuordnung: DHL-Barcodes mit Amazon-Produktnamen anreichern
        amz_names_by_code: dict[str, str] = {}
        for ap in amz_parcels:
            raw = ap.get("raw") or {}
            tid = str(raw.get("tracking_id") or ap.get("barcode") or "").strip().upper()
            items = raw.get("items") or []
            if tid and items:
                amz_names_by_code[tid] = items[0]

        normalized: list[dict[str, Any]] = []

        # 1. DHL Pakete verarbeiten
        for dp in dhl_parcels:
            barcode = str(dp.get("barcode") or "").strip()
            status = dp.get("status") or ""
            raw_status = (dp.get("raw_status") or "").lower()
            raw = dp.get("raw") or {}
            zust = raw.get("zustellung") or {}

            is_pickup = (
                dp.get("pickup") is True
                or status == "ready_for_pickup"
                or zust.get("abholcodeAvailable") is True
                or "packstation" in raw_status and "bereit" in raw_status
                or "abholung bereit" in raw_status
            )
            is_delivered = dp.get("delivered") is True or status == "delivered" or "zugestellt" in raw_status or "abgeholt" in raw_status

            progress = 1
            if is_delivered or is_pickup:
                progress = 5
            elif status == "out_for_delivery" or "packstation" in raw_status or "zustellfahrzeug" in raw_status:
                progress = 4
            elif status == "in_transit":
                progress = 2

            is_today = status == "out_for_delivery" or "heute" in raw_status or is_pickup
            eta_str = "Abholbereit" if is_pickup else ("Zugestellt" if is_delivered else ("Heute" if is_today else "Unterwegs"))

            prod_name = amz_names_by_code.get(barcode.upper()) or dp.get("sender") or "DHL Sendung"

            normalized.append({
                "id": f"dhl_{barcode}",
                "carrier": "dhl",
                "carrierLabel": "DHL",
                "name": prod_name,
                "barcode": barcode,
                "statusText": dp.get("raw_status") or "In Bearbeitung",
                "sub": f"DHL · {dp.get('raw_status') or ''}",
                "eta": eta_str,
                "isToday": is_today,
                "isPickup": is_pickup,
                "isDelivered": is_delivered,
                "progress": progress,
                "url": dp.get("url") or f"https://www.dhl.de/de/privatkunden/pakete-empfangen/verfolgen.html?piececode={barcode}",
            })

        # 2. Amazon Pakete (die nicht via DHL laufen) verarbeiten
        dhl_codes = {p["barcode"].upper() for p in normalized if p.get("barcode")}
        for ap in amz_parcels:
            raw = ap.get("raw") or {}
            tid = str(raw.get("tracking_id") or ap.get("barcode") or "").strip()
            if tid.upper() in dhl_codes:
                continue

            items = raw.get("items") or []
            item_name = items[0] if items else "Amazon Bestellung"
            order_status = str(raw.get("order_status") or ap.get("raw_status") or "")
            os_lower = order_status.lower()

            is_delivered = ap.get("delivered") is True or "zugestellt" in os_lower or "delivered" in os_lower
            is_pickup = "abhol" in os_lower or "locker" in os_lower
            is_today = "heute" in os_lower or "today" in os_lower or is_pickup
            progress = 5 if (is_delivered or is_pickup) else (4 if is_today else 2)

            normalized.append({
                "id": f"amz_{tid or ap.get('barcode')}",
                "carrier": "amazon",
                "carrierLabel": "Amazon",
                "name": item_name,
                "barcode": tid or ap.get("barcode"),
                "statusText": order_status or "Bestellt",
                "sub": f"Amazon · {order_status}",
                "eta": "Heute" if is_today else ("Abholbereit" if is_pickup else order_status),
                "isToday": is_today,
                "isPickup": is_pickup,
                "isDelivered": is_delivered,
                "progress": progress,
                "url": ap.get("url") or f"https://www.amazon.de/gp/your-account/order-history",
            })

        # 3. E-Mail Pakete (DPD & Hermes) hinzufügen
        for ep in self._email_parcels.values():
            normalized.append(ep)

        # Sortierung: Abholbereit ganz oben, dann höchster Fortschritt, dann alphabetisch
        normalized.sort(
            key=lambda x: (
                0 if (x.get("isPickup") and not x.get("isDelivered")) else 1,
                -x.get("progress", 0),
                x.get("name", ""),
            )
        )

        return normalized
