import React, { useState } from "react";
import styled from "styled-components";

const Task = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
`;
const TaskName = styled.div`
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
  taskId,
  taskInfo,
  completedTasks,
  setCompletedTasks,
  incompleteTasks,
  setIncompleteTasks,
  index,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const {
    taskName,
    description,
    isCompleted,
    timeBracket,
    resources,
    dateCompleted,
    timeCompleted,
  } = taskInfo;
  return (
    <Task>
      <TaskName
        showDetails={showDetails}
        onClick={() => setShowDetails(() => !showDetails)}
      >
        {taskName}
      </TaskName>
      <TaskDetails showDetails={showDetails}>
        {description}
        <br />
        resources: {resources}
        <br />
        {isCompleted ? (
          `Completed on ${dateCompleted} at ${timeCompleted}`
        ) : (
          <button
            onClick={() => {
              const date = new Date();
              const year = date.getFullYear();
              const month = date.getMonth();
              const day = date.getDate();
              const hour = date.getHours();
              const minutes = date.getMinutes();
              const complete = [
                ...completedTasks,
                {
                  taskId,
                  taskInfo: {
                    ...taskInfo,
                    isCompleted: true,
                    dateCompleted: `${day}/${month + 1}/${year}`,
                    timeCompleted: `${
                      hour.toString().length === 1 ? `0${hour}` : hour
                    }${minutes}`,
                  },
                },
              ];
              const incomplete = incompleteTasks.slice();
              incomplete.splice(index, 1);
              setShowDetails(() => !showDetails);
              setCompletedTasks(() => complete);
              setIncompleteTasks(() => incomplete);
            }}
          >
            Completed
          </button>
        )}
      </TaskDetails>
    </Task>
  );
};

export default Tasks;
