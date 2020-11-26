import React from 'react';
import "./SideBarChat.css"
import { Avatar } from "@material-ui/core";

const SideBarChat = () => {
    return ( 
        <div className="sidebarChat">
            <Avatar />
            <div className="sidebarChatInfo">
                <h2>Room name</h2>
                <p>Last message</p>
            </div>
        </div>
     );
}
 
export default SideBarChat;