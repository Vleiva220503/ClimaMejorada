import React, { useState } from "react";
import Form from "./Form";
import Card from "./Card";
import { Box } from "@chakra-ui/react";
import useWeatherData from "../hooks/useWeatherData"; 
const WeatherPanel = () => {
  const [location, setLocation] = useState("");
  const {
    weather,
    forecast,
    isLoadingWeather,
    isLoadingForecast,
    isErrorWeather,
    isErrorForecast,
    hasData,
  } = useWeatherData(location);

  const getLocation = (loc) => {
    setLocation(loc);
  };

  return (
    <Box p={4} maxW="400px" mx="auto">
      <Form newLocation={getLocation} />
      <Card
        showData={hasData}
        loadingData={isLoadingWeather || isLoadingForecast}
        weather={weather}
        forecast={forecast}
        isErrorWeather={isErrorWeather}
        isErrorForecast={isErrorForecast}
      />
    </Box>
  );
};

export default WeatherPanel;
