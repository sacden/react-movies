import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Login from "./screens/auth/Login";
import Search from "./screens/content/Search";

function App() {
  const [token, setToken] = useState(false);
  return (
    <div className="App">
      <div className="container">{token ? <Search /> : <Login setToken={setToken} />}</div>
    </div>
  );
}

export default App;
