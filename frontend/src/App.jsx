/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Sidebar from "./components/Sidebar.jsx";
// import ChatWindow from "./components/ChatWindow.jsx";
import ContactSidebar from "./components/ContactSidebar.jsx";
import MainBody from "./components/MainBody.jsx";
import "./App.css";

function App() {
  const [selectedChat, setSelectedChat] = useState(null);

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
  }

  return (
    <div className="app">
      <div className="whatsapp-container">
        {/* <Sidebar /> */}
        <ContactSidebar onSelectChat={handleSelectChat} activeChat={selectedChat?.id} />
        {/* <ChatWindow /> */}
        <MainBody selectedChat={selectedChat} />
      </div>
    </div>
  );
}

export default App;
