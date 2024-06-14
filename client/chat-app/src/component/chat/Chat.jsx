import React, { useEffect, useRef, useState } from 'react';
import "./chatStyles.css";
import io from 'socket.io-client';
import axios from "axios";

export const Chat = ({ senderId, receiverId }) => {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const socket = useRef(null);

    const sendText = async () => {
        if (inputText.trim() !== '') {
            await axios.post('http://localhost:9000/chatapp/addMessage', {
                to: senderId._id,
                from: receiverId._id,
                message: inputText
            });
            socket.current.emit('sendMessage', {
                senderId: senderId._id,
                receiverId: receiverId._id,
                message: inputText
            });
            setMessages((prevMessages) => [...prevMessages, { fromSelf: true, message: inputText }]);
            setInputText('');
        }
    };

    useEffect(() => {
        socket.current = io('http://localhost:9000');
        socket.current.emit('addUser', senderId._id);
        socket.current.on('getMessage', ({ senderId, message }) => {
            if (senderId === receiverId._id) {
                setMessages((prevMessages) => [...prevMessages, { fromSelf: false, message }]);
            }
        });

        const fetchMessages = async () => {
            const response = await axios.post('http://localhost:9000/chatapp/getMessage', {
                from: receiverId._id,
                to: senderId._id
            });
            setMessages(response.data);
        };

        fetchMessages();

    }, [senderId, receiverId]);

    const onTextChange = (event) => {
        setInputText(event.target.value);
    };

    return (
        <div className='flex-column chat-wrapper'>
            <header>{receiverId?.username}</header>
            <section id="display-messages" className='container'>
                {
                    messages.map((message, index) => (
                        <div key={index}
                            className={`${message?.fromSelf ? "sender" : "received"} message-box`}
                        >
                            <div className="content">
                                <p style={{ margin: ".4em" }}>{message?.message}</p>
                            </div>
                        </div>
                    ))
                }
            </section>
            <div id="write-messages" className='enterText'>
                <input value={inputText} onChange={onTextChange} placeholder='Enter text here' />
                <button onClick={sendText}>send</button >
            </div>
        </div>
    );
};
