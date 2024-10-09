import React from 'react';
import {
  Box,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text
} from '@chakra-ui/react';

const YearFilter = ({ end_Year, setEnd_Year }) => {
  const handleYearChange = (value) => {
    setEnd_Year(value);
  };

  return (
    <Box my={4}>
      <Text mb={2}>Filter by End Year: {end_Year}</Text>
      <Slider
        value={end_Year}
        min={2000}
        max={2024}
        step={1}
        onChange={(val) => handleYearChange(val)}
        aria-label="year-slider"
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Box>
  );
};

export default YearFilter;
