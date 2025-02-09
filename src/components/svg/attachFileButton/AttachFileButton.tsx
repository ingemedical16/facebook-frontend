import React from "react";
import styles from "./AttachFileButton.module.css";

interface AttachFileButtonProps {
  onClick?: () => void;
  ariaLabel?: string;
  size?: number;
  iconSize?: number;
  className?: string;
}

const AttachFileButton: React.FC<AttachFileButtonProps> = ({
  onClick,
  ariaLabel = "Attach a file up to 100 MB",
  size = 24,
  iconSize = 15,
  className = "",
}) => {
  return (
    <div
      className={`${styles.attachFileButtonContainer} ${className}`}
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      onClick={onClick}
      style={{ width: size, height: size }}
    >
      <svg
        className={styles.attachFileButtonIcon}
        height={iconSize}
        width={iconSize}
        viewBox="0 -1 17 17"
      >
        <g fill="none" fillRule="evenodd">
          <path
            d="M2.882 13.13C3.476 4.743 3.773.48 3.773.348L2.195.516c-.7.1-1.478.647-1.478 1.647l1.092 11.419c0 .5.2.9.4 1.3.4.2.7.4.9.4h.4c-.6-.6-.727-.951-.627-2.151z"
            fill="#0080ff99"
          />
          <circle cx="8.5" cy="4.5" fill="#0080ff99" r="1.5" />
          <path
            d="M14 6.2c-.2-.2-.6-.3-.8-.1l-2.8 2.4c-.2.1-.2.4 0 .6l.6.7c.2.2.2.6-.1.8-.1.1-.2.1-.4.1s-.3-.1-.4-.2L8.3 8.3c-.2-.2-.6-.3-.8-.1l-2.6 2-.4 3.1c0 .5.2 1.6.7 1.7l8.8.6c.2 0 .5 0 .7-.2.2-.2.5-.7.6-.9l.6-5.9L14 6.2z"
            fill="#0080ff99"
          />
          <path
            d="M13.9 15.5l-8.2-.7c-.7-.1-1.3-.8-1.3-1.6l1-11.4C5.5 1 6.2.5 7 .5l8.2.7c.8.1 1.3.8 1.3 1.6l-1 11.4c-.1.8-.8 1.4-1.6 1.3z"
            stroke="#0080ff99"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
     
    </div>
  );
};

export default AttachFileButton;
