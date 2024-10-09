import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Heading, Select, Box } from '@chakra-ui/react';

const ILRChart = ({ data }) => {
  const [selectedMetric, setSelectedMetric] = useState('All');

  const years = Array.from(new Set(data.map(item => item.start_year)));

  const metrics = {
    Intensity: data.map(item => item.intensity),
    Likelihood: data.map(item => item.likelihood),
    Relevance: data.map(item => item.relevance),
  };

  const getColor = (metric, value) => {
    const colors = {
      Intensity: ['#7F00FF', '#F2B93B', '#FF8000', '#FF453A'],
      Likelihood: ['#36A2EB', '#FF6384', '#FFCE56', '#4CAF50'],
      Relevance: ['#FF9800', '#9C27B0', '#3F51B5', '#009688'],
    };

    const threshold = Math.max(...metrics[metric]) / 4;
    if (value < threshold) {
      return colors[metric][0];
    } else if (value < threshold * 2) {
      return colors[metric][1];
    } else if (value < threshold * 3) {
      return colors[metric][2];
    } else {
      return colors[metric][3];
    }
  };

  const chartData = {
    labels: years,
    datasets: selectedMetric === 'All' ? [
      {
        label: 'Intensity',
        backgroundColor: metrics.Intensity.map((value) => getColor('Intensity', value)),
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 1,
        data: metrics.Intensity,
      },
      {
        label: 'Likelihood',
        backgroundColor: metrics.Likelihood.map((value) => getColor('Likelihood', value)),
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 1,
        data: metrics.Likelihood,
      },
      {
        label: 'Relevance',
        backgroundColor: metrics.Relevance.map((value) => getColor('Relevance', value)),
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 1,
        data: metrics.Relevance,
      },
    ] : [
      {
        label: selectedMetric,
        backgroundColor: metrics[selectedMetric].map((value) => getColor(selectedMetric, value)),
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 1,
        data: metrics[selectedMetric],
      },
    ],
  };

  const chartOptions = {
    layout: {
      padding: {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20,
      },
    },
    plugins: {
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'white',
        borderWidth: 1,
        cornerRadius: 5,
        displayColors: false,
        callbacks: {
          label: function(context) {
            const index = context.dataIndex;
            const likelihood = data[index].likelihood;
            const relevance = data[index].relevance;
            return [
              `Intensity: ${context.raw}%`,
              `Likelihood: ${likelihood}%`,
              `Relevance: ${relevance}%`,
            ];
          },
        },
      },
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: {
            family: 'Roboto',
            size: 14,
            weight: 'bold',
          },
        },
      },
      datalabels: {
        anchor: 'end',
        align: 'start',
        offset: -20,
        font: {
          size: 14,
          weight: 'bold',
        },
        formatter: (value) => value + '%',
        shadowBlur: 10,
        shadowColor: 'white',
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: 'Roboto',
            size: 14,
            weight: 'bold',
          },
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: 'Roboto',
            size: 14,
            weight: 'bold',
          },
          callback: (value) => value + '%',
        },
      },
    },
    animation: {
      duration: 4000,
      easing: 'easeInOutQuart',
      mode: 'progressive',
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <Box
      width="100%"
      maxWidth="1000px"
      height="600px"
      margin="auto"
      padding={4}
      borderRadius="md"
      boxShadow="md"
      overflow="hidden"
      backgroundColor="white"
    >
      <Heading as="h2" mb={4} textAlign="center">
      {selectedMetric === 'All' ? 'I-L-R Chart' : `${selectedMetric} Chart`}
      </Heading>
      <Select
        placeholder="Select metric"
        onChange={(e) => setSelectedMetric(e.target.value)}
        mb={4}
      >
        <option value="All">All</option>
        <option value="Intensity">Intensity</option>
        <option value="Likelihood">Likelihood</option>
        <option value="Relevance">Relevance</option>
      </Select>
      <div style={{ position: 'relative', height: '60vh' }}>
        <Bar data={chartData} options={chartOptions} plugins={[ChartDataLabels]} />
      </div>
    </Box>
  );
};

export default ILRChart;
