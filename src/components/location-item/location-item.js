import styles from "./location-item.module.css";
import { createIcons, Minus } from "lucide";

import createButton from "@/components/ui/button";

export default function createLocationItem() {
  const container = document.createElement("div");

  const button = document.createElement("div");
  button.className = styles.button;

  const locationBtn = createButton({ label: "Location", variant: "outline" });
  const removeBtn = createButton({
    label: "",
    icon: "minus",
    variant: "outline",
  });
  locationBtn.classList.add(styles.locationBtn);
  removeBtn.classList.add(styles.removeBtn);

  button.append(locationBtn, removeBtn);
  container.append(button);

  createIcons({
    nameAttr: "data-lucide",
    icons: { Minus },
    root: container,
  });
  return container;
}
