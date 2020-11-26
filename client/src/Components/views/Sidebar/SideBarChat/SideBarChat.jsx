import React from 'react';
import "./SideBarChat.css"
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";

const SideBarChat = (props) => {
    return ( 
        <Link to={`/chat/${props.link}`} style={{textDecoration:"none"}}>
        <div className="sidebarChat">
            <Avatar src={props.image}/>
            <div className="sidebarChatInfo">
                <h2>{props.name}</h2>
                <p>Last Message</p>
            </div>
        </div>
        </Link>
     );
}
 
export default SideBarChat;