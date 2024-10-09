import React, { useState } from "react";
import {
  Box,
  Container,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  IconButton,
  useDisclosure,
  List,
  ListItem,
  ListIcon,
  useColorModeValue,
  Flex,
  Heading,
  Avatar,
  Text,
} from "@chakra-ui/react";
import { ChevronRightIcon, SettingsIcon } from "@chakra-ui/icons";
import {
  MdDashboard,
  MdAssignment,
  MdSettings,
  MdExitToApp,
  MdPeople,
  MdCalendarToday,
  MdInsertDriveFile,
  MdAnalytics,
} from "react-icons/md";
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <Container>
      <IconButton
        icon={<ChevronRightIcon />}
        onClick={onOpen}
        position="fixed"
        top="50%"
        left={0}
        transform="translateY(-50%)"
        zIndex={1}
        colorScheme="black"
        variant="outline"
        transition="background-color 0.3s ease"
        aria-label="Open sidebar"
      />

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent
          bg={useColorModeValue("linear-gradient(135deg, #f0f4f8, #d9e5f0)", "linear-gradient(135deg, #375eb1 , #4a375eb1 4d54)")}
          color={useColorModeValue("gray.800", "white")}
          transition="background-color 0.5s ease"
        >
          <DrawerHeader
            borderBottomWidth="1px"
            fontSize="xl"
            fontWeight="bold"
            color="black.500"
            display="flex"
            alignItems="center"
          >
            <SettingsIcon mr={2} /> Admin Dashboard
          </DrawerHeader>
          <DrawerBody>
            <Text fontSize="lg" mb={2} fontWeight="bold">
              Menu
            </Text>
            <List spacing={3}>
              {[
                { icon: MdDashboard, label: "Dashboard", to: "/dashboard" },
                { icon: MdAssignment, label: "Tasks", to: "/tasks" },
                { icon: MdPeople, label: "Users", to: "/users" },
                { icon: MdCalendarToday, label: "Calendar", to: "/calendar" },
                { icon: MdInsertDriveFile, label: "Files", to: "/files" },
                { icon: MdAnalytics, label: "Analytics", to: "/analytics" },
                { icon: MdSettings, label: "Settings", to: "/settings" },
                { icon: MdExitToApp, label: "Log Out", to: "/", onClick: onClose },
              ].map(({ icon, label, to, onClick }, index) => (
                <ListItem 
                  key={index} 
                  cursor="pointer"
                  _hover={{
                    backgroundColor: "blackAlpha.100",  
                    boxShadow: "0 0 10px rgba(0, 255, 255, 0.7)", 
                    transition: "all 0.3s ease-in-out", 
                  }}
                  transition="background-color 0.3s ease" 
                >
                  <ListIcon as={icon} fontSize="xl" />
                  <Link to={to} onClick={onClick}>
                    <Text fontSize="lg" ml={2}>{label}</Text>
                  </Link>
                </ListItem>
              ))}
            </List>

            <Flex alignItems="center" mt="4" borderTop="1px solid" borderColor={useColorModeValue("gray.200", "gray.600")} pt={4}>
              <Avatar
                size="lg"
                src="https://www.flaticon.com/free-icon/setting_7542245?term=profile&page=1&position=25&origin=search&related_id=7542245"
                mr={4}
              />
              <Box>
                <Heading size="md">Harsh Gupta</Heading>
                <Text
                  fontSize="sm"
                  color={useColorModeValue("gray.600", "gray.400")}
                >
                  Web Developer
                </Text>
              </Box>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Container>
  );
};

export default AdminDashboard;
