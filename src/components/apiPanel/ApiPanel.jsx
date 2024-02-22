import { Loader } from "../UI";
import classes from "./ApiPanel.module.css";

const ApiPanel = ({isLoading, activity, link}) => {
  return (
    <div className={classes.apiPanel}>
      {
        isLoading ?
          <Loader />
        : (
          <>
            <div>Name: {link}</div>
            <div>Result: {activity.key}</div>
          </>
        )
      }
    </div>
  );
};

export default ApiPanel;
