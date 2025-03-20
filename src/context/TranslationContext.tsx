import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";

// Define Translation Context Type
interface TranslationContextType {
  translations: Record<string, string>;
  language: string;
  changeLanguage: (lang: string) => void;
}

// Create Context with Default Value
const TranslationContext = createContext<TranslationContextType | undefined>(
  undefined
);

// Define Props for Provider
interface TranslationProviderProps {
  children: ReactNode;
}

// Provider Component
export const TranslationProvider: React.FC<TranslationProviderProps> = ({
  children,
}) => {
  const [language, setLanguage] = useState<string>("en");
  const [translations, setTranslations] = useState<Record<string, string>>({});

  // Fetch Translations from API
  const fetchTranslations = async (lang: string) => {
    try {
      const response = await axios.get<Record<string, string>>(
        `https://test-ecomerce.xn--hrt-w-ova.de/api/comment/config_cache?lang=${lang}`
      );
      setTranslations(response.data);
    } catch (error) {
      console.error("Error fetching translations:", error);
    }
  };

  // Change Language and Fetch New Translations
  const changeLanguage = (lang: string) => {
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
export const useTranslation = (): TranslationContextType => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
};
