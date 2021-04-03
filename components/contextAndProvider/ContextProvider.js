import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { ChecklistContext } from "./context";

const ContextProvider = ({ children }) => {
  const data = useSWR("http://localhost:3000/api/user/checklists").data;

  const [allChecklists, setAllChecklists] = useState({});

  useEffect(() => {
    if (data) {
      setAllChecklists(() => data.checklists);
    }
  }, [data]);

  return (
    <ChecklistContext.Provider value={{ allChecklists, setAllChecklists }}>
      {children}
    </ChecklistContext.Provider>
  );
};

export default ContextProvider;
