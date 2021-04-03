import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Tasks from "../components/tasks/Tasks";

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
    Object.keys(sampleData).forEach((taskId) =>
      taskId.isCompleted
        ? complete.push({ taskId: taskId, taskInfo: sampleData[taskId] })
        : incomplete.push({ taskId: taskId, taskInfo: sampleData[taskId] })
    );

    setCompletedTasks(() => complete);
    setIncompleteTasks(() => incomplete);
  }, []);
  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <h4 style={{ borderBottom: "1px solid black" }}>INCOMPLETE TASKS</h4>
        {incompleteTasks.map(({ taskId, taskInfo }, index) => (
          <Tasks
            taskId={taskId}
            taskInfo={taskInfo}
            completedTasks={completedTasks}
            setCompletedTasks={setCompletedTasks}
            incompleteTasks={incompleteTasks}
            setIncompleteTasks={setIncompleteTasks}
            index={index}
          />
        ))}
      </div>
      <div style={{ textAlign: "center" }}>
        <h4 style={{ borderBottom: "1px solid black" }}>COMPLETE TASKS</h4>
        {completedTasks.map(({ taskId, taskInfo }, index) => (
          <Tasks
            taskId={taskId}
            taskInfo={taskInfo}
            completedTasks={completedTasks}
            setCompletedTasks={setCompletedTasks}
            incompleteTasks={incompleteTasks}
            setIncompleteTasks={setIncompleteTasks}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Checklist;
