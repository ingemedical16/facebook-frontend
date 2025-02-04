import React from "react";
import styles from "./MinimizeButton.module.css";

interface MinimizeButtonProps {
  onClick?: () => void;
  ariaLabel?: string;
  size?: number;
  iconSize?: number;
  className?: string;
}

const MinimizeButton: React.FC<MinimizeButtonProps> = ({
  onClick,
  ariaLabel = "Minimize",
  size = 40,
  iconSize = 20,
  className = "",
}) => {
  return (
    <div
      className={`${styles.minimizeButtonContainer} ${className}`}
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      onClick={onClick}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 12 13"
        width={iconSize}
        height={iconSize}
        fill="currentColor"
        className={styles.minimizeButtonIcon}
      >
        <g fillRule="evenodd" transform="translate(-450 -1073)">
          <path
            fillRule="nonzero"
            d="M452.25 1080.5h8a.75.75 0 1 0 0-1.5h-8a.75.75 0 1 0 0 1.5z"
          ></path>
        </g>
      </svg>
      <div className={styles.minimizeButtonMask}></div>
    </div>
  );
};

export default MinimizeButton;
