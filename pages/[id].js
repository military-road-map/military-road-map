import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { ChecklistContext } from "../components/contextAndProvider/context";
import Layout from "../components/layout";
import CreateNewTask from "../components/tasks/CreateNewTask";
import Tasks from "../components/tasks/Tasks";
import { updateUserChecklists } from "../util/dbUserUtil";

const Checklist = () => {
  const router = useRouter();
  const { id } = router.query;
  const [eventDate, setEventDate] = useState("");
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
      setEventDate(() => allChecklists[id].eventDate);
      setCompletedTasks(() => complete);
      setIncompleteTasks(() => incomplete);
    }
  }, [id]);

  function markTaskComplete(taskId, dateCompleted, timeCompleted) {
    // Making sure we change state immutably
    // TODO - Probably a good idea to use immer or some immutability library in the future
    const originalChecklist = allChecklists[id];
    const originalTasks = originalChecklist.tasks;
    const originalTask = originalTasks[taskId];
    const updatedTask = { ...originalTask, dateCompleted, timeCompleted };
    const updatedTasks = { ...originalTasks, [taskId]: updatedTask };
    const updatedChecklist = { ...originalChecklist, tasks: updatedTasks };
    const updatedAllChecklists = { ...allChecklists, [id]: updatedChecklist };

    //Update State
    setAllChecklists(updatedAllChecklists);

    //Update Database
    updateUserChecklists(updatedAllChecklists);
  }

  return (
    <Layout>
      <div style={{ textAlign: "center" }}>
        <CreateNewTask
          incompleteTasks={incompleteTasks}
          setIncompleteTasks={setIncompleteTasks}
          eventDate={eventDate}
        />
        <h4 style={{ borderBottom: "1px solid black" }}>INCOMPLETE TASKS</h4>
        {incompleteTasks.map(({ taskId, taskInfo }, index) => (
          <Tasks
            key={taskId}
            eventDate={eventDate}
            taskId={taskId}
            taskInfo={taskInfo}
            completedTasks={completedTasks}
            setCompletedTasks={setCompletedTasks}
            incompleteTasks={incompleteTasks}
            setIncompleteTasks={setIncompleteTasks}
            index={index}
            markTaskComplete={(dateCompleted, timeCompleted) => {
              markTaskComplete(taskId, dateCompleted, timeCompleted);
            }}
          />
        ))}
      </div>
      <div style={{ textAlign: "center" }}>
        <h4 style={{ borderBottom: "1px solid black" }}>COMPLETE TASKS</h4>
        {completedTasks.map(({ taskId, taskInfo }, index) => (
          <Tasks
            key={taskId}
            eventDate={eventDate}
            taskId={taskId}
            taskInfo={taskInfo}
            completedTasks={completedTasks}
            setCompletedTasks={setCompletedTasks}
            incompleteTasks={incompleteTasks}
            setIncompleteTasks={setIncompleteTasks}
            index={index}
            markTaskComplete={null}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Checklist;
