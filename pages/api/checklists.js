import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  if (!db) {
    res.status(400).send({ message: "No db connection" });
    return;
  }

  const checklistArr = await db.collection("checklists").find({}).toArray();

  res.status(200).json(checklistArr);
};
