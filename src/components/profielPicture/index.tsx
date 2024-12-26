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
      <input
        type="file"
        ref={refInput}
        hidden
        onChange={handleImage}
        accept="image/jpeg,image/png,image/webp,image/gif"
      />
      <div className={styles.postBox} ref={popup}>
        <div className={styles.boxHeader}>
          <div
            className={styles.smallCircle}
            onClick={() => setShow(false)}
          ></div>
          <span>Update profile picture</span>
        </div>
        <div className={styles.updatePictureWrap}>
          <div className={styles.updatePictureButtons}>
            <button
              className={styles.lightBlueBtn}
              onClick={() => refInput.current?.click()}
            >
              <span className={styles.plusIcon}></span>
              Upload photo
            </button>
            <button className={styles.grayBtn}>
              <span className={styles.frameIcon}></span>
              Add frame
            </button>
          </div>
        </div>
        {error && (
          <div className={styles.postError}>
            <div className={styles.postErrorMessage}>{error}</div>
            <button
              className={styles.blueBtn}
              onClick={() => setError("")}
            >
              Try again
            </button>
          </div>
        )}
        <div className={styles.oldPicturesWrap}>
          <h4>Your profile pictures</h4>
          <div className={styles.oldPictures}>
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
                  className={styles.oldPicture}
                />
              ))}
          </div>
          <h4>Other pictures</h4>
          <div className={styles.oldPictures}>
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
                  className={styles.oldPicture}
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
  );
}
