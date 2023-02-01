import { Link } from "react-router-dom";
import { Container, Card } from "react-bootstrap";
import { useState } from "react";

function SingleItem({ _id, name, address, code, status, deliveryId }) {

  return (
    <>
      <Container>
        <Card className="single-item">
          <Card.Body className={`single-item ${status}`}>
            <blockquote className="blockquote mb-0">
              <Link className="detailsButton" to={`/items/${_id}`} key={deliveryId}>
                <h3>{code}</h3>
              </Link>
              <p>{name}</p>
              <p>{address}</p>
              <p>Status: {status}</p>
            </blockquote>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
export default SingleItem;
