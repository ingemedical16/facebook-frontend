import { FC, useEffect, useRef, useState } from "react";
import Picker, { EmojiClickData } from "emoji-picker-react";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { dataURItoBlob } from "../../../utils/functions";
import { comment, uploadFilesToCloudAPI } from "../../../features/function";
import styles from "./CreateComment.module.css";

// Define the props interface
interface CreateCommentProps {
  postId: string;
}

const CreateComment: FC<CreateCommentProps> = ({ postId }) => {
  const user = useSelector((state: RootState) => state.user.user);
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch<AppDispatch>();
  const [picker, setPicker] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [commentImage, setCommentImage] = useState<string>("");
  const [cursorPosition, setCursorPosition] = useState<number | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  const textRef = useRef<HTMLInputElement | null>(null);
  const imgInput = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (textRef.current && cursorPosition !== undefined) {
      textRef.current.selectionEnd = cursorPosition;
    }
  }, [cursorPosition]);

  const handleEmoji = (emojiData: EmojiClickData) => {
    const emoji = emojiData.emoji;
    if (textRef.current) {
      textRef.current.focus();
      const start = text.substring(0, textRef.current.selectionStart || 0);
      const end = text.substring(textRef.current.selectionStart || 0);
      const newText = start + emoji + end;
      setText(newText);
      setCursorPosition(start.length + emoji.length);
    }
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (
      !["image/jpeg", "image/png", "image/webp", "image/gif"].includes(
        file.type
      )
    ) {
      setError(`${file.name} format is not supported.`);
      return;
    }

    if (file.size > 1024 * 1024 * 5) {
      setError(`${file.name} is too large. Max 5MB allowed.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setCommentImage(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleComment = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && text.trim() !== "") {
      setLoading(true);

      try {
        let imgCommentUrl = "";
        if (commentImage) {
          const imgBlob = dataURItoBlob(commentImage);
          const path = `${user?.username}/post_images/${postId}`;
          const formData = new FormData();
          formData.append("folder", path);
          formData.append("file", imgBlob);

          const imgCommentResponse = uploadFilesToCloudAPI({
            formData,
            token: token as string,
          });

          imgCommentUrl = (await imgCommentResponse).data?.files[0].url ?? "";
        }
       
        const result = await dispatch(
          comment({
            postId,
            comment: text,
            image: imgCommentUrl,
            token: token as string,
          })
        );
        if (result.payload) {
          console.log(result.payload);
        }

        // Reset fields
        setText("");
        setCommentImage("");
      } catch (error) {
        setError("An error occurred while posting the comment.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className={styles.comment_wrap}>
      <div className={styles.create_comment}>
        <img src={user?.picture} alt="User" />
        <div className={styles.comment_input_wrap}>
          {picker && (
            <div className={styles.comment_emoji_picker}>
              <Picker onEmojiClick={handleEmoji} />
            </div>
          )}
          <input
            type="file"
            hidden
            ref={imgInput}
            accept="image/jpeg,image/png,image/gif,image/webp"
            onChange={handleImage}
          />
          {error && (
            <div className={`${styles.postError} ${styles.comment_error}`}>
              <div className={styles.postError_error}>{error}</div>
              <button className="btn btn-primary" onClick={() => setError("")}>
                Try again
              </button>
            </div>
          )}
          <input
            type="text"
            ref={textRef}
            value={text}
            placeholder="Write a comment..."
            onChange={(e) => setText(e.target.value)}
            onKeyUp={handleComment}
          />
          <div
            className={styles.comment_circle_icon}
            style={{ marginTop: "5px" }}
          >
            <ClipLoader size={20} color="#1876f2" loading={loading} />
          </div>
          <div
            className={`${styles.comment_circle_icon} hover2`}
            onClick={() => setPicker((prev) => !prev)}
          >
            <i className="emoji_icon"></i>
          </div>
          <div
            className={`${styles.comment_circle_icon} hover2`}
            onClick={() => imgInput.current?.click()}
          >
            <i className="camera_icon"></i>
          </div>
          <div className={`${styles.comment_circle_icon} hover2`}>
            <i className="gif_icon"></i>
          </div>
          <div className={`${styles.comment_circle_icon} hover2`}>
            <i className="sticker_icon"></i>
          </div>
        </div>
      </div>
      {commentImage && (
        <div className={styles.comment_img_preview}>
          <img src={commentImage} alt="Preview" />
          <div
            className={styles.small_white_circle}
            onClick={() => setCommentImage("")}
          >
            <i className="exit_icon"></i>
          </div>
        </div>
      )}
    </div>
  );
};
export default CreateComment;
