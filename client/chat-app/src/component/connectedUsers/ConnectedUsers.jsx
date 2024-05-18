import React from 'react'

export const ConnectedUsers = ({ userList }) => {
    console.log(userList, 'userList')
    return (
        <div>
            <ul>
                {userList.map((user, index) => (
                    <div key={index}>{user.username}</div>
                ))}
            </ul>
        </div>
    )
}

