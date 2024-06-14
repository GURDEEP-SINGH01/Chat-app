import React, { useEffect, useRef, useState } from 'react'
import "./chatStyles.css";
import io from 'socket.io-client';
import axios from "axios";

export const Chat = ({ senderId, receiverId }) => {
    const [messages, setMessages] = useState([])
    const [inputText, setInputText] = useState('')
    const [typing, setIsTyping] = useState(false);
    const socket = useRef(null)
    // console.log(senderId, receiverId)
    const sendText = async () => {
        if (inputText.trim() !== '') {
            await axios.post('http://localhost:9000/chatapp/addMessage',
                {
                    to: senderId._id,
                    from: receiverId._id,
                    message: inputText
                })
            socket.current.emit('sendMessage', {
                senderId: senderId._id,
                receiverId: receiverId._id,
                message: inputText
            });
            setMessages((prevMessages) => [...prevMessages, { fromSelf: true, message: inputText }]);
            setInputText('');
        }
    }
    useEffect(() => {
        socket.current = io('http://localhost:9000');
    }, [])
    useEffect(() => {
        socket.current.emit('addUser', senderId._id);
    }, [receiverId])

    useEffect(() => {
        const response = async () => {
            const dataresponse = await axios.post('http://localhost:9000/chatapp/getMessage', {
                from: receiverId._id,
                to: senderId._id
            })
            setMessages(dataresponse.data);
        }
        response();
        socket.current.on('getMessage', ({ senderId, message }) => {
            if (senderId === receiverId._id) {
                setMessages((prevMessages) => [...prevMessages, { fromSelf: false, message }]);
            }
        });
    }, [senderId, receiverId])
    const clearAll = () => { setMessages(['']) }

    const onTextChange = (event) => {
        setInputText(event.target.value)
    }
    const lineBreak = (message) => { }

    return (
        <div className='flex-column' >
            <header>{receiverId?.username}</header>
            <section id="display-messages" className='container' style={{ backgroundColor: 'white', overflowY: 'auto' }}>
                {
                    messages.map((message, index) => (
                        <div key={index}
                            className={`${message?.fromSelf ? "sender" : "recieved"} pad-1-l pad-1-r`}
                        >
                            <div className="content">
                                <p style={{ margin: '0' }}
                                >{message?.message}</p>
                            </div>
                        </div>
                    ))
                }
            </section >
            <div id="write-messages" className='enterText'>
                <input value={inputText} onChange={onTextChange} placeholder='Enter text here' />
                <button onClick={sendText}>send</button >
            </div>
        </div >
    )
}
