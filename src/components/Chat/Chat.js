import React, { useState, useRef } from "react";
import "./Chat.css";
import { auth } from "../../firebase";
import ChatHeader from "./ChatParts/ChatHeader";
import ChatBody from "./ChatParts/ChatBody";
import ChatFooter from "./ChatParts/ChatFooter";
import UseChatEffect from "./UseChatEffect";
import UseSendMessage from "./UseSendMessage";

function Chat({ lastseen, selectedChat }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const inputRef = useRef(null);
  const { id, name } = selectedChat || {};

  UseChatEffect(selectedChat, setMessages);
  const sendMessage = () => UseSendMessage(input, selectedChat, setInput);

  const handleEmojiClick = (emojiObject) => {
    setInput((prevInput) => prevInput + emojiObject.emoji);
  };

  // console.log(selectedChat)

  const adjustInputHeight = () => {
    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.style.height = "auto";
      inputElement.style.height = `${inputElement.scrollHeight}px`;
    }
  };

  const handleEnterKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat">
      <ChatHeader name={name} />
      <ChatBody messages={messages} currentUserUid={auth.currentUser.uid} />
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
