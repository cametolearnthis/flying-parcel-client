import { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container"

function AddItem(props) {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [product, setProduct] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    const storedToken = localStorage.getItem("authToken");
    const { deliveryId } = props;
    const requestBody = { code, name, address, product, deliveryId};

    axios
    .post(`${process.env.REACT_APP_API_URL}/api/items`, requestBody,
    { headers: { Authorization: `Bearer ${storedToken}` } })
    .then((response) => {
        setCode("");
        setName("");
        setAddress("");
        setProduct("");

        props.refreshDelivery();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <Container>
      <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Code</Form.Label>
          <Form.Control
           type="text"
           name="code"
           placeholder="enter the code"
           value={code}
           minLength={11}
           onChange={(e) => setCode(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Product</Form.Label>
          <Form.Select
            aria-label="Default select example"
            value={product} onChange={(e) => setProduct(e.target.value)}
          >
            <option>Select a product</option>
            <option value="Registered mail">Registered mail</option>
          <option value="Small parcel">Small parcel</option>
          <option value="Medium parcel">Medium parcel</option>
          <option value="Big parcel">Big parcel</option>
          <option value="Tube">Tube</option>
          <option value="Urgent parcel">Urgent parcel</option>
          <option value="Bureaufax">Bureaufax</option>
          <option value="Collecting">Collecting</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
          type="text"
          name="name"
          placeholder="enter the name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Address</Form.Label>
          <Form.Control
          type="text"
          name="address"
          placeholder="enter the address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group>
      <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      </Container>
      
    </div>
  );
}

export default AddItem;
