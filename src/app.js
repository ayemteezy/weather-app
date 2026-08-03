import "@/globals.css";
import "@fontsource-variable/geist-mono/wght.css";

import { ROUTES } from "@/constants/routes";
import { initRouter } from "@/router";

import createLayout from "@/layout/layout";
// import createErrorPage from "@/pages/error/error";

export let router;

export default function App() {
  const app = document.getElementById("root");
  if (!app) return;

  const layout = createLayout();
  app.append(layout);

  const render = (pageElement) => {
    layout.renderPage(pageElement);
  };

  const handleRouteMatch = (path) => {
    const matchingRoute = ROUTES.find((route) => route.href === path);
  };

  const routerInstance = initRouter(handleRouteMatch);
  router = routerInstance;

  routerInstance.listen();
}
