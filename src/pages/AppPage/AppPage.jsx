import { useState } from "react";
import { CommentsList, CommentForm } from "../../components";
import classes from "./AppPage.module.css";
import data from "../../helpers/CommentsData";
import { priorityValues } from  "../../helpers/PriorityTypes";

const AppPage = () => {
  const [comments, setComments] = useState(data);

  const sortedComments = [...comments].sort((a, b) => {
    if (a.createdAt === b.createdAt) {
      return priorityValues[b.priority] - priorityValues[a.priority];
    }
    return b.createdAt - a.createdAt;
  });

  const createComment = (newComent) => {
    setComments([...comments, newComent]);
  }

  const removeComment = (commentId) => {
    setComments(comments.filter((c) => c.id !== commentId));
  };

  return (
    <div className={classes.commentsSection}>
      <CommentForm create={createComment} />
      <CommentsList remove={removeComment} comments={sortedComments} />
    </div>
  )
};

export default AppPage;
