import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CreateDelivery from "../components/CreateDelivery";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import IsManager from "../components/IsManager";

function DeliveryListPage() {
  const storedToken = localStorage.getItem("authToken");
  const [deliveries, setDeliveries] = useState([]);
  const [showForm, setShowForm] = useState(true);

  const getAllDeliveries = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/deliveries`, { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => setDeliveries(response.data))
      .catch((error) => console.log("Error getting the deliveries", error));
  };

  useEffect(() => {
    getAllDeliveries();
  }, []);

  return (
    <div>
      <h3>Create a new Delivery Route</h3>
      <Button
        className="differentButton"
        onClick={() => setShowForm(!showForm)}
      >
        {!showForm ? "Hide Form" : "Create Route"}
      </Button>
      {!showForm && <CreateDelivery refreshDeliveries={getAllDeliveries} />}

      {deliveries.map((delivery) => {
        return (
          <>
            <Card key={delivery._id}>
              <Card.Header>
                <Link className="detailsButton" to={`/deliveries/${delivery._id}`}>
                  <h3>{delivery.delivererName}</h3>
                </Link>
              </Card.Header>
              <Card.Body>
                <blockquote className="blockquote mb-0">
                  <p>{delivery.date}</p>
                  <p>{delivery.shift}</p>
                </blockquote>
              </Card.Body>
            </Card>
          </>
        );
      })}
    </div>
  );
}

export default DeliveryListPage;
