import { connectToDatabase } from "../../util/mongodb";

export async function getAllChecklistNames() {
  const { db } = await connectToDatabase();

  if (!db) {
    console.warn("No db connection");
    return null;
  }

  const checklistArr = await db.collection("checklists").find({}).toArray();
  const checklistNames = checklistArr.map(({ name }) => name);

  return checklistNames;
}

export default async (req, res) => {
  const checklistNames = await getAllChecklistNames();

  res.status(200).json(checklistNames);
};
