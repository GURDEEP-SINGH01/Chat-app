import { Input } from 'src/components/ui/input';
import axios from 'axios';
import React, { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from 'src/components/ui/dropdown-menu';
import './searchUser.css'
import { useNavigate } from 'react-router-dom';

export const SearchUser = ({ setUserList, loggedUser, setLoggedUser }) => {
    const [searchUser, setsearchUser] = useState('')
    const [listUsers, setlistUsers] = useState([])
    const navigate = useNavigate();
    const userNameSearch = async (event) => {
        setsearchUser(event.target.value);
        if (event.target.value)
            await axios.get(`http://localhost:9000/chatapp/search/${event.target.value}`)
                .then(res => { setlistUsers(res.data) })
                .catch(err => console.log(err.message))
        else {
            setlistUsers([])
        }
    }
    const handleSelectUser = async (user) => {
        await axios.post(`http://localhost:9000/chatapp/add`,
            { userId: loggedUser?._id, friendId: user?._id })
            .then(res => { setUserList(prevList => [...prevList, res.data.friend]) })
            .catch(err => console.log(err.message))
        setlistUsers([]);
        setsearchUser('');
    }
    const handleLogout = () => {
        console.log('logout')
        setLoggedUser(null)
        localStorage.clear();
        navigate('/signin', { replace: true })

    }
    return (
        <div className='flex flex-justify-spacebetween'>
            <div className="search">
                <Input
                    className='search-input'
                    style={{
                        backgroundColor: "white",
                        width: "100%",
                    }}
                    value={searchUser}
                    onChange={userNameSearch}
                    placeholder="Search"
                />
                <div>{listUsers?.length > 0 && listUsers.map((user, index) => (
                    <div key={index} style={{
                        background: "#f5e6e6",
                        paddingLeft: "1em",
                        border: "1em",
                        width: "81.2%",
                        marginLeft: "19%",
                        borderRadius: ".2em",
                        borderBottom: ".2em solid #c0b8b8"
                    }} onClick={() => handleSelectUser(user)} >{user?.username}
                    </div>
                )
                )}
                </div>
            </div>
            <div className='user-profile'>
                <DropdownMenu >
                    <DropdownMenuTrigger className="user-profile-button">Open</DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Pofile</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleLogout()}>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}
