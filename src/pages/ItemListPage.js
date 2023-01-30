import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { Form } from "react-bootstrap";


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
    <div>
      <h2>List of items registered in the office</h2>

      <Form className='form'>
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


      <CardGroup>
      {itemsToDisplay.map((item) => {
        return (
          
          
          <Card key={item._id}>
          
            <Card.Body>
              <Card.Title>            <Link className="detailsButton" to={`/items/${item._id}`}>
            <h3>{item.code}</h3></Link ></Card.Title>
              <Card.Title>
              {item.name}
              </Card.Title>
              <Card.Text>
              {item.address}
          </Card.Text>
            </Card.Body>
          </Card>
          
          
        );
      })}
      </CardGroup>
    </div>
  );
}

export default ItemListPage;
