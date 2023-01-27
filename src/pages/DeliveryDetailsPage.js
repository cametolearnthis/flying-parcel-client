import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import AddItem from "../components/AddItem";

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
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "No more items" : "Add new item"}
      </button>
      {showForm && (
        <AddItem refreshDelivery={getDelivery} deliveryId={deliveryId} />
      )}

      <hr />
      {delivery &&
        delivery.items.map((item) => (
          <>
            <div key={item._id}>
              <h3>{item.code}</h3>
              <h4>{item.name}</h4>
              <p>{item.address}</p>
              <button>Delete Item</button>
            </div>
            <hr />
          </>
        ))}

      <Link to="/deliveries">
        <button>Back to deliveries</button>
      </Link>

      <button onClick={deleteDelivery}>Delete Delivery Route</button>
    </div>
  );
}

export default DeliveryDetailsPage;
