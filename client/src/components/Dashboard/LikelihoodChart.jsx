import React, { useState, useEffect } from "react";
import { Radar } from "react-chartjs-2";
import { Box, useColorModeValue, Heading, Select, VStack, Text } from "@chakra-ui/react";

const LikelihoodRadarChart = ({ data }) => {
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [selectedSector, setSelectedSector] = useState("All");
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState("");

  const backgroundColor = useColorModeValue(
    "rgba(79, 59, 169, 0.7)",
    "rgba(144, 104, 190, 0.7)"
  );
  const borderColor = useColorModeValue(
    "rgba(79, 59, 169, 1)",
    "rgba(144, 104, 190, 1)"
  );
  const pointBackgroundColor = useColorModeValue("white", "black");
  const pointBorderColor = useColorModeValue(
    "rgba(79, 59, 169, 1)",
    "rgba(144, 104, 190, 1)"
  );

  useEffect(() => {
    try {
      const filteredData = data.filter((entry) => {
        return (
          (selectedTopic === "All" || entry.topic === selectedTopic) &&
          (selectedCountry === "All" || entry.country === selectedCountry) &&
          (selectedSector === "All" || entry.sector === selectedSector)
        );
      });

      const countries = {};
      filteredData.forEach((entry) => {
        if (!countries[entry.country]) {
          countries[entry.country] = 0;
        }
        countries[entry.country] += entry.likelihood;
      });

      if (Object.keys(countries).length === 0) {
        throw new Error("No data available for the selected filters.");
      }

      const newChartData = {
        labels: Object.keys(countries),
        datasets: [
          {
            label: "Likelihood",
            data: Object.values(countries),
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            borderWidth: 2,
            pointBackgroundColor: pointBackgroundColor,
            pointBorderColor: pointBorderColor,
          },
        ],
      };

      setChartData(newChartData);
      setError("");
    } catch (err) {
      setChartData(null);
      setError(err.message);
    }
  }, [selectedTopic, selectedCountry, selectedSector, data, backgroundColor, borderColor, pointBackgroundColor, pointBorderColor]);

  const topics = Array.from(new Set(data.map((item) => item.topic)));
  const countries = Array.from(new Set(data.map((item) => item.country)));
  const sectors = Array.from(new Set(data.map((item) => item.sector)));

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scale: {
      ticks: {
        beginAtZero: true,
        min: 0,
        max: 5,
        stepSize: 1,
      },
    },
  };

  return (
    <Box
      p={6}
      // borderRadius={20}
      // boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
      shadow="md"
      pb={100}
      bg={useColorModeValue("white", "gray.800")}
      maxHeight={800}
      // overflow="hidden"
      width="100%"
      maxWidth="1000px"
      height="800px"
      margin="auto"
      padding={4}
      borderRadius="md"
      boxShadow="md"
      overflow="hidden"
      backgroundColor="white"
    >
      <Heading as="h2" mb={4} ml={6}>
        Likelihood Chart
      </Heading>

      <VStack spacing={4} align="stretch" height="500px">
        <Select
          placeholder="Select Topic"
          onChange={(e) => setSelectedTopic(e.target.value)}
          mb={4}
        >
          <option value="All">All</option>
          {topics.map((topic) => (
            <option key={topic} value={topic}>{topic}</option>
          ))}
        </Select>
        <Select
          placeholder="Select Country"
          onChange={(e) => setSelectedCountry(e.target.value)}
          mb={4}
        >
          <option value="All">All</option>
          {countries.map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </Select>
        <Select
          placeholder="Select Sector"
          onChange={(e) => setSelectedSector(e.target.value)}
          mb={4}
        >
          <option value="All">All</option>
          {sectors.map((sector) => (
            <option key={sector} value={sector}>{sector}</option>
          ))}
        </Select>
        {error ? (
          <Text color="red.500">{error}</Text>
        ) : (
          chartData && <Radar data={chartData} options={chartOptions} />
        )}
      </VStack>
    </Box>
  );
};

export default LikelihoodRadarChart;
