import React from 'react'
import "../../index.css";
export const ChatProfile = ({ currentUser, setCurrentUser }) => {
    const handleOnCloseProfile = () => {
        setCurrentUser(null);
    }
    return (
        <div>
            <div>
                ChatProfile
                <button onClick={() => handleOnCloseProfile()}>Close</button>
            </div>
            <div>
                <div className='flex'>
                    <p>photo</p>
                </div>
                <div>name:{currentUser.username}</div>
                <div>contact</div>
            </div>
        </div>
    )
}
