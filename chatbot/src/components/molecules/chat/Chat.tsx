import React, { useEffect, useState, useCallback } from "react";
import createApiKey from "../../../utils/api/createApiKey";
import retrieveApiConfig from "../../../utils/api/retrieveApiConfig";
import {
  connectWebSocket,
  sendWebSocketMessage,
} from "../../../utils/api/webSocketApi";
import AddMessagesForm from "../add-messages-form/AddMessagesForm.tsx";

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [configId, setConfigId] = useState<string | null>(null);
  const [webSocketUrl, setWebSocketUrl] = useState<string | null>(
    "wss://rn59d4clmb.execute-api.us-east-1.amazonaws.com/dev"
  );

  // Function to initialize WebSocket connection
  const initWebSocket = useCallback(async () => {
    if (configId) {
      const config = await retrieveApiConfig();
      if (config && config.webSocketUrl) {
        setWebSocketUrl(config.webSocketUrl);
        connectWebSocket(config.webSocketUrl, config.apiKey);
      }
    }
  }, [configId]);

  // Fetch API key and config on component mount
//   useEffect(() => {
//     const fetchApiKeyAndConfig = async () => {
//         try{
//             const apiKeyResponse = await createApiKey();
//             if (apiKeyResponse && apiKeyResponse.configId) {
//             setConfigId(apiKeyResponse.configId);
//             }
//             console.log(apiKeyResponse);
//         }
//         catch(err){
//             console.log(err);         
//         }
//     };

//     fetchApiKeyAndConfig();
//   }, []);

  // Initialize WebSocket connection when configId is set
  useEffect(() => {
    if (configId) {
      initWebSocket();
    }
  }, [configId, initWebSocket]);

  // Custom message handler for WebSocket messages
  const handleWebSocketMessage = useCallback((message: string) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  }, []);

  // Clear messages
  const clearMessagesHandle = () => {
    setMessages([]);
  };

  return (
    <div className={"bg-[#020409] pt-20 flex flex-col items-center "}>
      <div className={"text-white font-bold text-5xl"}>ChatBot</div>
      <div className="w-2/4 p-6 gap-5 flex flex-col h-screen bg-[#020409] ">
        <div className={"flex flex-col gap-[9px] h-[500px] overflow-y-auto"}>
          <div className={"text-white flex flex-col items-center gap-3"}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={
                  "bg-[#2B2D31] w-full h-auto break-words p-3 text-white rounded-lg text-sx font-medium "
                }
              >
                {message}
              </div>
            ))}
          </div>
        </div>
        <AddMessagesForm
          clearMessagesHandle={clearMessagesHandle}
          sendMessage={(message) => sendWebSocketMessage(message)}
        />
      </div>
    </div>
  );
};

export default Chat;

// Proto:

// import React, {useEffect, useState} from 'react'
// import useWebSocket from "react-use-websocket";
// import AddMessagesForm from "../add-messages-form/AddMessagesForm.tsx";
// import createApiKey from '../../../utils/api/createApiKey.ts';
// import retrieveApiConfig from '../../../utils/api/retrieveApiConfig.ts';
// import { connectWebSocket, sendWebSocketMessage } from '../../../utils/api/webSocketApi.ts';

// export const socketUrl = "wss://ws.ifelse.io/";
// // export const socketUrl = "wss://polkadot.webapi.subscan.io/socket";

// const Chat: React.FC = () => {
//     const [messages, setMessages] = useState<string[]>([])
//     const {
//         lastMessage,
//         readyState,
//     } = useWebSocket(socketUrl, {
//         onOpen: () => console.log('WebSocket connection opened.'),
//         onClose: () => console.log('WebSocket connection closed.'),
//         shouldReconnect: (closeEvent) => true,
//         share: true,

//     });

//     useEffect(() => {
//         if (readyState !== 0 && !lastMessage?.data.includes('Request served by')) {
//             const newMessages = lastMessage?.data;
//             setMessages(prevMessages => [...prevMessages, newMessages]);

//         }
//     }, [lastMessage]);

//     const clearMessagesHandle = () => {
//         setMessages([]);
//     }
//     return (
//         <div className={'bg-[#020409] pt-20 flex flex-col items-center '}>
//             <div className={'text-white font-bold text-5xl'}>ChatBot</div>
//             <div className="w-2/4 p-6 gap-5 flex flex-col h-screen bg-[#020409] ">
//                 <div className={'flex flex-col gap-[9px] h-[500px] overflow-y-auto'}>
//                     <div className={'text-white flex flex-col items-center gap-3'}>
//                         {messages.map((message) => <div key={message}
//                             className={'bg-[#2B2D31]  w-full h-auto break-words w-full  p-3 text-white  rounded-lg text-sx font-medium '}
//                         >{message}</div>)}
//                     </div>

//                 </div>
//                 <AddMessagesForm clearMessagesHandle={clearMessagesHandle}/>
//             </div>
//         </div>
//     )
// }
// export default Chat
