import { state } from "@/store/state";

// api/weather.js
export const getWeatherData = async (cityName) => {
  const apiKey = process.env.VISUAL_CROSSING_API_KEY;
  const baseUrl = process.env.VISUAL_CROSSING_BASE_URL;
  if (!apiKey || !baseUrl) {
    console.error("Missing Visual Crossing environment configuration tokens.");
    return null;
  }
  try {
    const queryParams = new URLSearchParams({
      key: apiKey,
      contentType: "json",
      unitGroup: state.getState(),
    });
    const url = `${baseUrl}${encodeURIComponent(cityName.trim())}/yesterday/today?${queryParams.toString()}`;
    const response = await fetch(url);
    if (!response.ok) {
      return { error: true, status: response.status };
    }
    const data = await response.json();
    return { error: false, data };
  } catch (error) {
    console.error(error);
    return { error: true, status: 503 };
  }
};

export const getHourlySnapshot = (dayData) => {
  const targetTimes = {
    morning: "06:00:00",
    noon: "12:00:00",
    evening: "18:00:00",
    night: "00:00:00",
  };

  const snapshot = {};
  for (const [label, time] of Object.entries(targetTimes)) {
    const hourEntry = dayData.hours.find((hour) => hour.datetime === time);
    snapshot[label] = hourEntry || null;
  }
  return snapshot;
};
