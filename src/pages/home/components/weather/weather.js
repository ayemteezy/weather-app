import styles from "./weather.module.css";
import { formatDistanceToNow } from "date-fns";

import createComparison from "../comparison";

export default function createWeather(data) {
  const { currentConditions } = data;
  const container = document.createElement("section");
  const content = document.createElement("div");
  content.className = styles.content;

  const temperature = document.createElement("p");
  temperature.className = styles.temperature;
  const temp = Math.round(currentConditions.temp);
  temperature.textContent = `${temp}°`;
  content.append(temperature);

  const feelsLike = document.createElement("p");
  feelsLike.className = styles.feelsLike;
  const feels = Math.round(currentConditions.feelslike);
  feelsLike.textContent = `Feels like ${feels}°`;
  content.append(feelsLike);

  const condition = document.createElement("p");
  condition.className = styles.condition;
  condition.textContent = currentConditions.conditions;
  content.append(condition);

  const updatedAt = document.createElement("p");
  updatedAt.className = styles.updatedAt;
  const updated = formatDistanceToNow(
    new Date(currentConditions.datetimeEpoch * 1000),
    { addSuffix: true },
  );
  updatedAt.textContent = `Updated ${updated}`;
  content.append(updatedAt);

  const description = createComparison(data);
  content.append(description);

  container.append(content);
  return container;
}
