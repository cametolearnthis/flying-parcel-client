import { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function CreateDelivery(props) {
  const [delivererName, setDelivererName] = useState("");
  const [date, setDate] = useState("");
  const [shift, setShift] = useState("Morning");

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { delivererName, date, shift };
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/deliveries`, requestBody)
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
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name of the deliverer</Form.Label>
          <Form.Control
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
            type="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Shift</Form.Label>
          <Form.Select
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
    </div>
  );
}

export default CreateDelivery;
