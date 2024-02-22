import classes from "./CustomButton.module.css";

const CustomButton = ({ children, ...props}) => {
    return (
        <button className={classes.customBtn} {...props}>
            {children}
        </button>
    );
};

export default CustomButton;
