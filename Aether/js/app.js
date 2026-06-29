import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";

import "@fontsource/lora/400.css";
import "@fontsource/lora/500.css";
import "@fontsource/lora/600.css";
import "@fontsource/lora/700.css";

import Alpine from "alpinejs";

import { initHeader } from "./header.js";
import { initAnimations } from "./animation.js";
import { initCounters } from "./counter.js";
import { initCarousel } from "./carousel.js";

initHeader();
initAnimations();
initCounters();
initCarousel();

Alpine.start();
