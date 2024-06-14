import React, { useState } from "react";
import "../index.css";
import { Chat } from "./chat/Chat";
import { ConnectedUsers } from "./connectedUsers/ConnectedUsers";
import { ChatProfile } from "./chatUserProfile/ChatProfile";
export const Layout = ({ userList, loggedUser }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [openChatProfile, setOpenChatProfile] = useState(false);
    if (loggedUser === null) {
        // If loggedUser is not defined, render a loading state or redirect to sign-in
        return <div className="flex-align-center height-fl" ><div className="loader" /></div>;
    }
    return (
        <div className="width-fl height-fl" style={{ backgroundColor: "pink" }}>
            <div className="flex pad-2-l" style={{ height: "inherit" }}>
                <div className="col-2 " style={{ width: "20vw", backgroundColor: "pink", border: "1px solid", borderRadius: ".7em 0 0 0" }}>
                    <ConnectedUsers
                        userList={userList}
                        setCurrentUser={setCurrentUser}
                        setOpenChatProfile={setOpenChatProfile} />
                </div>
                <div className="col-8 " style={{ width: "100vw", backgroundColor: "red" }}>
                    {loggedUser && <Chat senderId={loggedUser} receiverId={currentUser ? currentUser : loggedUser} />}
                </div>
                {openChatProfile && <div className="col-2" style={{ width: "30vw", backgroundColor: "pink", border: "1px solid", }}>
                    <ChatProfile currentUser={currentUser} setOpenChatProfile={setOpenChatProfile} />
                </div>}
            </div>
        </div >
    )
}

