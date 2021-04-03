import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { ChecklistContext } from "../components/contextAndProvider/context";
import Layout from "../components/layout";
import Tasks from "../components/tasks/Tasks";

const Checklist = () => {
  const router = useRouter();
  const { id } = router.query;
  const [completedTasks, setCompletedTasks] = useState([]);
  const [incompleteTasks, setIncompleteTasks] = useState([]);
  const { allChecklists, setAllChecklists } = useContext(ChecklistContext);

  useEffect(() => {
    if (id && id !== undefined) {
      let complete = [];
      let incomplete = [];
      const tasks = allChecklists[id].tasks;
      Object.keys(tasks).forEach((taskId) => {
        if (tasks[taskId].timeCompleted) {
          complete.push({ taskId, taskInfo: tasks[taskId] });
        } else {
          incomplete.push({ taskId, taskInfo: tasks[taskId] });
        }
      });
      console.log({ complete, incomplete });
      setCompletedTasks(() => complete);
      setIncompleteTasks(() => incomplete);
      // seperating tasks into complete and incomplete tasks
      //   Object.keys(allChecklists[id].tasks).forEach((taskId, index) => {
      //     if (allChecklists[id].tasks[taskId].timeCompleted.length > 0) {
      //       complete = [
      //         ...complete,
      //         {
      //           taskId: taskId,
      //           taskInfo: allChecklists[id].tasks[taskId],
      //         },
      //       ];
      //     } else {
      //       incomplete = [
      //         ...incomplete,
      //         {
      //           taskId: taskId,
      //           taskInfo: allChecklists[id].tasks[taskId],
      //         },
      //       ];
      //     }
      //     if (index === allChecklists[id].tasks.length - 1) {
      //       console.log({ complete });
      //       setCompletedTasks(() => complete);
      //       setIncompleteTasks(() => incomplete);
      //     }
      //   });
    }
  }, [id]);

  return (
    <Layout>
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
    </Layout>
  );
};

export default Checklist;
