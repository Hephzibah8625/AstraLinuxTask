import { useState } from "react";
import { CommentsList, CommentForm, ApiPanel } from "../../components";
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

  const updateComment = (commentId, newComment) => {
    setComments([...comments.filter((c) => c.id !== commentId), newComment]);
  }

  return (
    <div className={classes.appPage}>
      <div className={classes.appPage__commentsSection}>
        <CommentForm create={createComment} />
        <CommentsList remove={removeComment} update={updateComment} comments={sortedComments} />
      </div>
      <div className={classes.appPage__analyticsSection}>
        <ApiPanel />
      </div>
    </div>
  )
};

export default AppPage;
