import styles from "./button.module.css";

export default function createButton({
  label,
  href,
  type = "button",
  onClick,
  variant = "primary",
  size = "md",
  icon,
  isActive = false,
} = {}) {
  const element = href ? "a" : "button";
  const container = document.createElement(element);

  if (icon) {
    const iconElement = document.createElement("i");
    iconElement.className = styles.icon;
    iconElement.setAttribute("data-lucide", icon);
    container.append(iconElement);
  }

  if (label) {
    const labelElement = document.createElement("p");
    labelElement.textContent = label;
    container.append(labelElement);
  }

  if (element === "button" && type) {
    container.setAttribute("type", type);
  }

  const variantClass = styles[variant] || "";
  const sizeClass = styles[size] || "";
  container.className =
    `${styles.button || ""} ${variantClass} ${sizeClass}`.trim();

  if (isActive && styles.active) {
    container.classList.add(styles.active);
  }

  if (typeof onClick === "function") {
    container.addEventListener("click", onClick);
  }

  return container;
}
