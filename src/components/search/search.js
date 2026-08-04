import styles from "./search.module.css";
import { createIcons, Search } from "lucide";
import { fetchSuggestions } from "@/api/suggestions";

import createButton from "@/components/ui/button";
import createSuggestionBox from "@/components/suggestion-box/suggestion-box";

export default function createSearch() {
  const container = document.createElement("div");

  const button = document.createElement("div");
  button.className = styles.button;
  const input = document.createElement("input");
  input.className = styles.input;
  input.placeholder = "Search City...";

  const suggestionContainer = document.createElement("div");
  const handleSearch = async () => {
    const query = input.value.trim();

    const results = await fetchSuggestions(query);
    suggestionContainer.innerHTML = "";
    if (!results || results.length === 0) return;

    const suggestions = results
      .map(({ address }) => {
        if (!address) return null;
        console.log(address);
        const city =
          address.city ||
          address.town ||
          address.village ||
          address.hamlet ||
          address.municipality ||
          address.province;
        const rawStateOrProvince =
          address.state ||
          address.province ||
          address.region ||
          address.state_district ||
          "";

        const stateOrProvince =
          rawStateOrProvince && rawStateOrProvince !== city
            ? rawStateOrProvince
            : "";

        const countryCode = address.country_code
          ? address.country_code.toUpperCase()
          : "";

        if (!city || !countryCode) return null;
        return stateOrProvince
          ? `${city}, ${stateOrProvince}, ${countryCode}`
          : `${city}, ${countryCode}`;
      })
      .filter(Boolean);

    const suggestionBox = createSuggestionBox(suggestions);
    suggestionContainer.append(suggestionBox);
  };

  const search = createButton({
    icon: "search",
    variant: "outline",
    onClick: handleSearch,
  });
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  });

  button.append(input, search);
  container.append(button, suggestionContainer);

  createIcons({
    nameAttr: "data-lucide",
    icons: { Search },
    root: container,
  });

  return container;
}
