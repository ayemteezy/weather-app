let tempUnit = "metric";

export const state = {
  getState() {
    return tempUnit;
  },

  toggleState() {
    tempUnit = tempUnit === "metric" ? "us" : "metric";

    const event = new CustomEvent("unitChange", { detail: { unit: tempUnit } });
    window.dispatchEvent(event);

    return tempUnit;
  },
};
