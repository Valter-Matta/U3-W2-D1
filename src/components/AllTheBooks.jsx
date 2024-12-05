import { Card, Col, Row } from "react-bootstrap";
import fantasy from "../data/fantasy.json";

const AllTheBooks = () => {
	return (
		<Row className="g-2" data-testid="gigio">
			{fantasy.map(book => {
				return (
					<Col xs={12} md={4} key={book.asin}>
						<Card className="book-cover d-flex flex-column">
							<Card.Img variant="top" src={book.img} alt="book-card" />
							<Card.Body>
								<Card.Title>{book.title}</Card.Title>
							</Card.Body>
						</Card>
					</Col>
				);
			})}
		</Row>
	);
};

export default AllTheBooks;
