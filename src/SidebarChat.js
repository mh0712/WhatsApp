import React from "react";
import './SidebarChat.css'
import { Avatar } from "@mui/material";
import { addDoc, collection } from 'firebase/firestore';
import { db } from "./firebase";

function SidebarChat({ id, name, addNewChat }) {

  const createChat = async () => {
    const roomName = prompt("Please enter name for chat room");

    if (roomName) {
      try {
        const docRef = await addDoc(collection(db, 'rooms'), {
          name: roomName,
        });

        console.log("document writtne with ID: ", docRef.id);
      } catch (e) {
        console.log("Error adding document: ", e);
      }
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
