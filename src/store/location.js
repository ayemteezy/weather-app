const DEFAULT_CITIES = ["Manila, PH", "Tokyo, JP", "London, GB"];

export const locationStore = {
  getLocations() {
    if (localStorage.getItem("weather_locations") === null) {
      localStorage.setItem("weather_locations", JSON.stringify(DEFAULT_CITIES));
    }
    return JSON.parse(localStorage.getItem("weather_locations")) || [];
  },

  getActiveLocation() {
    let active = localStorage.getItem("active_location");

    if (!active) {
      const locations = this.getLocations();
      active = locations[0] || "";
      if (active) localStorage.setItem("active_location", active);
    }

    return active;
  },

  setActiveLocation(cityName) {
    localStorage.setItem("active_location", cityName);

    window.dispatchEvent(
      new CustomEvent("activeLocationChange", {
        detail: { location: cityName },
      }),
    );

    return cityName;
  },

  addLocation(cityName) {
    const locations = this.getLocations();

    if (locations.includes(cityName)) {
      return locations;
    }

    const updated = [...locations, cityName];
    localStorage.setItem("weather_locations", JSON.stringify(updated));

    window.dispatchEvent(
      new CustomEvent("locationsChange", {
        detail: { locations: updated },
      }),
    );

    return updated;
  },

  removeLocation(cityName) {
    const locations = this.getLocations();
    const updated = locations.filter((city) => city !== cityName);
    localStorage.setItem("weather_locations", JSON.stringify(updated));

    window.dispatchEvent(
      new CustomEvent("locationsChange", {
        detail: { locations: updated },
      }),
    );

    const active = localStorage.getItem("active_location");
    if (active === cityName) {
      const nextActive = updated[0] || "";
      if (nextActive) {
        this.setActiveLocation(nextActive);
      } else {
        localStorage.removeItem("active_location");
        window.dispatchEvent(
          new CustomEvent("activeLocationChange", {
            detail: { location: null },
          }),
        );
      }
    }
  },
};
