import styles from "./location-item.module.css";
import { createIcons, Minus } from "lucide";

import createButton from "@/components/ui/button";

export default function createLocationItem({
  location,
  isActive = false,
  onClick,
} = {}) {
  const container = document.createElement("div");

  const button = document.createElement("div");
  button.className = styles.button;

  const locationBtn = createButton({
    label: location,
    variant: "outline",
    isActive: isActive,
    onClick: onClick,
  });
  locationBtn.classList.add(styles.locationBtn);
  button.append(locationBtn);

  if (!isActive) {
    const removeBtn = createButton({
      label: "",
      icon: "minus",
      variant: "outline",
    });
    removeBtn.classList.add(styles.removeBtn);
    button.append(removeBtn);
  }

  container.append(button);

  createIcons({
    nameAttr: "data-lucide",
    icons: { Minus },
    root: container,
  });
  return container;
}
