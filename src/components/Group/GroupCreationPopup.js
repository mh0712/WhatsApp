import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import "./GroupCreationPopup.css";
import { Avatar, IconButton } from "@mui/material";

const icon = (
  <div
    style={{
      borderRadius: "50%",
      width: "12px", // Adjust the width of the circle
      height: "12px", // Adjust the height of the circle
      backgroundColor: "#fff", // Adjust the background color of the circle
      border: "2px solid #f5f5f5", // Adjust the border style
    }}
  />
);
const checkedIcon = <div
                    style={{
                      borderRadius: "50%",
                      width: "12px", // Adjust the width of the circle
                      height: "12px", // Adjust the height of the circle
                      backgroundColor: "#60c6ba", // Adjust the background color of the circle when checked
                      border: "2px solid #e7f8f6 ", // Adjust the border style when checked
                    }}
                  />;
function stringAvatar(name) {
  if (name && name.split(" ")[0] && name.split(" ")[1]) {
    return {
      sx: 
      {
       bgcolor: "grey",
        width: 16,
        height: 16,
      
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  } else if (name && name.split(" ")[0]){
    return {
      sx: {
        bgcolor: "grey",
      },
      children: `${name.split(" ")[0][0]}`,
    };
  }
}
const GroupCreationPopup = ({ open, onClose, onCreateGroup, memberList }) => {
  const [groupName, setGroupName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (Array.isArray(memberList)) {
      const filtered = memberList.filter(
        (member) =>
          member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.uid.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMembers(filtered);
    } else {
      console.error("Member list is not an array:", memberList);
      setFilteredMembers([]);
    }
  }, [searchTerm, memberList]);

  const handleCreateGroup = () => {
    if (groupName && selectedMembers.length > 0) {
      onCreateGroup(groupName, selectedMembers);
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      className="Dialog_container"
      style={{borderRadius:"0"}}
    >
      <DialogTitle className="Dialog_title">Create Group</DialogTitle>
      <DialogContent>
        <TextField
          label="Group name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="groupname_TextField"
          // margin="dense"
          color="success"
          required
          variant="standard"
        />

        <Autocomplete
          multiple
          id="members-checkboxes"
          options={filteredMembers}
          disableCloseOnSelect
          getOptionLabel={(option) => option.name}
          renderOption={(props, option, { selected }) => (
            <li {...props} className="CheckboxList_item">
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                checked={selected}
                className="Checkbox"
              />
              {option && option.name && (
                <>
                  <Avatar className="Avatar" {...stringAvatar(option.name)} />
                  {"  "}
                  {option.name}
                  {"  "}
                </>
              )}
            </li>
          )}
          className="Autocomplete"
          onChange={(_, newValue) => setSelectedMembers(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Members"
              placeholder="Search"
              className="selectmembers_TextField"
              color="success"
              variant="standard"
            />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" className="cancel_button">
          Cancel
        </Button>
        <Button
          onClick={handleCreateGroup}
          color="secondary"
          className="Button"
        >
          Create Group
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GroupCreationPopup;
