export async function createUserInDb(db, email, checklistToAdd = {}) {
  const result = await db
    .collection("users")
    .insertOne({ email, checklists: { 1: checklistToAdd } });
  return result;
}
