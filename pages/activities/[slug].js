import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../../components/global/UserContext";
import LocationAutocomplete from "../../components/LocationAutocomplete";

export default function ActivityPlaces() {
  const router = useRouter();
  const { slug } = router.query;
  const { location } = useContext(UserContext);
  const [loadingPlaces, setLoadingPlaces] = useState(true);
  const [placesError, setPlacesError] = useState(false);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    if (location !== null && slug) {
      fetchPlaces();
    }
  }, [location]);

  async function fetchPlaces() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/activityPlaces`,
        {
          method: "POST",
          body: JSON.stringify({
            slug,
            location: { lat: location.lat, lon: location.lng },
          }),
        }
      );

      const places = await res.json();

      if (res.status !== 200) {
        throw {
          status: res.status,
          message: places.message,
          errType: places.errType,
        };
      }
      console.log("UI PLACESSSSS", places);
      setLoadingPlaces(false);
      setPlaces(places);
    } catch (error) {
      console.error("Error =>", error);
      setLoadingPlaces(false);
      setPlacesError(true);
    }
  }

  if (!slug) {
    return <h1>Page Loading...</h1>;
  }

  if (location === null) {
    return (
      <div>
        <h2>Need Location</h2>
        <LocationAutocomplete />
      </div>
    );
  }

  if (loadingPlaces) return <h1>SKELETON Loading...</h1>;

  if (placesError) return <h1>SKELETON ERROR...</h1>;

  console.log(places);

  return <div>PLACES</div>;
}
