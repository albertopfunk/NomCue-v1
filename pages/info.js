import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import fetch from "isomorphic-unfetch";
import Error from "./_error.js";
import { UserContext } from "../components/global/UserContext";

function InfoPage() {
  const router = useRouter();
  const { location, setLocation } = useContext(UserContext);
  const [loadingPlaces, setLoadingPlaces] = useState(true);
  const [placesError, setPlacesError] = useState(false);
  const [places, setPlaces] = useState([]);

  async function fetchYelpPlaces() {
    try {
      const res = await fetch(`${process.env.CLIENT_URL}/api/yelpPlaces`, {
        method: "POST",
        body: JSON.stringify({ id: router.query.id, location })
      });
      const categories = await res.json();

      if (res.status !== 200) {
        throw { status: res.status };
      }

      setLoadingPlaces(false);
      setPlaces(categories.businesses);
    } catch (error) {
      console.error("Error =>", error);
      setLoadingPlaces(false);
      setPlacesError(true);
    }
  }

  useEffect(() => {
    if (location && router.query.id) {
      fetchYelpPlaces();
    }
  }, [location]);

  if (!router.query.id) {
    return <Error statusCode={400} message={"missing sub-category name"} />;
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

  return (
    <div>
      <h1>{router.query.id}</h1>
    </div>
  );
}

export default InfoPage;
