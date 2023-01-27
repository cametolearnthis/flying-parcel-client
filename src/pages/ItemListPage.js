import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ItemListPage() {
  const [items, setItems] = useState([]);
  const getAllItems = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/items`,
       { headers: { Authorization: `Bearer ${storedToken}` }} )
      .then((response) => setItems(response.data))
      .catch((error) => {console.log("Error getting the items", error);
    if(error.response.data.message === "unauthorized user") {
      console.log("This user is not authorized")
    }
    });
  };

  useEffect(() => {
    getAllItems();
  }, []);

  return (
    <div>
      {items.map((item) => {
        return (
          <div key={item._id}>
            <Link to={`/items/${item._id}`}>
            <h3>{item.code}</h3>
            </Link >
            <h4>{item.name}</h4>
            <h4>{item.address}</h4>
            {/* <p>{item.delivery.name}</p> */}
            <hr />
          </div>
        );
      })}
    </div>
  );
}

export default ItemListPage;
