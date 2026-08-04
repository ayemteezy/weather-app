import styles from "./layout.module.css";
import { locationStore } from "@/store/location";
import { getWeatherData } from "@/api/weather";
import { mockWeatherData } from "@/mock/data";
import createErrorPage from "@/pages/error/page";
import createSidebar from "@/components/sidebar";

const USE_MOCK_DATA = false;

export default function createLayout() {
  let data = null;
  let errorStatus = null;
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
    if (errorStatus) {
      mainContent.innerHTML = "";
      mainContent.append(createErrorPage({ status: errorStatus }));
      return;
    }
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

      if (USE_MOCK_DATA) {
        data = mockWeatherData;
        errorStatus = null;
      } else {
        const cityName = locationStore.getActiveLocation();
        const result = await getWeatherData(cityName);
        if (result.error) {
          data = null;
          errorStatus = result.status;
        } else {
          data = result.data;
          errorStatus = null;
        }
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      errorStatus = 500;
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
