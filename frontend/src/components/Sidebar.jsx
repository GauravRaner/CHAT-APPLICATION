import React, { useState } from 'react';
import OtherUsers from './OtherUsers';
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthUser, setOtherUsers, setSearchUsers, setSelectedUser } from '../redux/userSlice';
import { setMessages } from '../redux/messageSlice';
import { BASE_URL } from '..';
import useGetOtherUsers from '../hooks/useGetOtherUsers';
import { IoMenu } from "react-icons/io5";

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    useGetOtherUsers(); 

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/api/v1/user/logout`);
            navigate("/login");
            toast.success(res.data.message);
            dispatch(setAuthUser(null));
            dispatch(setMessages(null));
            dispatch(setOtherUsers(null));
            dispatch(setSelectedUser(null));
        } catch (error) {
            console.log(error);
        }
    }

    const searchHandler = (e) => {
        dispatch(setSearchUsers(e.target.value));
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    }

    return (
        <>
            <div className='sm:hidden text-white py-2 px-1 border-r-gray-600 border-[1px] bg-[#619b8a] ' onClick={toggleSidebar}>
                <IoMenu size={30} />
            </div>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-10"
                    onClick={toggleSidebar} 
                />
            )}

            <div
                className={`fixed top-0 left-0 h-full bg-[#4c907b] p-4  z-20 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out sm:static sm:translate-x-0 border-r-[2px] border-slate-500`}
            >
                <input
                    onChange={searchHandler}
                    className='input input-bordered rounded-md bg-[#E5E7EB] mb-4'
                    type="text"
                    placeholder='Search...'
                />
                <div className="flex-1 overflow-y-auto">
                    <OtherUsers />
                </div>
                <div className='mt-[80%]'>
                    <button onClick={logoutHandler} className='btn btn-sm '>Logout</button>
                </div>
            </div>
        </>
    );
}

export default Sidebar;
