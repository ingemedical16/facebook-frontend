import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import Contact from "./contact";
import { Dots, NewRoom, Search } from "../../svg";
import styles from "./RightHome.module.css"



const RightHome: FC = () => {
    const { user } = useSelector((state: RootState) => state.user);
    const color = "#65676b";
    return (
        <div className={ styles.right_home}>
          <div className={ styles.heading}>Sponsored</div>
          <div className={ styles.splitter1}></div>
          <div className={ styles.contacts_wrap}>
            <div className={ styles.contacts_header}>
              <div className={ styles.contacts_header_left}>Contacts</div>
              <div className={ styles.contacts_header_right}>
                <div className={ `${styles.contact_circle} hover1`}>
                  <NewRoom color={color} />
                </div>
                <div className={ `${styles.contact_circle} hover1`}>
                  <Search color={color} />
                </div>
                <div className={ `${styles.contact_circle} hover1`}>
                  <Dots color={color} />
                </div>
              </div>
            </div>
            <div className={ styles.contacts_list}>
              <Contact  />
            </div>
          </div>
        </div>
      );
};

export default RightHome;