import { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import service from "../api/service";

function AddItem(props) {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [product, setProduct] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleFileUpload = (e) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);
 
    const uploadData = new FormData();
 
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    uploadData.append("imageUrl", e.target.files[0]);
 
    service
      .uploadImage(uploadData)
      .then(response => {
        // console.log("response is: ", response);
        // response carries "fileUrl" which we can use to update the state
        setImageUrl(response.fileUrl);
      })
      .catch(err => console.log("Error while uploading the file: ", err));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const storedToken = localStorage.getItem("authToken");
    const { deliveryId } = props;
    const requestBody = { code, name, address, product, deliveryId, imageUrl};

    axios
    .post(`${process.env.REACT_APP_API_URL}/api/items`, requestBody,
    { headers: { Authorization: `Bearer ${storedToken}` } })
    .then((response) => {
        setCode("");
        setName("");
        setAddress("");
        setProduct("");
        setImageUrl("");

        props.refreshDelivery();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="add-items">
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
        <input className="submit-botton" type="file" onChange={(e) => handleFileUpload(e)} />
        <br/>
        <div className="submit-botton">
      <Button variant="primary" type="submit">
          Submit
        </Button>
        </div>
      </Form>
      </Container>
      
    </div>
  );
}

export default AddItem;
