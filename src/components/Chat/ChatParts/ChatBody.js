import React from "react";
import "./ChatBody.css";

function ChatBody({ messages, currentUserUid }) {
  return (
    <div className="chat_body">
        {messages.map((message, i) => (
          <p
            key={message.id}
            className={`chat_message ${
              message.sender === currentUserUid
                ? "chat_sender"
                : "chat_receiver"
            } ${i < messages.length - 1 && messages[i + 1]?.sender === message.sender ? "noTail" : ""}`}
          >
            {message.content}
            <span className="chat_timestamp">{message.timestamp}</span>
          </p>
        ))}
      </div>
  );
}

export default ChatBody;