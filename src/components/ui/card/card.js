import styles from "./card.module.css";
import {
  createIcons,
  ArrowUp,
  ArrowDown,
  Wind,
  Sun,
  Moon,
  CloudSun,
  CloudMoon,
  Cloud,
  CloudFog,
  CloudRain,
  CloudDrizzle,
  CloudSnow,
  CloudHail,
  CloudLightning,
  HelpCircle,
} from "lucide";

function getComparisonIcon(todayTemp, yesterdayTemp, threshold = 2) {
  if (todayTemp == null || yesterdayTemp == null) {
    return "wind";
  }
  const diff = todayTemp - yesterdayTemp;
  if (Math.abs(diff) < threshold) {
    return "wind";
  }
  return diff > 0 ? "arrow-up" : "arrow-down";
}

function getConditionIcon(iconName) {
  switch (iconName) {
    case "clear-day":
      return "sun";
    case "clear-night":
      return "moon";
    case "partly-cloudy-day":
      return "cloud-sun";
    case "partly-cloudy-night":
      return "cloud-moon";
    case "cloudy":
      return "cloud";
    case "fog":
      return "cloud-fog";
    case "wind":
      return "wind";
    case "rain":
      return "cloud-rain";
    case "showers-day":
    case "showers-night":
      return "cloud-drizzle";
    case "snow":
    case "snow-showers-day":
    case "snow-showers-night":
      return "cloud-snow";
    case "sleet":
      return "cloud-hail";
    case "thunder":
    case "thunder-rain":
    case "thunder-showers-day":
    case "thunder-showers-night":
      return "cloud-lightning";
    default:
      return "help-circle";
  }
}

export default function createCard(today, label, yesterday) {
  const container = document.createElement("div");
  container.className = styles.container;

  const time = document.createElement("p");
  time.className = styles.time;
  time.textContent = label;
  container.append(time);

  const temperature = document.createElement("p");
  temperature.className = styles.temperature;
  temperature.textContent = `${Math.round(today.temp)}°`;
  container.append(temperature);

  const iconRow = document.createElement("div");
  iconRow.className = styles.iconRow;

  const conditionIcon = document.createElement("i");
  conditionIcon.setAttribute("data-lucide", getConditionIcon(today.icon));
  conditionIcon.className = styles.icon;
  iconRow.append(conditionIcon);

  const comparisonIconName = getComparisonIcon(today.temp, yesterday?.temp);
  const comparisonIcon = document.createElement("i");
  comparisonIcon.classList.add(styles.icon, styles.comparisonIcon);
  comparisonIcon.setAttribute("data-lucide", comparisonIconName);
  iconRow.append(comparisonIcon);

  container.append(iconRow);

  createIcons({
    nameAttr: "data-lucide",
    icons: {
      ArrowUp,
      ArrowDown,
      Wind,
      Sun,
      Moon,
      CloudSun,
      CloudMoon,
      Cloud,
      CloudFog,
      CloudRain,
      CloudDrizzle,
      CloudSnow,
      CloudHail,
      CloudLightning,
      HelpCircle,
    },
    root: container,
  });
  return container;
}
