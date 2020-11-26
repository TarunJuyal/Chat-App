import React from 'react';
import "./ChatWindow.css"
import { Avatar,IconButton,Tooltip} from "@material-ui/core";
import { SearchOutlined,AttachFile,MoreVert,InsertEmoticon,MicRounded } from "@material-ui/icons";
import Message from "./Message/Message";

const ChatWindow = (props) => {
    return ( 
        <div className="chatWindow">
            <div className="chatHeader">
                <Avatar />
                <div className="chatHeaderInfo">
                    <h3>Room Name</h3>
                    <p>Last seen at ...</p>
                </div>
                <div className="chatHeaderRight">
                    <Tooltip title="Search">
                        <IconButton>
                            <SearchOutlined />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Menu">
                        <IconButton>
                            <MoreVert />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
            <div className="chatBody">
                <Message />
                <Message receiver/> 
                <Message />
                <Message receiver/>  
            </div>
            <div className="chatFooter">
                <Tooltip title="Emojis">
                    <IconButton>
                        <InsertEmoticon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Attach">
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                </Tooltip>
                <input type="text" placeholder="Type a message" />
                <Tooltip title="Send Audio">
                    <IconButton>
                        <MicRounded />
                    </IconButton>
                </Tooltip>
            </div>
        </div>
     );
}
 
export default ChatWindow;