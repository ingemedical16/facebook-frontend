import React from "react";
import styles from "./VideoCallButton.module.css";

interface VideoCallButtonProps {
  onClick?: () => void;
  ariaLabel?: string;
  size?: number;
  iconSize?: number;
  className?: string;
}

const VideoCallButton: React.FC<VideoCallButtonProps> = ({
  onClick,
  ariaLabel = "Start a video call",
  size = 32,
  iconSize = 15,
  className = "",
}) => {
  return (
    <div
      className={`${styles.videoCallButtonContainer} ${className}`}
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
        className={styles.videoCallButtonIcon}
      >
        <g fillRule="evenodd" transform="translate(-450 -1073)">
          <path d="M461.583 1076.078a.732.732 0 0 0-.774.073l-.612.466a.498.498 0 0 0-.197.398v4.97c0 .157.072.304.197.398l.612.466a.736.736 0 0 0 .774.073.749.749 0 0 0 .417-.677v-5.49a.75.75 0 0 0-.417-.677m-4.562-1.557h-5.043A1.98 1.98 0 0 0 450 1076.5v6.021a1.98 1.98 0 0 0 1.978 1.979h5.043a1.98 1.98 0 0 0 1.979-1.979v-6.021a1.98 1.98 0 0 0-1.978-1.979"></path>
        </g>
      </svg>
      <div className={styles.videoCallButtonMask}></div>
    </div>
  );
};

export default VideoCallButton;
