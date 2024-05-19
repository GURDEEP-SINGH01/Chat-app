import React, { useEffect, useState } from 'react'
import './style.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
const socket = io('http://localhost:9000');
export const Signin = ({ authentication, setAuthentication, setLoggedUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (authentication === 'Sign-in successful') {
            setLoggedUser(username)
            navigate('/layout')
        }
        else navigate('/')
    }, [authentication]);

    // useEffect(() => {
    //     // Authenticate user when component mounts
    //     // socket.emit('authenticate', 'user_id_here'); // Replace 'user_id_here' with the actual user ID
    // }, []);

    const handleOnClick = async () => {
        const response = await axios.post('http://localhost:9000/chatapp/signIn', {
            username: username,
            password: password
        });
        if (response.status === 200) {
            const data = response.data;
            console.log('responsesigin', response)
            setAuthentication(data.message)
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
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className='pad-1-t'> <button type='button' onClick={handleOnClick}>Submit</button></div>
            <div> <a>Signup</a></div>
        </div >

    )

}

