import React from 'react'
import io from 'socket.io-client';
import image from '../../resource/small-default-pic.png'
import './connectedUserstyles.css'
export const ConnectedUsers = ({ userList, loggedUser, setCurrentUser, setOpenChatProfile }) => {
    const handleUserClick = (user) => {
        console.log(user);
        setCurrentUser(user)
    }
    const openCurrentProfile = (user) => {
        setOpenChatProfile(user)
    }
    return (
        <div className='userlistContainer'>
            <ul className='pad-1-l' style={{ alignItems: 'flex-start' }}>
                {userList.map((user, index) => (
                    <div key={index} className='pad-1-t flex' >
                        <img src={image} alt='My Image' onClick={() => openCurrentProfile(user)} style={{ width: '1em', height: '1em' }} />
                        <span onClick={() => handleUserClick(user)}>
                            {user?.username === loggedUser?.username ? `${user?.username}(you)` : user?.username}
                        </span>
                    </div>
                ))}
            </ul>
        </div>
    )
}

