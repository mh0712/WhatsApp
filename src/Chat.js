import React, {useState} from "react";
import "./Chat.css";
import { Avatar } from "@mui/material";
import { AttachFile, SavedSearchOutlined } from "@mui/icons-material";
import { MoreVert, InsertEmoticon } from "@mui/icons-material";
import MicIcon from '@mui/icons-material/Mic';
import IconButton from '@mui/material/IconButton';

function Chat() {
    const [input, setInput] = useState("")

    const sendMessage = (e) => {
        e.preventDefault();
        console.log("you typed >>>> ", input)

        setInput("")
    }

  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar />
        <div className="chat_headerInfo">
          <h3>Room name</h3>
          <p>Last seen at...</p>
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
        <p className={`chat_message ${true && 'chat_reciever'}`}>
            Hey Guys
            <span className="chat_timestamp">3:52pm</span>
        </p>
        <p className="chat_message">
          <span className="chat_name">Celine Naddaf</span>
          Hey Guys
        </p>
      </div>

      <div className="chat_footer">
        <InsertEmoticon />
        <form action="">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message" type="text" />
            <button onClick={sendMessage} type="submit">Send a message</button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
