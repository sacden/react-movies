import React, { useState } from "react";

const Login = ({ setToken }) => {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  async function loginUser(credentials) {
    try {
      return fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      }).then((data) => data.json());
    } catch (e) {
      console.log("Error: " + e);
    }
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const token = await loginUser({
        username,
        password,
      });
      setToken(token.token);
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  return (
    <form className="row g-3 d-flex" style={{ border: "1px solid rgba(0, 0, 0, 0.05)", height: "100vh" }} onSubmit={handleSubmit}>
      <div className="row flex-column align-items-center justify-content-center h-100">
        <div className="form-group col-md-3" style={{ paddingRight: "0px", paddingLeft: "0px", marginBottom: "5px" }}>
          <label htmlFor="staticEmail2" className="visually-hidden">
            Username
          </label>
          <input type="text" className="form-control" id="staticEmail2" placeholder="Your username" onChange={(e) => setUserName(e.target.value)} />
        </div>
        <div className="form-group col-md-3" style={{ paddingRight: "0px", paddingLeft: "0px", marginBottom: "5px" }}>
          <label htmlFor="inputPassword2" className="visually-hidden">
            Password
          </label>
          <input type="password" className="form-control" id="inputPassword2" placeholder="Your password" onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button type="submit" className="btn btn-success col-md-3 btn-block">
          Submit
        </button>
      </div>
    </form>
  );
};

export default Login;
