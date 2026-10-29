"""Config Flow für die deutsche Unified Parcel (Paket-Tracker) Integration."""
from __future__ import annotations

import logging
from typing import Any
import voluptuous as vol

from homeassistant import config_entries
from homeassistant.core import callback
from homeassistant.data_entry_flow import FlowResult
from homeassistant.helpers import selector
import aioimaplib

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
    DEFAULT_IMAP_SERVER,
    DEFAULT_IMAP_PORT,
    DEFAULT_IMAP_SSL,
    DEFAULT_FOLDER,
    DEFAULT_INCLUDE_DHL,
    DEFAULT_INCLUDE_AMAZON,
)

_LOGGER = logging.getLogger(__name__)


async def validate_imap(data: dict[str, Any]) -> None:
    """IMAP-Verbindung testen und Zugangsdaten prüfen."""
    server = str(data[CONF_IMAP_SERVER]).strip()
    port = int(data[CONF_IMAP_PORT])
    ssl = bool(data[CONF_IMAP_SSL])
    email = str(data[CONF_EMAIL]).strip()
    password = str(data[CONF_PASSWORD]).strip().replace(" ", "")
    folder = str(data.get(CONF_FOLDER, DEFAULT_FOLDER)).strip() or DEFAULT_FOLDER

    client = aioimaplib.IMAP4_SSL(host=server, port=port) if ssl else aioimaplib.IMAP4(host=server, port=port)
    try:
        await client.wait_hello_from_server()
        res = await client.login(email, password)
        if res.result != "OK":
            raise aioimaplib.AioImapException("Login fehlgeschlagen")
        res = await client.select(folder)
        if res.result != "OK":
            # Versuche INBOX falls ein benutzerdefinierter Ordner noch nicht existiert
            res_inbox = await client.select("INBOX")
            if res_inbox.result != "OK":
                raise aioimaplib.AioImapException("Ordner nicht gefunden")
    finally:
        try:
            await client.logout()
        except Exception:
            pass


class UnifiedParcelConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Behandelt den Setup-Assistenten für Unified Parcel."""

    VERSION = 1

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> FlowResult:
        """Erster Schritt: E-Mail & Server-Einstellungen abfragen."""
        errors: dict[str, str] = {}

        if user_input is not None:
            # Daten bereinigen und typisieren (z.B. Port als Integer, Leerzeichen aus Passwort entfernen)
            email_clean = str(user_input[CONF_EMAIL]).strip()
            user_input[CONF_EMAIL] = email_clean
            user_input[CONF_PASSWORD] = str(user_input[CONF_PASSWORD]).strip().replace(" ", "")
            user_input[CONF_IMAP_SERVER] = str(user_input[CONF_IMAP_SERVER]).strip()
            user_input[CONF_IMAP_PORT] = int(user_input[CONF_IMAP_PORT])

            # Einzigartigkeit über E-Mail-Adresse sicherstellen
            await self.async_set_unique_id(email_clean.lower())
            self._abort_if_unique_id_configured()

            try:
                await validate_imap(user_input)
            except (aioimaplib.AioImapException, TimeoutError):
                errors["base"] = "invalid_auth"
            except ConnectionError:
                errors["base"] = "cannot_connect"
            except Exception:  # pylint: disable=broad-except
                _LOGGER.exception("Unerwarteter Fehler bei IMAP-Validierung")
                errors["base"] = "unknown"
            else:
                return self.async_create_entry(
                    title=f"Pakete ({user_input[CONF_EMAIL]})",
                    data=user_input,
                )

        schema = vol.Schema(
            {
                vol.Required(CONF_EMAIL): selector.TextSelector(
                    selector.TextSelectorConfig(type=selector.TextSelectorType.EMAIL)
                ),
                vol.Required(CONF_PASSWORD): selector.TextSelector(
                    selector.TextSelectorConfig(type=selector.TextSelectorType.PASSWORD)
                ),
                vol.Required(CONF_IMAP_SERVER, default=DEFAULT_IMAP_SERVER): selector.TextSelector(
                    selector.TextSelectorConfig(type=selector.TextSelectorType.TEXT)
                ),
                vol.Required(CONF_IMAP_PORT, default=DEFAULT_IMAP_PORT): selector.NumberSelector(
                    selector.NumberSelectorConfig(
                        min=1, max=65535, mode=selector.NumberSelectorMode.BOX
                    )
                ),
                vol.Required(CONF_IMAP_SSL, default=DEFAULT_IMAP_SSL): selector.BooleanSelector(),
                vol.Required(CONF_FOLDER, default=DEFAULT_FOLDER): selector.TextSelector(
                    selector.TextSelectorConfig(type=selector.TextSelectorType.TEXT)
                ),
                vol.Optional(CONF_INCLUDE_DHL, default=DEFAULT_INCLUDE_DHL): selector.BooleanSelector(),
                vol.Optional(CONF_INCLUDE_AMAZON, default=DEFAULT_INCLUDE_AMAZON): selector.BooleanSelector(),
            }
        )

        return self.async_show_form(
            step_id="user",
            data_schema=schema,
            errors=errors,
        )

    @staticmethod
    @callback
    def async_get_options_flow(
        config_entry: config_entries.ConfigEntry,
    ) -> config_entries.OptionsFlow:
        """Options-Flow für spätere Anpassungen bereitstellen."""
        return UnifiedParcelOptionsFlow(config_entry)


class UnifiedParcelOptionsFlow(config_entries.OptionsFlow):
    """Behandelt nachträgliche Anpassungen über die UI."""

    def __init__(self, config_entry: config_entries.ConfigEntry) -> None:
        """Initialisieren."""
        self.config_entry = config_entry

    async def async_step_init(
        self, user_input: dict[str, Any] | None = None
    ) -> FlowResult:
        """Optionen anpassen."""
        if user_input is not None:
            return self.async_create_entry(title="", data=user_input)

        schema = vol.Schema(
            {
                vol.Required(
                    CONF_FOLDER,
                    default=self.config_entry.options.get(
                        CONF_FOLDER,
                        self.config_entry.data.get(CONF_FOLDER, DEFAULT_FOLDER),
                    ),
                ): selector.TextSelector(selector.TextSelectorConfig(type=selector.TextSelectorType.TEXT)),
                vol.Required(
                    CONF_INCLUDE_DHL,
                    default=self.config_entry.options.get(
                        CONF_INCLUDE_DHL,
                        self.config_entry.data.get(CONF_INCLUDE_DHL, DEFAULT_INCLUDE_DHL),
                    ),
                ): selector.BooleanSelector(),
                vol.Required(
                    CONF_INCLUDE_AMAZON,
                    default=self.config_entry.options.get(
                        CONF_INCLUDE_AMAZON,
                        self.config_entry.data.get(CONF_INCLUDE_AMAZON, DEFAULT_INCLUDE_AMAZON),
                    ),
                ): selector.BooleanSelector(),
            }
        )

        return self.async_show_form(step_id="init", data_schema=schema)
