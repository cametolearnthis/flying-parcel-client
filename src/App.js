import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import DeliveryListPage from "./pages/DeliveryListPage";
import DeliveryDetailsPage from "./pages/DeliveryDetailsPage";
import ItemListPage from "./pages/ItemListPage";
import ItemDetails from "./pages/ItemDetails";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
import IsManager from "./components/IsManager";
import EditDelivery from "./pages/EditDelivery";

function App() {
  return (
    <div className="App">
      <NavBar />
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
          path="deliveries/edit/:deliveryId"
          element={
            <IsManager>
              <EditDelivery />
            </IsManager>
          }
        />
         <Route
          path="/items"
          element={
            <IsManager>
              <ItemListPage />
            </IsManager>
          }
        />

<Route
          path="/items/:itemId"
          element={
            <IsPrivate>
              <ItemDetails />
            </IsPrivate>
          }
        />

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
