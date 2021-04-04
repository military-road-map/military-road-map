import styled from "styled-components";
import Layout from "../components/layout";
import { useRouter } from "next/router";
import { useContext } from "react";
import { ChecklistContext } from "../components/contextAndProvider/context";
import useSWR from "swr";
import { updateUserChecklists } from "../util/dbUserUtil";
import { useSession } from "next-auth/client";
import { Formik, Form, Field, ErrorMessage } from "formik";

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

const FormWrapperStyle = styled.div`
  border-top: 2px solid black;

  form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    flex-direction: column;
    margin: 0 24px;
    row-gap: 8px;
    column-gap: 8px;
  }

  label {
    text-align: right;
  }

  button {
    width: fit-content;
    margin: auto;
    grid-column-start: span 2;
  }

  .error {
    color: red;
    font-size: var(--size-6);
    margin-left: 8px;
    display: inline-block;
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
        <FormWrapperStyle>
          {/* <form>
            <label>
              Task Name:
              <input
                id="checklistName"
                type="text"
                placeholder="Enter Checklist Name"
                autoComplete="off"
              ></input>
            </label>
            <select id="checklistType">
              <option value="none">Select One...</option>
              <optgroup label="Checklists">
                {!checklistTemplates
                  ? null
                  : Object.entries(checklistTemplates).map(
                      ([key, checklist]) => {
                        return (
                          <option key={key} value={key}>
                            {checklist.name}
                          </option>
                        );
                      }
                    )}
              </optgroup>
            </select>
            <input id="date" type="date"></input>
            <button onClick={handleAddChecklist}>Submit</button>
          </form> */}

          <Formik
            initialValues={{
              checklistName: "",
              checklistInd: "",
              checklistDate: "",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.checklistName) {
                errors.checklistName = "Required";
              }
              if (!values.checklistInd) {
                errors.checklistInd = "Required";
              }
              if (!values.checklistDate) {
                errors.checklistDate = "Required";
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              console.log("submitting");
              await handleAddChecklist(values);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <label htmlFor="checklistName">Task Name:</label>
                <div>
                  <Field
                    type="text"
                    name="checklistName"
                    placeholder="My Checklist Name"
                  />
                  <ErrorMessage
                    className="error"
                    name="checklistName"
                    component="div"
                  />
                </div>
                <label htmlFor="checklistInd">Choose a checklist:</label>
                <div>
                  <Field as="select" name="checklistInd">
                    <option value="">Select One...</option>
                    {!checklistTemplates
                      ? null
                      : Object.entries(checklistTemplates).map(
                          ([key, checklist]) => {
                            return (
                              <option key={key} value={key}>
                                {checklist.name}
                              </option>
                            );
                          }
                        )}
                  </Field>
                  <ErrorMessage
                    name="checklistInd"
                    component="div"
                    className="error"
                  />
                </div>
                <label>Your target task date:</label>
                <div>
                  <Field type="date" name="checklistDate" />
                  <ErrorMessage
                    name="checklistDate"
                    component="div"
                    className="error"
                  />
                </div>
                <button type="submit" disabled={isSubmitting}>
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </FormWrapperStyle>
      </TrackerStyle>
    </Layout>
  );
};

export default Page;
