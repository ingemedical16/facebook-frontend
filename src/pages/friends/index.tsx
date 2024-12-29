import { FC } from "react";
import Header from "../../components/header/Header";
import Friends from "../../components/friends";

const FriendsPage:FC =()=> {
    return (
      <>
          <Header page="friends" />
          <Friends/>
      </>
    );
 
 };

export default FriendsPage;