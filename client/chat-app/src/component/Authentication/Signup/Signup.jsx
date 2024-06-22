import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './signup.css'
export const Signup = () => {
    const [signupUsername, setsignupUsername] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [signupEmail, setsignupEmail] = useState('');
    const navigate = useNavigate();
    const handleOnClick = async () => {
        await axios.post('http://localhost:9000/chatapp/signUp', {
            username: signupUsername,
            password: signupPassword,
            email: signupEmail
        })
            .then((res) => { navigate('/signin', { replace: true }); })
            .catch((err) => { return <div>{`Error:${err.message}`} </div> })
    }
    return (
        <div className='flex-center height-fl'>
            <div className='flex-column flex-align-center height-half' style={{ backgroundColor: "pink", width: '25rem', borderRadius: '2rem' }}>
                <div className='user_pass_pad'>
                    <label id='label-username' className='username-pad name-pass-fonstsize'>Name</label>
                    <input
                        id='username'
                        type='text'
                        placeholder='username'
                        className='input'
                        value={signupUsername}
                        onChange={(e) => setsignupUsername(e.target.value)}
                    />
                </div>
                <div className='user_pass_pad'>
                    <label id='label-password' className='password-pad name-pass-fonstsize'>Password</label>
                    <input
                        id='password'
                        type="password"
                        placeholder='password'
                        className='input'
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label id='label-email' className='email-pad name-pass-fonstsize'>Email</label>
                    <input
                        id='email'
                        type="email"
                        placeholder='email'
                        className='input'
                        value={signupEmail}
                        onChange={(e) => setsignupEmail(e.target.value)}
                    />
                </div>
                <div className='pad-1-t'>
                    <button type='button'
                        style={{
                            width: '5em',
                            height: '2em',
                            backgroundColor: '#ffb6e885',
                            border: '.1px solid #f79fdb'
                        }}
                        onClick={handleOnClick}>
                        Submit
                    </button>
                </div>
            </div >
        </div >
    )
}
