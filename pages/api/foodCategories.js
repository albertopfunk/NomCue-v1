import { connectToDatabase } from "../../util/mongodb";


export default async (_, res) => {
  const { db } = await connectToDatabase();

  const food = await db
    .collection('food')
    .find({})
    .toArray()
  ;

  res.send(food);
};
