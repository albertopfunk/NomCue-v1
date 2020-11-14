import React from 'react'
import Link from 'next/link'

export default function Food({food, error}) {

  if (error) {
    return <h1>OH NOOOOO</h1>
  }

  console.log("FOOOOODDDD", food)

  return (
    <div>
      Hello food
      <Link href={`/food/italian`}>
        <a>{`Go To italian cuisine`}</a>
      </Link>
    </div>
  )
}


export async function getServerSideProps() {
  try {
    const res = await fetch(
      `${process.env.CLIENT_URL}/api/foodCategories`
    );

    const food = await res.json();

    if (res.status !== 200) {
      throw { status: res.status, message: food.message };
    }

    return {
      props: {
        food,
        error: null
      }
    }

  } catch(error) {
    return {
      props: {
        food: null,
        error
      }
    }
  }
}
