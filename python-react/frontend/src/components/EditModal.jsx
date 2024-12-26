import React from 'react'
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    IconButton,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Textarea,
    useDisclosure,
} from "@chakra-ui/react";
import { BiEditAlt } from "react-icons/bi";

const EditModal = ({user}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <div>
            <IconButton
                onClick={onOpen}
                variant='ghost'
                colorScheme='blue'
                aria-label='Edit user'
                size={"sm"}
                icon={<BiEditAlt size={20} />}
            />
        <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit User Info</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Flex alignItems={"center"} gap={4}>
                            <FormControl>
                                <FormLabel>Full Name</FormLabel>
                                <Input placeholder='John Doe' defaultValue={user.name} />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Role</FormLabel>
                                <Input placeholder='Software Engineer' defaultValue={user.role} />
                            </FormControl>
                        </Flex>
                        <FormControl mt={4}>
                            <FormLabel>Description</FormLabel>
                            <Textarea
                                resize={"none"}
                                overflowY={"hidden"}
                                placeholder="He's a software engineer who loves to code and build things."
                                defaultValue={user.description}
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default EditModal
