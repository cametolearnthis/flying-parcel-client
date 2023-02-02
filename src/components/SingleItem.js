import { Link } from "react-router-dom";
import { Container, Card } from "react-bootstrap";
import { useState } from "react";

function SingleItem({ _id, name, address, code, status, deliveryId, imageUrl }) {

  return (
    <>
      <Container>
        <Card>
          <Card.Body className={status}>
            <blockquote className="blockquote mb-0">
              <Link className="detailsButton" to={`/items/${_id}`} key={deliveryId}>
                <h3>{code}</h3>
              </Link>
              <p>Address: {address}</p>
            </blockquote>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
export default SingleItem;
