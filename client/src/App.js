import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Login from "./screens/auth/Login";
import Search from "./screens/content/Search";

function App() {
  const auth = false;
  return (
    <div className="App">
      <div className="container">{auth ? <Login /> : <Search />}</div>
    </div>
  );
}

export default App;
