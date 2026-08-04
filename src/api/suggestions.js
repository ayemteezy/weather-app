export const fetchSuggestions = async (query) => {
  if (!query.trim()) return [];
  try {
    // api/location.js
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5&addressdetails=1`;
    const response = await fetch(url, {
      headers: {
        "User-Agent": "WeatherApp/1.0 (laurencelestercarino@gmail.com)",
      },
    });

    if (!response.ok) {
      console.error(`Nominatim error (${response.status})`);
      return [];
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch location suggestions:", error);
    return [];
  }
};
