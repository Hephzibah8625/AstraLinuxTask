import classes from "./ApiPanel.module.css";

const ApiPanel = ({activity, link}) => {
  return (
    <div className={classes.apiPanel}>
      <div>Name: {link}</div>
      <div>Result: {activity.key}</div>
    </div>
  );
};

export default ApiPanel;
