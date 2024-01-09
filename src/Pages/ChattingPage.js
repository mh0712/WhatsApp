import React, { useState } from "react";
import Sidebar from "../components/SideBar/Sidebar.js";
import Chat from "../components/Chat/Chat.js";
import AddContactPopup from "../components/Contact/AddContactPopup";

const ChattingPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [otherUserId, setOtherUserId] = useState(null);

  const handleAddContactClick = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handleSelectChat = (id, name) => {
    setSelectedChat({ id, name });
  };

  return (
    <div className="app">
      <div className="app_body">
        <Sidebar
          onSelectChat={handleSelectChat}
          onAddContactClick={handleAddContactClick}
        />
        {selectedChat && (
          <Chat
            {...selectedChat}
            selectedChat={selectedChat}
            otherUserId={otherUserId}
          />
        )}
      </div>
      {isPopupOpen && (
        <AddContactPopup
          selectedChat={selectedChat}
          onClose={handlePopupClose}
          open={isPopupOpen}
        />
      )}
    </div>
  );
};

export default ChattingPage;
