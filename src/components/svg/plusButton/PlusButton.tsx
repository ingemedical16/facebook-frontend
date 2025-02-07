import React from "react";
import styles from "./PlusButton.module.css";

interface PlusButtonProps {
  onClick?: () => void;
  ariaLabel?: string;
  size?: number;
  iconSize?: number;
  className?: string;
}

const PlusButton: React.FC<PlusButtonProps> = ({
  onClick,
  ariaLabel = "Start a video call",
  size = 32,
  iconSize = 20,
  className = "",
}) => {
  return (
    <div
      className={`${styles.plusButtonContainer} ${className}`}
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      onClick={onClick}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 24 24"
        width={iconSize}
        height={iconSize}
        fill="currentColor"
        className={styles.plusButtonIcon}
      >
        <g fillRule="evenodd">
          <polygon fill="none" points="-6,30 30,30 30,-6 -6,-6" />
          <path
            d="m18,11l-5,0l0,-5c0,-0.552 -0.448,-1 -1,-1c-0.5525,0 -1,0.448 -1,1l0,5l-5,0c-0.5525,0 -1,0.448 -1,1c0,0.552 0.4475,1 1,1l5,0l0,5c0,0.552 0.4475,1 1,1c0.552,0 1,-0.448 1,-1l0,-5l5,0c0.552,0 1,-0.448 1,-1c0,-0.552 -0.448,-1 -1,-1m-6,13c-6.6275,0 -12,-5.3725 -12,-12c0,-6.6275 5.3725,-12 12,-12c6.627,0 12,5.3725 12,12c0,6.6275 -5.373,12 -12,12"
            fill="#0080ff99"
          />
        </g>
      </svg>
      <div className={styles.plusButtonMask}></div>
    </div>
  );
};

export default PlusButton;
