import React from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Grid,
  Tooltip,
} from '@chakra-ui/react';

const chartOptions = [
  { id: 'intensity', name: 'I-L-R', description: 'Displays intensity, relevance, and likelihood data across different years.' },
  { id: 'region', name: 'Region', description: 'Shows data distribution by regions.' },
  { id: 'topics', name: 'Topics', description: 'Visualizes data related to different topics in a radar chart.' },
  { id: 'relevance', name: 'Comparison', description: 'Compares intensity, relevance, and likelihood data in a bubble chart format.' },
  { id: 'pie', name: 'Sector', description: 'Displays sector data in a pie chart.' },
  { id: 'likelihood', name: 'Likelihood', description: 'Represents likelihood data in a radar chart.' },
  { id: 'country', name: 'Country', description: 'Shows data distribution by country.' },
  { id: 'all', name: 'All', description: 'Displays all available charts.' }
];

const ChartSelector = ({ onSelectChart }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSelect = (chartType) => {
    onSelectChart(chartType);
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="blue" _hover={{ bg: "blue.600", transform: "scale(1.05)" }} transition="all 0.3s">
        Select Chart
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom">
        <ModalOverlay />
        <ModalContent borderRadius="lg" boxShadow="lg">
          <ModalHeader>Select a Chart</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid templateColumns="repeat(3, 1fr)" gap={4}>
              {chartOptions.map(({ id, name, description }) => (
                <Tooltip key={id} label={description} aria-label={description}>
                  <Button
                    onClick={() => handleSelect(id)}
                    _hover={{ bg: "blue.600", transform: "scale(1.05)" }}
                    transition="all 0.3s"
                  >
                    {name}
                  </Button>
                </Tooltip>
              ))}
            </Grid>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} mr={3} colorScheme="red" _hover={{ bg: "red.600", transform: "scale(1.05)" }} transition="all 0.3s">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ChartSelector;
