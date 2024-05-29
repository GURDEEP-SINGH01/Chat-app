import React from 'react'
import io from 'socket.io-client';
import image from '../../resource/small-default-pic.png'
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
                    <div key={index} onClick={() => handleUserClick(user)}>
                        <img src={image} alt='My Image' style={{width:'1em', height:'1em'}}/>{user.username}
                    </div>
                ))}
            </ul>
        </div>
    )
}

