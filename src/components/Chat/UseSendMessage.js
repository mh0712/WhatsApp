import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";

async function UseSendMessage(input, selectedChat, setInput) {

  const getCurrentTimestamp = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  try {
    const currentUserUid = auth.currentUser.uid;
    const chatId = [currentUserUid, selectedChat.id].sort().join("_");
    const chatDocRef = doc(db, "chats", chatId);

    const newMessage = {
      content: input,
      sender: currentUserUid,
      timestamp: getCurrentTimestamp(),
    };

    await updateDoc(chatDocRef, {
      allMessages: arrayUnion(newMessage),
    });

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
