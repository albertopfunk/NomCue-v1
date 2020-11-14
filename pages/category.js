import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import fetch from "isomorphic-unfetch";
import Error from "./_error.js";
import { UserContext } from "../components/global/UserContext";

function Category(props) {
  const router = useRouter();
  const { location, setLocation } = useContext(UserContext);
  const [subCategory, setSubCategory] = useState({});
  const [usedSubCategories, setUsedSubCategories] = useState({});
  const [usedtracker, setUsedtracker] = useState(0);

  useEffect(() => {
    if (!props.error && location) {
      chooseCategory();
    }
  }, [location]);

  function chooseCategory() {
    let shouldKeepChecking = true;
    let index;
    let chosen;
    let chosenName;
    let complete = false;
    let maxShouldCheck = 15;

    while (shouldKeepChecking && !complete) {
      index = Math.floor(Math.random() * props.categories.length);
      chosen = props.categories[index];
      chosenName = chosen.categoryIdentifier;

      if (usedSubCategories[chosenName]) {
        shouldKeepChecking = true;
      } else {
        shouldKeepChecking = false;
      }

      if (maxShouldCheck < 0) {
        shouldKeepChecking = false;
      }

      if (usedtracker > props.categories.length - 1) {
        complete = true;
        shouldKeepChecking = false;
      }
      maxShouldCheck--;
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

  if (props.error) {
    return (
      <Error statusCode={props.error.status} message={props.error.message} />
    );
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

Category.getInitialProps = async function (context) {
  const { name } = context.query;

  if (!name) {
    return {
      error: {
        status: 400,
        message: "missing category name",
      },
    };
  }

  try {
    const res = await fetch(
      `${process.env.CLIENT_URL}/api/subCategories?name=${name}`
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
