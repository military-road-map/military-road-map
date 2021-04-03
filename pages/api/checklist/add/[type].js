// TODO - Delete this file - used for testing and setting up db

import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../../util/mongodb";
import { createUserInDb } from "../../../../util/dbUserUtil";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const session = await getSession({ req });

  if (!db) {
    res.status(400).send({ message: "No db connection" });
    return;
  }

  if (!session) {
    res.status(400).send({ message: "User is not logged in" });
    return;
  }

  // Extract email from session
  const {
    user: { email },
  } = session;

  // Get checklist name from query
  const { type } = req.query;

  // GET
  if (req.method == "GET") {
    const checklistToAdd = await db
      .collection("checklists")
      .findOne({ type: type });

    if (!checklistToAdd) {
      res.status(400).json({ message: "No checklist for that type" });
      return;
    }

    // Get existing user by email in the DB
    const user = await db.collection("users").findOne({ email: email });

    // If an existing user does not exist, create a new one with that email
    if (!user) {
      // TODO - Do something (error check) with result
      await createUserInDb(db, email, checklistToAdd);
      res.status(200).json({ checklists: checklistToAdd });
      return;
    }

    const newChecklistKey =
      Math.max(Object.keys(user.checklists).map((x) => parseInt(x, 10))) + 1;

    const newChecklists = {
      ...user.checklists,
      [newChecklistKey]: checklistToAdd,
    };

    // TODO - Do something (error check) with result
    await db
      .collection("users")
      .updateOne({ email: email }, { $set: { checklists: newChecklists } });

    res.status(200).json(newChecklists);
    return;
  }
  // POST
  else if (req.method == "POST") {
    res
      .status(400)
      .send({ message: "Only GET requests allowed to this route" });
    return;
  }

  res
    .status(400)
    .send({ message: "Got to an unreachable point in checklists api route" });
  return;
};
