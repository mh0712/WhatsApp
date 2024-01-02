import React, { useState, useRef } from "react";
import "./Chat.css";
import { Avatar } from "@mui/material";
import { AttachFile, SavedSearchOutlined } from "@mui/icons-material";
import { MoreVert, InsertEmoticon } from "@mui/icons-material";
import MicIcon from "@mui/icons-material/Mic";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";

import EmojiPicker from 'emoji-picker-react';


function Chat({ name, lastseen }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const inputRef = useRef(null);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("you typed >>>> ", input);

    // Add the new message to the local state
    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        sender: "user",
        message: input,
        timestamp: getCurrentTimestamp(),
      },
    ]);

    setInput("");
  };

  // Automatically adjust the input field's height based on its content
  const adjustInputHeight = () => {
    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.style.height = "auto";
      inputElement.style.height = `${inputElement.scrollHeight}px`;
    }
  };
  
  const getCurrentTimestamp = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleEmojiClick = (emojiObject) => {
    setInput((prevInput) => prevInput + emojiObject.emoji);
  };
  
  const handleEnterKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); 
      sendMessage(e); 
    }
  }

  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar />
        <div className="chat_headerInfo">
          <h3>{ name }</h3>
          <p>Last seen at ...</p>
        </div>

        <div className="chat_headerRight">
          <IconButton>
            <SavedSearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat_body">
        {messages.map((message) => (
          <p
            key={message.id}
            className={`chat_message ${
            message.sender === "user" && "chat_receiver"
            }`}
          >
            {message.message}
            <span className="chat_timestamp">{message.timestamp}</span>
          </p>
        ))}
      </div>

      <div className="chat_footer">
        <InsertEmoticon onClick={() => setShowEmojiPicker(!showEmojiPicker)} />
        <form action="">
          <textarea
            type="submit"
            ref={inputRef}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              adjustInputHeight();
            }}
            onKeyDown={handleEnterKeyPress}
            placeholder="Type a message"
          />
        </form>
        {input === "" ? (
          <MicIcon />
        ) : (
          <IconButton onClick={sendMessage}>
            <SendIcon />
          </IconButton>
        )}
      </div>

      {showEmojiPicker && (
        <div className="emoji_picker">
          <EmojiPicker
            width={'99.5%'}
            onEmojiClick={(emojiObject) => handleEmojiClick(emojiObject)}
            lazyLoadEmojis={true}
          />
        </div>
      )}
    </div>
  );
}

export default Chat;
