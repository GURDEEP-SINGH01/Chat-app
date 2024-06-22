import React, { useEffect, useState } from "react";
import "../index.css";
import { Chat } from "./chat/Chat";
import { ConnectedUsers } from "./connectedUsers/ConnectedUsers";
import { ChatProfile } from "./chatUserProfile/ChatProfile";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/ui/input";
import axios from "axios";
import { SearchUser } from "./searchUser/SearchUser";

export const Layout = ({ userList, loggedUser, setLoggedUser }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [openChatProfile, setOpenChatProfile] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const logUser = JSON.parse(localStorage.getItem('loggedUser'));
        setLoggedUser(logUser);
        if (loggedUser === null) {
            navigate('/signin')
        }
    }, []);
   

    return (
        <div className="width-fl height-fl flex-column " style={{ backgroundColor: "pink" }}>
           <SearchUser></SearchUser>
            <div className="flex pad-2-l" style={{ height: "100vh" }}>
                <div className="col-2 user-list">
                    <ConnectedUsers
                        userList={userList}
                        loggedUser={loggedUser}
                        setCurrentUser={setCurrentUser}
                        setOpenChatProfile={setOpenChatProfile} />
                </div>
                <div className="col-8 chat-container" style={{ width: "100vw", backgroundColor: "#ffe9e9" }}>
                    {loggedUser && <Chat senderId={loggedUser} receiverId={currentUser ? currentUser : loggedUser} />}
                </div>
                {openChatProfile && <div className="col-2 chat-profile" style={{ width: "20vw", backgroundColor: "pink", border: "1px solid" }}>
                    <ChatProfile currentUser={currentUser} setOpenChatProfile={setOpenChatProfile} />
                </div>}
            </div>
        </div>
    );
};
