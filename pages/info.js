import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import fetch from "isomorphic-unfetch";
import Error from "./_error.js";
import { UserContext } from "../components/global/UserContext";

//* Info Page
//! user location must be present
//! sub-category will always be present since it is part of the URL

// read only sections of places

// use skeleton loader for the additional load time
// prob should put location in local storage


function InfoPage() {
  const router = useRouter();
  const { location, setLocation } = useContext(UserContext);
  const [loadingPlaces, setLoadingPlaces] = useState(true);
  const [placesError, setPlacesError] = useState(false)
  const [places, setPlaces] = useState([])

  async function fetchYelpPlaces() {
    try {
      const res = await fetch(`http://localhost:3000/api/yelpPlaces`, {
        method: "POST",
        body: JSON.stringify({ id: router.query.id, location })
      });
      const categories = await res.json();

      if (res.status !== 200) {
        throw {status: res.status}
      }
      
      setLoadingPlaces(false);
      setPlaces(categories.businesses)
      
    } catch(error) {
      console.error("Error =>", error);
      setPlacesError(true)
    }
  }


  useEffect(() => {
    if (location && router.query.id) {
      fetchYelpPlaces();
    }
  }, [location]);



  if (!router.query.id) {
    return <Error statusCode={400} message={'missing sub-category name'} />;
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
  
  console.log("=====INFO=====", places)

  return (
    <div>
      <h1>{router.query.id}</h1>
    </div>
  );
}

export default InfoPage;
