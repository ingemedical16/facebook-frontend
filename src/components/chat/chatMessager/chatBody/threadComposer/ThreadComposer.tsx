import { FC } from "react";
import styles from "./ThreadComposer.module.css";
import PlusButton from "../../../../svg/plusButton/PlusButton";
import AttachFileButton from "../../../../svg/attachFileButton/AttachFileButton";
import StickerButton from "../../../../svg/stickerButton/StickerButton";
import GifButton from "../../../../svg/gifButton/GifButton";
import MessageInput from "./messageInput/MessageInput";
import ThumbsUpButton from "../../../../svg/thumbsUpButton/ThumbsUpButton";

interface ThreadComposerProps {
  onSendMessage: (message: string) => void;

}

const ThreadComposer: FC<ThreadComposerProps> = ({onSendMessage}) => {
  return (
    <div className={styles.container}>
      <span className={styles.actions}>
        <PlusButton /> 
        <AttachFileButton /> 
        <StickerButton/>
        <GifButton/>
        <MessageInput onSendMessage={onSendMessage} />
        <ThumbsUpButton/>
      </span>
    </div>
  );
};

export default ThreadComposer;
