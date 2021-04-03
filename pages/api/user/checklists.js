import { connectToDatabase } from "../../../util/mongodb";
import { getSession } from "next-auth/client";

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
