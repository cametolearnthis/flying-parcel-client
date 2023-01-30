import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

 

function EditItem () {
    const storedToken = localStorage.getItem('authToken');
    const [result, setResult] = useState("");
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
          
            setResult(singleItem.result);
            setCode(singleItem.code);
            setName(singleItem.name);
            setAddress(singleItem.address);
            setProduct(singleItem.product)

        })
        .catch((error) => console.log(error));
    }, [itemId]);

    const handleFormSubmit = (e) => {                     
        e.preventDefault();
        const requestBody = { result, code, address, product, name };
        axios
          .put(`${process.env.REACT_APP_API_URL}/api/items/${itemId}`, requestBody)
          .then((response) => {
            navigate(`/items/${itemId}`)
          });
      };


return (
    <div>
        <h2>Set a result for the item with the code {code}</h2>
      <Container id="main-container" className="d-grid h-100">
        <Form
          id="create-form"
          className="text-center w-100"
          onSubmit={handleFormSubmit}
        >
        
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Select a result</Form.Label>
            <Form.Select
            className="enter-data"
              size="lg"
              aria-label="Default select example"
              value={result}
              onChange={(e) => setResult(e.target.value)}
            >
              <option></option>
              <option value="Undefined">Undefined</option>
              <option value="Delivered">Delivered</option>
              <option value="Not delivered">Not delivered</option>
            </Form.Select>
          </Form.Group>

          <Button variant="primary" type="submit">
            Set result
          </Button>
        </Form>
      </Container>
    </div>
  );
}


export default EditItem;