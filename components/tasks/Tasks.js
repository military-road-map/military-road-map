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
  cursor: pointer;

  background-color: ${(props) => {
    if (props.status === "completed") {
      return "hsl(120deg,70%,40%)";
    } else if (props.status === "upcoming") {
      return "hsl(60deg,60%,60%)";
    } else if (props.status === "overdue") {
      return "hsl(0deg,60%,50%)";
    }
  }};

  &:hover {
    background-color: ${(props) => {
      if (props.status === "completed") {
        return "hsl(120deg,50%,50%)";
      } else if (props.status === "upcoming") {
        return "hsl(60deg,80%,50%)";
      } else if (props.status === "overdue") {
        return "red";
      }
    }};
  }
`;

const TaskName = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  border-bottom: ${({ showDetails }) =>
    showDetails ? "1px solid black" : "none"};
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
      status={
        dateCompleted
          ? "completed"
          : differenceInDays > 30
          ? "upcoming"
          : "overdue"
      }
      onClick={() => setShowDetails(() => !showDetails)}
    >
      <TaskName showDetails={showDetails}>
        <div>{task}</div>
        <div>
          {dateCompleted
            ? `Completed on ${dateCompleted} at ${timeCompleted}`
            : differenceInDays > 0
            ? `Due in ${differenceInDays} Days`
            : `Overdue by ${Math.abs(differenceInDays)} Days`}
        </div>
      </TaskName>
      <TaskDetails showDetails={showDetails}>
        {description}
        <br />
        resources: {resources}
        <br />
        {dateCompleted ? null : (
          <button onClick={handleCompleteTask}>Mark Complete</button>
        )}
      </TaskDetails>
    </Task>
  );
};

export default Tasks;
