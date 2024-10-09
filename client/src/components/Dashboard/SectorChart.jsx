import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Box, Heading, Select, VStack, Text, useColorModeValue } from "@chakra-ui/react";

const PieChart = ({ data }) => {
  const [selectedMetric, setSelectedMetric] = useState("intensity");
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const sectors = {};

      data.forEach((entry) => {
        if (selectedTopic === "All" || entry.topic === selectedTopic) {
          if (!sectors[entry.sector]) {
            sectors[entry.sector] = 0;
          }
          sectors[entry.sector] += entry[selectedMetric];
        }
      });

      if (Object.keys(sectors).length === 0) {
        throw new Error("No data available for the selected filters.");
      }

      const getRandomColor = (index) => {
        const colors = [
          "#FF0080",
          "#00BFFF",
          "#FFD700",
          "#32CD32",
          "#FF4500",
          "#9400D3",
        ];
        return colors[index % colors.length];
      };

      const newChartData = {
        labels: Object.keys(sectors),
        datasets: [
          {
            data: Object.values(sectors),
            backgroundColor: Object.keys(sectors).map((_, index) =>
              getRandomColor(index)
            ),
          },
        ],
      };

      setChartData(newChartData);
      setError("");
    } catch (err) {
      setChartData(null);
      setError(err.message);
    }
  }, [selectedMetric, selectedTopic, data]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        position: "average",
      },
    },
  };

  return (
    <Box
      p={4}
      borderRadius={20}
      boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
      mt={50}
      ml={50}
      shadow="md"
      pb={100}
      bg={useColorModeValue("white", "gray.800")}
      // maxHeight={700}
      // overflow="hidden"
      width="100%"
      maxWidth="1000px"
      height="800px"
      margin="auto"
      // padding={4}
      // borderRadius="md"
      // boxShadow="md"
      overflow="hidden"
      backgroundColor="white"
    >
      <Heading as="h2" mb={4}>
        Sector Chart
      </Heading>
      <VStack spacing={4} align="stretch" height="500px">
        <Select
          placeholder="Select Metric"
          onChange={(e) => setSelectedMetric(e.target.value)}
          mb={4}
        >
          <option value="intensity">Intensity</option>
          <option value="likelihood">Likelihood</option>
          <option value="relevance">Relevance</option>
        </Select>
        <Select
          placeholder="Select Topic"
          onChange={(e) => setSelectedTopic(e.target.value)}
          mb={4}
        >
          <option value="All">All</option>
          {Array.from(new Set(data.map((item) => item.topic))).map((topic) => (
            <option key={topic} value={topic}>{topic}</option>
          ))}
        </Select>
        {error ? (
          <Text color="red.500">{error}</Text>
        ) : (
          chartData && <Pie data={chartData} options={chartOptions} />
        )}
      </VStack>
    </Box>
  );
};

export default PieChart;
