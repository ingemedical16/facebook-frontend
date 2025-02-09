import React from "react";
import styles from "./CloseButton.module.css";

interface CloseButtonProps {
  onClick?: () => void;
  ariaLabel?: string;
  size?: number;
  iconSize?: number;
  className?: string;
}

const CloseButton: React.FC<CloseButtonProps> = ({
  onClick,
  ariaLabel = "Close",
  size = 32,
  iconSize = 15,
  className = "",
}) => {
  return (
    <div
      className={`${styles.closeButtonContainer} ${className}`}
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
        className={styles.closeButtonIcon}
      >
        <g fillRule="evenodd" transform="translate(-450 -1073)">
          <g fillRule="nonzero">
            <path
              d="m98.095 917.155 7.75 7.75a.75.75 0 0 0 1.06-1.06l-7.75-7.75a.75.75 0 0 0-1.06 1.06z"
              transform="translate(353.5 159)"
            ></path>
            <path
              d="m105.845 916.095-7.75 7.75a.75.75 0 1 0 1.06 1.06l7.75-7.75a.75.75 0 0 0-1.06-1.06z"
              transform="translate(353.5 159)"
            ></path>
          </g>
        </g>
      </svg>
      
    </div>
  );
};

export default CloseButton;
