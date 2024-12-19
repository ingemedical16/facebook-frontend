import { FC, useRef } from "react";
import styles from "../CreatePostPopup.module.css";
import EmojiPickerBackgrounds from "../emojiPickerBackgrounds";

export type ImagePreviewProps = {
  text: string;
  setText: (text: string) => void;
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  setShowPrev: (showPrev: boolean) => void;
  setError: (error: string) => void;
};

const ImagePreview: FC<ImagePreviewProps> = ({
  text,
  setText,
  images,
  setImages,
  setShowPrev,
  setError,
}) => {
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    files.forEach((img) => {
      if (
        img.type !== "image/jpeg" &&
        img.type !== "image/png" &&
        img.type !== "image/webp" &&
        img.type !== "image/gif"
      ) {
        setError(
          `${img.name} format is unsupported! Only Jpeg, Png, Webp, and Gif are allowed.`
        );
        return;
      }

      if (img.size > 1024 * 1024 * 5) {
        setError(`${img.name} size is too large. Maximum 5MB allowed.`);
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(img);

      reader.onload = (readerEvent) => {
        const result = readerEvent.target?.result as string;
        if (result) {
          setImages((prevImages) => [...prevImages, result]);
        }
      };
    });
  };

  return (
    <div className={`${styles.overflow_a} ${styles.scrollbar}`}>
      <EmojiPickerBackgrounds text={text} setText={setText} isType2={true} />
      <div className={styles.add_pics_wrap}>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          multiple
          hidden
          ref={imageInputRef}
          onChange={handleImages}
        />
        {images && images.length ? (
          <div className={`${styles.add_pics_inside1} ${styles.p0}`}>
            <div className={styles.preview_actions}>
              <button className="hover1">
                <i className="edit_icon"></i>
                Edit
              </button>
              <button
                className="hover1"
                onClick={() => {
                  imageInputRef.current?.click();
                }}
              >
                <i className="addPhoto_icon"></i>
                Add Photos/Videos
              </button>
            </div>
            <div
              className={styles.small_white_circle}
              onClick={() => setImages([])}
            >
              <i className="exit_icon"></i>
            </div>
            <div
              className={
                images.length === 1
                  ? styles.preview1
                  : images.length === 2
                  ? styles.preview2
                  : images.length === 3
                  ? styles.preview3
                  : images.length === 4
                  ? styles.preview4
                  : images.length === 5
                  ? styles.preview5
                  : images.length % 2 === 0
                  ? styles.preview6
                  : `${styles.preview6} ${styles.singular_grid}`
              }
            >
              {images.map((img, i) => (
                <img src={img} key={i} alt="" />
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.add_pics_inside1}>
            <div
              className={styles.small_white_circle}
              onClick={() => setShowPrev(false)}
            >
              <i className="exit_icon"></i>
            </div>
            <div
              className="add_col"
              onClick={() => imageInputRef.current?.click()}
            >
              <div className={styles.add_circle}>
                <i className="addPhoto_icon"></i>
              </div>
              <span>Add Photos/Videos</span>
              <span>or drag and drop</span>
            </div>
          </div>
        )}
        <div className={styles.add_pics_inside2}>
          <div className={styles.add_circle}>
            <i className="phone_icon"></i>
          </div>
          <div className={styles.mobile_text}>
            Add photos from your mobile device.
          </div>
          <span className={styles.addphone_btn}>Add</span>
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;
