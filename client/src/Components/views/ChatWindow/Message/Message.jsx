import React from 'react';
import "./Message.css";

const Message = (props) => {
    return ( 
        <p className={props.receiver ? "chatMessage chatReceiver":"chatMessage"}>
            <span className="chatName">Name</span>
            This is Message
            <span className="chatTimestamp">{new Date().toUTCString()}</span>
        </p>
     );
}
 
export default Message;