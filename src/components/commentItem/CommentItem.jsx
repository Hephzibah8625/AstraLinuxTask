import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import {  CustomButton, CustomTextarea } from "../UI";
import { priorityTranslates } from "../../helpers/priorityTypes";
import { getStartOfDay, getConvertedTime } from "../../helpers/dateFunctions";
import classes from "./CommentItem.module.css";

const CommentItem = (props) => {
  const { auth } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [newCommentText, setNewCommentText] = useState(props.comment);

  const updateComment = () => {
    const newComment = {
      id: props.id,
      comment: newCommentText,
      createdAt: getStartOfDay(),
      author: props.author,
      priority: props.priority,
    };
    props.update(props.id, newComment);
    setIsEditing(false);
  };

  return (
    <div className={classes.comment}>
      <div className={classes.comment__header}>
        <div>
          { props.author }
        </div>
        <div>
          { getConvertedTime(props.createdAt) }
        </div>
        <div>
          Приоритет: { priorityTranslates[props.priority] }
        </div>
      </div>
      <div className={classes.comment__body}>
        {
          isEditing ? (
            <CustomTextarea value={newCommentText} onChange={(e) => setNewCommentText(e.target.value)} />
          )
          : (
            <pre>
              { props.comment }
            </pre>
          )
        }
        {
          props.author === auth?.username ? (
            <div className={classes.comment__buttons}>
              <CustomButton onClick={() => props.remove(props.id)}>
                Удалить
              </CustomButton>
              {
                isEditing ? (
                  <CustomButton onClick={updateComment}>
                    Сохранить
                  </CustomButton>
                )
                : (
                  <CustomButton onClick={() => setIsEditing(true)}>
                    Изменить
                  </CustomButton>
                )
              }
            </div>
          )
            : null
        }
      </div>
    </div>
  );
}

export default CommentItem;
