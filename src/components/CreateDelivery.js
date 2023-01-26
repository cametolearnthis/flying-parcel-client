import {useState} from "react";
import axios from "axios"


function CreateDelivery(props) {
    const [delivererName, setDelivererName] = useState("");
    const [date, setDate] = useState("");
    const [shift, setShift] = useState("Morning");

    const handleSubmit = (e) => {                          // <== ADD
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
        <h3>Create a new Delivery Route</h3>
   
        <form onSubmit={handleSubmit}>
            <label>Name of the deliverer</label>
            <input 
            type="text"
            name="delivererName"
            value={delivererName}
            onChange={(e) => setDelivererName(e.target.value)}
            />

          <label>Date of the route:</label>
          <input
            type="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
   
          <label>Shift:</label>
          <select
          value={shift}
          onChange={(e) => setShift(e.target.value)}>
            <option value="Morning">Morning</option>
            <option value="Evening">Evening</option>
          </select>
          
   
          <button type="submit">Submit</button>
        </form>
      </div>
    );
}

export default CreateDelivery;