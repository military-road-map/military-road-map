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
