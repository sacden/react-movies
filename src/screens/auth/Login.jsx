import React from "react";

const Login = () => {
  return (
    <form className="row g-3 d-flex justify-content-center" style={{ border: "1px solid rgba(0, 0, 0, 0.05)" }}>
      <div className="col-auto">
        <label htmlFor="staticEmail2" className="visually-hidden">
          Email
        </label>
        <input type="text" className="form-control" id="staticEmail2" placeholder="Your username" />
      </div>
      <div className="col-auto">
        <label htmlFor="inputPassword2" className="visually-hidden">
          Password
        </label>
        <input type="password" className="form-control" id="inputPassword2" placeholder="Your password" />
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
