import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Flex,
  Container,
  Input,
  IconButton,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Badge,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  useDisclosure,
  Link,
} from "@chakra-ui/react";
import { BellIcon, SearchIcon, SunIcon } from "@chakra-ui/icons";
import ChartSelector from "./ChartSelector";

const Navbar = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });

    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  };

  useEffect(() => {
    const handleKeydown = (event) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        onOpen();
      }
    };

    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [onOpen]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const onSelectChart = (chartType) => {
    console.log("Selected chart type:", chartType);
  
  };

  return (
    <Box
      py={2}
      bgGradient="linear(to-b, #375eb1 , #ADD8E6)"
      position="sticky"
      top={0}
      zIndex={100}
      boxShadow="md"
    >
      <Container maxW="container.lg">
        <Flex justify="space-between" align="center">
          <Flex align="center">
            <Link href="/dashboard" _hover={{ textDecoration: "none" }}>
              <IconButton
                as={SunIcon}
                boxSize={6}
                color="white"
                bg="transparent"
                border="none"
                aria-label="Home"
                _hover={{ bg: "rgba(255, 255, 255, 0.2)", transform: "scale(1.1)" }}
                transition="all 0.3s"
              />
            </Link>
            <Box w="70%" ml={4}>
              <Input
                type="text"
                placeholder="Search..."
                size="md"
                borderRadius="full"
                bg="white"
                px={4}
                py={1}
                color="gray.800"
                _placeholder={{ color: "gray.500" }}
                _focus={{ outline: "none", boxShadow: "0 0 0 2px rgba(72, 187, 120, 0.6)" }}
                ref={searchInputRef}
                value={searchQuery}
                onChange={handleSearchChange}
                style={{ transition: "all 0.3s", width: "100%" }}
              />
            </Box>
          </Flex>
          <Box>
            <Flex align="center">
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<BellIcon boxSize={6} />}
                  bg="transparent"
                  border="none"
                  position="relative"
                  _hover={{ transform: "scale(1.1)", transition: "all 0.2s" }}
                >
                  <Badge colorScheme="red" borderRadius="full" position="absolute" top="-1" right="-1" px={2}>3</Badge>
                </MenuButton>
                <MenuList>
                  <MenuItem>New user registered</MenuItem>
                  <MenuItem>System alert: Low disk space</MenuItem>
                  <MenuItem>Profile updated successfully</MenuItem>
                </MenuList>
              </Menu>
              <Menu>
                <MenuButton
                  as={Avatar}
                  size="sm"
                  src="https://www.flaticon.com/free-icon/setting_7542245?term=profile&page=1&position=25&origin=search&related_id=7542245"
                  ml={3}
                  _hover={{ transform: "scale(1.1)", transition: "all 0.2s" }}
                />
                <MenuList>
                  <MenuItem>Profile</MenuItem>
                  <MenuItem>Saved</MenuItem>
                  <MenuItem>Settings</MenuItem>
                  <MenuItem>Trash</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Box>
        </Flex>
      </Container>

      <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom" size="lg">
        <ModalOverlay />
        <ModalContent borderRadius="lg" boxShadow="xl" bg="white">
          <ModalHeader textAlign="center">Search and Select Chart</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Type your search here..."
              value={searchQuery}
              onChange={handleSearchChange}
              mb={4}
              bg="gray.100"
              borderRadius="md"
              _focus={{ boxShadow: "outline" }}
            />
          </ModalBody>
          <ModalFooter>
            <Flex justify="space-between" width="100%">
              <Box>
                <ChartSelector onSelectChart={onSelectChart} />
              </Box>
              <Button colorScheme="blue" onClick={onClose}>
                Close
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Navbar;
