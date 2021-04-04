export async function createUserInDb(db, email, checklistToAdd) {
  if (checklistToAdd === undefined) {
    const result = await db
      .collection("users")
      .insertOne({ email, checklists: {} });
    return result;
  } else {
    const result = await db
      .collection("users")
      .insertOne({ email, checklists: { 1: checklistToAdd } });
    return result;
  }
}

export async function updateUserChecklists(updatedChecklists) {
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
}
