import { FC, useState } from "react";
import Wrapper from "../wrapper/Wrapper";
import styles from "./ChatSearch.module.css"
import SearchHeader from "./searchHeader/SearchHeader";
import ContactsList from "../contactsList";
import { DefaultUser } from "../../../types/Post";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { search, searchUsers } from "../../../features/functions";
import { useDispatch } from "react-redux";

type ChatSearchProps = {
onContactClick: (box: { userId?: string; isUser: boolean }) => void; // Function to add new chat box
closeChat: () => void; // Function to close the search bar
};


const ChatSearch:FC<ChatSearchProps> = ({onContactClick,closeChat}) => {
    const token = useSelector((state: RootState) => state.auth.token);
    
    const [searchResult, setSearchResult] = useState<DefaultUser[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const searchHandler = async () => {
        if (searchTerm === "") {
            setSearchResult([]);
        } else {
            const res = await searchUsers({ searchTerm, token:token as string });
            if (res.status === 200) {
                res.data && setSearchResult(res.data.searchResult);
            }  else {
                console.error("Failed to search users:", res.status);
            }
        }
        
        
    };
    return (
        <Wrapper>
           <div className={styles.search}>
           <SearchHeader  
                closeChat={closeChat}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onAddUser={searchHandler} 
            />
           <ContactsList onContactClick={onContactClick} searchResult={searchResult} />
           </div>
        </Wrapper>
    )
}

export default ChatSearch