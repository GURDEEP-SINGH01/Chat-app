import React, { useEffect, useState } from 'react'
import "../../index.css";
import io from 'socket.io-client';
const socket = io('http://localhost:9000');
export const Chat = () => {
    const [messages, setMessages] = useState(['Hi'])
    const [inputText, setInputText] = useState('')
    const [typing, setIsTyping] = useState(false);

    useEffect(() => { })
    const onTextChange = (event) => {
        socket.emit('typing')
        setInputText(...[event.target.value])
    }
    socket.on('chat message', (message) => {
        setMessages([...messages, message]);
    })
    socket.on('typing', () => {
        setIsTyping(true);
        setTimeout(() => { setIsTyping(false) }, 2000)
    })

    const sendText = () => {
        if (inputText.trim() !== '') {
            socket.emit('chat message', inputText)
            setInputText('');
            // socket.emit('private message', { senderId: authentication.userId, recipientId, message: inputText });
            // setInputText('');
        }
    }
    const clearAll = () => { setMessages(['']) }
    const handleLogout = () => { socket.close() }
    return (
        <div className='flex-column pad-1-lg' >
            <div id="chat-header">
                {typing && <p>Typing...</p>}
                <button onClick={clearAll}>clear</button><button onClick={handleLogout}>logout</button>
            </div>
            <div id="display-messeges" style={{ height: "10rem", backgroundColor: 'white', overflowY: 'auto' }}>
                {
                    messages.map((message, index) => (
                        <div key={index}>{message}</div>
                    ))
                }
            </div>
            <div id="write-messages">
                <input value={inputText} onChange={onTextChange} />
                <button onClick={sendText}>send</button >
            </div>
        </div>
    )
}
