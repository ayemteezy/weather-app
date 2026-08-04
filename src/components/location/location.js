import styles from "./location.module.css";
import { locationStore } from "@/store/location";

import createLocationItem from "@/components/location-item";

export default function createLocations() {
  const container = document.createElement("div");

  const header = document.createElement("p");
  header.className = styles.header;
  header.textContent = "Location";
  container.append(header);

  const locationContainer = document.createElement("div");
  locationContainer.className = styles.locationContainer;
  const renderLocations = () => {
    locationContainer.innerHTML = "";

    const locations = locationStore.getLocations();
    const currentActive = locationStore.getActiveLocation();

    locations.forEach((cityName) => {
      const locationItem = createLocationItem({
        location: cityName,
        isActive: cityName === currentActive,
        onClick: () => {
          locationStore.setActiveLocation(cityName);
        },
        onRemove: () => {
          locationStore.removeLocation(cityName);
        },
      });
      locationContainer.append(locationItem);
    });
  };
  container.append(locationContainer);
  renderLocations();
  window.addEventListener("activeLocationChange", renderLocations);
  window.addEventListener("locationsChange", renderLocations);

  return container;
}
