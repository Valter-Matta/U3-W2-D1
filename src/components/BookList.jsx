import { useState } from "react";
import SingleBook from "./SingleBook";
import { Col, Form, Row } from "react-bootstrap";
import CommentArea from "./CommentArea";

const BookList = props => {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedAsin, setSelectedAsin] = useState(null);

	const handleBookSelection = asin => {
		setSelectedAsin(asin);
	};

	return (
		<>
			<Row className="justify-content-center mt-5" data-testid="gigio">
				<Col xs={12} md={3} className="text-center">
					<Form.Group>
						<Form.Control
							type="search"
							placeholder="Cerca un libro"
							value={searchQuery}
							onChange={e => setSearchQuery(e.target.value)}
						/>
					</Form.Group>
				</Col>
			</Row>
			<Row className="g-2 mt-3 d-flex">
				<Col className="h-100" xs={4} md={3}>
					<CommentArea asin={selectedAsin} data-testid="comment-show" />
				</Col>
				<Col xs={9} md={9} className="d-flex flex-wrap  ">
					{props.books
						.filter(b => b.title.toLowerCase().includes(searchQuery))
						.map(b => (
							<Col className="me-1" xs={3} md={3} key={b.asin}>
								<SingleBook
									book={b}
									isSelected={selectedAsin === b.asin}
									onSelect={() => handleBookSelection(b.asin)}
								/>
							</Col>
						))}
				</Col>
			</Row>
		</>
	);
};

export default BookList;
