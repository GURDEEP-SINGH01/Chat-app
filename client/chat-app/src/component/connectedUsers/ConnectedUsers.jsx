import React, { useState } from 'react'
import image from '../../resource/small-default-pic.png'
import './connectedUserstyles.css'
export const ConnectedUsers = ({ userList, loggedUser, setCurrentUser, setOpenChatProfile }) => {

    const handleUserClick = (user) => {
        setCurrentUser(user)
    }
    const openCurrentProfile = (user) => {
        setOpenChatProfile(user)
    }
    const NoFriends = () => { return <div></div> }
    return (
        <div className='userlistContainer'>
            <label>Friends List</label>
            <ul className='pad-1-l' style={{ alignItems: 'flex-start' }}>
                {userList.length > 0 && userList.map((user, index) => (
                    <div key={index} className='pad-1-t flex' >
                        <img src={image}
                            alt='My Image'
                            onClick={() => openCurrentProfile(user)}
                            style={{ width: '1em', height: '1em', marginTop: ".2em", marginRight: '.2em' }}
                        />
                        <span onClick={() => handleUserClick(user)}>
                            {user?.username}
                        </span>
                    </div>
                ))}
                <div key={userList.length + 1} className='pad-1-t flex' >
                    <img src={image}
                        alt='My Image'
                        onClick={() => openCurrentProfile(loggedUser)}
                        style={{ width: '1em', height: '1em', marginTop: ".2em", marginRight: '.2em' }}
                    />
                    <span onClick={() => handleUserClick(loggedUser)}>
                        {`${loggedUser?.username}(you)`}
                    </span>
                </div>
            </ul>
        </div>
    )
}

