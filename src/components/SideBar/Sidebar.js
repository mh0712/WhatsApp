import React, { useState, useEffect } from "react";
import { onSnapshot, doc, collection } from "firebase/firestore";
import { db, auth } from "../../firebase";
import "./Sidebar.css";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import Groups2Icon from "@mui/icons-material/Groups2";
import SidebarChat from "./SidebarChat/SidebarChat.js";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import GroupCreationPopup from "../Group/GroupCreationPopup.js"
import TextField from "@mui/material/TextField";
import { Input } from "@mui/material";

function Sidebar({ onSelectChat, onAddContactClick }) {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [groups, setGroups] = useState([]);
  const [isGroupCreationOpen, setGroupCreationOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const currentUserUid = user.uid;

        // Fetch contacts collection
        const docRef = doc(db, "contacts", currentUserUid);

        const unsubscribeContacts = onSnapshot(docRef, (snapshot) => {
          const data = snapshot.exists() ? snapshot.data() : {};
          const contactsArray = Object.entries(data).map(([uid, name]) => ({
            uid,
            name,
          }));
          setContacts(contactsArray);
        });

                // Fetch groups collection
                const groupsCollectionRef = collection(db, 'groups');
                const unsubscribeGroups = onSnapshot(groupsCollectionRef, (groupsSnapshot) => {
                    const groupsArray = groupsSnapshot.docs.map((groupDoc) => {
                        const { name, members } = groupDoc.data();
                        
                        // Only include groups where the current user is a member
                        if (members && members.includes(currentUserUid)) {
                            return { id: groupDoc.id, name };
                        }
                        return null;
                    })
                    setGroups(groupsArray);
                });
    
                return () => {
                    unsubscribeContacts();
                    unsubscribeGroups();
                };
            }
        });
    
        return () => {
            unsubscribeAuth();
        };
    }, []);

  const handleStatusClick = () => {
    navigate("/StatusPage");
  };

  const handleOpenGroupCreation = () => {
    setGroupCreationOpen(true);
  };

  const handleCloseGroupCreation = () => {
    setGroupCreationOpen(false);
  };

  const handleCreateGroup = (groupName, members) => {
    // Implement logic to create a group in your main Chat component
    // You may use a function similar to the createGroup function provided in the previous response
  };

  // Filter contacts and groups based on the search term

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar />
        <div className="sidebar_headerRight">
          <IconButton onClick={handleStatusClick}>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="sidebar_search">
        <TextField
          placeholder="Search or start new chat"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <IconButton>
                <SearchOutlined />
              </IconButton>
            ),
            style: {
              borderRadius: "50px",
              width: "100%",
              height: "36px",
              backgroundColor: "white",
            },
          }}
          color="success"
        />
        <IconButton onClick={handleOpenGroupCreation}>
          <Groups2Icon />
        </IconButton>

        <GroupCreationPopup
          open={isGroupCreationOpen}
          onClose={handleCloseGroupCreation}
          onCreateGroup={handleCreateGroup}
          memberList={contacts}
        />
      </div>
      <div className="sidebar_chats">
        <SidebarChat addNewChat />
        {filteredContacts.map((contact) => (
          <SidebarChat
            key={contact.uid}
            id={contact.uid}
            name={contact.name || contact.uid}
            onSelect={() =>
              onSelectChat({ id: contact.uid, name: contact.name })
            }
            onAddContactClick={onAddContactClick}
          />
        ))}

        {filteredGroups.map(
          (group) =>
            group && (
              <SidebarChat
                key={group.id}
                id={group.id}
                name={group.name}
                onSelect={() =>
                  onSelectChat({
                    id: group.id,
                    name: group.name,
                    isGroup: true,
                  })
                }
              />
            )
        )}
      </div>
    </div>
  );
}

export default Sidebar;
