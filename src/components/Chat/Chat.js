import React, { useState, useRef, useEffect } from "react";
import "./Chat.css";
import { Avatar } from "@mui/material";
import { AttachFile, SavedSearchOutlined } from "@mui/icons-material";
import { MoreVert, InsertEmoticon } from "@mui/icons-material";
import MicIcon from "@mui/icons-material/Mic";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import EmojiPicker from 'emoji-picker-react';
import { auth, db } from "../../firebase";
import { arrayUnion, doc, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";


function Chat({ lastseen, selectedChat }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const inputRef = useRef(null);
  const { id, name } = selectedChat || {};

  useEffect(() => {
    const currentUserUid = auth.currentUser.uid;
    const chatId = [currentUserUid, id.id].sort().join('_');
    const chatDocRef = doc(db, 'chats', chatId);

    // Listen for changes in the chat document
    const unsubscribe = onSnapshot(chatDocRef, (snapshot) =>  {
      if (snapshot.exists()) {
        const chatData = snapshot.data();
        const allMessages = chatData.allMessages || [];
        setMessages(allMessages);
      }
    });

    const checkAndCreateChat = async () => {
      const chatDoc = await getDoc(chatDocRef);
      if (!chatDoc.exists()) {
        // Create a new chat document
        await setDoc(chatDocRef, {
          participants: [currentUserUid, id.id],
          allMessages: [],
        });

        console.log("Chat document created successfully!");
      }
    };

    checkAndCreateChat();

    return () => {
      unsubscribe();
    };
  }, [id]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const currentUserUid = auth.currentUser.uid;
    const chatId = [currentUserUid, id.id].sort().join('_');
    const chatDocRef = doc(db, 'chats', chatId);

    const newMessage = {
      content: input,
      sender: currentUserUid,
      timestamp: getCurrentTimestamp(),
    };

    await updateDoc(chatDocRef, {
      allMessages: arrayUnion(newMessage),
    });
  
    // Check if the other user is in the contacts
    const currentUserContactsRef = doc(db, 'contacts', id.id);
  const currentUserContactsDoc = await getDoc(currentUserContactsRef);

  if (currentUserContactsDoc.exists()) {
    const currentUserContactsData = currentUserContactsDoc.data();
    if (!(currentUserUid in currentUserContactsData)) {
      // If not, add Marc to Celine's contacts
      await setDoc(currentUserContactsRef, {
        [currentUserUid]: currentUserUid,
        ...currentUserContactsData,
      }, { merge: true });
    }
  } else {
    // If contacts document doesn't exist, create it with Marc
    await setDoc(currentUserContactsRef, {
      [currentUserUid]: currentUserUid,
    });
  }

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
          <h3>{ id.name }</h3>
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
        {messages.map((message, i) => (
          <p
            key={message.id}
            className={`chat_message ${
              message.sender === auth.currentUser.uid
                ? "chat_sender"
                : "chat_receiver"
            } ${i < messages.length - 1 && messages[i + 1]?.sender === message.sender ? "noTail" : ""}`}
          >
            {message.content}
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
