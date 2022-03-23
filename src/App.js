import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Dashboard from "./Dashboard";
import Login from "./Login";

/* Get code from URL */

const code = new URLSearchParams(window.location.search).get("code");

function App() {
  /* If code exists render Dashboard component. Otherwise render Login component */
  return code ? <Dashboard code={code} /> : <Login />;
}

export default App;
