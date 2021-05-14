import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function ScrollToTop() {
  const { pathname } = useLocation();

  const scrolling = async () => {
    while (window.scrollY > 0.5) {
      window.scrollTo(window.scrollX, window.scrollY / 1.3);
      await sleep(10);
    }
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    scrolling();
  }, [pathname]);

  return null;
}
