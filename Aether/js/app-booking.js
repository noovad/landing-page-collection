import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";

import "@fontsource/lora/400.css";
import "@fontsource/lora/500.css";
import "@fontsource/lora/600.css";
import "@fontsource/lora/700.css";

import Alpine from "alpinejs";
import {
  createIcons,
  ArrowLeft,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Globe,
  Menu,
  Monitor,
  TrendingUp,
  User,
  Video,
  X,
} from "lucide";

import { initHeader } from "./header.js";
import { initAnimations } from "./animation.js";
import { initBooking } from "./booking-data.js";

initHeader();
initAnimations();

document.addEventListener("alpine:init", () => {
  Alpine.data("bookingPage", initBooking);
});

createIcons({
  icons: {
    ArrowLeft,
    Calendar,
    Check,
    ChevronLeft,
    ChevronRight,
    Clock,
    Globe,
    Menu,
    Monitor,
    TrendingUp,
    User,
    Video,
    X,
  },
});

Alpine.start();
