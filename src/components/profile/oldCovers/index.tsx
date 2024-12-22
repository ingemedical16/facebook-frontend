import React, { useRef } from "react";
import { useSelector } from "react-redux";
import useClickOutside from "../../../hooks/useClickOutside";
import { RootState } from "../../../app/store";
import styles from "../Profile.module.css";
import { Photo } from "../../../types/types";


interface OldCoversProps {
  photos: Photo[];
  setCoverPicture: (url: string) => void;
  setShow: (value: boolean) => void;
}

const OldCovers: React.FC<OldCoversProps> = ({ photos, setCoverPicture, setShow }) => {
  const user = useSelector((state: RootState) => state.user.user);
  const ref = useRef<HTMLDivElement | null>(null);

  useClickOutside(ref, () => setShow(false));

  return (
    <div className="blur">
      <div className={`${styles.postBox} ${styles.selectCoverBox}`} ref={ref}>
        <div className={styles.box_header}>
          <div
            className={styles.small_circle}
            onClick={() => setShow(false)}
          >
            {/* Close button, replaced <i> with styled div or span */}
            <span className={styles.exit_icon} />
          </div>
          <span>Select photo</span>
        </div>
        <div className={styles.selectCoverBox_links}>
          <div className={styles.selectCoverBox_link}>Recent Photos</div>
          <div className={styles.selectCoverBox_link}>Photo Albums</div>
        </div>
        <div className={`${styles.old_pictures_wrap} ${styles.scrollbar}`}>
          <div className={styles.old_pictures}>
            {photos
              .filter((img) => img.folder === `${user?.username}/cover_pictures`)
              .map((photo) => (
                <img
                  src={photo.secure_url}
                  key={photo.public_id}
                  alt=""
                  onClick={() => {
                    setCoverPicture(photo.secure_url);
                    setShow(false);
                  }}
                />
              ))}
          </div>
          <div className={styles.old_pictures}>
            {photos
              .filter((img) => img.folder !== `${user?.username}/post_images`)
              .map((photo) => (
                <img
                  src={photo.secure_url}
                  key={photo.public_id}
                  alt=""
                  onClick={() => {
                    setCoverPicture(photo.secure_url);
                    setShow(false);
                  }}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OldCovers;