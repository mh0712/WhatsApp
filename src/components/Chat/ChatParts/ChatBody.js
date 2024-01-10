import React from "react";
import "./ChatBody.css";
import UseChatEffect from "../UseChatEffect";

function ChatBody({ currentUserUid, selectedChat }) {
  const { messages } = UseChatEffect(selectedChat);

  return (
    <div className="chat_body">
      {messages.map((message, i) => (
        <p
          key={message.id}
          className={`chat_message ${
            message.sender === currentUserUid ? "chat_sender" : "chat_receiver"
          } ${i < messages.length - 1 && messages[i + 1]?.sender === message.sender ? "noTail" : ""}`}
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