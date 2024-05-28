import React, { useEffect, useState, useSyncExternalStore } from 'react'
import './style.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
const socket = io('http://localhost:9000');
export const Signin = ({ loggedUser, setLoggedUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [invalidUser, setInvalidUser] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (loggedUser != null) {
            navigate('/layout')
        }
        else navigate('/')
    }, [loggedUser]);


    const handleOnClick = async () => {
        try {
            const response = await axios.post('http://localhost:9000/chatapp/signIn', {
                username,
                password
            });
            if (response.status === 200 && response.data.success) {
                setLoggedUser(response.data.body);
            } else {
                setInvalidUser(true);
                setUsername('');
                setPassword('');
            }
        } catch (error) {
            console.error('Error during sign-in:', error);
            setInvalidUser(true);
        }
    }
    return (
        <div className='flex-column flex-align-center height-fl'>
            <div className='user_pass_pad'>
                <label id='label-username' className='username-pad'>Name</label>
                <input
                    id='username'
                    type='text'
                    placeholder='username'
                    className='input'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label id='label-password' className='password-pad '>Password</label>
                <input
                    id='password'
                    type="password"
                    placeholder='password'
                    className='input'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className='pad-1-t'> <button type='button' onClick={handleOnClick}>Submit</button></div>
            <div> <a>Signup</a></div>
            {invalidUser && <div>Not the right user</div>}
        </div >
    )
}

