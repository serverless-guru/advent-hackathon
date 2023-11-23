import React, { useEffect, useRef, useState } from "react";
import useWebSocket from "react-use-websocket";
import AddMessagesForm from "../add-messages-form/AddMessagesForm.tsx";
import retrieveApiConfig from "../../../utils/api/retrieveApiConfig.ts";

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [socketUrl, setSocketUrl] = useState<string | null>(null);
  const [lastReceivedMsg, setLastReceivedMsg] = useState<string>('');
  const [apiKey, setApiKey] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);


  const {sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
    onOpen: () => {
        console.log("WebSocket connection opened.")
        if(apiKey){
            console.log("API KEY:", apiKey);
            sendMessage(
              JSON.stringify({
                action: "authenticate",
                apiKey: apiKey,
              })
            );
        }
    },
    onClose: () => console.log("WebSocket connection closed."),
    shouldReconnect: (closeEvent) => true,
    share: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = await retrieveApiConfig(); 
        console.log("API Config:", config);
        setApiKey(config?.apiKey);
        setSocketUrl(config?.wsEndpoint); // Set the WebSocket URL dynamically
      } catch (error) {
        console.error("Error fetching API config:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (
      readyState !== 0 &&
      lastMessage &&
      !lastMessage.data.includes("Request served by")
    ) {
      // console.log("Reply:", lastMessage);
      const newMessages = JSON.parse(lastMessage.data);
      console.log('Data:', newMessages);
      if (newMessages?.type !== "response_completed" && newMessages?.message !== undefined){
        setLastReceivedMsg(newMessages.message);
      }
      if (
          newMessages?.message === undefined &&
          (newMessages?.type === "response_completed" || newMessages?.type === "connection_ready")
      ) {
        setMessages((prevMessages) => [...prevMessages, {who: 'santa', message: lastReceivedMsg}]);
      }
    }
  }, [lastMessage, readyState]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const clearMessagesHandle = () => {
    setMessages([]);
  };

  if (!socketUrl) {
    return <div>Loading...</div>;
  }

  return (
    <div className={"bg-[#020409] pt-10 h-screen flex flex-col items-center"}>
      <div className={"text-white font-bold text-5xl"} onClick={() => console.log(lastReceivedMsg)}>ChatBot</div>
      <div className="sm:w-2/4 p-6 gap-5 flex flex-col bg-[#020409] ">
        <div className={"flex flex-col gap-[9px] h-[500px] overflow-y-auto"}>
          <div className={"text-white flex flex-col items-center gap-3"}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`bg-[#2B2D31] ${ message.who === 'santa' ? 'bg-blue-700' : '' } w-full h-auto break-words w-full p-3 text-white rounded-lg text-sx font-medium ${
                  !message ? "hidden" : ""
                }`}
                ref={index === messages.length - 1 ? messagesEndRef : null}
              >
                {message.message}
              </div>
            ))}
          </div>
        </div>
        <AddMessagesForm
          clearMessagesHandle={clearMessagesHandle}
          socketUrl={socketUrl}
          sentMessage={(msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
          }}
        />
      </div>
    </div>
  );
};

export default Chat;