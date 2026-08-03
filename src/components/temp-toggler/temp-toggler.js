import styles from "./temp-toggler.module.css";
import { state } from "@/store/state";

import createButton from "@/components/ui/button";

export default function createTempToggler() {
  const container = document.createElement("div");

  const header = document.createElement("p");
  header.textContent = "Temperature";
  header.className = styles.header;
  container.append(header);

  const buttonContainer = document.createElement("div");
  buttonContainer.className = styles.buttonContainer;
  container.append(buttonContainer);

  function renderButtons() {
    buttonContainer.innerHTML = "";

    const currentUnit = state.getState();

    const celsiusButton = createButton({
      label: "°C",
      variant: "outline",
      isActive: currentUnit === "metric",
      onClick: () => {
        if (state.getState() !== "metric") state.toggleState();
      },
    });

    const fahrenheitButton = createButton({
      label: "°F",
      variant: "outline",
      isActive: currentUnit === "us",
      onClick: () => {
        if (state.getState() !== "us") state.toggleState();
      },
    });

    buttonContainer.append(fahrenheitButton, celsiusButton);
  }
  renderButtons();

  window.addEventListener("unitChange", () => {
    renderButtons();
  });

  return container;
}
