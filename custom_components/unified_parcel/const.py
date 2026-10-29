"""Konstanten für die Unified Parcel (Paket-Tracker) Integration (DACH / Deutschland)."""

DOMAIN = "unified_parcel"

CONF_IMAP_SERVER = "imap_server"
CONF_IMAP_PORT = "imap_port"
CONF_IMAP_SSL = "imap_ssl"
CONF_EMAIL = "email"
CONF_PASSWORD = "password"
CONF_FOLDER = "folder"
CONF_ENABLE_PUSH = "enable_push"
CONF_INCLUDE_DHL = "include_dhl"
CONF_INCLUDE_AMAZON = "include_amazon"

DEFAULT_IMAP_SERVER = "imap.gmail.com"
DEFAULT_IMAP_PORT = 993
DEFAULT_IMAP_SSL = True
DEFAULT_FOLDER = "INBOX"
DEFAULT_ENABLE_PUSH = True
DEFAULT_INCLUDE_DHL = True
DEFAULT_INCLUDE_AMAZON = True

URL_BASE = "/unified_parcel"
CARD_FILE = "unified-parcel-card.js"

ATTR_PARCELS = "parcels"
ATTR_TOTAL = "total"
ATTR_CARRIERS = "paketdienste"
ATTR_TODAY = "heute"
ATTR_PICKUP = "abholbereit"
ATTR_DELIVERED = "zugestellt"

# Sensor-Schlüssel für deutsche Entitäten (Gesamt-Übersicht)
SENSOR_KEY_AKTIV = "pakete_aktiv"
SENSOR_KEY_HEUTE = "pakete_heute"
SENSOR_KEY_ABHOLBEREIT = "pakete_abholbereit"
SENSOR_KEY_ZUGESTELLT = "pakete_zugestellt"

# Unterstützte Paketdienste für dedizierte Status-Sensoren & Karten
SUPPORTED_CARRIERS = {
    "dhl": {"name": "DHL", "icon": "mdi:truck-delivery"},
    "amazon": {"name": "Amazon", "icon": "mdi:amazon"},
    "dpd": {"name": "DPD", "icon": "mdi:truck-fast"},
    "hermes": {"name": "Hermes", "icon": "mdi:truck"},
    "ups": {"name": "UPS", "icon": "mdi:package-variant"},
    "fedex": {"name": "FedEx", "icon": "mdi:airplane-takeoff"},
}
