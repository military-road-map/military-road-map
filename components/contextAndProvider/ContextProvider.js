import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { ChecklistContext } from "./context";

const ContextProvider = ({ children }) => {
  const data = useSWR("http://localhost:3000/api/user/checklists").data;

  const [allChecklists, setAllChecklists] = useState({});

  useEffect(() => {
    if (data) {
      let checklists = data.checklists;
      for (const key in checklists) {
        checklists[key].tasks = {
          1: {
            task: "Task 1",
            description: "Description Of Take One",
            startWindowInDays: 540,
            endWindowInDays: 360,
            resources: ["resource link 1", "resource link 2", ""],
            dateCompleted: "",
            timeCompleted: "",
          },
          2: {
            task: "Task 2",
            description: "Description Of Take Two",
            startWindowInDays: 540,
            endWindowInDays: 360,
            resources: ["resource link 1", "resource link 2", ""],
            dateCompleted: "",
            timeCompleted: "",
          },
          3: {
            task: "Task 3",
            description: "Description Of Take Three",
            startWindowInDays: 540,
            endWindowInDays: 360,
            resources: ["resource link 1", "resource link 2", ""],
            dateCompleted: "",
            timeCompleted: "",
          },
        };
      }
      setAllChecklists(() => checklists);
    }
  }, [data]);

  return (
    <ChecklistContext.Provider value={{ allChecklists, setAllChecklists }}>
      {children}
    </ChecklistContext.Provider>
  );
};

export default ContextProvider;
