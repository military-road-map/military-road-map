import styled from "styled-components";
import Layout from "../components/layout";
import { useRouter } from "next/router";
import { useContext } from "react";
import { ChecklistContext } from "../components/contextAndProvider/context";
import useSWR from "swr";
import { updateUserChecklists } from "../util/dbUserUtil";
import { useSession } from "next-auth/client";

const ListHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  margin-top: 10px;
  border-bottom: 2px solid black;
`;

const IndividualList = styled(ListHeader)`
  box-shadow: 0 0 5px black;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  padding: 5px;
  margin-bottom: 16px;
  background-color: hsl(140deg, 59%, 60%, 0.5);

  :hover {
    background-color: hsl(140deg, 100%, 30%, 0.7);
  }
`;

const TrackerStyle = styled.div`
  font-size: var(--size-4);
  width: 100%;

  h2 {
    text-align: center;
    margin-bottom: 16px;
  }
`;

const Page = () => {
  const router = useRouter();
  const [session] = useSession();
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

      updateUserChecklists(updatedChecklists);

      document.getElementById("date").value = "";
      document.getElementById("checklistType").value = "none";
      document.getElementById("checklistName").value = "";
    }
  }

  let checklistSpot;

  // Cannot show checklists if user is not logged in
  if (!session) {
    checklistSpot = (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "32px",
          fontSize: "var(--size-3)",
        }}
      >
        Log in with your social media account to start tracking
      </div>
    );
  }
  // message to show if no checklists exist
  else if (!allChecklists || Object.keys(allChecklists).length === 0) {
    checklistSpot = (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "32px",
        }}
      >
        You don&apos;t have any checklists yet. Add one below to get on track.
      </div>
    );
  }
  //iterate through checklists to display
  else {
    checklistSpot = Object.keys(allChecklists).map((listId) => (
      <IndividualList
        key={listId}
        onClick={() => router.push(`/tracks/${listId}`)}
      >
        <div>{allChecklists[listId].name}</div>
        <div>{allChecklists[listId].type}</div>
        <div>{allChecklists[listId].eventDate}</div>
      </IndividualList>
    ));
  }

  return (
    <Layout>
      <TrackerStyle>
        <section>
          <h2>Your Trackers</h2>
          <ListHeader>
            <h4>Name</h4>
            <h4>Type</h4>
            <h4>Future Date</h4>
          </ListHeader>
          {checklistSpot}
        </section>
        <h2>Create a new Tracker</h2>
        <div
          style={{
            margin: "10px 0px",
            display: "flex",
            justifyContent: "space-between",
            borderTop: "2px solid black",
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
      </TrackerStyle>
    </Layout>
  );
};

export default Page;
