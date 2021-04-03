import React, { useState } from "react";
import styled from "styled-components";

const CreateNewTaskButton = styled.button`
  padding: 10px;
  border-radius: 5px;
  margin: 10px;
`;

// const convertDateToNumberOfDays = (date) => {
//   const dateSplit = date.split("-");
//   const dateReformat = [dateSplit[1], dateSplit[2], dateSplit[0]].join("/");
//   const newDate = new Date(dateReformat).getTime();
//   console.log({ newDate });
//   return newDate / (1000 * 3600 * 24);
// };

const CreateNewTask = ({ incompleteTasks, setIncompleteTasks, eventDate }) => {
  const [showCreateTask, setShowCreateTask] = useState(false);
  return showCreateTask ? (
    <fieldset>
      <legend>New Task</legend>
      <label>
        Task Name: <br />
        <input type="text" id="taskName" />
      </label>
      <br />
      <label for="startWindowInDays">
        Make Task Available: <br />
        <input type="date" id="startWindowInDays" />
      </label>
      <br />
      <label for="endWindowInDays">
        Last Day To Complete: <br />
        <input type="date" id="endWindowInDays" />
      </label>
      <br />
      <label for="description">
        Description: <br />
        <textarea rows="4" id="description"></textarea>
      </label>
      <br />
      <label for="resources">
        Resources: <br />
        <input type="text" id="resources" />
      </label>
      <br />
      <br />
      <CreateNewTaskButton
        onClick={() => {
          const taskId = (incompleteTasks.length + 1).toString();
          const task = document.getElementById("taskName").value;
          const description = document.getElementById("description").value;
          let startWindowInDays = document.getElementById("startWindowInDays")
            .value;
          let endWindowInDays = document.getElementById("endWindowInDays")
            .value;
          // const newEventDate = convertDateToNumberOfDays(eventDate);
          // startWindowInDays =
          //   convertDateToNumberOfDays(startWindowInDays) - newEventDate;
          // endWindowInDays =
          //   convertDateToNumberOfDays(endWindowInDays) - newEventDate;
          const resources = document.getElementById("resources").value;
          const tasks = [
            ...incompleteTasks,
            {
              taskId,
              taskInfo: {
                task,
                description,
                startWindowInDays,
                endWindowInDays,
                resources,
                dateCompleted: "",
                timeCompleted: "",
              },
            },
          ];
          setIncompleteTasks(() => tasks);
          setShowCreateTask(() => !showCreateTask);
        }}
      >
        Submit
      </CreateNewTaskButton>
      <CreateNewTaskButton
        onClick={() => setShowCreateTask(() => !showCreateTask)}
      >
        Cancel
      </CreateNewTaskButton>
    </fieldset>
  ) : (
    <CreateNewTaskButton
      onClick={() => setShowCreateTask(() => !showCreateTask)}
    >
      Create New Task
    </CreateNewTaskButton>
  );
};

export default CreateNewTask;
