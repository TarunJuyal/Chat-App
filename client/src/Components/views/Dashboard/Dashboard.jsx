import React from 'react';
import SideBar from "../Sidebar/SideBar";
import ChatWindow from "../ChatWindow/ChatWindow";
import "./Dashboard.css";

const Dashboard = (props) => {
    return ( 
        <div className="dashboard">
            <div className="dashboardBody">
                <SideBar />
                <ChatWindow /> 
            </div>
        </div>
     );
}
 
export default Dashboard;