import styles from "./page.module.css";

export default function createErrorPage({ status = "404" } = {}) {
  const container = document.createElement("div");
  container.className = styles.container;

  const code = document.createElement("h1");
  code.className = styles.code;
  code.textContent = status;
  container.append(code);

  const message = document.createElement("p");
  message.className = styles.message;
  message.textContent = getErrorMessage(status);
  container.append(message);

  return container;
}

function getErrorMessage(status) {
  const messages = {
    404: "Page not found.",
    429: "Too many requests — please try again in a moment.",
    500: "Something went wrong on our end.",
    503: "Unable to reach the weather service. Check your connection.",
  };
  return messages[status] || "An unexpected error occurred.";
}
