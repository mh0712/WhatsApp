import React,{useState} from 'react'
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import StatusBar from '../components/StatusBar/StatusBar';
import StatusList from '../components/StatusBar/StatusList/StatusList';


const StatusPage = () => {
  return (
    <div className="app">
      <div className="app_body">
       <StatusBar/>
      </div>
    </div>
  );
}

export default StatusPage