import React, { useState, useEffect } from "react";
import { onSnapshot, doc, collection } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import "./Sidebar.css";
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import SidebarChat from "./SidebarChat/SidebarChat.js";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";


function Sidebar({ onSelectChat, onAddContactClick }) {
    const [contacts, setContacts] = useState([]);
    const [groups, setGroups] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            if (user) {
                const currentUserUid = user.uid;

                // Fetch contacts collection
                const docRef = doc(db, 'contacts', currentUserUid);
    
                const unsubscribeContacts = onSnapshot(docRef, (snapshot) => {
                    const data = snapshot.exists() ? snapshot.data() : {};
                    const contactsArray = Object.entries(data).map(([uid, name]) => ({ uid, name }));
                    setContacts(contactsArray);
                });

                // Fecth groups collection
                const groupsCollectionRef = collection(db, 'groups');
                const unsubscribeGroups = onSnapshot(groupsCollectionRef, (groupsSnapshot) => {
                    const groupsArray = groupsSnapshot.docs.map((groupDoc) => {
                        const { name } = groupDoc.data();
                        return { id: groupDoc.id, name};
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
                <div className="sidebar_searchContainer">
                    <SearchOutlined />
                    <input placeholder="Search or start new chat" type="text" />
                </div>
            </div>
            <div className="sidebar_chats">
                <SidebarChat addNewChat/>
                {contacts.map((contact) => (
                    <SidebarChat
                        key={contact.uid}
                        id={contact.uid}
                        name={contact.name || contact.uid}
                        onSelect={() => onSelectChat({ id: contact.uid, name: contact.name })}
                        onAddContactClick={onAddContactClick}
                    />
                ))}

                {groups.map((group) => (
                    <SidebarChat
                        key={group.id}
                        id={group.id}
                        name={group.name}
                        onSelect={() => onSelectChat({ id: group.id, name: group.name, isGroup: true})}
                    />
                ))}
            </div>
        </div>
    );
}

export default Sidebar;
