import React, { useState,useEffect } from "react";
import { Modal, Button, Input,ConfigProvider } from "antd";
import { auth, db } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import "./AddContactPopup.css";

const AddContactPopup = ({ open, onClose, selectedChat }) => {
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

        if (userContactsDoc.exists()) {
          const currentContacts = userContactsDoc.data();
          currentContacts[selectedChat.id] = contactName;

          await setDoc(userContactsRef, currentContacts);

          console.log("Contact updated successfully!");
        } else {
          console.log("User contacts document does not exist");
          await setDoc(userContactsRef, {
            [selectedChat]: contactName,
          });
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

   useEffect(() => {
     // Set the initial contactName when the component mounts
     setContactName(selectedChat.name || "");
   }, [selectedChat]);

  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadiusLG: 0,
        },
        components: {
          Input: {
            hoverBorderColor: "#128c7e",
            activeBorderColor: "#128c7e",
          },
          Modal: {
            footerBg: "#F5F5F5",
          }}}}>
    <Modal
      visible={open}
      onCancel={onClose}
      centered
      destroyOnClose
      footer={null}
      className="EditContact_container"
    >
      <div className="EditContact_content">
        <h2 className="EditContact_title">Edit Contact</h2>
        <Input
          placeholder="Name"
          value={contactName}
          onChange={handleInputChange}
          className="editcontact_Input"
        />
      </div>
      <div className="EditContact_actions">
        <Button
          onClick={handleCancelClick}
          type="danger"
          className="cancel_button"
        >
          Cancel
        </Button>
        <Button onClick={handleSaveContact} type="primary" className="Button">
          Save Changes
        </Button>
        <Button onClick={handleSaveContact} danger className="delete_Button">
          Delete Contact
        </Button>
      </div>
    </Modal>
    </ConfigProvider>
  );
};

export default AddContactPopup;
