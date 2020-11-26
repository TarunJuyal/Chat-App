import React,{useState} from 'react';
import "./SideBar.css";
import { ChatRounded,MoreVertOutlined,SearchOutlined } from '@material-ui/icons';
import { Avatar,IconButton ,Tooltip,Menu,MenuItem} from "@material-ui/core";
import SideBarChat from './SideBarChat/SideBarChat';
import { useSelector,useDispatch } from "react-redux";
import { logoutUser } from "../../../actions/userActions";
import NewContactForm from "./NewContactForm/NewContactForm";

const SideBar = (props) => {
    let user=useSelector(state=>state.user);
    const dispatch=useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCloseOpen = () => {
        setOpen(false);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout=()=>{
        dispatch(logoutUser().then(response=>{
             if(response.payload.success){
                 window.location.href="/";
             }else{
                 alert("failed to logout",response.payload);
             }
         }))
    }

    return ( 
        <div className="sidebar">
            <div className="sidebarHeader">
                <Avatar src={user?.userData?.image}/>
                <div className="sidebarHeaderRight">
                   <NewContactForm />
                   <Tooltip title="New Group">
                        <IconButton>
                            <ChatRounded />
                        </IconButton>
                   </Tooltip>
                    <Tooltip title="Menu">
                        <IconButton aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={handleClick}>
                            <MoreVertOutlined />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={anchorEl}
                        onClose={handleClose}
                        >
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </div>
            </div>
            <div className="sidebarSearch">
                <div className="sidebarSearchContainer">
                    <SearchOutlined />
                    <input type="text" placeholder="Search or start new chat"/>
                </div>
            </div>
            <div className="sidebarChats">
                <SideBarChat />
                <SideBarChat />
                <SideBarChat />
                <SideBarChat />
            </div>
        </div>
     );
}
 
export default SideBar;