import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import AddItem from "../components/AddItem";
import { Button } from "react-bootstrap";
import { AuthContext } from "../context/auth.context";
import Modal from "react-bootstrap/Modal";
import SingleItem from "../components/SingleItem";

function DeliveryDetailsPage(props) {
  const { isManager } = useContext(AuthContext);
  const storedToken = localStorage.getItem("authToken");
  const [delivery, setDelivery] = useState(null);
  const [showForm, setShowForm] = useState(true);
  const { deliveryId } = useParams();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getDelivery = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/deliveries/${deliveryId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
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
      .delete(`${process.env.REACT_APP_API_URL}/api/deliveries/${deliveryId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        navigate("/deliveries");
      })
      .catch((err) => console.log(err));
  };

  let itemsCounter;
  if (delivery) {
    itemsCounter = (
      <h3 className="items-counter">
        Number of items assigned to this route: {delivery.items.length}
      </h3>
    );
  } else {
    itemsCounter = <h3>There are no items assigned to this route</h3>;
  }

  return (
    <div>
      {delivery && (
        <div className="route-data">
          <h2>Route for {delivery.delivererName}</h2>
          <p>Shift: {delivery.shift}</p>
          {itemsCounter}
        </div>
      )}

      <div className="route-data">
        <Button onClick={() => setShowForm(!showForm)}>
          {!showForm ? "No more items" : "Add new item"}
        </Button>
        {!showForm && (
          <AddItem refreshDelivery={getDelivery} deliveryId={deliveryId} />
        )}
      </div>

      <div className="colour-key-map">
        <div>
          Delivered
          <div className="delivered colour-key"></div>
        </div>
        <div>
          Not delivered <div className="not-delivered colour-key"></div>
        </div>
        <div>
          Pending <div className="pending colour-key"></div>
        </div>
      </div>

      {delivery &&
        delivery.items.map((item) => (
          <div className="item-separation">
            <SingleItem key={item._id} {...item} />
          </div>
        ))}

      <div className="delivery-options">
        <Link to="/deliveries">
          <Button variant="secondary">Back to deliveries</Button>
        </Link>
        {isManager && (
          <Link to={`/deliveries/edit/${deliveryId}`}>
            <Button variant="primary">Edit delivery</Button>
          </Link>
        )}

        <Button variant="danger" onClick={handleShow}>
          Delete Route
        </Button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Please confirm that you want to delete this delivery route.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Back
          </Button>
          <Button variant="danger" onClick={deleteDelivery}>
            Delete Route
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DeliveryDetailsPage;
