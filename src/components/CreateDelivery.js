import { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

function CreateDelivery(props) {
  const [delivererName, setDelivererName] = useState("");
  const [date, setDate] = useState("");
  const [shift, setShift] = useState("Morning");

  const handleSubmit = (e) => {
    const storedToken = localStorage.getItem("authToken");
    e.preventDefault();

    const requestBody = { delivererName, date, shift };
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/deliveries`, requestBody,
      { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => {
        setDelivererName("");
        setDate("");
        setShift("");

        props.refreshDeliveries();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <Container id="main-container" className="d-grid h-100">
        <Form
          id="create-form"
          className="text-center w-100"
          onSubmit={handleSubmit}
        >
          <Form.Group className="mb-3 fs- fw-normal" controlId="formBasicEmail">
            <Form.Label>Name of the deliverer</Form.Label>
            <Form.Control
              className="enter-data"
              size="lg"
              type="text"
              name="delivererName"
              placeholder="Enter the name of the deliverer"
              value={delivererName}
              onChange={(e) => setDelivererName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Date of the route</Form.Label>
            <Form.Control
            className="enter-data"
              size="lg"
              type="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Shift</Form.Label>
            <Form.Select
            className="enter-data"
              size="lg"
              aria-label="Default select example"
              value={shift}
              onChange={(e) => setShift(e.target.value)}
            >
              <option>Select a shift</option>
              <option value="Morning">Morning</option>
              <option value="Evening">Evening</option>
            </Form.Select>
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default CreateDelivery;
