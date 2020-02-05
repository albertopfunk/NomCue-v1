import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
import Error from './_error.js';
import {UserContext} from '../global/UserContext'
import fetch from 'isomorphic-unfetch';


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

// what if location is not present?


function Category(props) {
  const router = useRouter();
  const {location, setLocation} = useContext(UserContext)
  const [subCategory, setSubCategory] = useState("")
  

  console.log("=====CATEGORY=====", router.query.name)


  if (props.error) {
    console.log("ERROR", props.error.status)
    return <Error statusCode={props.error.status} />
  } else {
    console.log(props.categories)
    props.categories.forEach((item) => console.log(item.categoryIdentifier))
  }


  return (
    <div>
      <h1>Hello Category</h1>

      <p>Chosen Main Category: {router.query.name}</p>
      <p>Chosen Sub Category: {subCategory}</p>

      {subCategory ?
        <Link href={`/info?id=${subCategory}`}>
          <a>{`Go To ${subCategory}`}</a>
        </Link>
        : 
        <p>Choose a sub category</p>
      }

      <button onClick={() => setSubCategory("burgers")}>SET SUB CATEGORY</button>

      {!location ?
        <button onClick={() => setLocation("LA")}>SET LOCATION</button>
        :
        <p>Location Set!</p>
      }

    </div>
  )
}

Category.getInitialProps = async function(context) {
  const { name } = context.query;

  try {
    const res = await fetch(`http://localhost:3000/api/subCategories?name=${name}`);
    const categories = await res.json();

    if (res.status !== 200) {
      throw {status: res.status, message: categories.message}
    }
    
    return {categories};
    
  } catch(error) {
    console.error("Error =>", error.message)
    return {error}
  }
};

export default Category

