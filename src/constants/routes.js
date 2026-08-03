import createHomePage from "@/pages/home/page";

export const ROUTES = [
  { label: "Dashboard", href: "/", page: createHomePage },
  { label: "Uncategorized", href: "/uncategorized", page: "Error" },
];
