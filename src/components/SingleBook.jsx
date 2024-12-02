import { Component } from "react";
import { Card, Col } from "react-bootstrap";
import CommentArea from "./CommentArea";

class SingleBook extends Component {
	state = {
		selected: false,
	};

	render() {
		return (
			<>
				<Col>
					<Card
						onClick={this.props.onSelect}
						style={{
							border: this.props.isSelected ? "3px solid red" : "none",
							cursor: "pointer",
						}}
					>
						<Card.Img variant="top" src={this.props.book.img} />
						<Card.Body>
							<Card.Title style={{ color: "black" }}>
								{this.props.book.title}
							</Card.Title>
						</Card.Body>
					</Card>
				</Col>
			</>
		);
	}
}

export default SingleBook;
