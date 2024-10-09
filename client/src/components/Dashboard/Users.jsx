import React, { useState } from "react";
import { Box, Button, Container, Flex, Heading, Table, Thead, Tbody, Tr, Th, Td, Input, FormControl, FormLabel, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, useDisclosure, IconButton, useToast } from "@chakra-ui/react";
import { AddIcon, EditIcon, DeleteIcon, ViewIcon } from "@chakra-ui/icons";
import AdminDashboard from "./Sidebar";
const demoUsers = [
  { id: 1, name: "Harsh Gupta", email: "harsh.gupta@example.com", role: "Admin" },
  { id: 2, name: "Aryan seth", email: "Aryan.seth@example.com", role: "Editor" },
  { id: 3, name: "Kaju Kaji", email: "kaju.kaji@example.com", role: "Subscriber" },
];

const Users = () => {
  const [users, setUsers] = useState(demoUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "" });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();
  const toast = useToast();

  const handleAddUser = () => {
    setUsers([...users, { ...newUser, id: users.length + 1 }]);
    setNewUser({ name: "", email: "", role: "" });
    onModalClose();
    toast({
      title: "User added.",
      description: "New user has been added successfully.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsEditMode(true);
    onOpen();
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
    toast({
      title: "User deleted.",
      description: "User has been deleted successfully.",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  };

  const handleSaveEdit = () => {
    setUsers(users.map(user => (user.id === selectedUser.id ? selectedUser : user)));
    setIsEditMode(false);
    onClose();
    toast({
      title: "User updated.",
      description: "User details have been updated successfully.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.xl" p={5}>
    <AdminDashboard />
      <Flex justify="space-between" align="center" mb={5}>
        <Heading size="lg">Users</Heading>
        <Button colorScheme="teal" leftIcon={<AddIcon />} onClick={onModalOpen}>
          Add User
        </Button>
      </Flex>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Role</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map(user => (
            <Tr key={user.id}>
              <Td>{user.id}</Td>
              <Td>{user.name}</Td>
              <Td>{user.email}</Td>
              <Td>{user.role}</Td>
              <Td>
                <IconButton
                  icon={<ViewIcon />}
                  aria-label="View User"
                  onClick={() => handleEditUser(user)}
                  mr={2}
                />
                <IconButton
                  icon={<EditIcon />}
                  aria-label="Edit User"
                  onClick={() => handleEditUser(user)}
                  mr={2}
                />
                <IconButton
                  icon={<DeleteIcon />}
                  aria-label="Delete User"
                  onClick={() => handleDeleteUser(user.id)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      
      <Modal isOpen={isModalOpen} onClose={onModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New User</ModalHeader>
          <ModalBody>
            <FormControl mb={3}>
              <FormLabel>Name</FormLabel>
              <Input
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                placeholder="Enter name"
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Email</FormLabel>
              <Input
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                placeholder="Enter email"
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Role</FormLabel>
              <Input
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                placeholder="Enter role"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={handleAddUser}>Add User</Button>
            <Button ml={3} onClick={onModalClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isEditMode ? 'Edit User' : 'View User'}</ModalHeader>
          <ModalBody>
            {selectedUser && (
              <>
                <FormControl mb={3}>
                  <FormLabel>Name</FormLabel>
                  <Input
                    value={selectedUser.name}
                    onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                    placeholder="Enter name"
                    isDisabled={!isEditMode}
                  />
                </FormControl>
                <FormControl mb={3}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    value={selectedUser.email}
                    onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                    placeholder="Enter email"
                    isDisabled={!isEditMode}
                  />
                </FormControl>
                <FormControl mb={3}>
                  <FormLabel>Role</FormLabel>
                  <Input
                    value={selectedUser.role}
                    onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
                    placeholder="Enter role"
                    isDisabled={!isEditMode}
                  />
                </FormControl>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            {isEditMode ? (
              <>
                <Button colorScheme="teal" onClick={handleSaveEdit}>Save</Button>
                <Button ml={3} onClick={onClose}>Cancel</Button>
              </>
            ) : (
              <Button ml={3} onClick={onClose}>Close</Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Users;