import { useEffect } from "react";
import { auth, db } from "../../firebase";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";

function UseChatEffect(selectedChat, setMessages) {
    useEffect(() => {
        const currentUserUid = auth.currentUser.uid;
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
    
            console.log("Chat document created successfully!");
          }
        };
    
        checkAndCreateChat();
    
        return () => {
          unsubscribe();
        };
      }, [selectedChat, setMessages]);
}

export default UseChatEffect;
