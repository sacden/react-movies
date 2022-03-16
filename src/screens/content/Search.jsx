import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";

const Search = () => {
  const years = [2022, 2021, 2020];
  const types = ["Comedy", "Adventure", "Fantasy"];

  const [year, setYear] = useState("Year");
  const [type, setType] = useState("Type");
  const [search, setSearch] = useState("");

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
    </form>
  );
};

export default Search;
