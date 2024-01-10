import React, { useEffect, useState } from "react";
import "./ChatBody.css";
import { db } from "../../../firebase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";

function ChatBody({ messages, currentUserUid, selectedChat }) {
  const [groupMessages, setGroupMessages] = useState([]);

  useEffect(() => {
    const fetchGroupMessages = async () => {
      if (selectedChat.isGroup) {
        const groupMessagesCollection = collection(db, "groups", selectedChat.id, "messages");
        const q = query(groupMessagesCollection, orderBy("timestamp"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
          const messagesData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setGroupMessages(messagesData);
        });

        return () => {
          unsubscribe();
        };
      }
    };

    fetchGroupMessages();
  }, [selectedChat]);

  const renderMessages = selectedChat.isGroup ? groupMessages : messages;

  return (
    <div className="chat_body">
      {renderMessages.map((message, i) => (
        <p
          key={message.id}
          className={`chat_message ${
            message.sender === currentUserUid ? "chat_sender" : "chat_receiver"
          } ${i < renderMessages.length - 1 && renderMessages[i + 1]?.sender === message.sender ? "noTail" : ""}`}
        >
          {message.content}
          <span className="chat_timestamp">
          {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        </p>
      ))}
    </div>
  );
}

export default ChatBody;