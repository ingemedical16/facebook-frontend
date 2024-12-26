import { FC, useEffect, useRef, useState } from "react";
import Picker, { EmojiClickData } from "emoji-picker-react";
import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import styles from "../CreatePostPopup.module.css";

export type EmojiPickerBackgroundsProps = {
  text: string;
  setText: (text: string) => void;
  isType2?: boolean;
  background?: string;
  setBackground?: (background: string) => void;
};

const EmojiPickerBackgrounds: FC<EmojiPickerBackgroundsProps> = ({
  text,
  setText,
  isType2 = false,
  background,
  setBackground,
}) => {
  const user = useSelector((state: RootState) => state.user.user);
  const [picker, setPicker] = useState(false);
  const [showBgs, setShowBgs] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  const sm = useMediaQuery({ query: "(max-width: 550px)" });

  useEffect(() => {
    const ref = textRef.current;
    if (ref) {
      ref.selectionEnd = cursorPosition;
    }
  }, [cursorPosition]);

  const handleEmoji = (emojiData: EmojiClickData): void => {
    const { emoji } = emojiData; // Destructure the emoji from the data
    const ref = textRef.current;
    if (ref) {
      ref.focus();
      const start = text.substring(0, ref.selectionStart || 0);
      const end = text.substring(ref.selectionStart || 0);
      const newText = start + emoji + end;
      setText(newText);
      setCursorPosition(start.length + emoji.length);
    }
  };

  const postBackgrounds = [
    { bg : "/images/backgrounds/1.jpg", color: "#FFF" },
    { bg : "/images/backgrounds/2.jpg", color: "#FFF" },
    { bg : "/images/backgrounds/3.jpg", color: "#FFF" },
    { bg : "/images/backgrounds/4.jpg", color: "#FFF" },
    { bg : "/images/backgrounds/5.jpg", color: "#FFF" },
    { bg : "/images/backgrounds/6.jpg", color: "#FFF" },
    { bg : "/images/backgrounds/7.jpg", color: "#FFF" },
    { bg : "/images/backgrounds/8.jpg", color: "#FFF" },
    { bg : "/images/backgrounds/9.jpg", color: "#FFF" },
  ];

  const backgroundHandler = (i: number): void => {
    if (bgRef.current) {
      bgRef.current.style.backgroundImage = `url(${postBackgrounds[i].bg})`;
      if (textRef.current) {
        textRef.current.style.color = postBackgrounds[i].color;
      }
      setBackground && setBackground(postBackgrounds[i].bg);
      bgRef.current.classList.add("bgHandler");
    }
  };

  const removeBackground = (): void => {
    if (bgRef.current) {
      bgRef.current.style.backgroundImage = "";
      setBackground && setBackground("");
      bgRef.current.classList.remove("bgHandler");
    }
  };

  const paddingTop = background
    ? `${Math.max((textRef.current?.value.length || 0) * 0.1 - 32, 0)}%`
    : "0";

  return (
    <div className={isType2 ? styles.images_input : ""}>
      <div className={!isType2 ? styles.flex_center : ""} ref={bgRef}>
        <textarea
          ref={textRef}
          maxLength={250}
          value={text}
          placeholder={`What's on your mind, ${user?.first_name || "User"}?`}
          className={`${styles.post_input} ${isType2 ? styles.input2 : ""} ${
            sm && !background ? "l0" : ""
          }`}
          onChange={(e) => setText(e.target.value)}
          style={{ paddingTop }}
        ></textarea>
      </div>
      <div className={!isType2 ? styles.post_emojis_wrap : ""}>
        {picker && (
          <div
            className={`${styles.comment_emoji_picker} ${
              isType2 ? styles.movepicker2 : styles.rlmove
            }`}
          >
            <Picker onEmojiClick={handleEmoji} />
          </div>
        )}
        {!isType2 && (
          <img
            src="/icons/colorful.png"
            alt="Background Options"
            onClick={() => setShowBgs((prev) => !prev)}
          />
        )}
        {!isType2 && showBgs && (
          <div className={styles.post_backgrounds}>
            <div className={styles.no_bg} onClick={removeBackground}></div>
            {postBackgrounds.map((bg, i) => (
              <img
                src={bg.bg}
                key={i}
                alt={`Background ${i + 1}`}
                onClick={() => backgroundHandler(i)}
              />
            ))}
          </div>
        )}

        <i
          className={`${styles.emoji_icon_large}${
            isType2 ? styles.moveleft : ""
          }`}
          onClick={() => setPicker((prev) => !prev)}
        ></i>
      </div>
    </div>
  );
};

export default EmojiPickerBackgrounds;
