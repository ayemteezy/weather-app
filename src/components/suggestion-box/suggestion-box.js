import styles from "./suggestion-box.module.css";
import { locationStore } from "@/store/location";

export default function createSuggestionBox(suggestions) {
  const container = document.createElement("div");
  container.className = styles.container;

  const list = document.createElement("ul");
  list.className = styles.list;

  suggestions.forEach((suggestion) => {
    const item = document.createElement("li");
    item.className = styles.item;

    item.textContent = suggestion;

    item.addEventListener("click", () => {
      locationStore.addLocation(suggestion);
      container.remove();
    });
    list.append(item);
  });

  container.append(list);
  return container;
}
