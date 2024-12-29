import { useRef, useState, ChangeEvent } from "react";
import { useSelector } from "react-redux";
import styles from "./ProfilePicture.module.css";
import { handleFileUpload } from "../../utils/functions/handleFileUpload";
import { RootState } from "../../app/store";
import UpdateProfilePicture from "./updateProfilePicture";
import { Photo } from "../../types/types";



interface ProfilePictureProps {
  setShow: (show: boolean) => void;
  pRef: React.RefObject<HTMLDivElement>;
  photos: Photo[];
}

export default function ProfilePicture({
  setShow,
  pRef,
  photos,
}: ProfilePictureProps) {
  const popup = useRef<HTMLDivElement>(null);
  const refInput = useRef<HTMLInputElement>(null);

  const user = useSelector((state: RootState) => state.user.user);
  const [image, setImage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    handleFileUpload(
      e,
      (errorMessage: string) => setError(errorMessage),
      (base64Image: string) => setImage(base64Image),
      { maxSizeMB: 5 }
    );
  };

  return (
    <div className="blur">
      <div className={styles.updateProfilePicture}>
      <input
        type="file"
        ref={refInput}
        hidden
        onChange={handleImage}
        accept="image/jpeg,image/png,image/webp,image/gif"
      />
      <div className={styles.postBox} ref={popup}>
        <div className={styles.box_header}>
          <div
            className={styles.small_circle}
            onClick={() => setShow(false)}
          ></div>
          <span>Update profile picture</span>
        </div>
        <div className={styles.update_picture_wrap}>
          <div className={styles.update_picture_buttons}>
            <button
              className="btn btn-light_blue"
              onClick={() => refInput.current?.click()}
            >
              <span className="plus_icon"></span>
              <span>Upload photo</span>
              
            </button>
            <button className="btn btn-gray">
              <span className="frame_icon"></span>
              Add frame
            </button>
          </div>
        </div>
        {error && (
          <div className={styles.post_error}>
            <div className={styles.post_error_message}>{error}</div>
            <button
              className="btn btn-primary"
              onClick={() => setError("")}
            >
              Try again
            </button>
          </div>
        )}
        <div className={styles.old_pictures_wrap}>
          <h4>Your profile pictures</h4>
          <div className={styles.old_pictures}>
            {photos
              .filter(
                (img) => img.asset_folder === `${user?.username}/profile_pictures`
              )
              .map((photo) => (
                <img
                  src={photo.secure_url}
                  key={photo.public_id}
                  alt=""
                  onClick={() => setImage(photo.secure_url)}
                  className={styles.old_picture}
                />
              ))}
          </div>
          <h4>Other pictures</h4>
          <div className={styles.old_pictures}>
            {photos
              .filter(
                (img) => img.asset_folder !== `${user?.username}/profile_pictures`
              )
              .map((photo) => (
                <img
                  src={photo.secure_url}
                  key={photo.public_id}
                  alt=""
                  onClick={() => setImage(photo.secure_url)}
                  className={styles.old_picture}
                />
              ))}
          </div>
        </div>
      </div>
      {image && (
        <UpdateProfilePicture
          setImage={setImage}
          image={image}
          setShow={setShow}
          setError={setError}
          pRef={pRef}
        />
      )}
      </div>
    </div>
  );
}
