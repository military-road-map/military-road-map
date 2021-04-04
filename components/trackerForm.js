import styled from "styled-components";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useSession } from "next-auth/client";

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

export function TrackerForm({ checklistTemplates, handleAddChecklist }) {
  const [session] = useSession();

  return (
    <FormWrapperStyle>
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
                autocomplete="off"
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
            <div style={{ gridColumnStart: "span 2", textAlign: "center" }}>
              <button type="submit" disabled={isSubmitting || !session}>
                Submit
              </button>
              {!session ? (
                <div className="error" style={{ float: "none" }}>
                  Login Required
                </div>
              ) : null}
            </div>
          </Form>
        )}
      </Formik>
    </FormWrapperStyle>
  );
}
