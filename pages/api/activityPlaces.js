import { connectToDatabase } from "../../util/mongodb";

async function getYelpPlaces(id, location) {
  const url = `${process.env.YELP_URL}?latitude=${location.lat}&longitude=${location.lon}&radius=40000&categories=${id}&limit=50`;

  const options = {
    headers: {
      Authorization: `Bearer ${process.env.YELP_KEY}`,
    },
  };

  try {
    const res = await fetch(url, options);
    const places = await res.json();

    if (res.status !== 200) {
      return [];
    }

    return places;
  } catch (error) {
    return [];
  }
}

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const { slug, location } = JSON.parse(req.body);

  try {
    const activity = await db.collection("activities").findOne({ slug });
    let yelpPlaces = [];
    if (activity.categoryIdentifiers.yelp) {
      yelpPlaces = await getYelpPlaces(
        activity.categoryIdentifiers.yelp,
        location
      );
    }

    res.send(yelpPlaces);
  } catch (error) {
    console.log(error);
  }
};
