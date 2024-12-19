import React, { useEffect, useRef, useState } from "react";
import { Post as PostType, Comment as CommentType } from "../../types/Post";
import styles from "./Post.module.css";
import {
  getReactionsAPI,
  handlePostReactionsByPostIdAPI,
} from "../../features/function";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { ReactionCount, ReactionEnum } from "../../types/Reaction";
import ReactionsPopup from "./reactionsPopup";
import PostMenu from "./postMenu";
import CreateComment from "./createComment";
import Comment from "./comment";
import PostHeader from "./PostHeader";
import PostInfo from "./PostInfo";
import PostContent from "./postContent";

interface PostProps {
  post: PostType;
  isProfile?: boolean;
}

const Post: React.FC<PostProps> = ({ post, isProfile }) => {
  const token = useSelector((state: RootState) => state.auth.token);
  const [visible, setVisible] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [reacts, setReacts] = useState<ReactionCount[] | undefined>();
  const [check, setCheck] = useState<ReactionEnum | undefined>();
  const [total, setTotal] = useState<number>(0);
  const [count, setCount] = useState<number>(1);
  const [checkSaved, setCheckSaved] = useState<boolean | undefined>();
  const [comments, setComments] = useState<CommentType[]>([]);

  const postRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getPostReacts = async () => {
      const res = await getReactionsAPI({
        id: post._id,
        token: token as string,
      });

      setReacts(res.data?.reactions);
      setCheck(res.data?.userReaction);
      setTotal(res.data?.totalReacts || 0);
      setCheckSaved(res.data?.isPostSaved);
    };
    getPostReacts();
  }, [post, token]);

  useEffect(() => {
    setComments(post?.comments || []);
  }, [post]);

  const reactHandler = async (type: ReactionEnum) => {
    await handlePostReactionsByPostIdAPI({
      postRef: post._id,
      reaction: type,
      token: token as string,
    });

    if (check === type) {
      setCheck(undefined);
      const index = reacts?.findIndex((x) => x.reaction === check);
      if (index !== undefined && index !== -1) {
        reacts![index].count--;
        setReacts([...reacts!]);
        setTotal((prev) => prev - 1);
      }
    } else {
      setCheck(type);
      const index = reacts?.findIndex((x) => x.reaction === type);
      const index1 = reacts?.findIndex((x) => x.reaction === check);
      if (index !== undefined && index !== -1) {
        reacts![index].count++;
        setReacts([...reacts!]);
        setTotal((prev) => prev + 1);
      }
      if (index1 !== undefined && index1 !== -1) {
        reacts![index1].count--;
        setReacts([...reacts!]);
        setTotal((prev) => prev - 1);
      }
    }
  };

  const showMore = () => {
    setCount((prev) => prev + 3);
  };

  return (
    <div
      className={styles.post}
      style={{ width: isProfile ? "100%" : "" }}
      ref={postRef}
    >
      <PostHeader post={post} setShowMenu={setShowMenu} />
      <PostContent post={post} />
      <PostInfo
        reactions={reacts ?? []}
        totalReactions={total}
        commentsLength={comments.length}
      />
      <div className={styles.post_actions}>
        <ReactionsPopup
          visible={visible}
          setVisible={setVisible}
          reactHandler={reactHandler}
        />
        <div
          className={`${styles.post_action} hover1`}
          onMouseOver={() => {
            setTimeout(() => {
              setVisible(true);
            }, 500);
          }}
          onMouseLeave={() => {
            setTimeout(() => {
              setVisible(false);
            }, 500);
          }}
          onClick={() => reactHandler(check || ReactionEnum.like)}
        >
          {check ? (
            <img
              src={`reacts/${check}.svg`}
              alt=""
              className={styles.small_react}
              style={{ width: "18px" }}
            />
          ) : (
            <i className="like_icon"></i>
          )}
          <span
            style={{
              color:
                check === ReactionEnum.like
                  ? "#4267b2"
                  : check === ReactionEnum.love
                  ? "#f63459"
                  : check === ReactionEnum.haha
                  ? "#f7b125"
                  : check === ReactionEnum.sad
                  ? "#f7b125"
                  : check === ReactionEnum.wow
                  ? "#f7b125"
                  : check === ReactionEnum.angry
                  ? "#e4605a"
                  : "",
            }}
          >
            {check || ReactionEnum.like}
          </span>
        </div>
        <div className={`${styles.post_action} hover1`}>
          <i className="comment_icon"></i>
          <span>Comment</span>
        </div>
        <div className={`${styles.post_action} hover1`}>
          <i className="share_icon"></i>
          <span>Share</span>
        </div>
      </div>
      <div className={styles.comments_wrap}>
        <div className={styles.comments_order}></div>
        <CreateComment postId={post._id.toString()} />
        {comments &&
          [...comments]
            .sort((a, b) => {
              const dateA = new Date(b.commentAt);
              const dateB = new Date(a.commentAt);
              return dateA.getTime() - dateB.getTime();
            })
            .slice(0, count)
            .map((comment, i) => <Comment comment={comment} key={i} />)}
        {count < comments.length && (
          <div className={styles.view_comments} onClick={() => showMore()}>
            View more comments
          </div>
        )}
      </div>
      {showMenu && (
        <PostMenu
          post={post}
          setShowMenu={setShowMenu}
          checkSaved={checkSaved as boolean}
          setCheckSaved={setCheckSaved}
          postRef={postRef}
        />
      )}
    </div>
  );
};

export default Post;
