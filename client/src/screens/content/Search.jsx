import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";

const Search = () => {
  const years = [...Array(72)].map((el, index) => index + 1950).reverse();
  const types = ["movie", "series"];

  const [year, setYear] = useState("");
  const [type, setType] = useState("");
  const [search, setSearch] = useState("");

  const [api, setApi] = useState({});

  useEffect(() => {
    let params = {
      s: search,
      y: year,
      type: type,
    };

    let query = Object.keys(params)
      .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
      .join("&");

    let url = "http://localhost:8080/api?" + query;

    //if search word has more then 4 charachters
    if (search.split("").length > 4) {
      //send a query from search input to BE
      fetch(url)
        .then((data) => data.text())
        .then((text) => {
          console.log("request succeeded with JSON response", text);
        })
        .catch(function (error) {
          console.log("request failed", error);
        });

      //returns an object with movies from BE
      fetch("/movies")
        .then((response) => response.json())
        .then((data) => setApi(data));
    }
  }, [search, year, type]);

  return (
    <form className="row g-3 d-flex justify-content-center" style={{ marginTop: "5px" }}>
      {/* SearchBox */}
      <div className="col-auto">
        <label htmlFor="staticEmail2" className="visually-hidden">
          Search
        </label>
        <input type="text" className="form-control" id="staticEmail2" placeholder="Search" onChange={(e) => setSearch(e.currentTarget.value)} required />
      </div>
      {/* Years */}
      <div className="col-auto">
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {year ? year : "Year"}
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
            {type ? type : "Type"}
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

      <div>
        {Object.keys(api).length === 0 ? (
          <p className="d-none">Loading...</p>
        ) : api.Response === "False" ? (
          <p>Movies were not found</p>
        ) : (
          <div className="row">
            <h1>MOVIES</h1>
            {api.Search.map((movie, i) => (
              <div className="col-sm-3" key={i}>
                <div className="card" style={{ width: "18rem" }}>
                  <img className="card-img-top" src={movie?.Poster} style={{ height: "26rem" }} alt="Card image cap" />
                  <div className="card-body" style={{ height: "180px", border: "1px solid rgba(0, 0, 0, 0.05)" }}>
                    <h5 className="card-title">{movie.Title}</h5>
                    <p className="card-text">Year: {movie?.Year}</p>
                    <p className="card-text">Type: {movie?.Type}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </form>
  );
};

export default Search;
