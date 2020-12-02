import React from 'react';
import "./Message.css";

const Message = ({ from, receiver,content, sentAt }) => {
    return ( 
        <p className={receiver ? "chatReceiver chatMessage":"chatMessage"}>
            <span className="chatName">{from}</span>
            {content}
            <span className="chatTimestamp">{sentAt}</span>
        </p>
     );
}
 
export default Message;