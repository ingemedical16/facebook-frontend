import { FC, useRef, useState } from "react";
import styles from "./CreatePostPopup.module.css";
import useClickOutside from "../../../hooks/useClickOutside";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import EmojiPickerBackgrounds from "./emojiPickerBackgrounds";
import ImagePreview from "./imagePreview";
import { PulseLoader } from "react-spinners";
import PostError from "./postError";
import AddToYourPost from "./addToYourPost";

import {
  createPost,
  getImagesUrl,
  uploadFilesToCloudAPI,
} from "../../../features/function";
import { dataURItoBlob } from "../../../utils/functions";

export type CreatePostPopupProps = {
  setCreatePostPopupVisible: (isVisible: boolean) => void;
  isProfile?: boolean;
};

const CreatePostPopup: FC<CreatePostPopupProps> = ({
  setCreatePostPopupVisible,
  isProfile = false,
}) => {
  const user = useSelector((state: RootState) => state.user.user);
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch<AppDispatch>();
  const popup = useRef<HTMLDivElement>(null);

  const [text, setText] = useState<string>("");
  const [showPrev, setShowPrev] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [background, setBackground] = useState<string>("");

  useClickOutside(popup, () => {
    setCreatePostPopupVisible(false);
  });

  const postSubmit = async () => {
    if (!user?._id || !token) {
      setError("User is not authenticated.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      if (background) {
        const result = await dispatch(
          createPost({
            type: null,
            background,
            text,
            user: user._id,
            comments: [],
            isProfile,
            token,
          })
        );
        handleResponse(result);
      } else if (images.length) {
        const postImages = images.map((img) => dataURItoBlob(img));
        const path = `${user.username}/post_images`;
        const formData = new FormData();
        formData.append("folder", path);
        postImages.forEach((image) => formData.append("files", image));

        const response = await uploadFilesToCloudAPI({
          formData,
          token,
        });

        const res = await dispatch(
          createPost({
            type: null,
            text,
            images: getImagesUrl({ files: response.data?.files }),
            user: user._id,
            comments: [],
            isProfile,
            token,
          })
        );
        handleResponse(res);
      } else if (text) {
        const res = await dispatch(
          createPost({
            type: null,
            text,
            user: user._id,
            comments: [],
            isProfile,
            token,
          })
        );
        handleResponse(res);
      } else {
        setError("Post must contain text, background, or images.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while creating the post.");
    } finally {
      setLoading(false);
    }
  };

  const handleResponse = (result: any) => {
    if (result.payload.status === 200) {
      resetForm();
    } else {
      setError("An error occurred while creating the post.");
    }
  };

  const resetForm = () => {
    setBackground("");
    setText("");
    setImages([]);
    setError("");
    setCreatePostPopupVisible(false);
  };

  return (
    <div className="blur">
      <div className={styles.postBox} ref={popup}>
        {error && <PostError error={error} setError={setError} />}
        <div className={styles.box_header}>
          <div
            className={styles.small_circle}
            onClick={() => setCreatePostPopupVisible(false)}
          >
            <i className="exit_icon"></i>
          </div>
          <span>Create Post</span>
        </div>
        <div className={styles.box_profile}>
          <img src={user?.picture} alt="" className={styles.box_profile_img} />
          <div className={styles.box_col}>
            <div className={styles.box_profile_name}>
              {user?.first_name} {user?.last_name}
            </div>
            <div className={styles.box_privacy}>
              <img src="/icons/public.png" alt="" />
              <span>Public</span>
              <i className="arrowDown_icon"></i>
            </div>
          </div>
        </div>

        {!showPrev ? (
          <EmojiPickerBackgrounds
            text={text}
            setText={setText}
            setBackground={setBackground}
            background={background}
          />
        ) : (
          <ImagePreview
            text={text}
            setText={setText}
            images={images}
            setImages={setImages}
            setShowPrev={setShowPrev}
            setError={setError}
          />
        )}
        <AddToYourPost setShowPrev={setShowPrev} />
        <button
          className={styles.post_submit}
          onClick={postSubmit}
          disabled={loading}
        >
          {loading ? <PulseLoader color="#fff" size={5} /> : "Post"}
        </button>
      </div>
    </div>
  );
};

export default CreatePostPopup;
