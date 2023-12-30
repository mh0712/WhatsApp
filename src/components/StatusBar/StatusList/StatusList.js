import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";

import "./StatusList.css";

const StatusList = () => {
  const [statusList, setStatusList] = useState([
    {
      id: 1,
      username: "John Doe",
      timeAgo: "2 hours ago",
      imageUrl: "url_to_image1",
      viewed: false,
    },
    {
      id: 2,
      username: "Jane Smith",
      timeAgo: "5 hours ago",
      imageUrl: "url_to_image2",
      viewed: false,
    },
    {
      id: 3,
      username: "John Doe",
      timeAgo: "2 hours ago",
      imageUrl: "url_to_image1",
      viewed: false,
    },
    {
      id: 4,
      username: "Jane Smith",
      timeAgo: "5 hours ago",
      imageUrl: "url_to_image2",
      viewed: false,
    },
    {
      id: 5 ,
      username: "Jane Smith",
      timeAgo: "5 hours ago",
      imageUrl: "url_to_image2",
      viewed: false,
    },
    // Add more status objects as needed
  ]);

  const viewedStatuses = statusList.filter((status) => status.viewed);
  const notViewedStatuses = statusList.filter((status) => !status.viewed);

   const handleStatusClick = (id) => {
     const updatedStatusList = statusList.map((status) =>
       status.id === id ? { ...status, viewed: true } : status
     );

     setStatusList(updatedStatusList);
   };

    return (
    <div className="statusList">
      <div className="statusList_section">
        {notViewedStatuses.length > 0 ? (
          notViewedStatuses.map(({ id, username, timeAgo, imageUrl }) => (
            <div
              key={id}
              className="statusList_item"
              onClick={() => handleStatusClick(id)}
            >
              <Avatar src={imageUrl} />
              <div className="statusList_info">
                <h3>{username}</h3>
                <p>{timeAgo}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No recent updates to show right now.</p>
        )}
      </div>
      <div className="statusList_section">
        {viewedStatuses.map(({ id, username, timeAgo, imageUrl }) => (
          <div
            key={id}
            className="statusList_item"
            onClick={() => handleStatusClick(id)}
          >
            <Avatar src={imageUrl} />
            <div className="statusList_info">
              <h3>{username}</h3>
              <p>{timeAgo}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default StatusList;
