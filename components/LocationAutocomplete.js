import React, { useContext, useState } from "react";
import fetch from "isomorphic-unfetch";
import { UserContext } from "./global/UserContext";

function LocationAutocomplete(props) {
  const { setLocation } = useContext(UserContext);
  const [locationsInput, setLocationsInput] = useState("");
  const [locations, setLocations] = useState([]);
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [focusedLocation, setFocusedLocation] = useState("");
  const [isUsingCombobox, setIsUsingCombobox] = useState(false);

  const locationRefs = [];

  function setLocationRefs(element, index) {
    locationRefs[index] = element;
  }

  function onInputKeyDown(e) {
    if (locations.length === 0) {
      return;
    }

    if (e.keyCode === 40) {
      e.preventDefault();
      if (locationRefs.length === 0) {
        return;
      }
      focusOnOption("first");
    }

    if (e.keyCode === 27) {
      resetAutocomplete();
    }
  }

  function onOptionKeyDown(e, location, index) {
    if (e.keyCode === 13) {
      chooseLocation(location);
    }
    if (e.keyCode === 27) {
      resetAutocomplete();
    }

    if (e.keyCode === 38) {
      e.preventDefault();
      focusOnOption("up", index);
    }
    if (e.keyCode === 40) {
      e.preventDefault();
      focusOnOption("down", index);
    }
  }

  function focusOnOption(direction, index) {
    if (direction === "first") {
      setFocusedLocation(`location-${0}`);
      locationRefs[0].focus();
    }

    if (direction === "up") {
      if (index === 0) {
        setFocusedLocation(`location-${locationRefs.length - 1}`);
        locationRefs[locationRefs.length - 1].focus();
      } else {
        setFocusedLocation(`location-${index - 1}`);
        locationRefs[index - 1].focus();
      }
    }

    if (direction === "down") {
      if (index === locationRefs.length - 1) {
        setFocusedLocation(`location-${0}`);
        locationRefs[0].focus();
      } else {
        setFocusedLocation(`location-${index + 1}`);
        locationRefs[index + 1].focus();
      }
    }
  }

  async function onInputChange(value) {
    if (value.trim() === "") {
      setLocations([]);
      setIsUsingCombobox(false);
      return;
    }

    try {
      const res = await fetch(
        `${process.env.CLIENT_URL}/api/googleAutocomplete`,
        {
          method: "POST",
          body: JSON.stringify({ value }),
        }
      );
      const json = await res.json();

      if (res.status !== 200) {
        throw {
          status: res.status,
        };
      }

      setLocations(json.predictions);
      setIsUsingCombobox(true);
    } catch (error) {
      console.error("Error =>", error);
    }
  }

  function debounceInput(e) {
    let currentTimeout;

    const { value } = e.target;

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    currentTimeout = setTimeout(() => {
      setDebounceTimeout(null);
      onInputChange(value);
    }, 250);

    setLocationsInput(value);
    setDebounceTimeout(currentTimeout);
  }

  function chooseLocation(name) {
    setLocationsInput("");
    setLocations([]);
    setIsUsingCombobox(false);
    setLocation(name);
  }

  function resetAutocomplete() {
    setLocationsInput("");
    setLocations([]);
    setIsUsingCombobox(false);
  }

  return (
    <div>
      <div>
        <label htmlFor={`${props.id}-search-locations`}>Choose Location:</label>
        <br />
        <input
          className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
          placeholder="jane@example.com"
          type="search"
          id={`${props.id}-search-locations`}
          name="input"
          value={locationsInput}
          autoComplete="off"
          role="combobox"
          aria-haspopup="listbox"
          aria-controls="results"
          aria-owns="results"
          aria-autocomplete="list"
          aria-expanded={isUsingCombobox}
          aria-activedescendant={focusedLocation}
          onChange={(e) => debounceInput(e)}
          onKeyDown={(e) => onInputKeyDown(e)}
        />
      </div>

      <ul id="results" role="listbox">
        {locations.length === 0
          ? null
          : locations.map((location, i) => {
              return (
                <li
                  id={`result-${i}`}
                  key={location.place_id}
                  tabIndex="-1"
                  role="option"
                  aria-selected={focusedLocation === `result-${i}`}
                  onClick={() => chooseLocation(location.description)}
                  ref={(ref) => {
                    setLocationRefs(ref, i);
                  }}
                  onKeyDown={(e) => onOptionKeyDown(e, location.description, i)}
                >
                  {location.description}
                </li>
              );
            })}
      </ul>
    </div>
  );
}

export default LocationAutocomplete;
