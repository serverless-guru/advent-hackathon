import React, { useState } from "react";
import useWebSocket from "react-use-websocket";
import RightArrow from "/src/assets/icons/arrow-square-right.svg";

const AddMessagesForm: React.FC<{
  socketUrl: string;
  sentMessage: (msg:any) => void;
  inputDisabled: boolean
}> = (props) => {
  const { socketUrl } = props;
  const { sentMessage } = props;
  const { inputDisabled } = props;
  const [value, setValue] = useState("");
  const { sendMessage } = useWebSocket(socketUrl, {
    onOpen: () => {
      // console.log("WebSocket connection opened.");
      sendMessage(
        JSON.stringify({
          action: "authenticate",
          apiKey: "66f1cf0d-b1d5-49b7-b668-ab7e71a97f02",
        })
      );
    },
    onClose: () => console.log(""),
    shouldReconnect: (closeEvent) => true,
    // onMessage: (event: WebSocketEventMap["message"]) => console.log(event),
    share: true,
  });

  const sendMesagesHandle = () => {
    if (!value) {
      return;
    }
    sendMessage(
      JSON.stringify({
        action: "send_message",
        message: value,
      })
    );
    sentMessage({who: 'me', message:value});
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
      <div className="relative">
        <textarea
          placeholder="..."
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          disabled={inputDisabled}
          onKeyDown={handleKeyPress}
          rows={4}
          className="bg-[#2B2D31] w-full p-3 pr-10 text-white cursor-pointer rounded-lg text-sx font-medium hover:ring-2 ring-[#826AED] focus:outline-none focus:ring-2 ring-[#826AED] focus:bg-black-darker placeholder-[#7E858F]"
        />
        <img
          src={RightArrow}
          alt="arrow pointing right"
          className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
          onClick={sendMesagesHandle}
        />
      </div>
    </>
  );
};
export default AddMessagesForm;
