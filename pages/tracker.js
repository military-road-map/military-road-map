import styled from "styled-components";
import Layout from "../components/layout";
import { useRouter } from "next/router";
import { useContext } from "react";
import { ChecklistContext } from "../components/contextAndProvider/context";
import useSWR from "swr";
import { updateUserChecklists } from "../util/dbUserUtil";
import { useSession } from "next-auth/client";
import { TrackerForm } from "../components/trackerForm";

const ListHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
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

  .type {
    text-transform: capitalize;
  }

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

  async function handleAddChecklist(values) {
    const date = values.checklistDate;
    const checklistInd = values.checklistInd;
    const checklistName = values.checklistName;

    const checklistTemplate = {
      ...checklistTemplates[checklistInd],
      eventDate: date,
      name: checklistName,
    };

    const index = allChecklists ? Object.keys(allChecklists).length + 1 : 0;

    const updatedChecklists = {
      ...allChecklists,
      [index]: checklistTemplate,
    };

    setAllChecklists(() => updatedChecklists);

    await updateUserChecklists(updatedChecklists);
  }

  function capitalizePCS(type) {
    if (type == "pcs") {
      return "PCS";
    } else {
      return type;
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
        <div className="type">{capitalizePCS(allChecklists[listId].type)}</div>
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
        <TrackerForm
          handleAddChecklist={handleAddChecklist}
          checklistTemplates={checklistTemplates}
        ></TrackerForm>
      </TrackerStyle>
    </Layout>
  );
};

export default Page;
