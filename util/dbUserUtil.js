export async function createUserInDb(db, email, checklists = {}) {
  const result = await db.collection("users").insertOne({ email, checklists });
  return result;
}
