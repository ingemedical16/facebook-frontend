import React from "react";
import styles from "./StickerButton.module.css";

interface StickerButtonProps {
  onClick?: () => void;
  ariaLabel?: string;
  size?: number;
  iconSize?: number;
  className?: string;
}

const StickerButton: React.FC<StickerButtonProps> = ({
  onClick,
  ariaLabel = "Choose a sticker",
  size = 24,
  iconSize = 15,
  className = "",
}) => {
  return (
    <div
      className={`${styles.stickerButtonContainer} ${className}`}
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      onClick={onClick}
      style={{ width: size, height: size }}
    >
      <svg
        className={styles.stickerButtonIcon}
        height={iconSize}
        width={iconSize}
        viewBox="0 0 17 16"
      >
        <g fillRule="evenodd">
          <circle cx="5.5" cy="5.5" fill="none" r="1"></circle>
          <circle cx="11.5" cy="4.5" fill="none" r="1"></circle>
          <path
            d="M5.3 9c-.2.1-.4.4-.3.7.4 1.1 1.2 1.9 2.3 2.3h.2c.2 0 .4-.1.5-.3.1-.3 0-.5-.3-.6-.8-.4-1.4-1-1.7-1.8-.1-.2-.4-.4-.7-.3z"
            fill="none"
          ></path>
          <path
            d="M10.4 13.1c0 .9-.4 1.6-.9 2.2 4.1-1.1 6.8-5.1 6.5-9.3-.4.6-1 1.1-1.8 1.5-2 1-3.7 3.6-3.8 5.6z"
            fill="#0080ff99"
          ></path>
          <path
            d="M2.5 13.4c.1.8.6 1.6 1.3 2 .5.4 1.2.6 1.8.6h.6l.4-.1c1.6-.4 2.6-1.5 2.7-2.9.1-2.4 2.1-5.4 4.5-6.6 1.3-.7 1.9-1.6 1.9-2.8l-.2-.9c-.1-.8-.6-1.6-1.3-2-.7-.5-1.5-.7-2.4-.5L3.6 1.5C1.9 1.8.7 3.4 1 5.2l1.5 8.2zm9-8.9c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zm-3.57 6.662c.3.1.4.4.3.6-.1.3-.3.4-.5.4h-.2c-1-.4-1.9-1.3-2.3-2.3-.1-.3.1-.6.3-.7.3-.1.5 0 .6.3.4.8 1 1.4 1.8 1.7zM5.5 5.5c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1z"
            fill="#0080ff99"
            fillRule="nonzero"
          ></path>
        </g>
      </svg>
     
    </div>
  );
};

export default StickerButton;
