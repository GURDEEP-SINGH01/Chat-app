import React, { useEffect, useState } from 'react'
import "../../index.css";
import io from 'socket.io-client';
const socket = io('http://localhost:9000');
export const Chat = ({ senderId, receiverId = { senderId } }) => {
    const [messages, setMessages] = useState(['Hi'])
    const [inputText, setInputText] = useState('')
    const [typing, setIsTyping] = useState(false);

    useEffect(() => {
        socket.emit('join', senderId);
        const handleMessage = (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        };

        const handleTyping = () => {
            setIsTyping(true);
            setTimeout(() => { setIsTyping(false); }, 2000);
        };

        socket.on('chat message', handleMessage);
        socket.on('typing', handleTyping);

        return () => {
            socket.off('chat message', handleMessage);
            socket.off('typing', handleTyping);
        };
    }, [senderId]);

    // console.log(receiverId)
    const onTextChange = (event) => {
        socket.emit('typing', senderId)
        setInputText(event.target.value)
    }

    const sendText = () => {
        if (inputText.trim() !== '') {
            // socket.emit('chat message', inputText)
            // setInputText('');]
            console.log('receiverId', receiverId)
            socket.emit('chat message', { senderId, recipientId: receiverId, message: inputText });
            setMessages((prevMessages) => [...prevMessages, { from: 'Me', message: inputText }]);
            setInputText('');
        }
    }
    const clearAll = () => { setMessages(['']) }
    return (
        <div className='flex-column pad-1-lg' >
            <div id="chat-header">
                {typing && <p>Typing...</p>}
                <button onClick={clearAll}>clear</button><button>logout</button>
            </div>
            <div id="display-messeges" style={{ height: "10rem", backgroundColor: 'white', overflowY: 'auto' }}>
                {
                    messages.map((message, index) => (
                        // <div key={index}>{message}</div>]
                        <div key={index}><strong>{message.from}:</strong> {message.message}</div>
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
