import styles from "./comparison.module.css";

export default function createComparison(data) {
  const container = document.createElement("div");
  container.className = styles.container;
  if (!data || !data.days || data.days.length < 2) {
    return;
  }

  const [yesterday, today] = data.days;
  const diff = today.temp - yesterday.temp;

  let title, subtitle;
  if (Math.abs(diff) < 2) {
    title = "About the same as yesterday";
    subtitle = "Temperatures holding steady through the day.";
  } else if (diff > 0) {
    title = "Warmer than yesterday";
    subtitle = `About ${Math.round(diff)}° warmer than yesterday.`;
  } else {
    title = "Cooler than yesterday";
    subtitle = `About ${Math.round(Math.abs(diff))}° cooler than yesterday.`;
  }

  const titleEl = document.createElement("p");
  titleEl.className = styles.title;
  titleEl.textContent = title;
  container.append(titleEl);

  const subtitleEl = document.createElement("p");
  subtitleEl.className = styles.subtitle;
  subtitleEl.textContent = subtitle;
  container.append(subtitleEl);

  return container;
}
