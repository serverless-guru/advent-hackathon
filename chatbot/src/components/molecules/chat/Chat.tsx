import React, { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import AddMessagesForm from "../add-messages-form/AddMessagesForm.tsx";
import retrieveApiConfig from "../../../utils/api/retrieveApiConfig.ts";

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [socketUrl, setSocketUrl] = useState<string | null>(null);

  const { lastMessage, readyState } = useWebSocket(socketUrl, {
    onOpen: () => console.log("WebSocket connection opened."),
    onClose: () => console.log("WebSocket connection closed."),
    shouldReconnect: (closeEvent) => true,
    share: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = await retrieveApiConfig();
        console.log("API Config:", config);
        setSocketUrl(config.wsEndpoint); // Set the WebSocket URL dynamically
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
      const newMessages = JSON.parse(lastMessage.data);;
      console.log(newMessages?.message);
      setMessages((prevMessages) => [...prevMessages, newMessages?.message]);
    }
  }, [lastMessage, readyState]);

  const clearMessagesHandle = () => {
    setMessages([]);
  };

  if (!socketUrl) {
    return <div>Loading...</div>;
  }

  return (
    <div className={"bg-[#020409] pt-20 flex flex-col items-center "}>
      <div className={"text-white font-bold text-5xl"}>ChatBot</div>
      <div className="w-2/4 p-6 gap-5 flex flex-col h-screen bg-[#020409] ">
        <div className={"flex flex-col gap-[9px] h-[500px] overflow-y-auto"}>
          <div className={"text-white flex flex-col items-center gap-3"}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`bg-[#2B2D31] w-full h-auto break-words w-full p-3 text-white rounded-lg text-sx font-medium ${!message ? 'hidden' : ''}`}
              >
                {message}
              </div>
            ))}
          </div>
        </div>
        {/* <AddMessagesForm
          clearMessagesHandle={clearMessagesHandle}
          socketUrl={socketUrl}
        /> */}
      </div>
    </div>
  );
};

export default Chat;