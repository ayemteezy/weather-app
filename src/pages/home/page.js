import styles from "./page.module.css";

import createHeader from "./components/header";
import createWeather from "./components/weather";
import createTime from "./components/time";
import createHours from "./components/hours";

export default function createHomePage(data) {
  const container = document.createElement("div");
  container.className = styles.container;
  if (!data) return;

  const header = createHeader(data);
  container.append(header);

  const weather = createWeather(data);
  container.append(weather);

  const divider = document.createElement("hr");
  divider.className = styles.divider;
  container.append(divider);

  const time = createTime(data);
  container.append(time);

  const cards = createHours(data);
  container.append(cards);

  return container;
}
