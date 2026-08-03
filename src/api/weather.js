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
      console.error(`Visual Crossing API error (${response.status})`);
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
    return null;
  }
};
