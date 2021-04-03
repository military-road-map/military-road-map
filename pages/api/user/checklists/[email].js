// TODO - Delete this file - used for testing and setting up db

import { connectToDatabase } from "../../../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  if (!db) {
    res.status(400).send({ message: "No db connection" });
    return;
  }

  // Get email from query
  const { email } = req.query;

  // GET
  if (req.method == "GET") {
    const user = await db.collection("users").findOne({ email: email });

    if (!user) {
      res
        .status(200)
        .json({ message: "No checklists currently for this email" });
      return;
    }

    res.status(200).json(user);
    return;
  }
  // POST
  else if (req.method == "POST") {
    const updatedChecklists = req.body;

    const existingUser = await db.collection("users").findOne({ email: email });
    const newUser = { ...existingUser, checklists: updatedChecklists };

    const result = await db
      .collection("users")
      .replaceOne({ email: email }, newUser, { upsert: true });

    res.status(200).json(result);
    return;
  }

  res
    .status(400)
    .send({ message: "Got to an unreachable point in checklists api route" });
  return;
};
