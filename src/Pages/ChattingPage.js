import React, { useState } from "react";
import Sidebar from "../components/SideBar/Sidebar.js";
import Chat from "../components/Chat/Chat.js";
import AddContactPopup from "../components/Contact/AddContactPopup";
import InfoPage from "../components/InfoPage/InfoPage.js";

const ChattingPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isInfoOpen, setInfoOpen] = useState(false);

  const handleAddContactClick = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handleSelectChat = (user) => {
    setSelectedChat(user);
  };

const handleChatInfoClick = () => {
  setInfoOpen(!isInfoOpen);
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
            selectedChat={selectedChat}
            handleChatInfoClick={handleChatInfoClick}
          />
        )}
      </div>
      {isInfoOpen && <InfoPage selectedChat={selectedChat} />}
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
