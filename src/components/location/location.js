import styles from "./location.module.css";

import createLocationItem from "@/components/location-item";

export default function createLocations() {
  const container = document.createElement("div");

  const header = document.createElement("p");
  header.className = styles.header;
  header.textContent = "Location";
  container.append(header);

  const locationItem = createLocationItem();
  container.append(locationItem);

  return container;
}
