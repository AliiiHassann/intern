import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import "../styles/ScrollToTop.css";

export const ScrollToTop: React.FC = () => {
  const [showButton, setShowButton] = useState<boolean>(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleShowingButton = () => {
      setShowButton(window.scrollY >= 500);
    };

    window.addEventListener("scroll", handleShowingButton);
    return () => {
      window.removeEventListener("scroll", handleShowingButton);
    };
  }, []);

  return (
    <span
      className={showButton ? "scroll-to-top show" : "scroll-to-top"}
      onClick={scrollToTop}
    >
      <FaArrowUp />
    </span>
  );
};

export default ScrollToTop;
