import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";

const Search = () => {
  const years = [2022, 2021, 2020];
  const types = ["Comedy", "Adventure", "Fantasy"];

  const [year, setYear] = useState("year");
  const [type, setType] = useState("type");
  const [search, setSearch] = useState("");

  const movies = [
    { name: "The Turning", year: 2020, type: "Fantasy" },
    { name: "Run", year: 2020, type: "Aventure" },
    { name: "Fatman", year: 2020, type: "Comedy" },

    { name: "King Richard", year: 2021, type: "Fantasy" },
    { name: "Infinite", year: 2021, type: "Adventure" },
    { name: "After we fell", year: 2021, type: "Comedy" },

    { name: "Big bug", year: 2022, type: "Fantasy" },
    { name: "Brazen", year: 2022, type: "Adventure" },
    { name: "Love Tactics", year: 2022, type: "Comedy" },
  ];
  //const [filteredMovies, setFilteredMovies] = useState(movies);

  //let filteredMovies = movies.filter((el) => el.name.toLowerCase().includes(search.toLocaleLowerCase()) || el.year === year || el.type === type);

  //   useEffect(() => {
  //     if (search) {
  //       setFilteredMovies(movies.filter((el) => el.name.toLowerCase().includes(search.toLocaleLowerCase())));
  //     }
  //   }, [search]);

  //   useEffect(() => {
  //     if (year) {
  //       setFilteredMovies(movies.filter((el) => el.year === year));
  //     }
  //   }, [year]);

  //   useEffect(() => {
  //     if (type) {
  //       setFilteredMovies(filteredMovies.filter((el) => el.type === type));
  //     }
  //   }, [type]);

  //   if (type === "Type" && search === "") {
  //     filteredMovies = movies.filter((el) => el.year === year);
  //   }
  //   if (year === "Year" && search === "") {
  //     filteredMovies = movies.filter((el) => el.type === type);

  //   } else {

  //filteredMovies = movies.filter((el) => el.name.toLowerCase().includes(search.toLocaleLowerCase()) && el.type === type && el.year === year);
  //}

  return (
    <form className="row g-3 d-flex justify-content-center">
      {/* SearchBox */}
      <div className="col-auto">
        <label htmlFor="staticEmail2" className="visually-hidden">
          Search
        </label>
        <input type="text" className="form-control" id="staticEmail2" placeholder="Search" onChange={(e) => setSearch(e.currentTarget.value)} />
      </div>
      {/* Years */}
      <div className="col-auto">
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {year}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {years.map((el, index) => (
              <Dropdown.Item key={index} onClick={() => setYear(el)}>
                {el}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="col-auto">
        {/* Types */}
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {type}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {types.map((el, index) => (
              <Dropdown.Item key={index} onClick={() => setType(el)}>
                {el}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <h1>RESULTS</h1>

      {movies.map((el, index) => (
        <p key={index}>
          {el.name} : {el.year} : {el.type}
        </p>
      ))}
    </form>
  );
};

export default Search;
