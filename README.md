# 📦 Unified Parcel Tracker (DACH Edition)
### Die All-in-One Paketverfolgung für Home Assistant & HACS 🇩🇪 🇦🇹 🇨🇭
**(DHL, Amazon, DPD, Hermes, UPS, FedEx)**

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://github.com/hacs/integration)
[![Version](https://img.shields.io/badge/version-1.1.0-blue.svg)](https://github.com)
[![Maintainer Wanted](https://img.shields.io/badge/maintainer-wanted-brightgreen.svg)](#-maintainer--mitwirken)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**Unified Parcel Tracker** vereint alle gängigen Paketdienste im deutschsprachigen Raum in einer einzigen Home Assistant Integration.

Beim Klick auf **„Karte hinzufügen“** im Dashboard stehen dir sofort **fertig vorkonfigurierte Karten** zur Verfügung – sowohl als **Gesamt-Übersichtskarte** als auch als **„Pakete-Status“-Übersicht für jeden Paketdienst**!

---

## ✨ Features

- 🇩🇪 **Unterstützte Paketdienste**:
  - **DHL**: Direkte Integration bestehender DHL-Sensoren (`sensor.*dhl*eingehende*`).
  - **Amazon**: Automatische Erkennung und **Namens-Enrichment** (DHL-Trackingnummern werden mit dem echten Amazon-Produktnamen verknüpft!).
  - **DPD**: Vollautomatischer IMAP-Parser für Zustellankündigungen, Live-Tracking und Zeitfenster ("Zustellung heute").
  - **Hermes**: E-Mail-Erkennung von Sendungsverfolgungsnummern und Zustellzeitpunkten.
  - **UPS**: Vollständige Erkennung von 1Z-Trackingnummern, geplanter Zustellung, UPS Access Point (Abholbereit) und Zustellstatus.
  - **FedEx**: Erkennung von 12- bis 20-stelligen Sendungsnummern, Zustellankündigungen, Zustellung heute und direkter Sendungsverfolgung.
  - **Otto & Händler**: Automatisches Dekodieren von Base64-Redirects zur Ermittlung der echten Tracking-Nummer.

- 📊 **Erstellte Entitäten in Home Assistant**:
  - **Gesamt-Übersicht**:
    - `sensor.pakete_aktiv` *(Alle offenen Sendungen aller Dienste)*
    - `sensor.pakete_heute` *(Alle heute ankommenden Pakete)*
    - `sensor.pakete_abholbereit` *(Alle abholbereiten Pakete in Filiale / Packstation)*
    - `sensor.pakete_zugestellt` *(Kürzlich zugestellte Pakete)*
  - **Status-Sensoren für jeweilige Paketdienste**:
    - `sensor.pakete_dhl` *(Nur DHL-Pakete)*
    - `sensor.pakete_amazon` *(Nur Amazon-Bestellungen)*
    - `sensor.pakete_dpd` *(Nur DPD-Pakete)*
    - `sensor.pakete_hermes` *(Nur Hermes-Pakete)*
    - `sensor.pakete_ups` *(Nur UPS-Pakete)*
    - `sensor.pakete_fedex` *(Nur FedEx-Pakete)*

---

## 📧 E-Mail-Filter Anleitung: So funktioniert die Erkennung 100 % zuverlässig

Damit neue Pakete (DPD, Hermes, UPS, FedEx, Otto etc.) sekundenschnell und fehlerfrei erkannt werden, empfehlen wir die Einrichtung einer einfachen **Filter-Regel** in deinem E-Mail-Postfach.

### Warum ist eine Filter-Regel sinnvoll?
* Die Integration durchsucht gezielt ungelesene E-Mails via IMAP.
* Durch einen eigenen Ordner/Label (z. B. **`Pakete`**) bleibt dein normales Haupt-Postfach unberührt und die Integration liest ausschließlich relevante Versand-Mails.

---

### 📝 Was genau muss im Filter stehen? (Beste Filterkriterien)

Kopiere diese Filter-Suchbegriffe in die Einstellungen deines E-Mail-Anbieters:

#### 1. Absender-Filter (Feld: „Von“ / „From“):
```text
*@dpd.de OR *@myhermes.de OR *@hermesworld.com OR *@ups.com OR *@fedex.com OR *@dhl.de OR *@amazon.de OR *@otto.de OR pkginfo@ups.com OR trackingupdates@fedex.com
```

#### 2. Betreff-Filter (Feld: „Betreff“ / „Subject“) *(Optional als Ergänzung)*:
```text
Paket OR Sendung OR Sendungsnummer OR Sendungsverfolgung OR unterwegs OR Zustellung OR tracking OR Paketankündigung OR "in Zustellung" OR "wird heute zugestellt"
```

#### 3. Wichtige Filter-Aktionen:
* ✅ **Label / Ordner zuweisen**: `Pakete`
* ✅ **Nie als Spam einstufen**: Aktivieren (verhindert, dass Tracking-Mails im Spam landen)
* ⚠️ **NICHT als gelesen markieren**: E-Mails müssen **ungelesen** bleiben, damit der IMAP-Parser sie beim Abruf verarbeiten kann!

---

### 🛠️ Anleitung für die beliebtesten E-Mail-Provider:

<details>
<summary><b>🔴 Google Gmail Anleitung (Hier klicken)</b></summary>

1. Öffne Gmail im Browser und klicke oben rechts auf das **Zahnrad (Einstellungen)** ➔ **Alle Einstellungen anzeigen**.
2. Wähle den Reiter **Filter und blockierte Adressen** ➔ klicke auf **Neuen Filter erstellen**.
3. Trage im Feld **Von:** Folgendes ein:
   ```text
   *@dpd.de OR *@myhermes.de OR *@ups.com OR *@fedex.com OR *@amazon.de OR *@otto.de
   ```
4. Klicke auf **Filter erstellen**.
5. Setze folgende Häkchen:
   - ☑️ **Label anwenden**: Wähle *Neues Label...* und erstelle das Label `Pakete`.
   - ☑️ **Nie als Spam einstufen**.
6. Klicke auf **Filter erstellen**.
7. In der Home Assistant Integration gibst du bei *Ordner* einfach `Pakete` an (oder lässt `INBOX`, wenn die Mails im Posteingang bleiben).
</details>

<details>
<summary><b>🔵 GMX / Web.de Anleitung (Hier klicken)</b></summary>

1. Logge dich bei GMX oder Web.de ein.
2. Gehe zu **Einstellungen** (Schraubenschlüssel-Symbol unten links) ➔ **Filterregeln**.
3. Klicke auf **Eigene Filterregeln** ➔ **Neue Filterregel anlegen**.
4. Bedingung: *Wenn der Absender* enthält: `dpd`, `hermes`, `ups`, `fedex`, `amazon`, `otto`.
5. Aktion: *In Ordner verschieben* ➔ Ordner **Pakete** auswählen (vorher links als Ordner anlegen).
6. Speichern.
</details>

<details>
<summary><b>⚪ Microsoft Outlook / Hotmail (Hier klicken)</b></summary>

1. Öffne Outlook.com ➔ **Einstellungen (Zahnrad)** ➔ **E-Mail** ➔ **Regeln**.
2. Klicke auf **Neue Regel hinzufügen**.
3. Name vergeben (z. B. `Paketverfolgung`).
4. Bedingung hinzufügen: *Absenderadresse enthält* ➔ `dpd.de`, `myhermes.de`, `ups.com`, `fedex.com`, `amazon.de`.
5. Aktion hinzufügen: *Verschieben in* ➔ Ordner `Pakete`.
6. Speichern.
</details>

---

## 🎴 Vorkonfigurierte Lovelace-Karten

Beim Klick auf **„Karte hinzufügen“** in Home Assistant stehen dir drei fertige Kartentypen zur Auswahl:

### 1. 📊 Pakete-Status (Alle Paketdienste im Kachel-Überblick)
Das vorkonfigurierte Frosted-Glass-Grid aller 6 Paketdienste (DHL, Amazon, DPD, Hermes, UPS, FedEx) mit offiziellen Logos, aktuellen Paketzählern und Direkttap zur Sendungsverfolgung:
```yaml
type: custom:pakete-status-card
title: Pakete-Status
```

---

### 2. 📦 Gesamt-Übersichtskarte (Alle Pakete mit Fortschrittsbalken)
Die Haupt-Paketkarte mit Status-Fortschrittsbalken, Live-Lieferzeiten und interaktiven Schnellfilter-Buttons (Alle / DHL / Amazon / DPD / Hermes / UPS / FedEx):
```yaml
type: custom:unified-parcel-card
title: 📦 Meine Pakete
show_delivered: false
```

---

### 3. 🚚 Paketdienst Einzelkarte (Statuskarte für einen Dienst)
Wenn du eine dedizierte Karte für nur einen bestimmten Paketdienst auf deinem Dashboard haben möchtest:
```yaml
type: custom:carrier-parcel-card
carrier: dhl  # Mögliche Werte: dhl, amazon, dpd, hermes, ups, fedex
title: 🟡 DHL Sendungen
```

---

## 🔒 Privatsphäre & Datenschutz
> [!NOTE]
> Die Integration und Karten enthalten **keinerlei hardcodierte persönliche Daten** (keine privaten E-Mail-Adressen, Tracking-Barcodes oder systemspezifische IDs). Jeder Benutzer richtet über den nativen Einrichtungs-Assistenten (UI Config Flow) seine eigenen Zugangsdaten ein.

---

## 🚀 Installation via HACS

### 1. Als Custom Repository hinzufügen
1. Öffne **Home Assistant** -> **HACS** -> **Integrationen**.
2. Klicke oben rechts auf das Drei-Punkte-Menü (⋮) und wähle **Benutzerdefinierte Repositories** (*Custom repositories*).
3. Füge die URL deines GitHub-Repositories ein:
   - **Repository**: `https://github.com/REVANOX/ha-unified-parcel`
   - **Kategorie**: `Integration`
4. Klicke auf **Hinzufügen** (*Add*).

### 2. Integration herunterladen & Home Assistant neu starten
1. Suche nach **Unified Parcel Tracker** in HACS und klicke auf **Herunterladen**.
2. Starte Home Assistant neu (**Entwicklerwerkzeuge** -> **YAML** -> **Neu starten**).

### 3. Integration einrichten (UI)
1. Gehe zu **Einstellungen** -> **Geräte & Dienste** -> **Integration hinzufügen**.
2. Suche nach **Unified Parcel Tracker**.
3. Gib deine Zugangsdaten ein:
   - **IMAP Server**: z.B. `imap.gmail.com`, `imap.gmx.net`, `imap.web.de`
   - **Port**: `993` (SSL aktiviert)
   - **E-Mail-Adresse**: Deine Paket-E-Mail-Adresse
   - **Passwort**: Dein E-Mail App-Passwort *(z.B. Google App-Passwort)*

---

## 🤝 Maintainer & Mitwirken

> [!NOTE]
> Dieses Projekt wurde mit Unterstützung des **Google DeepMind Antigravity AI-Assistenten** als vollwertige All-in-One HACS-Integration konzipiert und umgesetzt.
> 
> **Maintainer gesucht!**  
> Wenn du Entwickler im Home Assistant Universum bist und Lust hast, die Betreuung und Weiterentwicklung dieses Projekts auf GitHub als Co-Maintainer zu übernehmen, bist du herzlich willkommen! Eröffne gerne ein Issue oder einen Pull Request.

---

## 📄 Lizenz
Dieses Projekt ist unter der [MIT License](LICENSE) lizenziert.
