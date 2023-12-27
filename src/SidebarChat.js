import React from "react";
import './SidebarChat.css'
import { Avatar } from "@mui/material";

function SidebarChat({ id, name, addNewChat }) {

  const createChat = () => {
    const roomName = prompt("Please enter name for chat");

    if (roomName) {
      // do some database stuff...
    }
  }

  return !addNewChat ? (
    <div className="sidebarChat">
      <Avatar src=""/>
      <div className="sidebarChat_info">
        <h2>{name}</h2>
        <p>Last message...</p>
      </div>
    </div>
  ) : (
    <div onClick={createChat} 
    className="sidebarChat">
      <h2>Add new Chat</h2>
    </div>
  );
}

export default SidebarChat;
