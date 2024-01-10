import { addDoc, arrayUnion, collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";

async function UseSendMessage(input, selectedChat, setInput) {
  const timestamp = new Date().toLocaleString();

  try {
    const currentUserUid = auth.currentUser.uid;

    // Check if it's a group chat
    console.log(selectedChat + "marc")
    if (selectedChat.isGroup) {
      console.log('gay1')
      // If it's a group, add the message to the messages subcollection
      const groupMessagesCollection = collection(db, 'groups', selectedChat.id, 'messages');
      await addDoc(groupMessagesCollection, {
        content: input,
        sender: currentUserUid,
        timestamp: timestamp,
      });
    } 
    else {
      console.log('gay2')
      // For one-on-one chats, update the allMessages array in the chats collection
      const chatId = [currentUserUid, selectedChat.id].sort().join("_");
      const chatDocRef = doc(db, 'chats', chatId);

      const newMessage = {
        content: input,
        sender: currentUserUid,
        timestamp: timestamp,
      };


      await updateDoc(chatDocRef, {
        allMessages: arrayUnion(newMessage),
      });
    }

    // Check if the other user is in the contacts
    const currentUserContactsRef = doc(db, "contacts", selectedChat.id);
    const currentUserContactsDoc = await getDoc(currentUserContactsRef);

    if (currentUserContactsDoc.exists()) {
      const currentUserContactsData = currentUserContactsDoc.data();
      if (!(currentUserUid in currentUserContactsData)) {
        // If not, add the other user to contacts
        await setDoc(
          currentUserContactsRef,
          {
            [currentUserUid]: currentUserUid,
            ...currentUserContactsData,
          },
          { merge: true }
        );
      }
    } else {
      // If contacts document doesn't exist, create it with the other user
      await setDoc(currentUserContactsRef, {
        [currentUserUid]: currentUserUid,
      });
    }

    console.log("Message sent successfully!");
    setInput("");
  } catch (error) {
    console.error("Error sending message:", error);
  }
}

export default UseSendMessage;
