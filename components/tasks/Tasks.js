import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Task = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 5px black;
  justify-content: space-between;
  background-color: ${({ color }) => color};
`;
const TaskName = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  border-bottom: ${({ showDetails }) =>
    showDetails ? "1px solid black" : "none"};
  cursor: pointer;
`;

const TaskDetails = styled.div`
  width: 100%;
  display: ${({ showDetails }) => (showDetails ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

const Tasks = ({
  eventDate,
  taskId,
  taskInfo,
  completedTasks,
  setCompletedTasks,
  incompleteTasks,
  setIncompleteTasks,
  index,
  markTaskComplete,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const {
    task,
    description,
    endWindowInMs,
    resources,
    dateCompleted,
    timeCompleted,
  } = taskInfo;

  const [differenceInDays, setDifferenceInDays] = useState(999999);

  useEffect(() => {
    const currentDate = new Date().getTime();
    const date = eventDate.split("-");
    // const dueDateString = `${date[0]}/${date[1]}/${date[2]}`;
    const dueDate = new Date(date[0], date[1] - 1, date[2]).getTime();

    const differenceInTime = Math.ceil(
      (dueDate - endWindowInMs - currentDate) / (1000 * 60 * 60 * 24)
    );

    setDifferenceInDays(differenceInTime);
  }, []);

  function getDateComplete(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    return `${day}/${month + 1}/${year}`;
  }

  function getTimeComplete(date) {
    const hour = date.getHours();
    const minutes = date.getMinutes();
    return `${hour.toString().length === 1 ? `0${hour}` : hour}${minutes}`;
  }

  function handleCompleteTask() {
    const date = new Date();
    const newDateCompleted = getDateComplete(date);
    const newTimeCompleted = getTimeComplete(date);

    if (markTaskComplete) {
      markTaskComplete(newDateCompleted, newTimeCompleted);
    }

    const complete = [
      ...completedTasks,
      {
        taskId,
        taskInfo: {
          ...taskInfo,
          dateCompleted: newDateCompleted,
          timeCompleted: newTimeCompleted,
        },
      },
    ];
    const incomplete = incompleteTasks.slice();
    incomplete.splice(index, 1);
    setShowDetails(() => !showDetails);
    setCompletedTasks(() => complete);
    setIncompleteTasks(() => incomplete);
  }

  return (
    <Task
      color={dateCompleted ? "green" : differenceInDays > 14 ? "yellow" : "red"}
    >
      <TaskName
        showDetails={showDetails}
        onClick={() => setShowDetails(() => !showDetails)}
      >
        <div>{task}</div>
        <div>
          {dateCompleted
            ? `Completed on ${dateCompleted} at ${timeCompleted}`
            : `Due: ${differenceInDays} Days`}
        </div>
      </TaskName>
      <TaskDetails showDetails={showDetails}>
        {description}
        <br />
        resources: {resources}
        <br />
        {dateCompleted ? null : ( // `Completed on ${dateCompleted} at ${timeCompleted}`
          <button onClick={handleCompleteTask}>Completed</button>
        )}
      </TaskDetails>
    </Task>
  );
};

export default Tasks;
