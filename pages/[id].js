import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Task from "../components/tasks/Task";

const sampleData = {
  1: {
    taskName: "Task Name 1",
    description: "Brief Description",
    isCompleted: false,
    timeBracket: 12,
    resources: ["link1", "link2"],
  },
  2: {
    taskName: "Task Name 2",
    description: "Brief Description",
    isCompleted: false,
    timeBracket: 8,
    resources: ["link1", "link2"],
  },
  3: {
    taskName: "Task Name 3",
    description: "Brief Description",
    isCompleted: false,
    timeBracket: 20,
    resources: ["link1", "link2"],
  },
};

const Checklist = () => {
  const router = useRouter();
  const { id } = router.query;
  const [completedTasks, setCompletedTasks] = useState([]);
  const [incompleteTasks, setIncompleteTasks] = useState([]);

  useEffect(() => {
    const complete = [];
    const incomplete = [];

    // seperating tasks into complete and incomplete tasks
    Object.values(sampleData).forEach((task) =>
      task.isCompleted ? complete.push(task) : incomplete.push(task)
    );

    setCompletedTasks(() => complete);
    setIncompleteTasks(() => incomplete);
  }, []);
  return (
    <div>
      <div>
        <h5>INCOMPLETE TASKS</h5>
        {incompleteTasks.map((taskInfo) => (
          <Task taskInfo={taskInfo} />
        ))}
      </div>
    </div>
  );
};

export default Checklist;
