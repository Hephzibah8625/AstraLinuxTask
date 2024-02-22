import { CommentItem } from "../index";
import classes from "./CommentsList.module.css";

const CommentsList = ({comments, remove, update}) => {
  return (
    <div className={classes.comments_list}>
      {comments.map((comment) => 
        <CommentItem remove={remove} update={update} {...comment} key={comment.id} />
      )}
    </div>
  );
};

export default CommentsList;
