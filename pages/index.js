import React, { useState, useContext } from "react";
import Link from "next/link";
import { UserContext } from "../components/global/UserContext";
import LocationAutocomplete from "../components/LocationAutocomplete";

function index() {
  const { location } = useContext(UserContext);
  const [category, setCategory] = useState("");

  return (
    <div>
      <h1 className="text-5xl font-bold text-purple-500">Hello world!</h1>
      <h1>Hello Home</h1>

      {category ? (
        <Link href={`/${category}`}>
          <a>{category}</a>
        </Link>
      ) : (
        <p>Choose a category</p>
      )}

      <select onChange={(e) => setCategory(e.target.value)} name="categories">
        <option value="">--Select--</option>
        <option value="food">food</option>
        <option value="activities">activities</option>
      </select>

      {!location ? <LocationAutocomplete id="home" /> : <p>Location Set!</p>}
    </div>
  );
}

export default index;
