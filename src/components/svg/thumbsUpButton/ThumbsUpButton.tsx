import React from "react";
import styles from "./ThumbsUpButton.module.css";

interface ThumbsUpButtonProps {
  onClick?: () => void;
  ariaLabel?: string;
  size?: number;
  iconSize?: number;
  className?: string;
}

const ThumbsUpButton: React.FC<ThumbsUpButtonProps> = ({
  onClick,
  ariaLabel = "Send a thumbs up",
  size = 24,
  iconSize = 15,
  className = "",
}) => {
  return (
    <div
      className={`${styles.thumbsUpButtonContainer} ${className}`}
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      onClick={onClick}
      style={{ width: size, height: size }}
    >
      <svg
        className={styles.thumbsUpButtonIcon}
        height={iconSize}
        width={iconSize}
        viewBox="0 0 16 16"
      >
        <path
          d="M16,9.1c0-0.8-0.3-1.1-0.6-1.3c0.2-0.3,0.3-0.7,0.3-1.2c0-1-0.8-1.7-2.1-1.7h-3.1c0.1-0.5,0.2-1.3,0.2-1.8 
          c0-1.1-0.3-2.4-1.2-3C9.3,0.1,9,0,8.7,0C8.1,0,7.7,0.2,7.6,0.4C7.5,0.5,7.5,0.6,7.5,0.7L7.6,3c0,0.2,0,0.4-0.1,0.5L5.7,6.6 
          c0,0-0.1,0.1-0.1,0.1l0,0l0,0L5.3,6.8C5.1,7,5,7.2,5,7.4v6.1c0,0.2,0.1,0.4,0.2,0.5c0.1,0.1,1,1,2,1h5.2c0.9,0,1.4-0.3,1.8-0.9 
          c0.3-0.5,0.2-1,0.1-1.4c0.5-0.2,0.9-0.5,1.1-1.2c0.1-0.4,0-0.8-0.2-1C15.6,10.3,16,9.9,16,9.1z"
          fill="#0080ff99"
        ></path>
        <path
          d="M3.3,6H0.7C0.3,6,0,6.3,0,6.7v8.5C0,15.7,0.3,16,0.7,16h2.5C3.7,16,4,15.7,4,15.3V6.7C4,6.3,3.7,6,3.3,6z"
          fill="#0080ff99"
        ></path>
      </svg>
    </div>
  );
};

export default ThumbsUpButton;
