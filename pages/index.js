import styled from "styled-components";
import Layout from "../components/layout";
import { useRouter } from "next/router";
import { useContext } from "react";
import { ChecklistContext } from "../components/contextAndProvider/context";
import { getAllChecklistNames } from "./api/checklists";

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

const Page = ({ checklistNames }) => {
  const router = useRouter();
  const { allChecklists, setAllChecklists } = useContext(ChecklistContext);

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
          <option value="none" disabled selected>
            Select One...
          </option>
          <optgroup label="Checklists">
            {checklistNames.map((checklistName) => (
              <option key={checklistName} value={checklistName}>
                {checklistName}
              </option>
            ))}
          </optgroup>
        </select>
        <input id="date" type="date"></input>
        <button
          onClick={() => {
            const date = document.getElementById("date").value;
            const checklistType = document.getElementById("checklistType")
              .value;
            const checklistName = document.getElementById("checklistName")
              .value;

            if (date && checklistType !== "none" && checklistName) {
              const index = Object.keys(allChecklists).length + 1;
              setAllChecklists(() => {
                return {
                  ...allChecklists,
                  [index]: {
                    eventDate: date,
                    type: checklistType,
                    name: checklistName,
                    tasks: [],
                  },
                };
              });
              document.getElementById("date").value = "";
              document.getElementById("checklistType").value = "none";
              document.getElementById("checklistName").value = "";
            }
          }}
        >
          Submit
        </button>
      </div>
    </Layout>
  );
};

// TODO - Need to pull updated checklists when user adds a new template
// This gets called on every request
export async function getServerSideProps() {
  const checklistNames = await getAllChecklistNames();

  console.log(checklistNames);

  // Pass data to the page via props
  return { props: { checklistNames } };
}

export default Page;
