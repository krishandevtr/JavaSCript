import {
    Button,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    ModalHeader,
    ModalBody,
    Flex,
    Textarea,
    Radio,
    RadioGroup,
    ModalFooter
} from '@chakra-ui/react';
import { BiAddToQueue } from 'react-icons/bi';
import React, { useState } from 'react';

const UserModel = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [value, setValue] = useState('male');  // State for radio selection

    return (
        <>
            <Button onClick={onOpen}>
                <BiAddToQueue size={20} />
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay>
                    <ModalContent>
                        <ModalHeader>
                            My New BFF 😍
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <Flex direction="column" gap={4}>
                                <FormControl>
                                    <FormLabel>
                                        Full Name
                                    </FormLabel>
                                    <Input placeholder={'John Doe'} />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>
                                        Role
                                    </FormLabel>
                                    <Input placeholder={'Developer'} />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>
                                        Description
                                    </FormLabel>
                                    <Textarea
                                        resize={"none"}
                                        overflow={"hidden"}
                                        placeholder={"He is a software Engineer working in GOOGLE 💘"}
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormLabel>
                                        Gender
                                    </FormLabel>
                                    <RadioGroup >
                                        <Flex gap={4}>
                                            <Radio value="male">Male</Radio>
                                            <Radio value="female">Female</Radio>
                                        </Flex>
                                    </RadioGroup>
                                </FormControl>
                            </Flex>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3}>
                                Add

                            </Button>
                            <Button onClick={onClose}> Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </ModalOverlay>
            </Modal>
        </>
    );
}

export default UserModel;