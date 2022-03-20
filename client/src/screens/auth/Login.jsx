import React, { useState } from "react";

const Login = ({ setToken }) => {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  async function loginUser(credentials) {
    return fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password,
    });
    setToken(token.token);
  };

  return (
    <form className="row g-3 d-flex justify-content-center" style={{ border: "1px solid rgba(0, 0, 0, 0.05)" }} onSubmit={handleSubmit}>
      <div className="col-auto">
        <label htmlFor="staticEmail2" className="visually-hidden">
          Username
        </label>
        <input type="text" className="form-control" id="staticEmail2" placeholder="Your username" onChange={(e) => setUserName(e.target.value)} />
      </div>
      <div className="col-auto">
        <label htmlFor="inputPassword2" className="visually-hidden">
          Password
        </label>
        <input type="password" className="form-control" id="inputPassword2" placeholder="Your password" onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className="col-auto">
        <button type="submit" className="btn btn-primary mb-3">
          Submit
        </button>
      </div>
    </form>
  );
};

export default Login;
