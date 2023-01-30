import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import AddItem from "../components/AddItem";
import { Button, Card, Container } from "react-bootstrap";
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
        delivery.items.map((item) => <SingleItem key={item._id} {...item} />)}

      <Link to="/deliveries">
        <Button variant="secondary">Back to deliveries</Button>
      </Link>
      {isManager && (
        <Link to={`/deliveries/edit/${deliveryId}`}>
          <Button variant="primary">Edit delivery</Button>
        </Link>
      )}

      <Button variant="danger" onClick={handleShow}>
        Delete Delivery Route
      </Button>

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
            Delete Delivery Route
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DeliveryDetailsPage;
