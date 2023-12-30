import React from "react";
import './SidebarChat.css'
import { Avatar } from "@mui/material";
import { addDoc, collection } from 'firebase/firestore';
import { db } from "../../../firebase";

function SidebarChat({ id, name, addNewChat, onSelect }) {

  const createChat = async () => {
    const userName = prompt("Please enter name for chat user");

    if (userName) {
      try {
        const docRef = await addDoc(collection(db, 'users'), {
          name: userName,
        });

        console.log("document writtne with ID: ", docRef.id);
      } catch (e) {
        console.log("Error adding document: ", e);
      }
    }
  }

  return !addNewChat ? (
    <div className="sidebarChat" onClick={onSelect}>
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
