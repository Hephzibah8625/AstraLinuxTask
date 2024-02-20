import useAuth from "../../hooks/useAuth";
import classes from "./CommentItem.module.css";
import {  CustomButton } from "../../UI";
import { priorityTranslates } from "../../helpers/PriorityTypes";

const CommentItem = (props) => {
    const { auth } = useAuth();

    const convertedTime = (ts) => {
        const date = new Date(ts);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        return `${day > 9 ? day : '0' + day}.${month > 9 ? month : '0' + month}.${date.getFullYear()}`;
    };

    return (
        <div className={classes.comment}>
            <div className={classes.comment__header}>
                <div>
                    { props.author }
                </div>
                <div>
                    { convertedTime(props.createdAt) }
                </div>
                <div>
                    Приоритет: { priorityTranslates[props.priority] }
                </div>
            </div>
            <div className={classes.comment__body}>
                <div>
                    { props.comment }
                </div>
                {
                    props.author === auth?.username ? (
                        <div className={classes.comment__buttons}>
                            <CustomButton onClick={() => props.remove(props.id)} >
                                Удалить
                            </CustomButton>
                        <CustomButton>
                                Изменить
                            </CustomButton>
                        </div>
                    )
                        : null
                }
            </div>
        </div>
    );
}

export default CommentItem;
