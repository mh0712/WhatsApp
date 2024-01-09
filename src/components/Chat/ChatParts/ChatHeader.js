import React from "react";
import Avatar from "@mui/material/Avatar";
import { SavedSearchOutlined, AttachFile, MoreVert } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

function ChatHeader({ name }) {
    return (
      <div className="chat_header">
        <Avatar />
        <div className="chat_headerInfo">
          <h3>{name}</h3>
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
    );
}

export default ChatHeader;