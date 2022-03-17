import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";

const Search = () => {
  const years = [2022, 2021, 2020];
  const types = ["movie", "series", "episode"];

  const [year, setYear] = useState("year");
  const [type, setType] = useState("type");
  const [search, setSearch] = useState("");

  const [backendData, setBackendData] = useState({});

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => setBackendData(data));
  }, []);

  useEffect(() => {
    let params = {
      s: search,
      y: year,
      type: type,
    };

    let query = Object.keys(params)
      .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
      .join("&");

    let url = "http://localhost:8080/?" + query;
    console.log(url);

    fetch(url)
      .then((data) => data.text())
      .then((text) => {
        console.log("request succeeded with JSON response", text);
      })
      .catch(function (error) {
        console.log("request failed", error);
      });
  }, [search, year, type]);

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

      <h1>MOVIES</h1>
      <div>
        {Object.keys(backendData).length === 0 ? (
          <p>Loading...</p>
        ) : (
          //Object.entries(backendData).map(([key, value]) => {
          //return <p key={value}>{value}</p>;
          //console.log(value);
          <p>{backendData.Title}</p>
          //})
        )}
      </div>
    </form>
  );
};

export default Search;
