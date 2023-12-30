import React from 'react'
import DataSaverOnIcon from "@mui/icons-material/DataSaverOn";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import "./StatusBar.css"
import { Avatar } from '@mui/material';
import { useNavigate } from "react-router-dom";


const StatusBar = () => {
  const navigate = useNavigate();

  const handleChatClick = () => {
    navigate("/ChattingPage");
  };

  return (
    <div className="status">
      <div className="statusbar_header">
        <Avatar />
        <div className="statusbar_headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton onClick={handleChatClick}>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="userStatus">
        <div className="userStatus_info">
          <IconButton>
            <DataSaverOnIcon fontSize="large" />
          </IconButton>
          <div className="userStatus_text">
            <h2>My Status</h2>
            <p>add to my status</p>
          </div>
          <div className="userStatus_right">
            <IconButton>
              <PhotoCamera fontSize="small" />
            </IconButton>
            <IconButton>
              <EditIcon fontSize="small" />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatusBar