import React from "react";
import styles from "./EmojiButton.module.css";

interface EmojiButtonProps {
  onClick?: () => void;
  ariaLabel?: string;
  size?: number;
  iconSize?: number;
  className?: string;
}

const EmojiButton: React.FC<EmojiButtonProps> = ({
  onClick,
  ariaLabel = "Choose an emoji",
  size = 24,
  iconSize = 15,
  className = "",
}) => {
  return (
    <div
      className={`${styles.emojiButtonContainer} ${className}`}
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      onClick={onClick}
      style={{ width: size, height: size }}
    >
      <svg
        className={styles.emojiIcon}
        height={iconSize}
        width={iconSize}
        viewBox="0 0 38 38"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(-893.000000, -701.000000)">
            <g transform="translate(709.000000, 314.000000)">
              <g>
                <path
                  d="M210.5,405 C209.121,405 208,403.879 208,402.5 C208,401.121 209.121,400 210.5,400 C211.879,400 213,401.121 213,402.5 C213,403.879 211.879,405 210.5,405 M212.572,411.549 C210.428,413.742 206.938,415 203,415 C199.062,415 195.572,413.742 193.428,411.549 C192.849,410.956 192.859,410.007 193.451,409.428 C194.045,408.85 194.993,408.859 195.572,409.451 C197.133,411.047 199.909,412 203,412 C206.091,412 208.867,411.047 210.428,409.451 C211.007,408.859 211.956,408.85 212.549,409.428 C213.141,410.007 213.151,410.956 212.572,411.549 M195.5,400 C196.879,400 198,401.121 198,402.5 C198,403.879 196.879,405 195.5,405 C194.121,405 193,403.879 193,402.5 C193,401.121 194.121,400 195.5,400 M203,387 C192.523,387 184,395.523 184,406 C184,416.477 192.523,425 203,425 C213.477,425 222,416.477 222,406 C222,395.523 213.477,387 203,387"
                  fill="#0080ff99"
                ></path>
              </g>
            </g>
          </g>
        </g>
      </svg>
      
    </div>
  );
};

export default EmojiButton;
