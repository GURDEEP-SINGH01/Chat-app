import { Input } from 'src/components/ui/input';
import axios from 'axios';
import React, { useState } from 'react'

export const SearchUser = () => {
    const [searchUser, setsearchUser] = useState('')
    const [listUsers, setlistUsers] = useState([])
    const userNameSearch = async (event) => {
        setsearchUser(event.target.value);
        if (event.target.value)
            await axios.get(`http://localhost:9000/chatapp/${event.target.value}`)
                .then(res => { console.log(res.data); setlistUsers(res.data) })
                .catch(err => console.log(err.message))
    }
    console.log(listUsers);
    return (
        <div className="search">
            <Input
                className='search-input'
                style={{ backgroundColor: "white" }}
                value={searchUser}
                onChange={userNameSearch}
                placeholder="Search"
            />
            <div>{listUsers?.length > 0 && listUsers.map((user) => (
                <div><li>{user?.username}</li></div>
            )
            )}
            </div>
        </div>
    )
}
