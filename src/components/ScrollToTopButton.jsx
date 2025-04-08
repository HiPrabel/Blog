import React, { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-2 right-2 md:bottom-4 md:right-4 lg:bottom-8 lg:right-8 z-50 p-3 bg-blue-500 dark:bg-blue-500/80 hover:bg-blue-700 text-white rounded-full shadow-lg transition duration-30 "
        aria-label="Scroll to top"
      >
        <ChevronUp size={16} />
      </button>
    )
  );
};

export default ScrollToTopButton;
