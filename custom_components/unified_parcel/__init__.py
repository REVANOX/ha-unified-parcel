"""Unified Parcel Integration: All-in-One Paketverfolgung für Home Assistant."""
from __future__ import annotations

import logging
from pathlib import Path

from homeassistant.config_entries import ConfigEntry
from homeassistant.const import Platform
from homeassistant.core import HomeAssistant

from .const import DOMAIN, URL_BASE, CARD_FILE
from .coordinator import UnifiedParcelCoordinator

_LOGGER = logging.getLogger(__name__)

PLATFORMS: list[Platform] = [Platform.SENSOR]


async def async_setup(hass: HomeAssistant, config: dict) -> bool:
    """Richtet die statische Ressource für die Lovelace-Karte automatisch ein."""
    card_path = Path(__file__).parent / "frontend" / CARD_FILE
    if card_path.is_file():
        hass.http.register_static_path(
            f"{URL_BASE}/{CARD_FILE}",
            str(card_path),
            cache_headers=False,
        )
        _LOGGER.info("Unified Parcel Card unter %s/%s registriert", URL_BASE, CARD_FILE)

    return True


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Richtet einen Eintrag aus der UI ein."""
    hass.data.setdefault(DOMAIN, {})

    coordinator = UnifiedParcelCoordinator(hass, dict(entry.data), dict(entry.options))
    await coordinator.async_config_entry_first_refresh()

    hass.data[DOMAIN][entry.entry_id] = coordinator

    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)

    entry.async_on_unload(entry.add_update_listener(async_reload_entry))

    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Entlädt einen Config-Eintrag."""
    unload_ok = await hass.config_entries.async_unload_platforms(entry, PLATFORMS)
    if unload_ok:
        hass.data[DOMAIN].pop(entry.entry_id, None)

    return unload_ok


async def async_reload_entry(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """Lädt den Eintrag nach Optionsänderungen neu."""
    await hass.config_entries.async_reload(entry.entry_id)
