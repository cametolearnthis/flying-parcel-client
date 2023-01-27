import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import DeliveryListPage from "./pages/DeliveryListPage";
import DeliveryDetailsPage from "./pages/DeliveryDetailsPage";
import ItemListPage from "./pages/ItemListPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/deliveries"
          element={
            <IsPrivate>
              <DeliveryListPage />
            </IsPrivate>
          }
        />
        <Route
          path="deliveries/:deliveryId"
          element={
            <IsPrivate>
              <DeliveryDetailsPage />
            </IsPrivate>
          }
        />
         <Route
          path="/items/"
          element={
            <IsPrivate>
              <ItemListPage />
            </IsPrivate>
          }
        />
        {/*
        <Route
          path="/tasks/edit/:taskId"
          element={
            <IsPrivate>
              <EditTask />{" "}
            </IsPrivate>
          }
        /> */}

        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
