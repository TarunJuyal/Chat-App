import React from 'react';
import "./ChatWindow.css"
import { Avatar,IconButton,Tooltip} from "@material-ui/core";
import { SearchOutlined,AttachFile,MoreVert,InsertEmoticon,MicRounded } from "@material-ui/icons";
import Message from "./Message/Message";

const ChatWindow = ({roomId, rooms}) => {  
    if(roomId){
       let room = rooms.filter((room)=>roomId===room._id);
       let members=room[0].members.map((member)=>{
            return member.name;
       });
       return ( 
        <div className="chatWindow">
            <div className="chatHeader">
                <Avatar />
                <div className="chatHeaderInfo">
                    <h3>{room[0].name}</h3>
                    <p> {members.join(" ,")}</p>
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
    }else{
        return (
        <div className="noChatSelectedWindow">
            <img src={`https://image.freepik.com/free-vector/characters-of-people-chatting-through-smartphones_53876-43013.jpg`} />
            <h1>Stay Connected To Friends</h1>
         </div>
  ); 
    }
}
 
export default ChatWindow;