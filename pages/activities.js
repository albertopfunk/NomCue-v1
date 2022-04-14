import React from "react";
import Link from "next/link";
import clientPromise from "../util/mongodb";

export default function Activities({ activities, error }) {
  if (error) {
    return <h1>OH NOOOOO</h1>;
  }

  console.log(activities);

  return (
    <div>
      Hello activities
      <Link href={`/activities/amusement-parks`}>
        <a>{`Go To`}</a>
      </Link>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const res = await db.collection("activities").find({}).toArray();
    const activities = JSON.parse(JSON.stringify(res));

    return {
      props: {
        activities,
        error: null,
      },
    };
  } catch (error) {
    return {
      props: {
        activities: null,
        error,
      },
    };
  }
}
