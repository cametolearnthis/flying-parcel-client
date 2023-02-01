import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";

function ItemDetails({deliveryId}) {
  const storedToken = localStorage.getItem("authToken");
  const [item, setItem] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { itemId } = useParams();
  const navigate = useNavigate();

  const getItem = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/items/${itemId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const singleItem = response.data;
        setItem(singleItem);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getItem();
  }, []);

  const deleteItem = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/items/${itemId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        navigate("/items");
      })
      .catch((err) => console.log(err));
  };

  

  return (
    <div>
      {item && (
        <>

          {/* Item Details */}
          <h1>{item.code}</h1>
          <p>Name: {item.name}</p>
          <p>Address: {item.address}</p>
          <p>Result: {item.result}</p>
          <Link to={`/items/edit/${itemId}`}>
            <Button>Change result</Button>
          </Link>

          <hr />

          {/* Nav Links */}
          <Link to={`/deliveries/${item.delivery._id}`}>
            <Button>Back to list of items</Button>
          </Link>
          <Button variant="danger" onClick={handleShow}>
            Delete item
          </Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Are you sure?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Please confirm that you want to delete this item.
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Back
              </Button>
              <Button variant="danger" onClick={deleteItem}>
                Delete this item
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </div>
  );
}

export default ItemDetails;
