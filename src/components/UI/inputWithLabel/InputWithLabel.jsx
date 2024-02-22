import classes from "./InputWithLabel.module.css";

const InputWithLabel = ({label, ...props}) => {
    return (
        <div className={classes.inputBase}>
            <div className={classes.label}>{ label }</div>
            <input className={classes.input} {...props} autoComplete="off" />
        </div>
    );
}

export default InputWithLabel
