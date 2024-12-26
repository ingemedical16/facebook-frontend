import React from "react";
import { Dots } from "../../svg";
import { stories } from "../../../data/home";
import styles from "../Profile.module.css";
import AddFriendSmallCard from "../addFriendSmallCard";
import { Story } from "../../../types/types";

export default function DiscoverPeople(): JSX.Element {
  return (
    <div className={styles.discoverPeople}>
      <div className={styles.discoverPeople_header}>
        People You May Know
        <div
          className={`${styles.post_header_right} ${styles.ppl_circle} hover1`}
        >
          <Dots color="" />
        </div>
      </div>
      <div className={styles.discoverPeople_list}>
        {stories.map((item: Story, index: number) => (
          <AddFriendSmallCard item={item} key={index} />
        ))}
      </div>
    </div>
  );
}
