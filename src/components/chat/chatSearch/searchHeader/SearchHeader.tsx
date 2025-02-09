import { FC } from "react";
import styles from "./SearchHeader.module.css"
import CloseButton from "../../../svg/closeButton/CloseButton";

type ChatSearchProps = {
    closeChat: () => void;
};


const SearchHeader:FC<ChatSearchProps> = ({closeChat}) =>{
    return (
        <div className={styles.searchHeader}>
            <div className={styles.searchTitle}>
                <span className={styles.searchTitle_text}>New message</span>
                <span>
                    <CloseButton onClick={closeChat}/>
                </span>
            </div>
            <div className={styles.searchInput}>
                    <label htmlFor="search_Input" className={styles.searchInput_label}> To: </label>
                    <input type="text" id="search_Input"  className={styles.searchInput_input}  />
                </div>
        </div>
    )
}

export default SearchHeader