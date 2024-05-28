import React, { useEffect, useRef, useState } from 'react'
import "../../index.css";
import io from 'socket.io-client';
import axios from "axios";

export const Chat = ({ senderId, receiverId }) => {
    const [messages, setMessages] = useState([])
    const [inputText, setInputText] = useState('')
    const [typing, setIsTyping] = useState(false);
    const socket = useRef(null);
    console.log(senderId, receiverId)
    const sendText = async () => {
        if (inputText.trim() !== '') {
            await axios.post('http://localhost:9000/chatapp/addMessage',
                {
                    to: senderId._id,
                    from: receiverId._id,
                    message: inputText
                })
            setMessages((prevMessages) => [...prevMessages, { fromSelf: true, message: inputText }]);
            setInputText('');
        }
    }
    useEffect(() => {
        const response = async () => {
            const dataresponse = await axios.post('http://localhost:9000/chatapp/getMessage', {
                from: receiverId._id,
                to: senderId._id
            })
            console.log('datarespnse.data', dataresponse.data)
            setMessages(dataresponse.data);
        }
        response()
    }, [senderId, receiverId])

    const clearAll = () => { setMessages(['']) }

    const onTextChange = (event) => {
        setInputText(event.target.value)
    }
    return (
        <div className='flex-column pad-1-lg' >
            <div id="chat-header">
                {typing && <p>Typing...</p>}
                <button onClick={clearAll}>clear</button><button>logout</button>
            </div>
            <div id="display-messeges" style={{ height: "10rem", backgroundColor: 'white', overflowY: 'auto' }}>
                {
                    messages.map((message, index) => (
                        <div key={index}>
                            <div
                                className={`message ${message.fromSelf ? "sended" : "recieved"}`}
                            >
                                <div className="content ">
                                    <p>{message.message}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div id="write-messages">
                <input value={inputText} onChange={onTextChange} placeholder='Enter text here' />
                <button onClick={sendText}>send</button >
            </div>
        </div>
    )
}
