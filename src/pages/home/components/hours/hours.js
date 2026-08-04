import styles from "./hours.module.css";
import { getHourlySnapshot } from "@/api/weather";

import createCard from "@/components/ui/card";

export default function createHours(data) {
  const container = document.createElement("div");
  container.className = styles.container;

  const today = data.days.find((day) => day.datetime === data.days[0].datetime);
  const snapshot = getHourlySnapshot(today);

  container.append(
    createCard(snapshot.morning, "Morning"),
    createCard(snapshot.noon, "Noon"),
    createCard(snapshot.evening, "Evening"),
    createCard(snapshot.night, "Night"),
  );

  return container;
}
