import "./App.css";
import { Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" index element={<LandingPage />} />
        <Route
          exact
          path="/addEmployee"
          index
          element={<div>addEmployee</div>}
        />
      </Routes>
    </div>
  );
}

export default App;
