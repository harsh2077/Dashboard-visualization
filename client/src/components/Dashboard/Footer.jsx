import React from "react";
import { Box, Text, Link, Flex, Icon, useColorModeValue } from "@chakra-ui/react";
import { RiFacebookBoxFill, RiTwitterFill, RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  const footerBgColor = useColorModeValue("yellow.100", "yellow.100");
  const textColor = useColorModeValue("yellow.100", "yellow.100");
  const iconColor = useColorModeValue("gray.600", "gray.400");
  const hoverColor = useColorModeValue("blue.500", "blue.300");

  return (
    <Box
      py={6}
      mt={8}
      bgGradient="linear(to-b, #ADD8E6, #375eb1 )"
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="center"
        maxW="container.lg"
        mx="auto"
        px={4}
      >
        <Text fontSize="sm" color={textColor} mb={{ base: 4, md: 0 }}>
          &copy; 2024 Harsh Gupta. All rights reserved.
        </Text>
        <Flex alignItems="center">
          <Link
            mx={2}
            fontSize="sm"
            color={textColor}
            _hover={{ color: hoverColor }}
            transition="color 0.2s"
          >
            Privacy Policy
          </Link>
          <Link
            mx={2}
            fontSize="sm"
            color={textColor}
            _hover={{ color: hoverColor }}
            transition="color 0.2s"
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            mx={2}
            _hover={{ color: hoverColor }}
            transition="color 0.2s"
          >
            <Icon as={RiFacebookBoxFill} boxSize={6} color={iconColor} />
          </Link>
          <Link
            href="#"
            mx={2}
            _hover={{ color: hoverColor }}
            transition="color 0.2s"
          >
            <Icon as={RiTwitterFill} boxSize={6} color={iconColor} />
          </Link>
          <Link
            href="#"
            mx={2}
            _hover={{ color: hoverColor }}
            transition="color 0.2s"
          >
            <Icon as={RiInstagramFill} boxSize={6} color={iconColor} />
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
