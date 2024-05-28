import React, { useState } from "react";
import "../index.css";
import { Chat } from "./chat/Chat";
import { ConnectedUsers } from "./connectedUsers/ConnectedUsers";
import { ChatProfile } from "./chatUserProfile/ChatProfile";
export const Layout = ({ userList, loggedUser }) => {
    console.log("layout", loggedUser, loggedUser.username);
    const [currentUser, setCurrentUser] = useState(null);
    if (loggedUser === null) {
        // If loggedUser is not defined, render a loading state or redirect to sign-in
        return <div>Loading...</div>;
    }
    console.log(currentUser, 'curruser')
    return (
        <div className="width-fl height-fl" style={{ backgroundColor: "pink" }}>
            <div className="row-gap flex flex-justify-spacebetween pad-2-lg ">
                <div className="col-2 " style={{ width: "30vw", backgroundColor: "magenta", height: "fit-content" }}>
                    <ConnectedUsers
                        userList={userList}
                        setCurrentUser={setCurrentUser} />
                </div>
                <div className="col-8 " style={{ width: "100vw", backgroundColor: "red", height: "100%" }}>
                    {loggedUser.username}
                    {loggedUser && <Chat senderId={loggedUser} receiverId={currentUser ? currentUser : loggedUser} />}
                </div>
                {currentUser && <div className="col-2 " style={{ width: "30vw", backgroundColor: "magenta", height: "fit-content" }}>
                    <ChatProfile currentUser={currentUser} setCurrentUser={setCurrentUser} />
                </div>}
            </div>
        </div >
    )
}

