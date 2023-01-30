import { Link } from "react-router-dom";
import { Button, Container, Card } from "react-bootstrap";


function SingleItem ( { _id, name, address, code, result }) {
    return (
              <>
          <Container>
            <Card>
              <Card.Header>
                <Link className="detailsButton" to={`/items/${_id}`}>
                  <h3>{code}</h3>
                </Link>
              </Card.Header>
              <Card.Body>
                <blockquote className="blockquote mb-0">
                  <p>{name}</p>
                  <p>{address}</p>
                </blockquote>
              </Card.Body>
            </Card>
            </Container>
          
        

      </>
    )
}
export default SingleItem;