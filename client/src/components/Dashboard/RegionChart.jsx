import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Box, Heading, VStack, Select } from '@chakra-ui/react';
import { Chart as ChartJS, Tooltip as ChartTooltip, Legend, Title } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ChartTooltip, Legend, Title, ChartDataLabels);

const RegionChart = ({ data }) => {
  // const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedTopic, setSelectedTopic] = useState('All');

  const regionCounts = {};
  data.forEach(item => {
    if (item.region in regionCounts) {
      regionCounts[item.region]++;
    } else {
      regionCounts[item.region] = 1;
    }
  });

  const filteredData = data.filter(item =>
    // (selectedRegion === 'All' || item.region === selectedRegion) &&
    (selectedTopic === 'All' || item.topic === selectedTopic)
  );

  const filteredRegionCounts = {};
  filteredData.forEach(item => {
    if (item.region in filteredRegionCounts) {
      filteredRegionCounts[item.region]++;
    } else {
      filteredRegionCounts[item.region] = 1;
    }
  });

  const chartData = {
    labels: Object.keys(filteredRegionCounts),
    datasets: [
      {
        data: Object.values(filteredRegionCounts),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4CAF50',
          '#FF9800',
          '#9C27B0',
          '#3F51B5',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4CAF50',
          '#FF9800',
          '#9C27B0',
          '#3F51B5',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: ${value}`;
          },
        },
      },
      datalabels: {
        color: '#000',
        display: true,
        anchor: 'end',
        align: 'top',
        formatter: (value) => `${value}`,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <Box
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
      <Heading as="h2" mb={4} textAlign="center">
        Region Distribution
      </Heading>
      <VStack spacing={4} align="stretch" height="600px">
        {/* <Select 
          placeholder="Select region" 
          onChange={(e) => setSelectedRegion(e.target.value)}
          mb={4}
        >
          <option value="All">All</option>
          {Object.keys(regionCounts).map(region => (
            <option key={region} value={region}>{region}</option>
          ))}
        </Select> */}
        <Select 
          placeholder="Select topic" 
          onChange={(e) => setSelectedTopic(e.target.value)}
          mb={4}
        >
          <option value="All">All</option>
          {Array.from(new Set(data.map(item => item.topic))).map(topic => (
            <option key={topic} value={topic}>{topic}</option>
          ))}
        </Select>
        <Doughnut data={chartData} options={chartOptions} />
      </VStack>
    </Box>
  );
};

export default RegionChart;
