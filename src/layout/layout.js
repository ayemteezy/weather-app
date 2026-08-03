import styles from "./layout.module.css";
import createSidebar from "@/components/sidebar";
import { locationStore } from "@/store/location";
import { getWeatherData } from "@/api/weather";

export default function createLayout() {
  let data = null;
  let currentPageFactory = null;

  const wrapper = document.createElement("div");
  wrapper.className = styles.wrapper;

  const content = document.createElement("div");
  content.className = styles.content;

  const mainContent = document.createElement("main");
  mainContent.classList.add("container", styles.mainContent);

  const loading = document.createElement("div");
  loading.className = styles.loading;
  loading.textContent = "Loading Weather Data...";

  const renderCurrentPage = () => {
    if (typeof currentPageFactory === "function") {
      const pageElement = currentPageFactory(data);
      if (pageElement) {
        mainContent.innerHTML = "";
        mainContent.append(pageElement);
      }
    }
  };

  wrapper.renderPage = (pageFactory) => {
    currentPageFactory = pageFactory;
    renderCurrentPage();
  };

  wrapper.setLoading = (isLoading) => {
    loading.classList.toggle(styles.visible, isLoading);
  };

  const sidebar = createSidebar();
  content.append(mainContent);
  wrapper.append(content, sidebar, loading);

  const loadPage = async () => {
    try {
      wrapper.setLoading(true);
      const cityName = locationStore.getActiveLocation();
      data = await getWeatherData(cityName);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      wrapper.setLoading(false);
      renderCurrentPage();
    }
  };

  loadPage();

  window.addEventListener("activeLocationChange", loadPage);
  window.addEventListener("unitChange", loadPage);

  return wrapper;
}
