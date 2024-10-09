import React, { useState } from 'react';
import { Bubble } from 'react-chartjs-2';
import { Box, Heading, Select, VStack } from '@chakra-ui/react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const BubbleChart = ({ data }) => {
  const [xAxis, setXAxis] = useState('relevance');
  const [yAxis, setYAxis] = useState('intensity');

  const chartData = {
    datasets: [
      {
        label: `${yAxis.charAt(0).toUpperCase() + yAxis.slice(1)} vs ${xAxis.charAt(0).toUpperCase() + xAxis.slice(1)}`,
        data: data.map(item => ({
          x: item[xAxis],
          y: item[yAxis],
          r: item.likelihood * 5, 
        })),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        title: {
          display: true,
          text: xAxis.charAt(0).toUpperCase() + xAxis.slice(1),
        },
        min: 0,
        max: 10, 
      },
      y: {
        title: {
          display: true,
          text: yAxis.charAt(0).toUpperCase() + yAxis.slice(1),
        },
        min: 0,
        max: 10,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const dataPoint = context.raw;
            return `${xAxis.charAt(0).toUpperCase() + xAxis.slice(1)}: ${dataPoint.x}, ${yAxis.charAt(0).toUpperCase() + yAxis.slice(1)}: ${dataPoint.y}, Likelihood: ${dataPoint.r / 5}`;
          },
        },
      },
    },
  };

  return (
    <Box margin={50} p={4} mt={8} borderRadius={18} boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)">
      <Heading as="h2" mb={4}>
      {`${xAxis.charAt(0).toUpperCase() + xAxis.slice(1)} vs ${yAxis.charAt(0).toUpperCase() + yAxis.slice(1)} Chart`}
      </Heading>
      
      <VStack spacing={4}>
        <Select placeholder="Select X-axis" onChange={(e) => setXAxis(e.target.value)}>
          <option value="relevance">Relevance</option>
          <option value="intensity">Intensity</option>
          <option value="likelihood">Likelihood</option>
        </Select>
        <Select placeholder="Select Y-axis" onChange={(e) => setYAxis(e.target.value)}>
          <option value="relevance">Relevance</option>
          <option value="intensity">Intensity</option>
          <option value="likelihood">Likelihood</option>
        </Select>
        <Bubble data={chartData} options={chartOptions} />
      </VStack>
    </Box>
  );
};

export default BubbleChart;
