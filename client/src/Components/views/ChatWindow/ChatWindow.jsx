import React, { useEffect, useState  } from 'react';
import "./ChatWindow.css"
import { Avatar,IconButton,Tooltip} from "@material-ui/core";
import { SearchOutlined,AttachFile,MoreVert,InsertEmoticon,MicRounded } from "@material-ui/icons";
import Message from "./Message/Message";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import moment from "moment";
import { useSelector } from "react-redux";

const ChatWindow = ({ roomId, onChange, messages }) => { 
    const [currentRoom, setcurrentRoom] = useState({});
    const user=useSelector((state)=>state.user);

    useEffect(()=>{
        axios.post(`/api/room/getRoomDetails`,{roomId:roomId}).then((response)=>{
            if(response.data.success){
                setcurrentRoom(response.data.room[0]);
            }else{
                alert("Failed to get room details.")
            }
        })
    },[roomId]);

    const handleKeyUp=(e)=>{
        if (e.key === 13) {
                e.preventDefault();
                handleSubmit();
            }
    }

    const renderMembers=()=>{
           let members=currentRoom.members.map((member)=>{
            return member.name;
            });
           return members.join(" , ")
    }

    const validationSchema=Yup.object({
        message: Yup.string().min(1).required(),
    })

    const { handleSubmit, handleChange, values}=useFormik({
        initialValues:{
            message:"",
        },
        validationSchema,
        onSubmit(values,{ setSubmitting }){
          let variable={
              roomId:currentRoom._id, 
              from:user?.userData?._id, 
              content:values.message, 
              sentAt:moment().format("ddd, MM-D-YYYY, LT")
            }
          axios.post('/api/messages/save',variable).then((response)=>{
              if(response.data.success){
                onChange(response.data.message);
              }else{
                  alert("Failed to send msg");
              }
          })
          values.message="";
          setSubmitting(false);
    }
  })

  const renderMessages=messages.map((message,index)=>{
      return (
          <Message
          key={index} 
          from={message.from.name}
          content={message.content}
          sentAt={message.sentAt}
          receiver={user?.userData?._id===message.from._id}
           />
      )
  })

    if(roomId && currentRoom){
       return ( 
        <div className="chatWindow">
            <div className="chatHeader">
                <Avatar />
                <div className="chatHeaderInfo">
                    <h3>{currentRoom.name}</h3>
                    <p> {currentRoom?.members && renderMembers()}</p>
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
                {currentRoom && messages && renderMessages}
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
                <form onSubmit={handleSubmit} autoComplete="off">
                    <input 
                    id="message"
                    name="message"
                    className="input-text" 
                    type="text" 
                    placeholder="Type a message" 
                    value={values.message}
                    onChange={handleChange}
                    onKeyUp={(e)=>handleKeyUp(e)}
                    />
                </form>
                <Tooltip title="Send Audio">
                    <IconButton>
                        <MicRounded />
                    </IconButton>
                </Tooltip>
            </div>
        </div>
     );
    }else if(!roomId){
        return (
        <div className="noChatSelectedWindow">
            <img alt="chat-pic" src={`https://image.freepik.com/free-vector/characters-of-people-chatting-through-smartphones_53876-43013.jpg`} />
            <h1>Stay Connected To Friends</h1>
         </div>
  ); 
    }
}
 
export default ChatWindow;