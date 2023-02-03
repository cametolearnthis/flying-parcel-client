import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CreateDelivery from "../components/CreateDelivery";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Container } from "react-bootstrap";
import { AuthContext } from "../context/auth.context";

function DeliveryListPage() {
  const { isManager } = useContext(AuthContext);
  const storedToken = localStorage.getItem("authToken");
  const [deliveries, setDeliveries] = useState([]);
  const [showForm, setShowForm] = useState(true);
  const [users, setUsers] = useState([]);

  const getAllDeliveries = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/deliveries`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setDeliveries(response.data))
      .catch((error) => console.log("Error getting the deliveries", error));
  };

  useEffect(() => {
    getAllDeliveries();
  }, []);

  useEffect(() => {
    if (isManager) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/users`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          const { data } = response;

          setUsers(data);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  return (
    <div>
      <div className="creation-menu">
        <h3 className="create-title">Create a new Delivery Route</h3>
        <div className="display-form">
        <Button
          className="differentButton"
          onClick={() => setShowForm(!showForm)}
        >
          {!showForm ? "Hide Form" : "Create Route"}
        </Button>
        
        {!showForm && (
          <>
          <br />
          <CreateDelivery refreshDeliveries={getAllDeliveries} users={users} />
          </>
        )}
        </div>
      </div>

      {deliveries.map((delivery) => {
        return (
          <>
            <Container className="single-item">
              <Card key={delivery._id}>
                <Card.Header>
                  <Link
                    className="detailsButton"
                    to={`/deliveries/${delivery._id}`}
                  >
                    <h3>{delivery.delivererName}</h3>
                  </Link>
                </Card.Header>
                <Card.Body>
                  <blockquote className="blockquote mb-0">
                    <p>{new Date(delivery.date).toDateString()}</p>
                    <p>{delivery.shift}</p>
                  </blockquote>
                </Card.Body>
              </Card>
            </Container>
          </>
        );
      })}
    </div>
  );
}

export default DeliveryListPage;
