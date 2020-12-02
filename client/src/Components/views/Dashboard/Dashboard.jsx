import React,{useState,useEffect} from 'react';
import SideBar from "../Sidebar/SideBar";
import ChatWindow from "../ChatWindow/ChatWindow";
import "./Dashboard.css";
import axios from "axios";
import { useSelector } from "react-redux";

import { useParams } from "react-router-dom";

const Dashboard = (props) => {
    let user=useSelector(state=>state.user);
    const { roomId }=useParams();
    const [Rooms, setRooms] = useState([]);
    const [messages, setmessages] = useState([]);
 
    const updateRooms= (room) => {
        setRooms(Rooms.concat(room));
    }

    const updateMessages= (message) => {
        setmessages(messages.concat(message))
    }

    useEffect(()=>{
        axios.post(`/api/messages/getMessages`,{roomId:roomId}).then((response)=>{
            if(response.data.success){
                setmessages(response.data.messages);
            }else{
                alert("Failed to get room details.")
            }
        })
    },[roomId,messages]);

    useEffect(()=>{
        axios.post("/api/room/getRooms",{userId:user?.userData?._id}).then((response)=>{
            if(response.data.success){
                setRooms(response.data.roomDetail);
            }else{
                alert("Failed to get room details");
            }
        })
    },[user?.userData?._id,roomId]);


    return ( 
        <div className="dashboard">
            <div className="dashboardBody">
                <SideBar rooms={Rooms} onChange={updateRooms}/>
                <ChatWindow roomId={roomId} messages={messages} onChange={updateMessages}/> 
            </div>
        </div>
     );
}

export default Dashboard;