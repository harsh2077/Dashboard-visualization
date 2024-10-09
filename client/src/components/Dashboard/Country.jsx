import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Box,
  Flex,
  Heading,
  Select,
  useColorMode,
  useColorModeValue
} from "@chakra-ui/react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CountryChart = ({ data }) => {
  const { colorMode } = useColorMode();
  const [selectedMetric, setSelectedMetric] = useState("intensity");
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const allCountries = Array.from(new Set(data.map(entry => entry.country)));

    const countryData = {};
    data.forEach(entry => {
      if (!countryData[entry.country]) {
        countryData[entry.country] = 0;
      }
      countryData[entry.country] += entry[selectedMetric];
    });

    const countryLabels = allCountries;
    const metricValues = countryLabels.map(country => countryData[country] || 0);

    const chartBackgroundColor =
      colorMode === "light"
        ? "rgba(79, 59, 169, 0.7)"
        : "rgba(144, 104, 190, 0.7)";
    const chartBorderColor =
      colorMode === "light"
        ? "rgba(79, 59, 169, 1)"
        : "rgba(144, 104, 190, 1)";

    setChartData({
      labels: countryLabels,
      datasets: [
        {
          label: selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1),
          data: metricValues,
          backgroundColor: chartBackgroundColor,
          borderColor: chartBorderColor,
          borderWidth: 1,
        },
      ],
    });
  }, [data, colorMode, selectedMetric]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
      y: {
        stacked: true,
        grid: {
          color: colorMode === "light" ? "gray.200" : "gray.900",
        },
        ticks: {
          font: {
            size: 12,
          },
          callback: function (value) {
            return value.toLocaleString(); 
          },
        },
      },
    },
  };

  return (
    <Box p={6} shadow="md" bg={useColorModeValue("white", "gray.800")} m={50}>
      <Flex direction="column" margin="auto">
        <Heading as={"h2"} textAlign="left" mb={4} fontSize="2xl">
          Country Metrics Chart
        </Heading>
        <Select
          value={selectedMetric}
          onChange={(e) => setSelectedMetric(e.target.value)}
          mb={4}
          w="250px"
          colorScheme="purple"
          fontSize="md"
        >
          <option value="intensity">Intensity</option>
          <option value="likelihood">Likelihood</option>
          <option value="relevance">Relevance</option>
          <option value="sector">Sector</option>
          <option value="topic">Topic</option>
        </Select>
        <Box height="500px" width={"100%"} mt={4}>
          {chartData && <Bar data={chartData} options={chartOptions} />}
        </Box>
      </Flex>
    </Box>
  );
};

export default CountryChart;
