import React, { useState } from 'react';
import {
  Box,
  Container,
  FormControl,
  FormLabel,
  Input,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react'; 

const backgroundAnimation = keyframes`
  0% { background-color: #FF0000; }
  50% { background-color: #4F3BA9; }
  100% { background-color: #0000FF; }
`;

const LoginPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();
    setIsOpen(true);
    setTimeout(() => {
      setIsOpen(false);
      window.location.href = '/dashboard';
    }, 2000);
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      animation={`${backgroundAnimation} 10s infinite`}
      bgGradient="linear(to-br, #FF0000, #0000FF)"
    >
      <Container
        p={8}
        borderWidth={1}
        borderRadius="xl"
        boxShadow="2xl"
        borderColor="gray.200"
        bg="white"
        maxW="md"
        textAlign="center"
      >
        <Box mb={6}>
          <h1 style={{ color: '#4F3BA9', fontSize: '2xl', fontWeight: 'bold' }}>Welcome Admin!</h1>
        </Box>
        <form>
          <FormControl mb={4}>
            <FormLabel color="gray.600" fontWeight="bold">Admin Email</FormLabel>
            <Input
              type="text"
              placeholder="Enter your username"
              value="admin@gmail.com"
              borderColor="gray.300"
              disabled
              bg="gray.100"
            />
          </FormControl>
          <FormControl mb={6}>
            <FormLabel color="gray.600" fontWeight="bold">Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              value="admin"
              borderColor="gray.300"
              disabled
              bg="gray.100"
            />
          </FormControl>
          <Button
            colorScheme="teal"
            size="lg"
            w="full"
            onClick={handleLogin}
            _hover={{ bg: 'teal.600', transform: 'scale(1.02)' }}
            _active={{ bg: 'teal.700' }}
          >
            Login
          </Button>
        </form>
        {/* AlertDialog */}
        <AlertDialog isOpen={isOpen} leastDestructiveRef={undefined}>
          <AlertDialogOverlay>
            <AlertDialogContent bg="purple.800" color="white" borderRadius="md">
              <AlertDialogHeader fontSize="lg" fontWeight="bold">Welcome Admin!</AlertDialogHeader>
              <AlertDialogBody>
                Redirecting to the dashboard page...
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button colorScheme="purple" onClick={() => setIsOpen(false)}>OK</Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Container>
    </Box>
  );
};

export default LoginPage;
