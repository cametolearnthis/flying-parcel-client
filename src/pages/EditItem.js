import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

 

function EditItem () {
    const storedToken = localStorage.getItem('authToken');
    const [status, setStatus] = useState("");
    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [product, setProduct] = useState("");

    const { itemId } = useParams();
    const navigate = useNavigate(); 
  
    useEffect(() => {
        axios
        .get(`${process.env.REACT_APP_API_URL}/api/items/${itemId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
        .then((response) => {
          const singleItem = response.data;
          
            setStatus(singleItem.status);
            setCode(singleItem.code);
            setName(singleItem.name);
            setAddress(singleItem.address);
            setProduct(singleItem.product)

        })
        .catch((error) => console.log(error));
    }, [itemId]);

    const handleFormSubmit = (e) => {                     
        e.preventDefault();
        const requestBody = { status, code, address, product, name };
        axios
          .put(`${process.env.REACT_APP_API_URL}/api/items/${itemId}`, requestBody)
          .then((response) => {
            navigate(`/items/${itemId}`)
          });
      };


return (
    <div>
        <h2>Set a status for the item with the code {code}</h2>
      <Container id="main-container" className="d-grid h-100">
        <Form
          id="create-form"
          className="text-center w-100"
          onSubmit={handleFormSubmit}
        >
        
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Select a status</Form.Label>
            <Form.Select
            className="enter-data"
              size="lg"
              aria-label="Default select example"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option></option>
              <option value="pending">pending</option>
              <option value="delivered">delivered</option>
              <option value="not-delivered">not delivered</option>
            </Form.Select>
          </Form.Group>

          <Button variant="primary" type="submit">
            Set status
          </Button>
        </Form>
      </Container>
    </div>
  );
}


export default EditItem;