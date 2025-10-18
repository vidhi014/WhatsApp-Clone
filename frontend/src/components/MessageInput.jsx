import React, { useState } from "react";
import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const MessageInput = ({ onSend }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      onSend(input);
      setInput("");
    }
  };

  return (
    <div className="chat__footer">
      <input
        type="text"
        placeholder="Type a message"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <IconButton onClick={handleSend}><SendIcon /></IconButton>
    </div>
  );
};

export default MessageInput;
