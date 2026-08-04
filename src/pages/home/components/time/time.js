import styles from "./time.module.css";
import { createIcons, Sunrise, Sunset } from "lucide";
import { formatInTimeZone } from "date-fns-tz";

export default function createTime(data) {
  const { currentConditions, timezone } = data;

  const container = document.createElement("div");
  container.className = styles.container;

  const sunriseTime = formatInTimeZone(
    currentConditions.sunriseEpoch * 1000,
    timezone,
    "h:mm a",
  );

  const sunsetTime = formatInTimeZone(
    currentConditions.sunsetEpoch * 1000,
    timezone,
    "h:mm a",
  );

  const sunrise = document.createElement("p");
  sunrise.className = styles.time;
  sunrise.innerHTML = `<i data-lucide="sunrise" class=" ${styles.icon}"></i> ${sunriseTime}`;
  const sunset = document.createElement("p");
  sunset.className = styles.time;
  sunset.innerHTML = `<i data-lucide="sunset" class=" ${styles.icon}"></i> ${sunsetTime}`;
  createIcons({
    icons: {
      Sunrise,
      Sunset,
    },
  });

  container.append(sunrise, sunset);

  createIcons({
    nameAttr: "data-lucide",
    icons: { Sunrise, Sunset },
    root: container,
  });
  return container;
}
