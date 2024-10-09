import React, { useState } from 'react';
import { Box, Heading, Input, Switch, Button, Flex, Text } from '@chakra-ui/react';
import AdminDashboard from "./Sidebar";
const Settings = () => {
    const [profileData, setProfileData] = useState({
        username: '',
        email: '',
    });

    const [accountSettings, setAccountSettings] = useState({
        password: '',
        confirmPassword: '',
    });

    const [notifications, setNotifications] = useState({
        emailNotifications: true,
        smsNotifications: false,
    });

    const handleInputChange = (event, setState) => {
        const { name, value } = event.target;
        setState((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSwitchChange = (event, setState) => {
        const { name, checked } = event.target;
        setState((prevState) => ({ ...prevState, [name]: checked }));
    };

    return (
        <Box p={5}>
          <AdminDashboard />
            <Heading mb={5} textAlign="center" color="teal.500">Settings</Heading>

            <Box p={5} mb={5} borderRadius="md" boxShadow="md" style={{ transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)', backgroundColor: '#e6fffa' } }}>
                <Heading size="md" mb={3}>Profile Settings</Heading>
                <Flex mb={3}>
                    <Text flex="1">Username:</Text>
                    <Input
                        flex="2"
                        name="username"
                        value={profileData.username}
                        onChange={(e) => handleInputChange(e, setProfileData)}
                        placeholder="Enter your username"
                        style={{ transition: 'border-color 0.3s', '&:focus': { borderColor: '#38b2ac' } }}
                    />
                </Flex>
                <Flex mb={3}>
                    <Text flex="1">Email:</Text>
                    <Input
                        flex="2"
                        name="email"
                        value={profileData.email}
                        onChange={(e) => handleInputChange(e, setProfileData)}
                        placeholder="Enter your email"
                        style={{ transition: 'border-color 0.3s', '&:focus': { borderColor: '#38b2ac' } }}
                    />
                </Flex>
                <Button colorScheme="teal" style={{ transition: 'background-color 0.3s, transform 0.3s', '&:hover': { backgroundColor: '#2c7a7b', transform: 'scale(1.05)' } }}>Save Changes</Button>
            </Box>

            <Box p={5} mb={5} borderRadius="md" boxShadow="md" style={{ transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)', backgroundColor: '#e6fffa' } }}>
                <Heading size="md" mb={3}>Account Settings</Heading>
                <Flex mb={3}>
                    <Text flex="1">Password:</Text>
                    <Input
                        type="password"
                        flex="2"
                        name="password"
                        value={accountSettings.password}
                        onChange={(e) => handleInputChange(e, setAccountSettings)}
                        placeholder="Enter your password"
                        style={{ transition: 'border-color 0.3s', '&:focus': { borderColor: '#38b2ac' } }}
                    />
                </Flex>
                <Flex mb={3}>
                    <Text flex="1">Confirm Password:</Text>
                    <Input
                        type="password"
                        flex="2"
                        name="confirmPassword"
                        value={accountSettings.confirmPassword}
                        onChange={(e) => handleInputChange(e, setAccountSettings)}
                        placeholder="Confirm your password"
                        style={{ transition: 'border-color 0.3s', '&:focus': { borderColor: '#38b2ac' } }}
                    />
                </Flex>
                <Button colorScheme="teal" style={{ transition: 'background-color 0.3s, transform 0.3s', '&:hover': { backgroundColor: '#2c7a7b', transform: 'scale(1.05)' } }}>Save Changes</Button>
            </Box>

            <Box p={5} mb={5} borderRadius="md" boxShadow="md" style={{ transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)', backgroundColor: '#e6fffa' } }}>
                <Heading size="md" mb={3}>Notification Settings</Heading>
                <Flex mb={3}>
                    <Text flex="1">Email Notifications:</Text>
                    <Switch
                        flex="2"
                        name="emailNotifications"
                        isChecked={notifications.emailNotifications}
                        onChange={(e) => handleSwitchChange(e, setNotifications)}
                        style={{ transition: 'background-color 0.3s', '&:checked': { backgroundColor: '#38b2ac' } }}
                    />
                </Flex>
                <Flex mb={3}>
                    <Text flex="1">SMS Notifications:</Text>
                    <Switch
                        flex="2"
                        name="smsNotifications"
                        isChecked={notifications.smsNotifications}
                        onChange={(e) => handleSwitchChange(e, setNotifications)}
                        style={{ transition: 'background-color 0.3s', '&:checked': { backgroundColor: '#38b2ac' } }}
                    />
                </Flex>
                <Button colorScheme="teal" style={{ transition: 'background-color 0.3s, transform 0.3s', '&:hover': { backgroundColor: '#2c7a7b', transform: 'scale(1.05)' } }}>Save Changes</Button>
            </Box>
        </Box>
    );
};

export default Settings;
