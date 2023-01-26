import { useState } from "react";
import axios from "axios";

function AddItem(props) {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [product, setProduct] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();

    const { deliveryId } = props;
    const requestBody = { code, name, address, product, deliveryId};

    axios
    .post(`${process.env.REACT_APP_API_URL}/api/items`, requestBody)
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
      <h3>Add New Item</h3>

      <form onSubmit={handleSubmit}>
        <label>Code:</label>
        <input
          type="text"
          name="code"
          value={code}
          minLength={11}
          onChange={(e) => setCode(e.target.value)}
        />
        <br />
        <label>Product:</label>
        <select value={product} onChange={(e) => setProduct(e.target.value)}>
        <option value=""></option>
          <option value="Registered mail">Registered mail</option>
          <option value="Small parcel">Small parcel</option>
          <option value="Medium parcel">Medium parcel</option>
          <option value="Big parcel">Big parcel</option>
          <option value="Tube">Tube</option>
          <option value="Urgent parcel">Urgent parcel</option>
          <option value="Bureaufax">Bureaufax</option>
          <option value="Evening">Collecting</option>
        </select>
        <br />
        <label>Name:</label>
        <textarea
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label>Address:</label>
        <textarea
          type="text"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <br />
  
        <button type="submit">Add to route</button>
      </form>
    </div>
  );
}

export default AddItem;
