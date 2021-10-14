import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../../components/global/UserContext"


export default function ActivityPlaces() {
  const router = useRouter();
  const { slug } = router.query;
  const { location, setLocation } = useContext(UserContext);
  const [loadingPlaces, setLoadingPlaces] = useState(true);
  const [placesError, setPlacesError] = useState(false);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    if (location && slug) {
      fetchPlaces();
    }
  }, [location]);

  async function fetchPlaces() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/activityPlaces`, {
        method: "POST",
        body: JSON.stringify({
          slug,
          location: {lat: 34.052235, lon: -118.243683}
        }),
      });

      const places = await res.json();

      if (res.status !== 200) {
        throw {
          status: res.status,
          message: places.message,
          errType: places.errType,
        };
      }
      console.log("UI PLACESSSSS", places)
      setLoadingPlaces(false);
      setPlaces(places);
    } catch (error) {
      console.error("Error =>", error);
      setLoadingPlaces(false);
      setPlacesError(true);
    }
  }

  if (!slug) {
    return <h1>Page Loading...</h1>
  }

  if (!location) {
    return (
      <div>
        <h2>Need Location</h2>
        <button onClick={() => setLocation("Los Angeles, CA")}>
          Choose Location
        </button>
      </div>
    );
  }
  
  if (loadingPlaces) return <h1>SKELETON Loading...</h1>;

  if (placesError) return <h1>SKELETON ERROR...</h1>;


  console.log(places)

  return (
    <div>
      PLACES
    </div>
  )
}
