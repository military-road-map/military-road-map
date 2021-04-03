// TODO - Delete this file - used for testing and setting up db

import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  if (!db) {
    res.status(400).send({ message: "No db connection" });
    return;
  }

  // Get checklist name from query
  const { type } = req.query;

  // GET
  if (req.method == "GET") {
    const checklist = await db.collection("checklists").findOne({ type: type });

    if (!checklist) {
      res.status(400).json({ message: "No checklist for that type" });
      return;
    }

    res.status(200).json(checklist);
    return;
  }
  // POST
  else if (req.method == "POST") {
    const updatedChecklist = req.body;

    const result = await db
      .collection("checklists")
      .replaceOne({ type: type }, updatedChecklist, { upsert: true });

    res.status(200).json(result);
    return;
  }

  res
    .status(400)
    .send({ message: "Got to an unreachable point in checklists api route" });
  return;
};
