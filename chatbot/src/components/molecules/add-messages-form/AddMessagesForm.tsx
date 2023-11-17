import React, { useState } from "react";
import useWebSocket from "react-use-websocket";
import { Button } from "../../atoms/button";
import { socketUrl } from "../chat/Chat.tsx";

const AddMessagesForm: React.FC<{ clearMessagesHandle: () => void }> = (
  props
) => {
  const { clearMessagesHandle } = props;
  const [value, setValue] = useState("");
  const { sendMessage } = useWebSocket(socketUrl, {
    onOpen: () => console.log("WebSocket connection opened."),
    onClose: () => console.log("WebSocket connection closed."),
    shouldReconnect: (closeEvent) => true,
    onMessage: (event: WebSocketEventMap["message"]) => console.log(event),
    share: true,
  });

  const sendMesagesHandle = () => {
    if (!value) {
      return;
    }
    sendMessage(value);
    setValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMesagesHandle();
    }
  };

  return (
    <>
      <textarea
        placeholder={"Talk to chatbot ..."}
        value={value}
        onChange={(e) => {
          setValue(e.currentTarget.value);
        }}
        onKeyDown={handleKeyPress}
        className={
          "bg-[#2B2D31] w-full h-20 p-3 text-white cursor-pointer rounded-lg text-sx font-medium hover:ring-2 ring-[#826AED]    focus:outline-none   focus:ring-2 ring-[#826AED] focus:bg-black-darker placeholder-[#7E858F]"
        }
      />
      <div className={"flex justify-between"}>
        <Button
          type={"button"}
          title={"Clear"}
          onClick={() => {
            clearMessagesHandle();
          }}
          variant={"darker"}
        />
        <Button
          type={"button"}
          disabled={!value}
          title={"Send"}
          onClick={sendMesagesHandle}
          variant={"primary"}
        />
      </div>
    </>
  );
};
export default AddMessagesForm;
