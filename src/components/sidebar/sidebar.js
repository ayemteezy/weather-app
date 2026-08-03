import styles from "./sidebar.module.css";

import createTempToggler from "@/components/temp-toggler";
import createLocation from "@/components/location";
import createSearch from "@/components/search";

export default function createSidebar() {
  const container = document.createElement("aside");
  container.className = styles.container;

  const tempToggler = createTempToggler();
  container.append(tempToggler);

  const locations = createLocation();
  container.append(locations);

  const searchBar = createSearch();
  container.append(searchBar);

  return container;
}
