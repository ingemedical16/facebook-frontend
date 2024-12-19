import { FC } from "react";
import styles from "../LeftHome.module.css";

export type ShortcutProps = {
    link: string;
    linkImage: string;
    name: string;  
};

const Shortcut:FC<ShortcutProps> = ({ link, linkImage, name }) => {
    return (
        <a href={link} target="_blank" rel="noreferrer" className={styles.shortcut_item}>
                <img src={linkImage} alt={name} />
                <span>{name}</span>
              
        </a>
        
    )
};

export default Shortcut;