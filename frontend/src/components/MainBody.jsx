
import React, { useState, useRef, useEffect } from 'react';
import '../style/Mainbody.css';

const MainBody = ({ selectedChat }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello!', sender: 'them', time: '10:25 AM' },
    { id: 2, text: 'Hi there!', sender: 'me', time: '10:26 AM' },
    { id: 3, text: 'How are you doing?', sender: 'them', time: '10:27 AM' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const message = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  if (!selectedChat) {
    return (
      <div className="main-body no-chat-selected">
        <div className="welcome-message">
          <h2>Welcome to WhatsApp</h2>
          <p>Select a chat to start messaging</p>
        </div>
      </div>
    );
  }

  return (
    <div className="main-body">
      {/* Chat Header */}
      <div className="chat-header">
        <div className="chat-user-info">
          <img src={selectedChat.avatar} alt={selectedChat.name} className="chat-user-avatar" />
          <div className="chat-user-details">
            <span className="chat-user-name">{selectedChat.name}</span>
            <span className="chat-status">online</span>
          </div>
        </div>
        <div className="chat-actions">
          <button className="icon-btn">🔍</button>
          <button className="icon-btn">⋮</button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="messages-container">
        <div className="messages-list">
          {messages.map(message => (
            <div
              key={message.id}
              className={`message ${message.sender === 'me' ? 'sent' : 'received'}`}
            >
              <div className="message-bubble">
                <p>{message.text}</p>
                <span className="message-time">{message.time}</span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="message-input-container">
        <form onSubmit={handleSendMessage} className="message-form">
          <div className="input-actions">
            <button type="button" className="icon-btn">😊</button>
            <button type="button" className="icon-btn">📎</button>
          </div>
          <input
            type="text"
            placeholder="Type a message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="message-input"
          />
          <button type="submit" className="send-button">
            ➤
          </button>
        </form>
      </div>
    </div>
  );
};

export default MainBody;