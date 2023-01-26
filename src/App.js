import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import DeliveryListPage from "./pages/DeliveryListPage";
import DeliveryDetailsPage from "./pages/DeliveryDetailsPage";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/deliveries" element={ <DeliveryListPage /> } />
        <Route path="deliveries/:deliveryId" element={<DeliveryDetailsPage />} />
      </Routes>
    </div>
  );
}

export default App;
