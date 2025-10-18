import React, { useState } from 'react';
import '../style/Sidebar.css';
import { 
  PersonRounded, 
  ChatRounded, 
  MoreVertRounded, 
  SearchRounded,
  SmartToyRounded
} from '@mui/icons-material';

const ContactSidebar = ({ onSelectChat, activeChat }) => {
  const [chats] = useState([
    {
      id: 1,
      name: 'John Doe',
      lastMessage: 'Hey, how are you?',
      time: '10:30 AM',
      unread: 2,
      avatar: 'https://via.placeholder.com/40'
    },
    {
      id: 2,
      name: 'Jane Smith',
      lastMessage: 'Meeting at 3 PM',
      time: '9:15 AM',
      unread: 0,
      avatar: 'https://via.placeholder.com/40'
    },
    {
      id: 3,
      name: 'Work Group',
      lastMessage: 'Sarah: Project update ready',
      time: 'Yesterday',
      unread: 5,
      avatar: 'https://via.placeholder.com/40'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAIClick = () => {
    console.log('AI Assistant clicked');
  };

  return (
    <div className="sidebar">
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <div className="user-profile">
          <div className="profile-pic">
            <PersonRounded className="profile-icon" />
          </div>
          <span className="user-name">Your Name</span>
        </div>
        <div className="header-actions">
          <button className="icon-btn"><ChatRounded /></button>
          <button className="icon-btn"><MoreVertRounded /></button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="search-container">
        <div className="search-box">
          <SearchRounded className="search-icon" />
          <input
            type="text"
            placeholder="Search or start new chat"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* Chats List */}
      <div className="chats-list">
        {filteredChats.map(chat => (
          <div
            key={chat.id}
            className={`chat-item ${activeChat === chat.id ? 'active' : ''}`}
            onClick={() => onSelectChat(chat)}
          >
            <img src={chat.avatar} alt={chat.name} className="chat-avatar" />
            <div className="chat-info">
              <div className="chat-header">
                <span className="chat-name">{chat.name}</span>
                <span className="chat-time">{chat.time}</span>
              </div>
              <div className="chat-preview">
                <span className="last-message">{chat.lastMessage}</span>
                {chat.unread > 0 && (
                  <span className="unread-badge">{chat.unread}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="ai-assistant-container">
        <button className="ai-assistant-btn" onClick={handleAIClick}>
          <SmartToyRounded className="ai-icon" />
          <span className="ai-tooltip">AI Assistant</span>
        </button>
      </div>
    </div>
  );
};

export default ContactSidebar;