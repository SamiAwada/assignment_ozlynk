import "./App.css";
import { Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages";
import { MainLayout } from "./layouts";

function App() {
  return (
    <div className="App">
      <MainLayout>
        <Routes>
          <Route exact path="/" index element={<LandingPage />} />
          <Route
            exact
            path="/Employee"
            index
            element={<div>addEmployee</div>}
          />
        </Routes>
      </MainLayout>
    </div>
  );
}

export default App;
