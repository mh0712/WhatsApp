import React from "react";
import './SidebarChat.css'
import { Avatar } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from '@mui/material/IconButton';

function SidebarChat({ id, name, addNewChat, onSelect, onAddContactClick }) {

  return !addNewChat ? (
    <div className="sidebarChat" onClick={onSelect}>
      <Avatar src=""/>
      <div className="sidebarChat_info">
        <h2>{name}</h2>
        <p>Last message...</p>
      </div>
      <div className="add_button">
        <IconButton onClick={onAddContactClick}>
          <EditIcon />
        </IconButton>
      </div>
    </div>
  ) : (
    <div className="sidebarChat">
      <h2>Add new Chat</h2>
    </div>
  );
}

export default SidebarChat;
