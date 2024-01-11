import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { collection, doc, getDoc, onSnapshot, orderBy, query, setDoc } from "firebase/firestore";

function UseChatEffect(selectedChat) {
  const [messages, setMessages] = useState([]);
  const [members, setMembers] = useState({});

  useEffect(() => {
    const fetchMessages = async () => {
      const currentUserUid = auth.currentUser.uid;

      if (selectedChat.isGroup) {
        const groupMessagesCollection = collection(db, "groups", selectedChat.id, "messages");
        const q = query(groupMessagesCollection, orderBy("timestamp"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
          const messagesData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setMessages(messagesData);
        });

        // Fetch members' names
        const membersDoc = doc(db, "groups", selectedChat.id);
        const membersSnapshot = await getDoc(membersDoc);
        
        if (membersSnapshot.exists()) {
          setMembers(membersSnapshot.data());
        }

        return () => {
          unsubscribe();
        };
      } 
      else {
        const chatId = [currentUserUid, selectedChat.id].sort().join('_');
        const chatDocRef = doc(db, 'chats', chatId);
    
        // Listen for changes in the chat document
        const unsubscribe = onSnapshot(chatDocRef, (snapshot) =>  {
          if (snapshot.exists()) {
            const chatData = snapshot.data();
            const allMessages = chatData.allMessages || [];
            setMessages(allMessages);
          }
        });
    
        const checkAndCreateChat = async () => {
          const chatDoc = await getDoc(chatDocRef);
          if (!chatDoc.exists()) {
            // Create a new chat document
            await setDoc(chatDocRef, {
              participants: [currentUserUid, selectedChat.id],
              allMessages: [],
            });
          }
        };
    
        checkAndCreateChat();
    
        return () => {
          unsubscribe();
        };
      }
    }

    fetchMessages();
  }, [selectedChat]);

  return { messages, members };
}

export default UseChatEffect;
