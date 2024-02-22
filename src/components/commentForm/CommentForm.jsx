import { useMemo, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { CustomButton, CustomTextarea } from "../UI";
import { priorityTranslates } from "../../helpers/priorityTypes";
import { getStartOfDay } from "../../helpers/dateFunctions";
import classes from "./CommentForm.module.css"

const CommentForm = ({create}) => {
  const { auth } = useAuth();

  const [formComment, setFormComment] = useState({comment: '', priority: Object.keys(priorityTranslates)[0]});

  const submitDisabled = useMemo(() => {
    return !formComment.comment.length;
  }, [formComment.comment]);
  
  const addNewComment = (e) => {
    e.preventDefault();

    const newComment = {
      ...formComment,
      id: Date.now(),
      createdAt: getStartOfDay(),
      author: auth?.username,
    };
    create(newComment);
    setFormComment({comment: '', priority: Object.keys(priorityTranslates)[0]});
  };

	return (
		<form name="commentForm" className={classes.form}>
      <div className={classes.form__title}>Добавить новый комментарий</div>
      <CustomTextarea
        value={formComment.comment}
        onChange={e => setFormComment({...formComment, comment: e.target.value})}
      />
      <div className={classes.form__button}>
        <div className={classes.form__select}>
          <label htmlFor="priority">Приоритет: </label>
          <select
            id="priority"
            value={formComment.priority}
            onChange={e => setFormComment({...formComment, priority: e.target.value})}
          >
            {Object.entries(priorityTranslates).map(([key, value], index) =>
              <option value={key} key={index}>{ value }</option>
            )}
          </select>
        </div>
        <CustomButton disabled={submitDisabled} onClick={addNewComment}>Отправить</CustomButton>
      </div>
    </form>
	);
}

export default CommentForm;
