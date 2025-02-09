import React from "react";
import styles from "./NewMessageButton.module.css"; // Import CSS module

type NewMessageButtonProps = {
    onClick: () => void; // Callback when button is clicked
};

const NewMessageButton: React.FC<NewMessageButtonProps> = ({onClick}) => {
  return (
    <span className={`${styles.container}`} onClick={onClick}>
      <div aria-label="New message" className={styles.button} role="button" tabIndex={0}>
        <i className={styles.icon}></i>
        <div className={styles.overlay} role="none" data-visualcompletion="ignore"></div>
      </div>
    </span>
  );
};

export default NewMessageButton;
