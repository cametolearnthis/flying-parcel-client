import { useState, useEffect } from "react";
import axios from "axios";
import CardGroup from 'react-bootstrap/CardGroup';
import Form from "react-bootstrap/Form";
import SingleItem from "../components/SingleItem";


function ItemListPage() {
  const [items, setItems] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  const itemsToDisplay = items.filter( (item) => {
    return item.code.toLowerCase().includes(searchQuery.toLowerCase());
  });
  


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
    <>
    <div className="items-searcher">
      <h2>List of items registered in the office</h2>

      <Form className='itesm-searcher-form'>
        <label>
            <input 
              type="text" 
              name="searchQuery" 
              placeholder="find the code" 
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value) }} 
              />
        </label>
      </Form>
      </div>
      
      <CardGroup>
      {itemsToDisplay.map((item) => <SingleItem key={item._id} {...item} />)}
      </CardGroup>
      </>
  );
}

export default ItemListPage;
