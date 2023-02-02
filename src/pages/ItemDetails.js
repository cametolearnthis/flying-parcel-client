import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Modal, Card } from "react-bootstrap";

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
    <div className="item-data">
      {item && (
                  
        <>
        {/* Item Details */}
        <div >
      <Card className={item.status} style={{ width: '18rem' }}>
      
      <Card.Body>
        <Card.Title>{item.code}</Card.Title>
        <Card.Text>
        <p>Name: {item.name}</p>
          <p>Address: {item.address}</p>
          <p>Status: {item.status}</p>
          {item.imageUrl
          ?  <Card.Img  src={item.imageUrl} alt="item" width="200" />
          : <Card.Img src="https://via.placeholder.com/200x180.png?text=Image+not+provided"  alt=""/>
        }
         
        </Card.Text>
        <Link to={`/items/edit/${itemId}`}>
            <Button>Change status</Button>
          </Link>
      </Card.Body>
    </Card>
    </div>



        <div className="options">
          {/* Nav Links */}
          <Link to={`/deliveries/${item.delivery._id}`}>
            <Button>Back</Button>
          </Link>
          <br/>
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
              <Link to={`/deliveries/${item.delivery}`}>
              <Button variant="danger" onClick={deleteItem}>
                Delete this item
              </Button>
              </Link>
            </Modal.Footer>
          </Modal>
          </div>
        </>
      )}
    </div>
  );
}

export default ItemDetails;
