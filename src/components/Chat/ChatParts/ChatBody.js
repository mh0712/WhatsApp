import React, { useEffect, useState } from "react";
import "./ChatBody.css";
import { db } from "../../../firebase";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  doc,
} from "firebase/firestore";
import UseChatEffect from "../UseChatEffect";

const availableColors = [
  "#4CAF50", // Green
  "#2196F3", // Blue
  "#FFC107", // Yellow
  "#FF9800", // Orange
  "#E91E63", // Pink
  "#673AB7", // Purple
  "#00BCD4", // Cyan
  "#009688", // Teal
  "#FF5722", // Deep Orange
  "#607D8B", // Blue Grey
  "#795548", // Brown
  "#3F51B5", // Indigo
  "#FFEB3B", // Yellow (Amber)
  "#9C27B0", // Purple
  "#03A9F4", // Light Blue
  "#FF5252", // Red
  "#8BC34A", // Light Green
  "#FFD700", // Gold
  "#00FF00", // Lime
  "#FF1493", // Deep Pink
];

function ChatBody({ currentUserUid, selectedChat }) {
  const [groupMessages, setGroupMessages] = useState([]);
  const [contacts, setContacts] = useState([]);

  const senderColorMap = {};

  useEffect(() => {
    const fetchGroupMessages = async () => {
      if (selectedChat.isGroup) {
        const groupMessagesCollection = collection(
          db,
          "groups",
          selectedChat.id,
          "messages"
        );
        const q = query(groupMessagesCollection, orderBy("timestamp"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
          const messagesData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setGroupMessages(messagesData);
        });

        return () => {
          unsubscribe();
        };
      }
    };

    fetchGroupMessages();
  }, [selectedChat]);

  const getSenderName = (senderId) => {
    const contact = contacts.find((contact) => contact.uid === senderId);
    return contact ? contact.name : senderId;
  };

 const getSenderColor = (senderId) => {
   // Check if the sender color is already stored in local storage
   const storedColor = localStorage.getItem(`senderColor_${senderId}`);

   if (storedColor) {
     return storedColor;
   } else {
     // If the sender doesn't have a color assigned yet, randomly choose one from availableColors
     const randomColor =
       availableColors[Math.floor(Math.random() * availableColors.length)];
     senderColorMap[senderId] = randomColor;

     // Store the sender color in local storage
     localStorage.setItem(`senderColor_${senderId}`, randomColor);

     return randomColor;
   }
 };


  useEffect(() => {
    // Fetch contacts collection
    const docRef = doc(db, "contacts", currentUserUid);

    const unsubscribeContacts = onSnapshot(docRef, (snapshot) => {
      const data = snapshot.exists() ? snapshot.data() : {};
      const contactsArray = Object.entries(data).map(([uid, name]) => ({
        uid,
        name,
      }));
      setContacts(contactsArray);
    });

    return () => {
      unsubscribeContacts();
    };
  }, [currentUserUid]);

  const messages = UseChatEffect(selectedChat)[0];

  const renderMessages = selectedChat.isGroup ? groupMessages : messages;
  let lastSenderId = null;

  return (
    <div className="chat_body">
      {renderMessages &&
        renderMessages.map((message, i) => {
          const isDifferentSender = message.sender !== lastSenderId;
          const isFirstMessage = i === 0 || isDifferentSender;

          // Update lastSenderId for the next iteration
          lastSenderId = message.sender;

          return (
            <p
              key={message.id}
              className={`chat_message ${
                message.sender === currentUserUid
                  ? "chat_sender"
                  : "chat_receiver"
              } ${
                i < renderMessages.length - 1 &&
                renderMessages[i + 1]?.sender === message.sender
                  ? "noTail"
                  : ""
              }`}
            >
              {selectedChat.isGroup && (
                <span className="sender_name">
                  {isFirstMessage && (currentUserUid != message.sender) && (
                    <React.Fragment>
                      <span style={{ color: getSenderColor(message.sender),fontWeight:"bolder" }}>
                        {getSenderName(message.sender)}
                      </span>
                      <br />
                    </React.Fragment>
                  )}
                  <p>{message.content}</p>
                </span>
              )}

              <span className="chat_timestamp">
                {new Date(message.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </p>
          );
        })}
    </div>
  );
}

export default ChatBody;