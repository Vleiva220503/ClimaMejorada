import React from "react";
import Spinner from "./Spinner";
import { useTranslation } from "react-i18next";
import { Box, Flex, Text, Image, Stack, Heading, Icon, Divider } from '@chakra-ui/react';
import { FaTemperatureHigh, FaTemperatureLow, FaWind } from 'react-icons/fa';
import useCard from "../hooks/useCard";

const Card = ({ loadingData, showData, weather, forecast }) => {
  const { t } = useTranslation("global");
  const { formatDate, iconUrl, forecastItems } = useCard(weather, forecast);

  if (loadingData) {
    return <Spinner />;
  }

  if (!showData || !weather) {
    return <h1>{t("not")}</h1>;
  }

  return (
    <Box
      mt={5}
      width="90%"   
      maxWidth="450px"
      mx="auto"
      p={4}
      boxShadow="2xl"
      borderRadius="xl"
      backgroundColor="white" 
      color="black"   
    >
      {showData === true ? (
        <Stack spacing={4}>
          <Flex direction="column" justifyContent="center" alignItems="center">
            <Heading as="h1" size="xl">{weather.name}</Heading>
            <Text fontSize="md">{formatDate(new Date())}</Text>
          </Flex>

          <Flex
            direction={["column", "row"]}
            justifyContent="center"
            alignItems="center"
            spacing={4}
          >
            <Text fontSize="6xl" color="blue.500">{(weather.main.temp - 273.15).toFixed(1)}ºC</Text>
            <Flex alignItems="center">
              <Image src={iconUrl} alt="weather icon" boxSize={12} mr={2} />
              <Text fontSize="lg">{weather.weather[0].description}</Text>
            </Flex>
          </Flex>

          <Divider borderColor="gray.400" />

          <Flex
            direction={["column", "row"]}
            justifyContent="space-around"
            alignItems="center"
          >
            <Box textAlign="center">
              <Flex alignItems="center" justifyContent="center" mb={2}>
                <Icon as={FaTemperatureHigh} boxSize={6} mr={2} color="red.400" />
                <Text fontWeight="semibold">{t("Maximum")}</Text>
              </Flex>
              <Text fontSize="lg">{(weather.main.temp_max - 273.15).toFixed(1)}ºC</Text>
            </Box>

            <Box textAlign="center">
              <Flex alignItems="center" justifyContent="center" mb={2}>
                <Icon as={FaTemperatureLow} boxSize={6} mr={2} color="blue.400" />
                <Text fontWeight="semibold">{t("Minimum")}</Text>
              </Flex>
              <Text fontSize="lg">{(weather.main.temp_min - 273.15).toFixed(1)}ºC</Text>
            </Box>

            <Box textAlign="center">
              <Flex alignItems="center" justifyContent="center" mb={2}>
                <Icon as={FaWind} boxSize={6} mr={2} color="green.400" />
                <Text fontWeight="semibold">{t("Wind")}</Text>
              </Flex>
              <Text fontSize="lg">{(weather.main.feels_like - 273.15).toFixed(1)}ºC</Text>
            </Box>
          </Flex>

          <Divider borderColor="gray.400" />

          <Flex wrap="wrap" justifyContent="space-between">
            {forecastItems.map((item, index) => (
              <Box key={index} width={["100%", "30%"]} mt={3} textAlign="center">
                <Text fontSize="md" fontWeight="medium">{item.date}</Text>
                <Flex alignItems="center" justifyContent="center" my={2}>
                  <Image src={item.iconUrl} alt="forecast icon" boxSize={10} mr={2} />
                  <Text fontSize="md" fontWeight="medium">{item.description}</Text>
                </Flex>
                <Text fontWeight="bold" fontSize="lg" color="blue.500">{item.temp}ºC</Text>
              </Box>
            ))}
          </Flex>
        </Stack>
      ) : (
        <Text fontSize="2xl" textAlign="center" mt={5}>Sin datos</Text>
      )}
    </Box>
  );
};

export default Card;
