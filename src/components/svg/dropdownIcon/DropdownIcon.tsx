import React from "react";
import styles from "./DropdownIcon.module.css";

interface DropdownIconProps {
  onClick?: () => void;
  className?: string;
  fill?: string;
}

const DropdownIcon: React.FC<DropdownIconProps> = ({ onClick, className, fill= "#aa00ff99"}) => {
  return (
    <div className={`${styles.button} ${className || ""}`} onClick={onClick}>
      <div className={styles.iconWrapper}>
        <svg
          aria-hidden="true"
          className={styles.icon}
          height="10px"
          viewBox="0 0 18 10"
          width="10px"
        >
          <path
            clipRule="evenodd"
            d="M1 2.414A1 1 0 012.414 1L8.293 6.88a1 1 0 001.414 0L15.586 1A1 1 0 0117 2.414L9.707 9.707a1 1 0 01-1.414 0L1 2.414z"
            fill={fill}
            fillRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

export default DropdownIcon;
