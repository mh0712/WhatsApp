import React, { useState } from "react";
import "./AddContactPopup.css";
import { auth, db } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

function AddContactPopup({ onClose, selectedChat }) {
  const [contactName, setContactName] = useState("");
  const { id, name } = selectedChat || {};

  const handleInputChange = (e) => {
    setContactName(e.target.value);
  };

  const handleSaveContact = async () => {
    try {
      const currentUserUid = auth.currentUser?.uid;

      if (currentUserUid) {
        // Get the user's contacts document
        const userContactsRef = doc(db, 'contacts', currentUserUid);
        const userContactsDoc = await getDoc(userContactsRef);

        if (userContactsDoc.exists()) {
          // Document exists, update contacts map with the new name
          await setDoc(userContactsRef, {
            [id]: contactName,
          });

          console.log("Contact updated successfully!");
        } else {
          console.log('User contacts document does not exist');
        }
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
    <div className="add_contact_popup">
      <div className="popup_content">
        <h2>Add Contact</h2>
        <label>
          First Name:
          <input
            type="text"
            value={contactName}
            onChange={handleInputChange}
          />
        </label>
        <div className="popup_buttons">
          <button onClick={handleSaveContact}>Save Contact</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default AddContactPopup;
