import fetch from "isomorphic-unfetch";
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
      return []
    }

    return places;
  } catch (error) {
    return []
  }
}

async function getGooglePlaces(id, location) {
  const type = id.type ? `&type=${id.type}` : ""
  const keyword = id.keyword ? `&keyword=${id.keyword}` : ""
  const url = `${process.env.GOOGLE_PLACES_NEARBY_URL}?location=${location.lat},${location.lon}&radius=50000${type}${keyword}&key=${process.env.GOOGLE_KEY}`

  try {
    const res = await fetch(url);
    const places = await res.json();

    if (res.status !== 200) {
      return []
    }

    return places;
  } catch (error) {
    return []
  }
}

function handlePlaceDups(yelpPlaces, googlePlaces) {

  console.log("DUPS", yelpPlaces, googlePlaces)

  return ["HELLO"]
}

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const { slug, location } = JSON.parse(req.body);


  try {
    const activity = await db
      .collection('activities')
      .findOne({})
    ;
  
    console.log("API ACTIVITTYYYYYY", activity, location, slug)
  
    let places;
    let yelpPlaces = []
    let googlePlaces = []
  
    if (activity.categoryIdentifiers.yelp) {
      yelpPlaces = await getYelpPlaces(activity.categoryIdentifiers.yelp, location)
    }
  
    if (activity.categoryIdentifiers.google) {
      googlePlaces = await getGooglePlaces(activity.categoryIdentifiers.google, location)
    }
  
    places = handlePlaceDups(yelpPlaces, googlePlaces)
  
    res.send(places);
  } catch(error) {
    console.log(error)
  }
};
