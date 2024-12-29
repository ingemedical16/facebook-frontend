import React from "react";
import styles from "../Profile.module.css";
import { Photo } from "../../../types/types";



interface PhotosProps {
 
  photos: {
    total_count: number;
    resources: Photo[];
  };
}

const Photos: React.FC<PhotosProps> = ({  photos }) => {
  return (
    <div className={styles.profile_card}>
      <div className={styles.profile_card_header}>
        Photos
        <div className={styles.profile_header_link}>See all photos</div>
      </div>
      <div className={styles.profile_card_count}>
        {photos.total_count === 0
          ? ""
          : photos.total_count === 1
          ? "1 Photo"
          : `${photos.total_count} photos`}
      </div>
      <div className={styles.profile_card_grid}>
        {photos.resources &&
          photos.resources.slice(0, 9).map((img) => (
            <div className={styles.profile_photo_card} key={img.public_id}>
              <img src={img.secure_url} alt="" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Photos;
