import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]); // Ensure messages is always an array
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const fetchChatMessages = async () => {
    try {
      const chat = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
        withCredentials: true,
      });

      const chatMessages = Array.isArray(chat?.data?.messages)
        ? chat.data.messages.map((msg) => ({
            firstName: msg.senderId?.firstName,
            lastName: msg.senderId?.lastName,
            text: msg.text,
          }))
        : [];

      setMessages(chatMessages);
    } catch (error) {
      console.error("Error fetching chat messages:", error);
      setMessages([]); // Ensure state remains an array even on error
    }
  };

  useEffect(() => {
    fetchChatMessages();
  }, [targetUserId]);

  useEffect(() => {
    if (!userId) return;

    const socket = createSocketConnection();
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, lastName, text }) => {
      setMessages((prevMessages) => [...prevMessages, { firstName, lastName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    if (!newMessage.trim()) return; // Prevent sending empty messages

    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });

    setMessages((prevMessages) => [
      ...prevMessages,
      { firstName: user.firstName, lastName: user.lastName, text: newMessage },
    ]);

    setNewMessage(""); // Corrected state update
  };

  return (
    <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[80vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-600">Chat</h1>
      <div className="flex-1 overflow-scroll p-5">
        {/* display messages */}
        {Array.isArray(messages) &&
          messages.map((msg, index) => (
            <div
              key={index}
              className={"chat " + (user?.firstName === msg.firstName ? "chat-end " : "chat-start")}
            >
              <div className="chat-header">
                {/* {`${msg.firstName}  ${msg.lastName}`} */}
              </div>
              <div className={`chat-bubble ${user?.firstName === msg.firstName ? "bg-violet-900 text-white" : "bg-black text-white"}`}>{msg.text}</div>
            </div>
          ))}
      </div>
      <div className="p-5 border-t border-gray-600 flex items-center gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)} // Corrected state update
          className="flex-1 border border-gray-500 text-white rounded p-2"
        />
        <button onClick={sendMessage} className="btn btn-secondary">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;






























// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { createSocketConnection } from "../utils/socket";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import { BASE_URL } from "../utils/constants";

// const Chat = () => {
//   const { targetUserId } = useParams();
//   const [messages, setMessages] = useState([]);
//   const [newMessage , setNewMessage] = useState("")
//   const user = useSelector(store => store.user);
//   const userId = user?._id;

//   const fetchChatMessages = async () =>{
//     const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
//       withCredentials: true,
//     });

//     console.log(chat.data.messages);

//     const chatMessages = chat?.data?.messages.map((msg) => {
//       const { senderId, text } = msg;
//       return {
//         firstName: senderId?.firstName,
//         lastName: senderId?.lastName,
//         text,
//       };
//     });
//     setMessages(chatMessages);
//   };
//   useEffect(() => {
//     fetchChatMessages();
//   }, []);


//   useEffect(()=>{
//     if(!userId){
//         return;
//     }

//     const socket = createSocketConnection();
//     socket.emit("joinChat" , {firstName: user.firstName,  userId , targetUserId});

//     socket.on("messageReceived" , ({firstName ,lastName , text}) => {
//         setMessages((messages)=>[...messages , {firstName , lastName , text}])
//     }) 

//     return()=>{
//         socket.disconnect();
//     };
//   },[userId , targetUserId]);

//   const sendMessage = () =>{
//     const socket = createSocketConnection();
//     socket.emit("sendMessage" , {firstName : user.firstName ,lastName : user.lastName, userId , targetUserId , text:newMessage})
//     setMessages("");
//   }
//   return (
//     <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[80vh] flex flex-col">
//       <h1 className="p-5 border-b border-gray-600 ">Chat</h1>
//       <div className="flex-1 overflow-scroll p-5">
//         {/* display messages */}

//         { messages.map((msg, index) => {
//           return (
//             // <div key={index}>{msg.text}</div>
//             <div
//               key={index}
//               className={
//                 "chat " +
//                 (user?.firstName === msg.firstName ? "chat-end" : "chat-start")
//               }
//             >
//               <div className="chat-header">
//                 {`${msg.firstName}  ${msg.lastName}`}
//                 <time className="text-xs opacity-50"> 2 hours ago</time>
//               </div>
//               <div className="chat-bubble">{msg.text}</div>
//               <div className="chat-footer opacity-50">Seen</div>
//             </div>
//           );
//         })}
//       </div>
//       <div className="p-5 boarder-t border-gray-600 flex items-center gap-2">
//         <input value={newMessage} onChange={(e)=>{setMessages(e.target.value)}} className="flex-1 boarder border-gray-500 text-white rounded p-2"></input>
//         <button onClick={sendMessage} className="btn btn-secondary">Send</button>
//       </div>
//     </div>
//   );
// };
// export default Chat;
