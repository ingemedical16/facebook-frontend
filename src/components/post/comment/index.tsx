import Moment from 'react-moment';
import { FC } from 'react';
import { Comment as CommentType } from '../../../types/Post';
import styles from './Comment.module.css';

type CommentProps = {
  comment: CommentType;
};

const Comment: FC<CommentProps> = ({ comment }) => {
  return (
    <div className={styles.comment}>
      <img src={comment.commentBy?.picture ?? ''} alt="" className={styles.comment_img} />
      <div className={styles.comment_col}>
        <div className={styles.comment_wrap}>
          <div className={styles.comment_name}>
            {comment.commentBy.first_name} {comment.commentBy.last_name}
          </div>
          <div className={styles.comment_text}>{comment.comment}</div>
        </div>
        {comment.image && (
          <img src={comment.image} alt="" className={styles.comment_image} />
        )}
        <div className={styles.comment_actions}>
          <span>Like</span>
          <span>Reply</span>
          <span>
            <Moment fromNow interval={30}>
              {comment.commentAt }
            </Moment>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Comment;