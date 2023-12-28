import React, { useState } from 'react';
import './assets/styles/App.css';
import Sidebar from "./components/SideBar/Sidebar.js"
import Chat from './components/Chat/Chat.js';

function App() {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div className="app">
      <div className='app_body'>
        <Sidebar  onSelectChat={(chat) => setSelectedChat(chat)}/>
        {selectedChat && <Chat {...selectedChat}/>}
        
      </div>
    </div>
  );
}

export default App;
