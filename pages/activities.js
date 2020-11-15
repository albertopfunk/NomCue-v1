import React from 'react'
import Link from 'next/link';

export default function Activities({activities, error}) {

  if (error) {
    return <h1>OH NOOOOO</h1>
  }

  console.log(activities)

  return (
    <div>
      Hello activities
      <Link href={`/activities/amusement-parks`}>
        <a>{`Go To`}</a>
      </Link>
    </div>
  )
}


export async function getServerSideProps() {
  try {
    const res = await fetch(
      `${process.env.CLIENT_URL}/api/activityCategories`
    );

    const activities = await res.json();

    if (res.status !== 200) {
      throw { status: res.status, message: activities.message };
    }

    return {
      props: {
        activities,
        error: null
      }
    }

  } catch(error) {
    return {
      props: {
        activities: null,
        error
      }
    }
  }
}
