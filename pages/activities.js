import Link from 'next/link';
import React from 'react'

export default function Activities({activities, error}) {

  if (error) {
    return <h1>OH NOOOOO</h1>
  }

  return (
    <div>
      Hello
      <Link href={`/activities/theater`}>
        <a>{`Go To ${activities.title}`}</a>
      </Link>
    </div>
  )
}


export async function getServerSideProps() {

  return {
    props: {places: []}, // will be passed to the page component as props
  }
}


export async function getStaticProps() {
  try {
    const res = await fetch(
      `${process.env.CLIENT_URL}/api/subCategories?name=activities`
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
  } catch (error) {
    console.error("Error =>", error);
    return {
      props: {
        activities: null,
        error
      }
    }
  }
}