import React, { useState } from "react";
import styled from "styled-components";
import Spacer from "../ui/spacer";

const CreateNewTaskButton = styled.button`
  padding: 10px;
  border-radius: 5px;
  margin: 0 auto;
  text-align: center;
`;

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
      <label htmlFor="startWindowInDays">
        Make Task Available: <br />
        <input type="date" id="startWindowInDays" />
      </label>
      <br />
      <label htmlFor="endWindowInDays">
        Last Day To Complete: <br />
        <input type="date" id="endWindowInDays" />
      </label>
      <br />
      <label htmlFor="description">
        Description: <br />
        <textarea rows="4" id="description"></textarea>
      </label>
      <br />
      <label htmlFor="resources">
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
  ) : null;
  // <>
  //   <Spacer size={32}></Spacer>
  //   <h4>Create a new task for this tracker</h4>
  //   <Spacer size={16}></Spacer>
  //   <div style={{ display: "flex", alignContent: "center" }}>
  //     <CreateNewTaskButton
  //       onClick={() => setShowCreateTask(() => !showCreateTask)}
  //       style={{ textAlign: "center" }}
  //     >
  //       Create New Task
  //     </CreateNewTaskButton>
  //   </div>
  // </>
};

export default CreateNewTask;
