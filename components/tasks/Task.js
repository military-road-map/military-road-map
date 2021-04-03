import React, { useState } from "react";
import styled from "styled-components";

const IndividualTask = styled.div`
  display: flex;
  justify-content: center;
`;
const TaskName = styled.div`
  border: ${({ isShow }) => (isShow ? "1px solid black" : "none")};
`;

const Task = ({ taskInfo }) => {
  const [showDetails, setShowDetails] = useState(false);
  const {
    taskName,
    description,
    isCompleted,
    timeBracket,
    resources,
  } = taskInfo;
  return <IndividualTask>{taskName}</IndividualTask>;
};

export default Task;
