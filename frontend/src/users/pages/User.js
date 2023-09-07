import React from 'react';

import UsersList from '../components/UsersList';
// List of Users
const Users = () => {
    const USERS = [
        {
            id: 'u1',
            name: 'jan Doe',
            imageSrc: 'https://images.unsplash.com/photo-1545167622-3a6ac756afa4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZmFjZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
            places: 3
        }
    ];

    return <UsersList items={USERS}  />
}

export default Users