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
    <div className={styles.profileCard}>
      <div className={styles.profileCardHeader}>
        Photos
        <div className={styles.profileHeaderLink}>See all photos</div>
      </div>
      <div className={styles.profileCardCount}>
        {photos.total_count === 0
          ? ""
          : photos.total_count === 1
          ? "1 Photo"
          : `${photos.total_count} photos`}
      </div>
      <div className={styles.profileCardGrid}>
        {photos.resources &&
          photos.resources.slice(0, 9).map((img) => (
            <div className={styles.profilePhotoCard} key={img.public_id}>
              <img src={img.secure_url} alt="" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Photos;
