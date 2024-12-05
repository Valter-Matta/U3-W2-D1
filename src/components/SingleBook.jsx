// import { useState } from "react";
import { Card, Col } from "react-bootstrap";

const SingleBook = props => {
	// state = {
	// 	selected: false,
	// };
	// const [selected, setSelected] = useState();

	return (
		<>
			<Col className="border">
				<Card
					onClick={props.onSelect}
					style={{
						border: props.isSelected ? "3px solid red" : "none",
						cursor: "pointer",
					}}
				>
					<Card.Img variant="top" src={props.book.img} />
					<Card.Body>
						<Card.Title style={{ color: "black" }}>
							{props.book.title}
						</Card.Title>
					</Card.Body>
				</Card>
			</Col>
		</>
	);
};

export default SingleBook;
