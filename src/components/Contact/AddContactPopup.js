import React, { useState } from "react";
import { auth, db } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function AddContactPopup({open, onClose, selectedChat }) {
  console.log("Rendering AddContactPopup");
  const [contactName, setContactName] = useState("");
  const { id } = selectedChat || {};

  const handleInputChange = (e) => {
    setContactName(e.target.value);
  };

  const handleSaveContact = async () => {
    try {
      const currentUserUid = auth.currentUser?.uid;

      if (currentUserUid) {
        const userContactsRef = doc(db, "contacts", currentUserUid);
        const userContactsDoc = await getDoc(userContactsRef);

        const updatedContacts = {
          ...userContactsDoc.data(),
          [id]: contactName,
        };

        await setDoc(userContactsRef, updatedContacts);

        console.log("Contact updated successfully!");
      }
    } catch (error) {
      console.error("Error updating contact:", error);
    }

    onClose();
  };

  const handleCancelClick = () => {
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      className="Dialog_container"
    >
      <DialogTitle className="Dialog_title">Edit Contact</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          value={contactName}
          onChange={handleInputChange}
          className="editcontact_TextField"
          color="success"
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleCancelClick}
          color="secondary"
          className="cancel_button"
        >
          Cancel
        </Button>
        <Button onClick={handleSaveContact} color="primary" className="Button">
          Save Changes
        </Button>

        <Button onClick={handleSaveContact} color="error" className="delete_Button">
          Delete Contact
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddContactPopup;
