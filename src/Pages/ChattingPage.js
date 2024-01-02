import React, { useState } from "react";
import Sidebar from "../components/SideBar/Sidebar.js";
import Chat from "../components/Chat/Chat.js";
import AddContactPopup from "../components/Contact/AddContactPopup";

const ChattingPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleAddContactClick = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="app">
      <div className="app_body">
        <Sidebar
          onSelectChat={(chat) => setSelectedChat(chat)}
          onAddContactClick={handleAddContactClick}
        />
        {selectedChat && <Chat {...selectedChat} />}
      </div>
      {isPopupOpen && <AddContactPopup selectedChat={selectedChat} onClose={handlePopupClose} />}
    </div>
  );
};

export default ChattingPage;
