import React from 'react'
import OtherUser from './OtherUser';
import useGetOtherUsers from '../hooks/useGetOtherUsers';
import { useSelector } from "react-redux";


const OtherUsers = () => {
    useGetOtherUsers();
    const { otherUsers, searchUsers } = useSelector(store => store.user);

    if (!otherUsers) return <div>Loading users...</div>;

    const filteredUsers = otherUsers.filter(user =>
        user.fullName.toLowerCase().includes(searchUsers.toLowerCase())
    );

    if (filteredUsers.length === 0) return <div>No users found</div>;

    return (
        <div className='overflow-auto flex-1'>
            {
                filteredUsers?.map((user) => {
                    return (
                        <OtherUser key={user._id} user={user} />
                    )
                })
            }

        </div>
    )
}

export default OtherUsers