import  { FC } from "react";
import styles from "./ChatHeaderControls.module.css";
import VoiceCallButton from "../../../svg/voiceCallButton/VoiceCallButton";
import VideoCallButton from "../../../svg/videoCallButton/VideoCallButton";
import MinimizeButton from "../../../svg/minimizeButton/MinimizeButton";
import CloseButton from "../../../svg/closeButton/CloseButton";
import { ChatBox } from "../..";


type ChatHeaderControlsProps = {
  closeChat: () => void;
  minimizedChat: () => void;
}

const ChatHeaderControls:FC<ChatHeaderControlsProps> = ({closeChat,minimizedChat}) => {
  return (
    <div className={styles.chatHeaderControls}>
      <span className={styles.controlButton}>
        <VoiceCallButton  />
      </span>
      <span className={styles.controlButton}>
        <VideoCallButton />
      </span>
      <span className={styles.controlButton}>
        <MinimizeButton onClick={minimizedChat} />
      </span>
      <span className={styles.controlButton}>
        <CloseButton onClick={closeChat} />
      </span>
    </div>
  );
};

export default ChatHeaderControls;
