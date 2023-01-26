import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CreateDelivery from "../components/CreateDelivery";

function DeliveryListPage() {
  const [deliveries, setDeliveries] = useState([]);
  const getAllDeliveries = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/deliveries`)
      .then((response) => setDeliveries(response.data))
      .catch((error) => console.log("Error getting the deliveries", error));
  };

  useEffect(() => {
    getAllDeliveries();
  }, []);


  return (
    <div>

    <CreateDelivery refreshDeliveries={getAllDeliveries} />

      {deliveries.map((delivery) => {
        return (
          <div key={delivery._id}>
                <Link to={`/deliveries/${delivery._id}`}>
                <h3>{delivery.delivererName}</h3>
              </Link>
              <h4>{delivery.date}</h4>
              <h4>{delivery.shift}</h4>
            
          </div>
        );
      })}
    </div>
  );
}

export default DeliveryListPage;
