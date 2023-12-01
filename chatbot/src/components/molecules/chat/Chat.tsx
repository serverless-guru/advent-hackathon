import React, { useEffect, useRef, useState } from "react";
import useWebSocket from "react-use-websocket";
import AddMessagesForm from "../add-messages-form/AddMessagesForm.tsx";
import retrieveApiConfig from "../../../utils/api/retrieveApiConfig.ts";
import SantaAvatar from "/src/assets/imgs/santa_avatar.svg";
import UserAvatar from "/src/assets/imgs/user_avatar.svg";

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [socketUrl, setSocketUrl] = useState<string | null>(null);
  const [lastReceivedMsg, setLastReceivedMsg] = useState<string>('');
  const [typing, setTyping] = useState(false);
  const [apiKey, setApiKey] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);


  const {sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
    onOpen: () => {
        if(apiKey){
            sendMessage(
              JSON.stringify({
                action: "authenticate",
                apiKey: apiKey,
              })
            );
        }
    },
    onClose: () => console.log(""),
    shouldReconnect: (closeEvent) => true,
    share: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = await retrieveApiConfig(); 
        setApiKey(config?.apiKey);
        setSocketUrl(config?.wsEndpoint); // Set the WebSocket URL dynamically
      } catch (error) {
        console.error("Error fetching API config:", error);
      }
    };

    fetchData();
  }, []);

  // interaction
  useEffect(() => {
    if (
      readyState !== 0 &&
      lastMessage &&
      !lastMessage.data.includes("Request served by")
    ) {
      setTyping(true);
      // console.log("Reply:", lastMessage);
      const newMessages = JSON.parse(lastMessage.data);
      if (newMessages?.type !== "response_completed" && newMessages?.message !== undefined){
        setLastReceivedMsg(newMessages.message);
      }
      if (
          newMessages?.message === undefined &&
          (newMessages?.type === "response_completed" || newMessages?.type === "connection_ready")
      ) {
        setMessages((prevMessages) => [...prevMessages, {who: 'santa', message: lastReceivedMsg}]);
        setTyping(false)
      }
    }
  }, [lastMessage, readyState]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!socketUrl) {
    return <div className="w-[400px] mx-auto bg-[url('/src/assets/imgs/chat.gif')] min-h-[450px] bg-no-repeat" />;
  }

  return (
    <div className={"pt-5 h-screen"}>
      <div className="sm:w-3/5 p-4 mx-auto">
        <div
          className={
            "h-[calc(100vh-226px)] sm:h-[calc(100vh-276px)] overflow-y-auto no-scrollbar"
          }
        >
          <div className={"text-white text-[15px]"}>
            {messages.map((message, index) => (
              <div className="flex items-start gap-x-4 mb-10">
                <div className="">
                  {message?.who === "santa" ? (
                    <div className="bg-[#002B08] py-[13px] px-[7px] mt-4">
                      <img src={SantaAvatar} alt="sg logo" />
                    </div>
                  ) : (
                    <div className="">
                      <img
                        src={UserAvatar}
                        alt="profile icon"
                      />
                    </div>
                  )}
                </div>
                <div
                  key={index}
                  className={`p-3 ${
                    message.who === "santa" ? "" : "bg-[#171B21]"
                  } break-words w-full p-3 text-white rounded text-sx font-medium ${
                    !message ? "hidden" : ""
                  }`}
                  ref={index === messages.length - 1 ? messagesEndRef : null}
                >
                  {message.message}
                </div>
              </div>
            ))}
          </div>
        </div>
        {typing && (
          <div className="text-[14px] text-[#9ea0a3]">
            Santa is typing<span className="dots"></span>
          </div>
        )}
      </div>
      <div className="bg-[#171B21] py-4 px-4 sm:py-10 absolute bottom-0 w-full">
        <div className="sm:w-3/5 mx-auto">
          <AddMessagesForm
            socketUrl={socketUrl}
            inputDisabled={typing}
            sentMessage={(msg) => {
              setMessages((prevMessages) => [...prevMessages, msg]);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;