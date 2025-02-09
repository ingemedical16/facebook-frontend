import { FC } from "react";
import Wrapper from "../wrapper/Wrapper";
import styles from "./ChatSearch.module.css"
import SearchHeader from "./searchHeader/SearchHeader";
import ContactsList from "../contactsList";

type ChatSearchProps = {
onContactClick: (box: { userId?: string; isUser: boolean }) => void; // Function to add new chat box
closeChat: () => void; // Function to close the search bar
};


const ChatSearch:FC<ChatSearchProps> = ({onContactClick,closeChat}) => {
    return (
        <Wrapper>
           <div className={styles.search}>
           <SearchHeader  closeChat={closeChat}/>
           <ContactsList onContactClick={onContactClick} />
           </div>
        </Wrapper>
    )
}

export default ChatSearch