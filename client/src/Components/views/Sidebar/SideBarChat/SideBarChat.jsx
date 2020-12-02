import React from 'react';
import "./SideBarChat.css"
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";

const SideBarChat = ({ link, image, name }) => {
    return ( 
        <Link to={`/chat/${link}`} style={{textDecoration:"none"}}>
        <div className="sidebarChat">
            <Avatar src={image}/>
            <div className="sidebarChatInfo">
                <h2>{name}</h2>
            </div>
        </div>
        </Link>
     );
}
 
export default SideBarChat;