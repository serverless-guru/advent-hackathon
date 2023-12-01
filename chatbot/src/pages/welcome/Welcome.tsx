import { FC } from "react"
import Logo from "/src/assets/imgs/logo.svg";
import RightArrow from "/src/assets/icons/arrow-square-right.svg";

export const Welcome: FC = () => {
  return (
    <div className="h-screen pt-[10%]">
      <div className="container mx-auto bg-[url('/src/assets/imgs/chat.gif')] min-h-[450px] bg-no-repeat">
        <div className="w-full max-w-[600px] px-4 mx-auto text-[36px]">
          <img
            src={Logo}
            alt="sg logo"
            onContextMenu={(e) => {
              e.preventDefault();
              return false;
            }}
          />
          <br />
          <p className="text-[36px]">Ho, ho, ho! 🎄</p>
          <p>Welcome to our Hackathon chatbot.</p>
          <p>How can I help you today?</p>
          <br />
          <a href="/santa">
            <div className="flex items-center gap-2">
              <span className="text-[13px]">Start </span>
              <img src={RightArrow} alt="arrow pointing right" />
            </div>
          </a>
        </div>
      </div>
      <div className="bg-[url('/src/assets/icons/arrow-square-right.svg')] hidden"></div>
      <div className="bg-[url('/src/assets/imgs/logo.svg')] hidden"></div>
    </div>
  );
}