import { useState, useEffect } from "react";
import { CommentsList, CommentForm, ApiPanel, BarChart } from "../../components";
import { useComments } from "../../hooks/useComments";
import { useFetching } from "../../hooks/useFetching";
import { priorityTranslates } from "../../helpers/priorityTypes";
import { getConvertedTime } from "../../helpers/dateFunctions";
import ActivityService from "../../API/ActivityService";
import classes from "./AppPage.module.css";
import data from "../../helpers/commentsData";

const AppPage = () => {
  const [comments, setComments] = useState(data);
  const [activity, setActivity] = useState({});
  const sortedComments = useComments(comments);
  const [fetchActivity, isActivityLoading] = useFetching(async () => {
    const activity =  await ActivityService.get();
    setActivity(activity);
  });

  useEffect(() => {
    fetchActivity();
  }, []);

  const prepareChartData = (priority) => {
    const data = sortedComments
      .filter((c) => c.priority === priority)
      .reduce((prev, curr) => {
        if (!prev[curr.createdAt]) {
          prev[curr.createdAt] = 0;
        }
        prev[curr.createdAt] += 1;
        return prev;
      }, {});
    
    return {
      labels: Object.keys(data).map((d) => getConvertedTime(Number(d))),
      datasets: [
        {
          label: '',
          data: Object.values(data),
        }
      ],
    };
  };

  const createComment = (newComent) => {
    setComments([...comments, newComent]);
  };

  const removeComment = (commentId) => {
    setComments(comments.filter((c) => c.id !== commentId));
  };

  const updateComment = (commentId, newComment) => {
    setComments([...comments.filter((c) => c.id !== commentId), newComment]);
  };

  return (
    <div className={classes.appPage}>
      <div className={classes.appPage__commentsSection}>
        <CommentForm create={createComment} />
        <CommentsList remove={removeComment} update={updateComment} comments={sortedComments} />
      </div>
      <div className={classes.appPage__analyticsSection}>
        <ApiPanel activity={activity} link={ActivityService.APILink} isLoading={isActivityLoading}/>
        {Object.keys(priorityTranslates).map((p) =>
          <BarChart
            key={p}
            data={prepareChartData(p)}
            title={`${priorityTranslates[p]} приоритет`}
          />
        )}
      </div>
    </div>
  )
};

export default AppPage;
