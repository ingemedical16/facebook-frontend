import { FC } from "react";
import styles from "../CreatePostPopup.module.css";
export type PostErrorProps = {
  error: string;
  setError: (error: string) => void;
};
const PostError: FC<PostErrorProps> = ({ error, setError }) => {
  return (
    <div className={styles.postError}>
      <div className={styles.postError_error}>{error}</div>
      <button
        className='btn btn-primary'
        onClick={() => {
          setError("");
        }}
      >
        Try again
      </button>
    </div>
  );
};
export default PostError;
