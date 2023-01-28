import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";

function ItemDetails() {
  const [item, setItem] = useState(null);
  const { itemId } = useParams();
  const navigate = useNavigate();

  const getItem = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/items/${itemId}`)
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
      .delete(`${process.env.REACT_APP_API_URL}/api/items/${itemId}`)
      .then(() => {
        navigate("/items");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {item && (
        <>
          <h1>{item.code}</h1>
          <p>Name: {item.name}</p>
          <p>Address: {item.address}</p>
        </>
      )}

      <hr />


      <Link to={`/deliveries/`}>
        <Button>Back to list of items</Button>
      </Link>

      <Button variant="danger" onClick={deleteItem}>Delete this item</Button>
    </div>
  );
}

export default ItemDetails;
