import React, { useEffect, useState } from 'react';
import { Grid, Spinner, Box ,Flex,Text} from '@chakra-ui/react';
import UserCard from './UserCard';

const UserBox = ({ users, setUsers }) => {
    const [isLoading, setIsLoading] = useState(true); // Set initial loading state to true

    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/friends");
                const data = await res.json(); // Await the JSON parsing
                if (!res.ok) {
                    throw new Error(data.error);
                }
                setUsers(data);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false); // Set loading to false after fetch
            }
        };
        getUsers();
    }, [setUsers]);

/**
 * ? Explanation of the useEffect Hook
 * ! Syntax useEffect(), First param is  an function and second param is  an array (dependencies array)
 * ! The idea behind the stuff is that whenever the array gets changes the useEffect gonna Execute the logic inside the ()={} the we passed
 * !
 * ! 
 */



    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Spinner size="xl" />
            </Box>
        ); // Show a loading spinner while fetching data
    }

    return (
        <>
            <Grid
                templateColumns={{
                    base: "1fr",
                    md: "repeat(2, 1fr)",
                    lg: "repeat(3, 1fr)",
                }}
                gap={4} // Added gap for spacing
            >
                {users.map((user) => (
                    <UserCard key={user.id} user={user} setUsers={setUsers} />
                ))}
            </Grid>
            {isLoading && <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Spinner size="xl" />
            </Box>}
            {users.length === 0 && (
                <Flex justifyContent="center" alignItems="center">
                    <Text as="span" fontSize="2xl" fontWeight="bold" mr={2}>
                        Poor you! 😢
                    </Text>
                    <Text>No friends found.</Text>
                </Flex>
            )}

        </>
    );
}

export default UserBox;