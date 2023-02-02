import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

function EditDelivery() {
  const storedToken = localStorage.getItem("authToken");
  const [delivererName, setDelivererName] = useState("");
  const [date, setDate] = useState("");
  const [shift, setShift] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  const { deliveryId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/users/${deliveryId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const { data } = response;

        setDelivererName(data.deliveryDetails.delivererName);
        setDate(data.deliveryDetails.date);
        setShift(data.deliveryDetails.shift);
        setUsers(data.users);
      })
      .catch((error) => console.log(error));
  }, [deliveryId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const requestBody = { delivererName, date, shift };
    if (selectedUser) {
      requestBody.creator = selectedUser;
    }
    // console.log(requestBody);
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/api/deliveries/${deliveryId}`,
        requestBody
      )
      .then((response) => {
        // console.log(response.data)
        navigate(`/deliveries/${deliveryId}`);
      });
  };

  const handleSelection = (e) => {
    setSelectedUser(e.target.value);
    setDelivererName(() => {
      const user = users.find((user) => user._id === e.target.value);

      return user.name;
    });
  };

  return (
    <div>
      <h2>You are editing the route for {delivererName} </h2>
      <Container id="main-container" className="d-grid h-100">
        <Form
          id="create-form"
          className="text-center w-100"
          onSubmit={handleFormSubmit}
        >

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>New Deliverer</Form.Label>
            <Form.Select
              className="enter-data"
              size="lg"
              aria-label="Default select example"
              value={shift}
              onChange={(e) => setShift(e.target.value)}
            >
              <option>Select a deliverer</option>
              {users.map((user) => (
                <option value={user._id}>{user.name}</option>
              ))}
            </Form.Select>
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

export default EditDelivery;
