import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import AddItem from "../components/AddItem";
import { Button, Card } from "react-bootstrap";

function DeliveryDetailsPage(props) {
  const [delivery, setDelivery] = useState(null);
  const [showForm, setShowForm] = useState(true);
  const { deliveryId } = useParams();
  const navigate = useNavigate();

  const getDelivery = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/deliveries/${deliveryId}`)
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
      .delete(`${process.env.REACT_APP_API_URL}/api/deliveries/${deliveryId}`)
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
          </>
        ))}

      <Link to="/deliveries">
        <Button>Back to deliveries</Button>
      </Link>

      <Button variant="danger" onClick={deleteDelivery}>Delete Delivery Route</Button>
    </div>
  );
}

export default DeliveryDetailsPage;
