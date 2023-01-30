import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import AddItem from "../components/AddItem";
import { Button, Card, Container } from "react-bootstrap";
import { AuthContext } from "../context/auth.context";

function DeliveryDetailsPage(props) {
  const { isManager} = useContext(AuthContext);
  const storedToken = localStorage.getItem("authToken");
  const [delivery, setDelivery] = useState(null);
  const [showForm, setShowForm] = useState(true);
  const { deliveryId } = useParams();
  const navigate = useNavigate();

  const getDelivery = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/deliveries/${deliveryId}`,
      { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => {
        const singleDelivery = response.data;
        setDelivery(singleDelivery);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getDelivery();
  }, []);

  const deleteDelivery = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/deliveries/${deliveryId}`,
      { headers: { Authorization: `Bearer ${storedToken}` } })
      .then(() => {
        navigate("/deliveries");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {delivery && (
        <>
          <h1>These are the items assigned to {delivery.delivererName}</h1>
          <p>Shift: {delivery.shift}</p>
        </>
      )}
          <h3>Add New Item</h3>
      <Button onClick={() => setShowForm(!showForm)}>
        {!showForm ? "No more items" : "Add new item"}
      </Button>
      {!showForm && (
        <AddItem refreshDelivery={getDelivery} deliveryId={deliveryId} />
      )}

      <hr />
      {delivery &&
        delivery.items.map((item) => (
          <>
          <Container>
            <Card key={item._id}>
              <Card.Header>
                <Link className="detailsButton" to={`/items/${item._id}`}>
                  <h3>{item.code}</h3>
                </Link>
              </Card.Header>
              <Card.Body>
                <blockquote className="blockquote mb-0">
                  <p>{item.name}</p>
                  <p>{item.address}</p>
                </blockquote>
              </Card.Body>
            </Card>
            </Container>
          </>
        ))}

      <Link to="/deliveries">
        <Button>Back to deliveries</Button>
      </Link>
      {isManager && 
            <Link to={`/deliveries/edit/${deliveryId}`}>
            <button>Edit delivery</button>
          </Link>
      }
 

      <Button variant="danger" onClick={deleteDelivery}>Delete Delivery Route</Button>

    </div>
  );
}

export default DeliveryDetailsPage;
