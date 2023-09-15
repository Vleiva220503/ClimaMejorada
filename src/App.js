import { FaLanguage } from 'react-icons/fa';
import { useTranslation } from "react-i18next";
import { Box, Button } from "@chakra-ui/react";
import WeatherPanel from "./components/WeatherPanel";
import { useState, useEffect, useCallback } from "react"; // Añade useCallback
import { QueryClient, QueryClientProvider } from 'react-query';

const App = () => {
  const { t, i18n } = useTranslation("global");
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "en"
  );

  const changeLanguage = useCallback((lang) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
  }, [i18n]); // Añade i18n como dependencia de useCallback

  useEffect(() => {
    changeLanguage(language);
  }, [language, changeLanguage]);

  const queryClient = new QueryClient(); 
  return (
    <QueryClientProvider client={queryClient}>
      <Box textAlign="center">
        <Button
          variant="solid"
          colorScheme="blue"
          leftIcon={<FaLanguage />}
          onClick={() => changeLanguage("es")}
        >
          Español
        </Button>
        <Button
          variant="solid"
          colorScheme="blue"
          leftIcon={<FaLanguage />}
          onClick={() => changeLanguage("en")}
        >
          English
        </Button>
        <h1>{t("Weather")}</h1>
        <WeatherPanel />
      </Box>
    </QueryClientProvider>
  );
}

export default App;
