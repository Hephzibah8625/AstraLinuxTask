import { CommentItem } from "../index";
import classes from "./CommentsList.module.css";

const CommentsList = ({comments, remove}) => {
  return (
    <div className={classes.comments_list}>
      {comments.map((comment) => 
        <CommentItem remove={remove} {...comment} key={comment.id} />
      )}
    </div>
  );
};

export default CommentsList;
