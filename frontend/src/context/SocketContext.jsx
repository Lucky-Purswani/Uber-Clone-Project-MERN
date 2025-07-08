import React, { createContext, useContext, useEffect } from "react";
import { io } from "socket.io-client";

export const SocketDataContext = createContext();



const socket = io(import.meta.env.VITE_BASE_URL, {
  transports: ["websocket"],
  withCredentials: true
});
export function SocketProvider({ children }) {
  useEffect(() => {
    

      socket.on("connect", () => {
        console.log("[Message from frontend] Socket connected:", socket.id);
      });

      socket.on("disconnect", () => {
        console.log("Socket disconnected [Message from frontend]");
      });

    

    // return () => {
    //   if (socketInstance) {
    //     socketInstance.disconnect();
    //     socketInstance = null;
    //   }
    // };
  }, []);

  // Send a message to a specific event
//   const sendMessage = (event, data) => {
//     if (socket) {
//       socket.emit(event, data);
//     }
//   };

//   // Listen for a message from a specific event
//   const receiveMessage = (event, callback) => {
//     if (socket) {
//       socket.on(event, callback);
//     }
//     // Optionally, return a cleanup function
//     return () => {
//       if (socket) {
//         socket.off(event, callback);
//       }
//     };
//   };

  return (
    <SocketDataContext.Provider value={{  socket }}>
      {children}
    </SocketDataContext.Provider>
  );
}