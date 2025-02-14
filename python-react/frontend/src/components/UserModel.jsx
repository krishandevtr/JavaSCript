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
    ModalFooter,
    useToast
} from '@chakra-ui/react';
import { BiAddToQueue } from 'react-icons/bi';
import React, { useState } from 'react';
import { BASE_URL } from '../App';

const UserModel = ({setUsers}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLoading, setIsLoading] = useState(false);
    const [inputs, setInputs] = useState({
        name: "",
        role: "",
        description: "",
        gender: "male",
    });
    const toast = useToast();

    const handleCreateUser = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch("http://localhost:5000/api/friends", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(inputs)
            });
            const data = await res.json();
            console.log("THis is the stuff inside the data",data)

            if (!res.ok) {
                throw new Error(data.msg);
            }

            toast({
                status: "success",
                title: "Yayy!",
                description: "Friend created successfully",
                duration: 2000,
                position: "top", // Valid toast position
            });

            onClose();
            setUsers((prevUsers) => [...prevUsers, data]);


        } catch (error) {
            toast({
                status: "error",
                title: "An error occurred!",
                description: error.message,
                duration: 2000,
                position: "top", // Valid toast position
            });

        } finally {
            setInputs({
                name: "",
                role: "",
                description: "",
                gender: "male",
            });
            setIsLoading(false);
        }
    };

    return (
        <>
            <Button onClick={onOpen}>
                <BiAddToQueue size={20} />
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay>
                    <form onSubmit={handleCreateUser}>
                        <ModalContent>
                            <ModalHeader>
                                My New BFF 😍
                            </ModalHeader>
                            <ModalCloseButton />
                            <ModalBody pb={6}>
                                <Flex direction="column" gap={4}>
                                    <FormControl>
                                        <FormLabel>Full Name</FormLabel>
                                        <Input
                                            placeholder="John Doe"
                                            value={inputs.name}
                                            onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Role</FormLabel>
                                        <Input
                                            placeholder="Developer"
                                            value={inputs.role}
                                            onChange={(e) => setInputs({ ...inputs, role: e.target.value })}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Email</FormLabel>
                                        <Input
                                            placeholder="JhonDoe@123.com"
                                            value={inputs.email}
                                            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Description</FormLabel>
                                        <Textarea
                                            resize="none"
                                            overflow="hidden"
                                            placeholder="He is a software Engineer working in GOOGLE 💘"
                                            value={inputs.description}
                                            onChange={(e) => setInputs({ ...inputs, description: e.target.value })}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Gender</FormLabel>
                                        <RadioGroup
                                            value={inputs.gender}
                                            onChange={(value) => setInputs({ ...inputs, gender: value })}
                                        >
                                            <Flex gap={4}>
                                                <Radio value="male">Male</Radio>
                                                <Radio value="female">Female</Radio>
                                            </Flex>
                                        </RadioGroup>
                                    </FormControl>
                                </Flex>
                            </ModalBody>

                            <ModalFooter>
                                <Button
                                    colorScheme="blue"
                                    mr={3}
                                    type="submit"
                                    isLoading={isLoading}
                                >
                                    Add
                                </Button>
                                <Button onClick={onClose}>Cancel</Button>
                            </ModalFooter>
                        </ModalContent>
                    </form>
                </ModalOverlay>
            </Modal>
        </>
    );
};

export default UserModel;
