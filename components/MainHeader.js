import { useState } from "react";
import Link from "next/link";
import LocationAutocomplete from "./LocationAutocomplete";

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
    <div className="bg-white h-16">
      <header className="h-16 fixed top-0 right-0 left-0 bg-transparent text-center">
        <div className="bg-red-100 absolute left-0 top-0 -bottom-1.5 rounded-br-full">
          <button type="button" aria-expanded={!isNavOpen} onClick={toggleNav}>
            open navigation
          </button>
        </div>

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

        <Link href="/">
          <a>NomCue</a>
        </Link>

        <div className="bg-red-100 absolute right-0 top-0 -bottom-1.5 rounded-bl-full">
          <button
            type="button"
            aria-expanded={!areFiltersOpen}
            onClick={toggleFilters}
          >
            open filters
          </button>
        </div>

        <div className={`${areFiltersOpen ? "" : "hidden"}`}>
          <LocationAutocomplete />
        </div>
      </header>
    </div>
  );
}

export default MainHeader;
