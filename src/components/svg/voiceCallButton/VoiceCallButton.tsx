import React from "react";
import styles from "./VoiceCallButton.module.css";

interface VoiceCallButtonProps {
  onClick?: () => void;
  ariaLabel?: string;
  size?: number;
  iconSize?: number;
  className?: string;
}

const VoiceCallButton: React.FC<VoiceCallButtonProps> = ({
  onClick,
  ariaLabel = "Start a voice call",
  size = 32,
  iconSize = 16,
  className = "",
}) => {
  return (
    <div
      className={`${styles.voiceCallButtonContainer} ${className}`}
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
        className={styles.voiceCallButtonIcon}
      >
        <g stroke="none" strokeWidth="1" fillRule="evenodd">
          <path d="M109.492 925.682a1.154 1.154 0 0 0-.443-.81 10.642 10.642 0 0 0-1.158-.776l-.211-.125c-.487-.29-.872-.514-1.257-.511a3.618 3.618 0 0 0-.693.084c-.304.07-.6.302-.88.69a3.365 3.365 0 0 0-.297.494l.449.22-.507-.202-.13-.074a8.53 8.53 0 0 1-3.04-3.043l-.071-.124.019-.057v-.001c.168-.083.334-.183.492-.297.162-.117.552-.432.681-.842.063-.2.075-.407.086-.59l.007-.116c.029-.389-.197-.764-.482-1.237l-.153-.256c-.322-.55-.6-.933-.775-1.158a1.155 1.155 0 0 0-.811-.443c-.36-.031-1.066.01-1.748.608-1.018.896-1.326 2.25-.845 3.714a11.734 11.734 0 0 0 2.834 4.612 11.732 11.732 0 0 0 4.61 2.833c.455.149.897.222 1.32.222.94 0 1.777-.364 2.395-1.067.599-.681.639-1.387.608-1.748" 
            transform="translate(-450 -1073) translate(352.5 157)">
          </path>
        </g>
      </svg>
      <div className={styles.voiceCallButtonMask}></div>
    </div>
  );
};

export default VoiceCallButton;
