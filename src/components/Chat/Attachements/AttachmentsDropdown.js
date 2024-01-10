import React from "react";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Paper from "@mui/material/Paper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import IconButton from "@mui/material/IconButton";
import LocalSeeIcon from "@mui/icons-material/LocalSee";
import CollectionsIcon from "@mui/icons-material/Collections";
import ArticleIcon from "@mui/icons-material/Article";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";

const options = [
  { text: "Camera", icon: <LocalSeeIcon /> },
  { text: "Photo & Video Library", icon: <CollectionsIcon /> },
  { text: "Document", icon: <ArticleIcon /> },
  { text: "Location", icon: <LocationOnIcon /> },
  { text: "Contact", icon: <PermContactCalendarIcon /> },
];

function AttachmentsDropdown({ onClose }) {
  const handleListKeyDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      onClose();
    }
  };

  return (
    <Paper>
      <ClickAwayListener onClickAway={onClose}>
        <MenuList
          autoFocusItem
          id="composition-menu"
          onKeyDown={handleListKeyDown}
        >
          {options.map((option, index) => (
            <MenuItem key={index} onClick={onClose}>
              <IconButton>{option.icon}</IconButton>
              {option.text}
            </MenuItem>
          ))}
        </MenuList>
      </ClickAwayListener>
    </Paper>
  );
}

export default AttachmentsDropdown;
