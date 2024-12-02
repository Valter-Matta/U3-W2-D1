import { Component } from "react";
import SingleBook from "./SingleBook";
import { Col, Form, Row } from "react-bootstrap";
import CommentArea from "./CommentArea";

class BookList extends Component {
	state = {
		searchQuery: "",
		selectedAsin: null,
	};

	handleBookSelection = asin => {
		this.setState({ selectedAsin: asin });
	};

	render() {
		return (
			<>
				<Row className="justify-content-center mt-5">
					<Col xs={12} md={3} className="text-center">
						<Form.Group>
							<Form.Control
								type="search"
								placeholder="Cerca un libro"
								value={this.state.searchQuery}
								onChange={e => this.setState({ searchQuery: e.target.value })}
							/>
						</Form.Group>
					</Col>
				</Row>
				<Row className="g-2 mt-3 d-flex">
					<Col className="h-100" xs={4} md={3}>
						<CommentArea asin={this.state.selectedAsin} />
					</Col>
					<Col xs={9} md={9} className="d-flex flex-wrap  ">
						{this.props.books
							.filter(b =>
								b.title.toLowerCase().includes(this.state.searchQuery),
							)
							.map(b => (
								<Col className="me-1" xs={3} md={3} key={b.asin}>
									<SingleBook
										book={b}
										isSelected={this.state.selectedAsin === b.asin}
										onSelect={() => this.handleBookSelection(b.asin)}
									/>
								</Col>
							))}
					</Col>
				</Row>
			</>
		);
	}
}

export default BookList;
