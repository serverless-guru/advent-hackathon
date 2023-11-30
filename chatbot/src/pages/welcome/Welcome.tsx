import { FC } from "react"

export const Welcome: FC = () => {
  return (
    <div className="h-screen pt-[10%]">
      <div className="container mx-auto bg-[url('/src/assets/imgs/chat.gif')] min-h-[450px] bg-no-repeat">
        <div className="w-full max-w-[600px] px-4 mx-auto text-[36px]">
          <img
            src="/src/assets/imgs/logo.svg"
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
              <img src="/src/assets/icons/arrow-square-right.svg" alt="arrow pointing right" />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}