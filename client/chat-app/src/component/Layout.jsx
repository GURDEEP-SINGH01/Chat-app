import React, { useState } from "react";
import "../index.css";
import { Chat } from "./chat/Chat";
import { ConnectedUsers } from "./connectedUsers/ConnectedUsers";
import { ChatProfile } from "./chatUserProfile/ChatProfile";
export const Layout = ({ authentication, userList, loggedUser, setUserList }) => {
    console.log("layout");
    const [currentUser, setCurrentUser] = useState(null);
    return (
        <div className="width-fl height-fl" style={{ backgroundColor: "pink" }}>
            <div className="row-gap flex flex-justify-spacebetween pad-2-lg ">
                <div className="col-2 " style={{ width: "30vw", backgroundColor: "magenta", height: "fit-content" }}>
                    <ConnectedUsers
                        userList={userList}
                        setCurrentUser={setCurrentUser} />
                </div>
                <div className="col-8 " style={{ width: "100vw", backgroundColor: "red", height: "100%" }}>
                    {loggedUser}
                    {currentUser && <Chat senderId={loggedUser} receiverId={currentUser.username} />}

                    {/* {currentUser && <Chat senderId={loggedUser} receiverId={currentUser.username} />} */}
                </div>
                {currentUser && <div className="col-2 " style={{ width: "30vw", backgroundColor: "magenta", height: "fit-content" }}>
                    <ChatProfile currentUser={currentUser} setCurrentUser={setCurrentUser} />
                </div>}
            </div>
        </div >
    )
}

