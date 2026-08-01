import styles from "./layout.module.css";

// import createSidebar from "@/components/sidebar";

export default function createLayout() {
  const layoutWrapper = document.createElement("div");
  layoutWrapper.className = styles.container;

  const content = document.createElement("div");
  content.className = styles.content;

  const mainContent = document.createElement("main");
  mainContent.classList.add("container", styles.mainContent);

  mainContent.textContent = "hello";

  layoutWrapper.renderPage = (pageElement) => {
    if (pageElement) {
      mainContent.innerHTML = "";
      mainContent.append(pageElement);
    }
  };
  // const sidebar = createSidebar();

  content.append(mainContent);
  layoutWrapper.append(content);

  return layoutWrapper;
}
