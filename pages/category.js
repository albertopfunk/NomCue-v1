import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import fetch from "isomorphic-unfetch";
import Error from "./_error.js";
import { UserContext } from "../components/global/UserContext";

//* Category Page
//! user location must be present
//! category will always be present since it is part of the URL
// user chooses sub category based on random choices

// random choices will be based on router.query.name(main category)

//! have data stored in a json file
// use *getInitialProps* to get the subCategories with the chosen main category
// you can keep subCategories in local state
// use local state to show 1 random category at a time, while
// keeping track of categories that have already been shown

// since this just uses the params, if user refreshes, this module can still use the params
// to render this page
// location will still need to be updated

/*

Random card algo

List of categories
Grab 1 random category from list
must not be duplicate

// Solution
cache

choose random number between list len
use that number to choose category from list
check category in cache
  if in cache
    skip
  if not in cache
    add to cache
    choose category
-

*/

function Category(props) {
  const router = useRouter();
  const { location, setLocation } = useContext(UserContext);
  const [subCategory, setSubCategory] = useState({});
  const [usedSubCategories, setUsedSubCategories] = useState({});
  const [usedtracker, setUsedtracker] = useState(0);

  console.log("=====CATEGORY=====");

  function chooseCategory() {
    let shouldKeepChecking = true;
    let index;
    let chosen;
    let chosenName;
    let complete = false;

    while (shouldKeepChecking && !complete) {
      index = Math.floor(Math.random() * props.categories.length) + 0;
      chosen = props.categories[index];
      chosenName = chosen.categoryIdentifier;

      if (usedSubCategories[chosenName]) {
        shouldKeepChecking = true;
      } else {
        shouldKeepChecking = false;
      }

      if (usedtracker > props.categories.length - 1) {
        complete = true;
        shouldKeepChecking = false;
      }
    }

    if (complete) {
      setUsedSubCategories({ [chosenName]: chosen });
      setUsedtracker(1);
    } else {
      setUsedSubCategories({ ...usedSubCategories, [chosenName]: chosen });
      setUsedtracker(usedtracker + 1);
    }

    setSubCategory(chosen);
  }

  useEffect(() => {
    if (!props.error && location) {
      chooseCategory();
    }
  }, [location]);

  if (props.error) {
    return <Error statusCode={props.error.status} message={props.error.message} />;
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

  return (
    <div>
      <h1>Hello Category</h1>

      <p>Chosen Main Category: {router.query.name}</p>
      <p>Chosen Sub Category: {subCategory.categoryIdentifier}</p>

      {subCategory ? (
        <Link href={`/info?id=${subCategory.categoryIdentifier}`}>
          <a>{`Go To ${subCategory.title}`}</a>
        </Link>
      ) : (
        <p>Choose a sub category</p>
      )}

      <button onClick={chooseCategory}>SHOW ME THE MONEY</button>
    </div>
  );
}

Category.getInitialProps = async function(context) {
  const { name } = context.query;

  if (!name) {
    return {
      error: {
        status: 400,
        message: 'missing category name'
      }
    }
  }

  try {
    const res = await fetch(
      `http://localhost:3000/api/subCategories?name=${name}`
    );
    const categories = await res.json();

    if (res.status !== 200) {
      throw { status: res.status, message: categories.message };
    }

    return { categories };
  } catch (error) {
    console.error("Error =>", error);
    return { error };
  }
};

export default Category;
