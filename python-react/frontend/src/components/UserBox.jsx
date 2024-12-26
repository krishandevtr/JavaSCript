import React from 'react';
import { Grid } from '@chakra-ui/react';
import UserCard from './UserCard';
import USERS from '../fakeData/dummy'; // Ensure this path is correct

const UserBox = () => {
    return (
        <Grid
            templateColumns={{
                base: "1fr",
                md: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
            }}
            gap={4} // Added gap for spacing
        >
            {USERS.map((user) => (
                <UserCard key={user.id} user={user} />
            ))}
        </Grid>
    );
}

export default UserBox;