import React, { useState, useMemo } from 'react';
import { PolarArea } from 'react-chartjs-2';
import { Box, Heading, VStack, Select } from '@chakra-ui/react';
import { Chart as ChartJS, Tooltip as ChartTooltip, Legend, Title } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ChartTooltip, Legend, Title, ChartDataLabels);

const TopicsPolarAreaChart = ({ data }) => {
  const [filterType, setFilterType] = useState('relevance');
  const [filterValue, setFilterValue] = useState('');

  const filterOptions = ['intensity', 'likelihood', 'relevance'];

  const uniqueValues = useMemo(() => {
    return {
      intensity: Array.from(new Set(data.map(item => item.intensity))),
      likelihood: Array.from(new Set(data.map(item => item.likelihood))),
      relevance: Array.from(new Set(data.map(item => item.relevance))),
    };
  }, [data]);

  const getFilteredData = () => {
    if (!filterOptions.includes(filterType)) return data;
    
    return filterValue
      ? data.filter(item => item[filterType] === parseFloat(filterValue))
      : data;
  };

  const filteredData = getFilteredData();

  const topics = Array.from(new Set(filteredData.map(item => item.topic))) || [];

  const chartData = {
    labels: topics,
    datasets: [
      {
        data: topics.map(topic => 
          filteredData
            .filter(item => item.topic === topic)
            .reduce((sum, item) => sum + item[filterType], 0)
        ),
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 205, 86, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 205, 86, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scale: {
      ticks: {
        beginAtZero: true,
        stepSize: 1,
        max: Math.max(...Object.values(chartData.datasets[0].data), 5) + 1,
      },
    },
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    if (name === 'filterType') {
      setFilterType(value);
      setFilterValue(''); 
    } else if (name === 'filterValue') {
      setFilterValue(value);
    }
  };

  return (
    <Box padding={4} margin="auto" height="800px" maxWidth="1000px" borderRadius="md" boxShadow="md" backgroundColor="white">
      <Heading as="h2" mb={4} textAlign="center">
        Topics Chart
      </Heading>
      <VStack spacing={4} align="stretch">
        <Select name="filterType" placeholder="Select filter type" onChange={handleFilterChange}>
          {filterOptions.map(option => (
            <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
          ))}
        </Select>
        <Select name="filterValue" placeholder="Select filter value" onChange={handleFilterChange}>
          <option value="">All</option>
          {uniqueValues[filterType]?.map(value => (
            <option key={value} value={value}>{value}</option>
          ))}
        </Select>
        <PolarArea data={chartData} options={chartOptions} />
      </VStack>
    </Box>
  );
};

export default TopicsPolarAreaChart;
