import React from 'react'

export default function ActivityPlaces({places}) {
  return (
    <div>
      PLACES
    </div>
  )
}

export async function getServerSideProps(context) {
  // slug
  console.log("context", context.params)
  return {
    props: {places: []}, // will be passed to the page component as props
  }
}
