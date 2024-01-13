import React, { useState, useRef } from "react";
import "./ChatHeader.css";
import Avatar from "@mui/material/Avatar";
import { SavedSearchOutlined, AttachFile, MoreVert } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import AttachmentsDropdown from "../Attachements/AttachmentsDropdown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import InfoPage from "../../InfoPage/InfoPage";

function ChatHeader({ name, handleChatInfoClick }) {
  const [isAttachmentsOpen, setAttachmentsOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleAttachmentsClick = () => {
    setAttachmentsOpen((prevOpen) => !prevOpen);
  };

  const handleClose = () => {
    setAttachmentsOpen(false);
  };




  return (
    <div className="chat_header">
      <Avatar />
      <div className="chat_headerInfo" onClick={handleChatInfoClick}>
        <h3>{name}</h3>
        <p>Last seen at ...</p>
      </div>

      <div className="chat_headerRight">
        <IconButton>
          <SavedSearchOutlined />
        </IconButton>
        <IconButton
          ref={anchorRef}
          id="composition-button"
          aria-controls={isAttachmentsOpen ? "composition-menu" : undefined}
          aria-expanded={isAttachmentsOpen ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleAttachmentsClick}
        >
          <AttachFile />
        </IconButton>
        <Popper
          open={isAttachmentsOpen}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
          className="attachement_Popper"
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom-start" ? "left top" : "left bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <AttachmentsDropdown onClose={handleClose} />
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        <IconButton>
          <MoreVert />
        </IconButton>
      </div>
     
    </div>
  );
}

export default ChatHeader;
