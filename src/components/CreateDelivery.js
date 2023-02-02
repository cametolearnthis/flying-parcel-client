import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { AuthContext } from "../context/auth.context";

function CreateDelivery(props) {
  const { isManager } = useContext(AuthContext)
  const [date, setDate] = useState("");
  const [shift, setShift] = useState("Morning");
  const [selectedUser, setSelectedUser] = useState("")
  console.log(props.users);

  const handleSubmit = (e) => {
    const storedToken = localStorage.getItem("authToken");
    e.preventDefault();
    const user = props.users.find(user => user._id === selectedUser)
    const requestBody = { date, shift };
    
    if (selectedUser) {
      requestBody.delivererName = user.name
      requestBody.creator = selectedUser
    }
  
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/deliveries`, requestBody,
      { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => {
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
          {isManager && 
             <label> New Deliverer:
             <select onChange={(e) => setSelectedUser(e.target.value)} >
               <option selected> Choose a deliverer </option>
               { props.users.map((user) => (
                 <option value={user._id} >{user.name}</option>
               ))}
             </select>
           </label>
          }
          
          <Form.Group className="mb-3" controlId="formBasicDate">
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

          <Form.Group className="mb-3" controlId="formBasicShift">
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
