import { useState } from "react";
import Link from "next/link";

import LocationAutocomplete from "./LocationAutocomplete";

// import MenuIcon from "../svgs/menu-icon.svg";
// import GearIcon from "../svgs/gear-icon.svg";
// import CloseIcon from "../svgs/close-icon.svg";

function MainHeader() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [areFiltersOpen, setAreFiltersOpen] = useState(false);

  function toggleNav() {
    setIsNavOpen(!isNavOpen);
  }

  function toggleFilters() {
    setAreFiltersOpen(!areFiltersOpen);
  }

  return (
    <div className="h-16 flex-shrink-0 bg-white">
      <header className="h-16 fixed top-0 right-0 left-0 bg-transparent text-center">
        <div
          className={`min-h-20 min-w-20 fixed bg-red-100 rounded-br-full ${
            isNavOpen ? "inset-0" : "left-0 top-0"
          }`}
        >
          <button
            type="button"
            className="h-20 w-20 absolute left-0 top-0 flex justify-start items-start pl-1.5 pt-1.5 bg-blue-100 rounded-br-full"
            aria-expanded={!isNavOpen}
            onClick={toggleNav}
          >
            <span className="sr-only">open menu</span>
            <span className="flex h-11 w-11 bg-transparent">
              {isNavOpen ? <div className="h-20 w-20">X</div> : <div className="h-20 w-20">X</div>}
            </span>
          </button>

          <nav className={`${isNavOpen ? "" : "hidden"}`}>
            <ul>
              <li>
                <Link href="/">
                  <a>home</a>
                </Link>
              </li>
              <li>
                <Link href="/food">
                  <a>food</a>
                </Link>
              </li>
              <li>
                <Link href="/activities">
                  <a>activities</a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <Link href="/">
          <a>NomCue</a>
        </Link>

        <div
          className={`min-h-20 min-w-20 fixed bg-red-100 rounded-bl-full ${
            areFiltersOpen ? "inset-0" : "right-0 top-0"
          }`}
        >
          <button
            type="button"
            className="h-20 w-20 absolute right-0 top-0 flex justify-end items-start pr-1.5 pt-1.5 bg-blue-100 rounded-bl-full"
            aria-expanded={!areFiltersOpen}
            onClick={toggleFilters}
          >
            <span className="sr-only">open filters</span>
            <span className="flex h-11 w-11 bg-transparent">
              {areFiltersOpen ? <div className="h-20 w-20">X</div> : <div className="h-20 w-20">X</div>}
            </span>
          </button>

          <div className={`${areFiltersOpen ? "" : "hidden"}`}>
            <LocationAutocomplete />
          </div>
        </div>
      </header>
    </div>
  );
}

export default MainHeader;
