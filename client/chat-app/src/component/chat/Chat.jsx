import React, { useEffect, useRef, useState } from 'react';
import "./chatStyles.css";
import io from 'socket.io-client';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Textarea } from 'src/components/ui/textarea';
import { Button } from 'src/components/ui/button';
import { Input } from 'src/components/ui/input';
import { ShadowIcon } from '@radix-ui/react-icons';
import Header from '../Header/Header';

export const Chat = ({ senderId, receiverId }) => {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const socket = useRef(null);
    const messagesEndRef = useRef(null);
    const navigate = useNavigate(); console.log('sender', senderId, receiverId)
    useEffect(() => {
        senderId = JSON.parse(localStorage.getItem(`loggedUser`));
        if (senderId === null) {
            // If loggedUser is not defined, render a loading state or redirect to sign-in
            navigate('/')
            // return <div className="flex-align-center height-fl"><div className="loader" /></div>;
        }
    }, [senderId]);
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
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    useEffect(() => {
        socket.current = io('http://localhost:9000');
        socket.current.emit('addUser', senderId._id);
        socket.current.on('getMessage', ({ senderId, message }) => {
            if (senderId._id === receiverId._id) {
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
            {/* <Header receiverId={receiverId} /> */}
            <section id="display-messages" className='container' >
                {
                    messages.map((message, index) => (
                        <div key={index}
                            className={`${message?.fromSelf ? "sender" : "received"} message-box`}
                        >
                            <div className="content">
                                <p className='messages' style={{ margin: ".4em" }}>{message?.message}</p>
                            </div>
                        </div>
                    ))
                } <div ref={messagesEndRef} />
            </section>
            <div id="write-messages" className='enterText'>
                <Input className="inputMessage" value={inputText} onChange={onTextChange} placeholder='Enter text here' />
                <Button className="sendBtnMessage" onClick={sendText} variant="outline">Send</Button >
            </div>
        </div>
    );
};
