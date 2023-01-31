import { Link } from "react-router-dom";
import { Container, Card } from "react-bootstrap";

function SingleItem({ _id, name, address, code, result }) {
  return (
    <>
      <Container>
        <Card className="single-item">
          <Card.Body className="single-item">
            <blockquote className="blockquote mb-0">
              <Link className="detailsButton" to={`/items/${_id}`}>
                <h3>{code}</h3>
              </Link>
              <p>{name}</p>
              <p>{address}</p>
            </blockquote>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
export default SingleItem;
