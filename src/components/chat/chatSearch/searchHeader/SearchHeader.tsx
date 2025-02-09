import { FC } from "react";
import styles from "./SearchHeader.module.css"
import CloseButton from "../../../svg/closeButton/CloseButton";
import { DefaultUser } from "../../../../types/Post";

type ChatSearchProps = {
    closeChat: () => void;
    searchTerm: string;
    onSearchChange: (searchTerm: string) => void;
    onAddUser: () => void;
};


const SearchHeader:FC<ChatSearchProps> = ({searchTerm,closeChat,onAddUser,onSearchChange}) =>{
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
                    <input 
                        type="text" 
                        id="search_Input"
                        value={searchTerm}  
                        className={styles.searchInput_input}
                        onChange={(e) => onSearchChange(e.target.value)}
                        onKeyUp={onAddUser}  
                    />
                </div>
        </div>
    )
}

export default SearchHeader