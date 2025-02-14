import {
    Card,
    CardHeader,
    Flex,
    Avatar,
    Box,
    Heading,
    IconButton,
    CardBody,
    Text,
    useToast


} from '@chakra-ui/react'
import { BiTrash } from 'react-icons/bi'
import React from 'react'
import EditModal from './EditModal'


const UserCard = ({ user ,setUsers}) => {
    const toast = useToast();
    const handleDeleteUser = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/friends/" + user.id, {
                method: "DELETE",
            });
    
            const data = await res.json();
    
            if (!res.ok) {
                throw new Error(data.msg);
            }
    
            setUsers((prev) => prev.filter((u) => u.id !== user.id));
            toast({
                title: "User deleted successfully",
                status: "success",
                duration: 2000,
                isClosable: true,
                position: "top-center",
            });
    
        } catch (error) {
            toast({
                title: "An error occurred",
                description: error.message,
                status: "error", // Fixed the capitalization here, should be 'error' not 'Error'
                duration: 2000,
                isClosable: true,
                position: "top-center",
            });
        }
    };
    
    return (
        <Card>
            <CardHeader>
                <Flex gap={4}>
                    <Flex flex={"1"} gap={"4"} alignItems={"center"}>
                        <Avatar src={user.imgUrl} />

                        <Box>
                            <Heading size='sm'>{user.name}</Heading>
                            <Text>{user.role}</Text>
                        </Box>
                    </Flex>

                    <Flex>
                        <EditModal user={user} setUsers={setUsers} />
                        <IconButton
                            variant='ghost'
                            colorScheme='red'
                            size={"sm"}
                            aria-label='See menu'
                            icon={<BiTrash size={20}
                            onClick={handleDeleteUser}
                            />}
                        />
                    </Flex>
                </Flex>
            </CardHeader>

            <CardBody>
                <Text>{user.description}</Text>
            </CardBody>
        </Card>
    )
}

export default UserCard
