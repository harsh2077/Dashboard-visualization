import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  Divider,
  Badge,
  Flex,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import AdminDashboard from "./Sidebar";
import { MdCheckCircle, MdCancel } from 'react-icons/md';

const tasks = [
  {
    id: 1,
    title: 'Complete Project Proposal',
    description: 'Draft and finalize the project proposal for client approval.',
    status: 'In Progress',
    dueDate: '2024-08-10',
  },
  {
    id: 2,
    title: 'Design New Features',
    description: 'Create wireframes and mockups for the new features in the application.',
    status: 'Pending',
    dueDate: '2024-08-15',
  },
  {
    id: 3,
    title: 'Code Review',
    description: 'Review the latest code changes and provide feedback.',
    status: 'Completed',
    dueDate: '2024-08-01',
  },
  {
    id: 4,
    title: 'Update Documentation',
    description: 'Update the project documentation with the latest changes.',
    status: 'In Progress',
    dueDate: '2024-08-12',
  },
];

const TaskItem = ({ title, description, status, dueDate }) => {
  const statusColor = {
    Pending: 'red',
    InProgress: 'orange',
    Completed: 'green',
  };

  return (
    <Box
      p={5}
      borderWidth={1}
      borderRadius="md"
      boxShadow="lg"
      mb={4}
      bg={useColorModeValue('white', 'gray.700')}
      transition="0.2s"
      _hover={{ boxShadow: 'xl', transform: 'scale(1.02)' }}
    >
      <Heading size="md" mb={2}>
        {title}
      </Heading>
      <Text mb={2}>{description}</Text>
      <Flex justify="space-between" align="center">
        <Badge colorScheme={statusColor[status]}>
          {status}
        </Badge>
        <Text fontSize="sm" color="gray.500">
          Due: {dueDate}
        </Text>
      </Flex>
    </Box>
  );
};

const Tasks = () => {
  return (
    //
    <Container maxW="container.md" mt={8}> 
    <AdminDashboard />
      <Heading mb={6}>Task List</Heading>
      <Stack spacing={4}>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            title={task.title}
            description={task.description}
            status={task.status}
            dueDate={task.dueDate}
          />
        ))}
      </Stack>
      <Divider my={6} />
      <Button colorScheme="blue" variant="outline" width="full">
        Add New Task
      </Button>
    </Container>
  );
};

export default Tasks;
