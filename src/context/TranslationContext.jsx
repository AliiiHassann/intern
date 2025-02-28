import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create Context
const TranslationContext = createContext();

// Provider Component
export const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");
  const [translations, setTranslations] = useState({});

  // Fetch Translations from API
  const fetchTranslations = async (lang) => {
    try {
      const response = await axios.get(
        `https://test-ecomerce.xn--hrt-w-ova.de/api/comment/config_cache?lang=${lang}`
      );
      setTranslations(response.data);
    } catch (error) {
      console.error("Error fetching translations:", error);
    }
  };

  // Change Language and Fetch New Translations
  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
    fetchTranslations(lang);
  };

  // Load Saved Language and Fetch Translations on Mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "en";
    setLanguage(savedLanguage);
    fetchTranslations(savedLanguage);
  }, []);

  return (
    <TranslationContext.Provider
      value={{ translations, language, changeLanguage }}
    >
      {children}
    </TranslationContext.Provider>
  );
};

// Custom Hook to use Translation Context
export const useTranslation = () => useContext(TranslationContext);
