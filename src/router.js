function createRouter(onRouteMatch) {
  function handleRoute() {
    const pathname = window.location.pathname;
    const cleanPath =
      pathname.length > 1 && pathname.endsWith("/")
        ? pathname.slice(0, -1)
        : pathname;
    onRouteMatch(cleanPath);
  }

  document.addEventListener("click", (event) => {
    const anchor = event.target.closest("a");
    if (!anchor) return;

    const href = anchor.getAttribute("href");
    const isStandardClick =
      event.button === 0 &&
      !event.ctrlKey &&
      !event.metaKey &&
      !event.shiftKey &&
      !event.altKey;
    const isLocalLink = anchor.origin === window.location.origin;
    const isRouterDisabled = anchor.dataset.router === "false";

    if (href && isLocalLink && isStandardClick && !isRouterDisabled) {
      event.preventDefault();
      window.history.pushState(null, null, href);
      handleRoute();
    }
  });

  window.addEventListener("popstate", handleRoute);

  return {
    push(href) {
      if (typeof href !== "string") {
        console.error("router.push expected a string path, got:", href);
        return;
      }
      const absolutePath = href.startsWith("/") ? href : `/${href}`;

      window.history.pushState({}, "", absolutePath);

      window.dispatchEvent(new Event("pushstate"));
      handleRoute();
    },
    back() {
      window.history.back();
    },
    forward() {
      window.history.forward();
    },
    listen() {
      handleRoute();
    },
  };
}

export let router = null;

export function initRouter(onRouteMatch) {
  if (!router) {
    router = createRouter(onRouteMatch);
  }
  return router;
}
