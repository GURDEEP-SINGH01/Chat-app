import React, { useState } from 'react'
import "../../index.css";
export const Chat = () => {
    const [messages, setMessages] = useState(['Hi'])
    const [inputText, setInputText] = useState('')
    const onTextChange = (event) => {
        setInputText(...[event.target.value])
    }
    const sendText = () => {
        // event.preventDefault()
        if (inputText.trim() !== '') {
            setMessages([...messages, inputText]);
            setInputText('');
        }
    }
    const clearAll = () => { setMessages(['']) }
    return (
        <div className='flex-column pad-1-lg' >
            <div id="chat-header">
                header
                <button onClick={clearAll}>clear</button>
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
