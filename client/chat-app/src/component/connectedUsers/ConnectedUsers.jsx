import React from 'react'
import io from 'socket.io-client';
const socket = io('http://localhost:9000');
export const ConnectedUsers = ({ userList, setCurrentUser }) => {
    // console.log(userList, 'userList')
    const handleUserClick = (user) => {
        console.log(user);
        setCurrentUser(user)
        socket.emit('join', user.username);
    }
    return (
        <div>
            <ul>
                {userList.map((user, index) => (
                    <div key={index} onClick={() => handleUserClick(user)}>{user.username}</div>
                ))}
            </ul>
        </div>
    )
}

