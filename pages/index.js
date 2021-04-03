import { useState } from "react";
import Layout from "../components/layout";
import { useRouter } from "next/router";
import styled from "styled-components";

const ListHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
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
  const [checkLists, setCheckLists] = useState([]);
  return (
    <Layout>
      <ListHeader>
        <div>Name</div>
        <div>Type</div>
        <div>Date</div>
      </ListHeader>
      {checkLists.map(({ date, checklistType, checklistName }) => (
        <IndividualList onClick={() => router.push(`/${checklistName}`)}>
          <div>{checklistName}</div>
          <div>{checklistType}</div>
          <div>{date}</div>
        </IndividualList>
      ))}
      <div
        style={{
          margin: "10px 0px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <input
          id="checklistName"
          type="text"
          placeholder="Enter Checklist Name"
        ></input>
        <select id="checklistType">
          <option value="Seperation">Seperation</option>
          <option value="PCS">PCS</option>
        </select>
        <input id="date" type="date"></input>
        <button
          onClick={() => {
            const date = document.getElementById("date").value;
            const checklistType = document.getElementById("checklistType")
              .value;
            const checklistName = document.getElementById("checklistName")
              .value;
            setCheckLists(() => [
              ...checkLists,
              { date, checklistType, checklistName },
            ]);
          }}
        >
          Submit
        </button>
      </div>
    </Layout>
  );
};

export default Page;
