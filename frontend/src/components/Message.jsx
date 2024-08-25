import React, { useEffect, useRef } from 'react';
import { useSelector } from "react-redux";

const Message = ({ message }) => {
    const scroll = useRef();
    const { authUser, selectedUser } = useSelector(store => store.user);

    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);

    const messageTime = new Date(message?.createdAt).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true, 
    });

    return (
        <div ref={scroll} className={`chat  ${message?.senderId === authUser?._id ? 'chat-end' : 'chat-start'}`}>
            <div className="chat-image avatar ">
                <div className="w-10 rounded-full">
                    <img
                        alt="User avatar"
                        src={message?.senderId === authUser?._id ? authUser?.profilePhoto : selectedUser?.profilePhoto}
                    />
                </div>
            </div>

            <div className={`chat-bubble w-auto h-auto py-0 flex justify-center items-center text-[15px] ${message?.senderId !== authUser?._id ? 'bg-gray-200 text-black' : ''}`}>
                {message?.message}
                <time className="text-[8px] sm:text-[10px] opacity-50 text-red  flex justify-end items-end ml-12 mt-auto pb-1">
                    {messageTime} 
                </time>
            </div>
        </div>
    );
};

export default Message;
