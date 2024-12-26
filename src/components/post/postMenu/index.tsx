import { useRef, useState } from "react";
import { saveAs } from "file-saver";
import PostMenuItem from "./postMenuItem";
import useClickOutside from "../../../hooks/useClickOutside";
import { Post } from "../../../types/Post";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { deletePostAPI, toggleSavePostAPI } from "../../../features/function";
import styles from "./PostMenu.module.css";

interface PostMenuProps {
  post: Post;
  setShowMenu: (show: boolean) => void;
  checkSaved: boolean;
  setCheckSaved: (saved: boolean) => void;
  postRef: React.RefObject<HTMLDivElement>;
}

export default function PostMenu({
  post,
  setShowMenu,
  checkSaved,
  setCheckSaved,
  postRef,
}: PostMenuProps) {
  const user = useSelector((state: RootState) => state.user.user);
  const token = useSelector((state: RootState) => state.auth.token);
  const [test] = useState(post._id === user?._id);

  const menu = useRef<HTMLUListElement>(null);
  useClickOutside(menu, () => setShowMenu(false));

  const saveHandler = async () => {
    toggleSavePostAPI({ id: post._id, token: token as string });
    setCheckSaved(!checkSaved);
  };

  const downloadImages = async () => {
    post.images?.forEach((url) => {
      saveAs(url, "image.jpg");
    });
  };

  const deleteHandler = async () => {
    const res = await deletePostAPI({ id: post._id, token: token as string });

    if (res.statusText === "ok" && postRef.current) {
      postRef.current.remove();
    }
  };

  return (
    <ul className={styles.post_menu} ref={menu}>
      {test && <PostMenuItem icon="pin_icon" title="Pin Post" />}
      <div onClick={saveHandler}>
        {checkSaved ? (
          <PostMenuItem
            icon="save_icon"
            title="Unsave Post"
            subtitle="Remove this from your saved items."
          />
        ) : (
          <PostMenuItem
            icon="save_icon"
            title="Save Post"
            subtitle="Add this to your saved items."
          />
        )}
      </div>
      <div className={styles.line}></div>
      {test && <PostMenuItem icon="edit_icon" title="Edit Post" />}
      {!test && (
        <PostMenuItem
          icon="turnOnNotification_icon"
          title="Turn on notifications for this post"
        />
      )}
      {post.images?.length && (
        <div onClick={downloadImages}>
          <PostMenuItem icon="download_icon" title="Download" />
        </div>
      )}
      {post.images?.length && (
        <PostMenuItem icon="fullscreen_icon" title="Enter Fullscreen" />
      )}
      {test && <PostMenuItem img="/icons/lock.png" title="Edit audience" />}
      {test && (
        <PostMenuItem
          icon="turnOffNotifications_icon"
          title="Turn off notifications for this post"
        />
      )}
      {test && (
        <PostMenuItem icon="delete_icon" title="Turn off translations" />
      )}
      {test && <PostMenuItem icon="date_icon" title="Edit Date" />}
      {test && (
        <PostMenuItem icon="refresh_icon" title="Refresh share attachment" />
      )}
      {test && <PostMenuItem icon="archive_icon" title="Move to archive" />}
      {test && (
        <div onClick={deleteHandler}>
          <PostMenuItem
            icon="trash_icon"
            title="Move to trash"
            subtitle="Items in your trash are deleted after 30 days."
          />
        </div>
      )}
      {!test && <div className={styles.line}></div>}
      {!test && (
        <PostMenuItem
          img="/icons/report.png"
          title="Report post"
          subtitle="I'm concerned about this post."
        />
      )}
    </ul>
  );
}
