"""Sensoren für die Unified Parcel Integration mit deutschen Entitätsnamen."""
from __future__ import annotations

from typing import Any
from homeassistant.components.sensor import SensorEntity
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.update_coordinator import CoordinatorEntity

from .const import (
    DOMAIN,
    ATTR_PARCELS,
    ATTR_TOTAL,
    ATTR_TODAY,
    ATTR_PICKUP,
    ATTR_DELIVERED,
    SENSOR_KEY_AKTIV,
    SENSOR_KEY_HEUTE,
    SENSOR_KEY_ABHOLBEREIT,
    SENSOR_KEY_ZUGESTELLT,
    SUPPORTED_CARRIERS,
)
from .coordinator import UnifiedParcelCoordinator


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Richtet die Paket-Sensoren für den Config-Eintrag ein."""
    coordinator: UnifiedParcelCoordinator = hass.data[DOMAIN][entry.entry_id]

    entities: list[SensorEntity] = [
        # 1. Gesamt-Übersichtskarten-Sensoren
        UnifiedParcelSensor(coordinator, entry, SENSOR_KEY_AKTIV, "Offene Pakete (Alle)", "mdi:truck-fast", "Pakete"),
        UnifiedParcelSensor(coordinator, entry, SENSOR_KEY_HEUTE, "Lieferung heute (Alle)", "mdi:calendar-today", "Pakete"),
        UnifiedParcelSensor(coordinator, entry, SENSOR_KEY_ABHOLBEREIT, "Abholbereit (Alle)", "mdi:package-variant-closed", "Pakete"),
        UnifiedParcelSensor(coordinator, entry, SENSOR_KEY_ZUGESTELLT, "Kürzlich zugestellt (Alle)", "mdi:check-circle-outline", "Pakete"),
    ]

    # 2. Dedizierte Status-Sensoren für jeden einzelnen Paketdienst (DHL, Amazon, DPD, Hermes, UPS, FedEx)
    for carrier_key, info in SUPPORTED_CARRIERS.items():
        entities.append(
            CarrierParcelSensor(coordinator, entry, carrier_key, f"{info['name']} Pakete", info["icon"])
        )

    async_add_entities(entities)


class UnifiedParcelSensor(CoordinatorEntity[UnifiedParcelCoordinator], SensorEntity):
    """Repräsentiert einen Gesamt-Paket-Sensor (Übersicht)."""

    def __init__(
        self,
        coordinator: UnifiedParcelCoordinator,
        entry: ConfigEntry,
        sensor_key: str,
        name: str,
        icon: str,
        unit: str,
    ) -> None:
        """Initialisieren."""
        super().__init__(coordinator)
        self._sensor_key = sensor_key
        self._attr_name = name
        self._attr_icon = icon
        self._attr_native_unit_of_measurement = unit
        self._attr_unique_id = f"{entry.entry_id}_{sensor_key}"
        self.entity_id = f"sensor.{sensor_key}"

    @property
    def native_value(self) -> int:
        """Liefert den aktuellen Zahlenwert."""
        data = self.coordinator.data or {}
        if self._sensor_key == SENSOR_KEY_AKTIV:
            return data.get("active", 0)
        if self._sensor_key == SENSOR_KEY_HEUTE:
            return data.get("today", 0)
        if self._sensor_key == SENSOR_KEY_ABHOLBEREIT:
            return data.get("pickup", 0)
        if self._sensor_key == SENSOR_KEY_ZUGESTELLT:
            return data.get("delivered", 0)
        return 0

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        """Gibt zusätzliche Attribute zurück (die Paket-Liste liegt im aktiven Sensor)."""
        data = self.coordinator.data or {}
        attrs: dict[str, Any] = {
            ATTR_TOTAL: data.get("total", 0),
            ATTR_TODAY: data.get("today", 0),
            ATTR_PICKUP: data.get("pickup", 0),
            ATTR_DELIVERED: data.get("delivered", 0),
        }
        if self._sensor_key == SENSOR_KEY_AKTIV:
            attrs[ATTR_PARCELS] = data.get("parcels", [])

        return attrs


class CarrierParcelSensor(CoordinatorEntity[UnifiedParcelCoordinator], SensorEntity):
    """Repräsentiert einen Status-Sensor für einen spezifischen Paketdienst (z.B. DHL, UPS, FedEx)."""

    def __init__(
        self,
        coordinator: UnifiedParcelCoordinator,
        entry: ConfigEntry,
        carrier_key: str,
        name: str,
        icon: str,
    ) -> None:
        """Initialisieren."""
        super().__init__(coordinator)
        self._carrier_key = carrier_key
        self._attr_name = name
        self._attr_icon = icon
        self._attr_native_unit_of_measurement = "Pakete"
        self._attr_unique_id = f"{entry.entry_id}_carrier_{carrier_key}"
        self.entity_id = f"sensor.pakete_{carrier_key}"

    @property
    def _carrier_parcels(self) -> list[dict[str, Any]]:
        """Filtert alle Pakete auf diesen Paketdienst."""
        data = self.coordinator.data or {}
        all_p = data.get("parcels", [])
        return [p for p in all_p if p.get("carrier") == self._carrier_key]

    @property
    def native_value(self) -> int:
        """Anzahl der aktiven Pakete für diesen Paketdienst."""
        parcels = self._carrier_parcels
        delivered_count = sum(1 for p in parcels if p.get("isDelivered"))
        return len(parcels) - delivered_count

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        """Gibt Statusdetails und Paketliste für diesen Dienst zurück."""
        parcels = self._carrier_parcels
        today_count = sum(1 for p in parcels if p.get("isToday") and not p.get("isDelivered") and not p.get("isPickup"))
        pickup_count = sum(1 for p in parcels if p.get("isPickup") and not p.get("isDelivered"))
        delivered_count = sum(1 for p in parcels if p.get("isDelivered"))
        return {
            "carrier": self._carrier_key,
            "parcels": parcels,
            "total": len(parcels),
            "heute": today_count,
            "abholbereit": pickup_count,
            "zugestellt": delivered_count,
        }
