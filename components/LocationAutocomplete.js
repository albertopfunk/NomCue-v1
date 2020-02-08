import React, { useContext, useState } from "react";
import { UserContext } from "./global/UserContext";

function LocationAutocomplete(props) {
  const { setLocation } = useContext(UserContext);
  const [locationInput, setLocationInput] = useState("");
  const [predictions, setPredictions] = useState([]);
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  async function onInputChange(value) {
    console.log("INPUT CHANGE", value);
    setPredictions(["ONE", "TWO", "THREE"]);
  }

  function debounceInput(e) {
    console.log("DEBOUNCE", e);
    let currentTimeout;

    const { value } = e.target;

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    currentTimeout = setTimeout(() => {
      setDebounceTimeout(null);
      onInputChange(value);
    }, 250);

    setLocationInput(value);
    setDebounceTimeout(currentTimeout);
  }

  function choosePrediction(name) {
    console.log("CHOOSE", name);
    setLocation(name);
  }

  return (
    <div>
      <div>
        <label htmlFor={`${props.id}-search-predictions`}>
          Choose Location:
          <br />
          <input
            type="text"
            id={`${props.id}-search-predictions`}
            name="input"
            value={locationInput}
            onChange={e => debounceInput(e)}
          />
        </label>
      </div>

      <ul>
        {predictions.length === 0
          ? null
          : predictions.map((prediction, i) => {
              return (
                // eslint-disable-next-line
                <li
                  key={prediction}
                  onClick={() => choosePrediction("Los Angeles, CA")}
                >
                  {prediction}
                </li>
              );
            })}
      </ul>
    </div>
  );
}

export default LocationAutocomplete;
