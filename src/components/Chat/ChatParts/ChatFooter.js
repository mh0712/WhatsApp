// ChatFooter.js
import React from "react";
import "./ChatFooter.css";
import { InsertEmoticon, Mic } from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import EmojiPicker from 'emoji-picker-react';

function ChatFooter({
  showEmojiPicker,
  handleEmojiClick,
  adjustInputHeight,
  input,
  handleEnterKeyPress,
  sendMessage,
  setShowEmojiPicker, 
  inputRef,          
  setInput,
}) {
  return (
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
        <Mic />
      ) : (
        <IconButton onClick={sendMessage}>
          <SendIcon />
        </IconButton>
      )}

      {showEmojiPicker && (
        <div className="emoji_picker">
          <EmojiPicker
            width={'99.5%'}
            onEmojiClick={handleEmojiClick}
            lazyLoadEmojis={true}
          />
        </div>
      )}
    </div>
  );
}

export default ChatFooter;
