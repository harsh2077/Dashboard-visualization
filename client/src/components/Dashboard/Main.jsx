import React, { useState, useEffect } from "react";
import axios from "axios";
import ILRChart from "./ILRChart";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import Navbar from "./Navbar";
import RegionChart from "./RegionChart";
import AdminDashboard from "./Sidebar";
import { ChakraProvider, Flex, Box, Grid, Button } from "@chakra-ui/react";
import BubbleChart from "./BubbleChart";
import TopicsRadarChart from "./TopicChart";
import PieChart from "./SectorChart";
import CountryChart from "./Country";
import LikelihoodRadarChart from "./LikelihoodChart";
import Footer from "./Footer";
import YearFilter from "./YearFilter";
import ChartSelector from "./ChartSelector";
import CountryFilter from "./CountryFilter";
import PestFilter from "./PestFilter";
import SourceFilter from "./SourceFilter";

Chart.register(CategoryScale);

const Main = () => {
  const [data, setData] = useState([]);
  const [end_Year, setEnd_Year] = useState(2024);
  const [selectedChart, setSelectedChart] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedPest, setSelectedPest] = useState('');
  const [selectedSource, setSelectedSource] = useState('');

  
  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const queryParams = {};

         
        if (end_Year !== '') {
          queryParams.end_Year = parseInt(end_Year);
        }
        if (selectedCountry !== '') {
          queryParams.country = selectedCountry;
        }
        if (selectedPest !== '') {
          queryParams.pestle = selectedPest;
        }
        if (selectedSource !== '') {
          queryParams.source = selectedSource;
        }
       
        const queryString = new URLSearchParams(queryParams).toString();
        const apiEndpoint = `http://localhost:5000/api/data?${queryString}`;

    
        console.log("API Endpoint:", apiEndpoint);

        const response = await axios.get(apiEndpoint);
        console.log("Fetched data:", response.data);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataFromApi();
  }, [end_Year, selectedCountry, selectedPest, selectedSource]);

  const handleExport = () => {
    alert('Export data functionality here!');
  };

  const handleReset = () => {
    setSelectedCountry('');
    setSelectedPest('');
    setSelectedSource('');
  };

  const renderChart = () => {
    switch (selectedChart) {
      case 'intensity':
        return <ILRChart data={data} />;
      case 'region':
        return <RegionChart data={data} />;
      case 'topics':
        return <TopicsRadarChart data={data} />;
      case 'relevance':
        return <BubbleChart data={data} />;
      case 'pie':
        return <PieChart data={data} />;
      case 'likelihood':
        return <LikelihoodRadarChart data={data} />;
      case 'country':
        return <CountryChart data={data} />;
      default:
        return (
          <ChakraProvider>
            <ILRChart data={data} />
            <Flex direction={{ base: "column", md: "row" }} m={50}>
              <Box
                flex={{ base: "1", md: "0.5" }}
                maxW="50%"
                p={5}
                m={2}
                boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
                borderRadius={20}
              >
                <RegionChart data={data} />
              </Box>
              <Box
                flex={{ base: "1", md: "0.5" }}
                maxW="50%"
                p={5}
                m={2}
                boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
                borderRadius={20}
              >
                <TopicsRadarChart data={data} />
              </Box>
            </Flex>
            <BubbleChart data={data} />
            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
              <Box>
                <PieChart data={data} />
              </Box>
              <Box>
                <LikelihoodRadarChart data={data} /> 
              </Box>
            </Grid>
            <CountryChart data={data} />
          </ChakraProvider>
        );
    }
  };

  return (
    <ChakraProvider>
      <Navbar />
      <AdminDashboard />
      <Box p={4}>
        <YearFilter end_Year={end_Year} setEnd_Year={setEnd_Year} />
        <Flex mb={4} align="center">
          <Box
            p={2}
            borderWidth="1px"
            borderRadius="lg"
            m={2}
            textAlign="center"
          >
            <CountryFilter onCountrySelect={setSelectedCountry} />
          </Box>
          <Box
            p={2}
            borderWidth="1px"
            borderRadius="lg"
            m={2}
            textAlign="center"
          >
            <PestFilter onPestSelect={setSelectedPest} />
          </Box>
          <Box
            p={2}
            borderWidth="1px"
            borderRadius="lg"
            m={2}
            textAlign="center"
          >
            <SourceFilter onSourceSelect={setSelectedSource} />
          </Box>
          <Button
            ml="auto"
            colorScheme="blue"
            onClick={handleReset}
            _hover={{ bg: "blue.600", transform: "scale(1.05)" }}
            transition="all 0.3s"
          >
            Reset Filter
          </Button>
        </Flex>
        <Flex mb={4} align="center">
          <ChartSelector onSelectChart={setSelectedChart} />
          <Button
            ml={4}
            colorScheme="teal"
            onClick={handleExport}
            _hover={{ bg: "teal.600", transform: "scale(1.05)" }}
            transition="all 0.3s"
          >
            Export Data
          </Button>
        </Flex>
      </Box>
      {renderChart()}
      <Footer />
    </ChakraProvider>
  );
};

export default Main;
