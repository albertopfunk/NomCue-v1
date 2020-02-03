import React, { useContext } from 'react'
import {UserContext} from '../global/UserContext'



//* Home Page
// user sets location
// user sets chosen main category



function index() {
  const {location, setLocation} = useContext(UserContext)

  console.log("=====HOME=====")


  return (
    <div>
      <h1>Hello Home</h1>


      <select onChange={e => setCategory(e.target.value)} name="categories">
        <option value="">--Select--</option>
        <option value="food">Food</option>
        <option value="nightlife">Night Life</option>
        <option value="activities">Activities</option>
      </select>

      {!location ?
        <button onClick={() => setLocation("LA")}>SET LOCATION</button>
        :
        <p>Location Set!</p>
      }
    </div>
  )
}

export default index
