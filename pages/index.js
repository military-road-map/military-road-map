import styled from "styled-components";
import Layout from "../components/layout";
import { useRouter } from "next/router";
import { useContext } from "react";
import { ChecklistContext } from "../components/contextAndProvider/context";
import useSWR from "swr";

const ListHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  margin-top: 10px;
  border-bottom: 1px solid black;
`;

const IndividualList = styled(ListHeader)`
  box-shadow: 0 0 5px black;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  padding: 5px;
`;

const Page = () => {
  const router = useRouter();
  const { allChecklists, setAllChecklists } = useContext(ChecklistContext);
  const { data: checklistTemplates } = useSWR("/api/checklists");

  function handleAddChecklist(e) {
    e.preventDefault();
    const date = document.getElementById("date").value;
    const checklistInd = document.getElementById("checklistType").value;
    const checklistName = document.getElementById("checklistName").value;

    const checklistTemplate = {
      ...checklistTemplates[checklistInd],
      eventDate: date,
    };

    if (date && checklistInd !== "none" && checklistName) {
      const index = allChecklists ? Object.keys(allChecklists).length + 1 : 0;

      const updatedChecklists = {
        ...allChecklists,
        [index]: checklistTemplate,
      };

      setAllChecklists(() => updatedChecklists);

      fetch("/api/user/checklists", {
        method: "POST",
        headers: {
          "Content-Type": "applciation/json",
          Accept: "application/json",
        },
        body: JSON.stringify(updatedChecklists),
      })
        .then((resp) => resp.json())
        .then(console.log);

      document.getElementById("date").value = "";
      document.getElementById("checklistType").value = "none";
      document.getElementById("checklistName").value = "";
    }
  }

  return (
    <Layout>
      <ListHeader>
        <div>Name</div>
        <div>Type</div>
        <div>Future Date</div>
      </ListHeader>
      {!allChecklists || Object.keys(allChecklists).length === 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          No Checklists
        </div>
      ) : (
        Object.keys(allChecklists).map((listId) => (
          <IndividualList
            key={listId}
            onClick={() => router.push(`/${listId}`)}
          >
            <div>{allChecklists[listId].name}</div>
            <div>{allChecklists[listId].type}</div>
            <div>{allChecklists[listId].eventDate}</div>
          </IndividualList>
        ))
      )}
      <div
        style={{
          margin: "10px 0px",
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid black",
          padding: "5px",
        }}
      >
        <input
          id="checklistName"
          type="text"
          placeholder="Enter Checklist Name"
          autoComplete="off"
        ></input>
        <select id="checklistType">
          <option value="none">Select One...</option>
          <optgroup label="Checklists">
            {!checklistTemplates
              ? null
              : Object.entries(checklistTemplates).map(([key, checklist]) => {
                  return (
                    <option key={key} value={key}>
                      {checklist.name}
                    </option>
                  );
                })}
          </optgroup>
        </select>
        <input id="date" type="date"></input>
        <button onClick={handleAddChecklist}>Submit</button>
      </div>
    </Layout>
  );
};

export default Page;
