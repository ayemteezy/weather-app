import styles from "./header.module.css";
import { formatInTimeZone } from "date-fns-tz";

export default function createHeader(data) {
  const header = document.createElement("header");
  header.className = styles.header;

  const renderHeader = () => {
    header.innerHTML = "";

    const { timezone, address } = data;
    const formatted = formatInTimeZone(
      new Date(),
      timezone,
      "EEEE, MMM d · h:mm aaa",
    );
    const date = document.createElement("p");
    date.className = styles.date;
    date.textContent = formatted;
    header.append(date);

    const city = document.createElement("h1");
    city.className = styles.city;
    city.textContent = address;
    header.append(city);
  };

  renderHeader();
  return header;
}
