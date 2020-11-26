import React,{useState,useEffect} from 'react';
import SideBar from "../Sidebar/SideBar";
import ChatWindow from "../ChatWindow/ChatWindow";
import "./Dashboard.css";
import axios from "axios";
import { useSelector } from "react-redux";

const Dashboard = (props) => {
    let user=useSelector(state=>state.user);
    const [Rooms, setRooms] = useState([]);

    useEffect(()=>{
        axios.post("/api/room/getRoomDetails",{userId:user?.userData?._id}).then((response)=>{
            if(response.data.success){
                console.log(response.data.roomDetail);
                setRooms(response.data.roomDetail);
            }else{
                alert("Failed to get room details");
            }
        })
    },[user?.userData?._id]);

        return ( 
        <div className="dashboard">
            <div className="dashboardBody">
                <SideBar rooms={Rooms}/>
                <ChatWindow roomId={props.match.params.roomId} rooms={Rooms}/> 
            </div>
        </div>
     );
}

export default Dashboard;