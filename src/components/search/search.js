import styles from "./search.module.css";
import { createIcons, Search } from "lucide";

import createButton from "@/components/ui/button";

export default function createSearch() {
  const container = document.createElement("div");

  const button = document.createElement("div");
  button.className = styles.button;

  const input = document.createElement("input");
  input.className = styles.input;

  const search = createButton({ icon: "search", variant: "outline" });

  button.append(input, search);
  container.append(button);
  createIcons({
    nameAttr: "data-lucide",
    icons: { Search },
    root: container,
  });

  return container;
}
