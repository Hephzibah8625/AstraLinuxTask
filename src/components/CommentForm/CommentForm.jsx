import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { CustomButton, CustomTextarea } from "../../UI";
import { priorityTranslates } from "../../helpers/PriorityTypes";
import classes from "./CommentForm.module.css"

const CommentForm = ({create}) => {
  const { auth } = useAuth();

  const [comment, setComment] = useState({comment: '', priority: Object.keys(priorityTranslates)[0]});

  const addNewComment = (e) => {
    e.preventDefault();

    const startOfDay = new Date();
    startOfDay.setUTCHours(0, 0, 0, 0);

    const newComment = {
      ...comment,
      id: Date.now(),
      createdAt: startOfDay.getTime(),
      author: auth?.username,
    };
    create(newComment);
    setComment({comment: '', priority: Object.keys(priorityTranslates)[0]});
  };

	return (
		<form name="commentForm" className={classes.form}>
      <CustomTextarea
        value={comment.comment}
        onChange={e => setComment({...comment, comment: e.target.value})}
      />
      <div className={classes.form__button}>
        <div className={classes.form__select}>
          <label htmlFor="priority">Приоритет: </label>
          <select id="priority" value={comment.priority} onChange={e => setComment({...comment, priority: e.target.value})}>
            {Object.entries(priorityTranslates).map(([key, value], index) =>
              <option value={key} key={index}>{ value }</option>
            )}
          </select>
        </div>
        <CustomButton onClick={addNewComment}>Отправить</CustomButton>
      </div>
    </form>
	);
}

export default CommentForm;
