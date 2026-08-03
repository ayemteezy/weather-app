let tempUnit = localStorage.getItem("temp_unit") ?? "metric";

export const state = {
  getState() {
    return tempUnit;
  },

  toggleState() {
    tempUnit = tempUnit === "metric" ? "us" : "metric";
    localStorage.setItem("temp_unit", tempUnit);
    const event = new CustomEvent("unitChange", { detail: { unit: tempUnit } });
    window.dispatchEvent(event);

    return tempUnit;
  },

  getActiveUnit() {
    return tempUnit;
  },
};
