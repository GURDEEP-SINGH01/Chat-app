import { Input } from 'src/components/ui/input';
import axios from 'axios';
import React, { useState } from 'react'

export const SearchUser = ({ setUserList, loggedUser }) => {
    const [searchUser, setsearchUser] = useState('')
    const [listUsers, setlistUsers] = useState([])
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
    return (
        <div className="search">
            <Input
                className='search-input'
                style={{
                    backgroundColor: "white",
                    width: "81.7%",
                    marginLeft: "18.5%"
                }}
                value={searchUser}
                onChange={userNameSearch}
                placeholder="Search"
            />
            <div>{listUsers?.length > 0 && listUsers.map((user, index) => (
                <li key={index} style={{
                    background: "#f5e6e6",
                    paddingLeft: "1em",
                    border: "1em", width: "81.2%", 
                    marginLeft: "19%",
                    borderRadius: ".2em"
                }} onClick={() => handleSelectUser(user)} >{user?.username}</li>)
            )}
            </div>
        </div>
    )
}
