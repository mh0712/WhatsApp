import React, { useState, useRef } from "react";
import "./Chat.css";
import { auth } from "../../firebase";
import ChatHeader from "./ChatParts/ChatHeader";
import ChatBody from "./ChatParts/ChatBody";
import ChatFooter from "./ChatParts/ChatFooter";
import InfoPage from "../InfoPage/InfoPage";
import UseSendMessage from "./UseSendMessage";

function Chat({ lastseen, selectedChat, handleChatInfoClick }) {
  const [input, setInput] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const inputRef = useRef(null);
  const { name } = selectedChat || {};

  const sendMessage = () => UseSendMessage(input, selectedChat, setInput);

  const handleEmojiClick = (emojiObject) => {
    setInput((prevInput) => prevInput + emojiObject.emoji);
  };

  const adjustInputHeight = () => {
    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.style.height = "auto";
      inputElement.style.height = `${inputElement.scrollHeight}px`;
    }
  };

  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat">
      <ChatHeader name={name} handleChatInfoClick={handleChatInfoClick} />

      <ChatBody
        currentUserUid={auth.currentUser.uid}
        selectedChat={selectedChat}
      />
      <ChatFooter
        showEmojiPicker={showEmojiPicker}
        handleEmojiClick={handleEmojiClick}
        adjustInputHeight={adjustInputHeight}
        input={input}
        handleEnterKeyPress={handleEnterKeyPress}
        sendMessage={sendMessage}
        setShowEmojiPicker={setShowEmojiPicker}
        inputRef={inputRef}
        setInput={setInput}
      />
    </div>
  );
}

export default Chat;
