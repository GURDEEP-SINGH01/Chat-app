import React from "react";
import "../index.css";
import { Chat } from "./chat/Chat";
export const Layout = () => {
    console.log("layout");
    return (
        <div className="width-fl height-fl" style={{ backgroundColor: "pink" }}>
            <div className="row-gap flex flex-justify-spacebetween pad-2-lg ">
                <div className="col-2 " style={{ width: "30vw", backgroundColor: "magenta", height: "fit-content" }}>
                    onlines
                </div>
                <div className="col-8 " style={{ width: "100vw", backgroundColor: "red", height: "100%" }}>
                    <Chat></Chat>
                </div>
                <div className="col-2 " style={{ width: "30vw", backgroundColor: "magenta", height: "fit-content" }}>
                    profileSpecific
                </div>
            </div>
        </div >
    )
}

