import React from "react";
import { Avatar, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ChatHeader = ({ name }) => {
  return (
    <div className="chat__header">
      <Avatar src="https://i.pravatar.cc/150?img=5" />
      <div className="chat__headerInfo">
        <h3>{name}</h3>
        <p>Online</p>
      </div>
      <div className="chat__headerRight">
        <IconButton><SearchIcon /></IconButton>
        <IconButton><AttachFileIcon /></IconButton>
        <IconButton><MoreVertIcon /></IconButton>
      </div>
    </div>
  );
};

export default ChatHeader;
