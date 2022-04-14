import { connectToDatabase } from "../../util/mongodb";

export default async (_, res) => {
  const { db } = await connectToDatabase();

  const activities = await db.collection("activities").find({}).toArray();
  res.send(activities);
};
