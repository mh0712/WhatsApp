import React,{useState} from 'react'
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import StatusBar from '../components/StatusBar/StatusBar';


const StatusPage = () => {
    const [statusList, setStatusList] = useState([
      {
        id: 1,
        username: "John Doe",
        timeAgo: "2 hours ago",
        imageUrl: "url_to_image1",
      },
      {
        id: 2,
        username: "Jane Smith",
        timeAgo: "5 hours ago",
        imageUrl: "url_to_image2",
      },
      
    ]);

    const handleStatusClick = (id) => {
      // Handle the click event to view the selected status
      console.log(`Clicked on status with ID ${id}`);
    };
  return (
    <div className="app">
      <div className="app_body">
       <StatusBar/>
      </div>
    </div>
  );
}

export default StatusPage