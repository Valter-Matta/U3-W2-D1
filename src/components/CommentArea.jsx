import { Component } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";

class CommentArea extends Component {
	state = {
		comments: [],
		isLoading: false,
		isError: false,
	};

	componentDidUpdate(prevProps) {
		if (prevProps.asin !== this.props.asin) {
			this.fetchComments();
		}
	}

	fetchComments = async () => {
		this.setState({ isLoading: true, isError: false });
		try {
			let response = await fetch(
				"https://striveschool-api.herokuapp.com/api/comments/" +
					this.props.asin,
				{
					headers: {
						Authorization:
							"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MGM2NThhZDEyOTAwMTU4NzZiYzYiLCJpYXQiOjE3MzMxNDMxMzYsImV4cCI6MTczNDM1MjczNn0.4vW1GBj1TAdjXCbdPYr3ftNQuk5rRxWF1aa_W77ICU8",
					},
				},
			);
			// console.log(response);
			if (response.ok) {
				let comments = await response.json();
				this.setState({ comments, isLoading: false });
			} else {
				this.setState({ isLoading: false, isError: true });
			}
		} catch (error) {
			console.log(error);
			this.setState({ isLoading: false, isError: true });
		}
	};

	render() {
		return (
			<div className="text-center">
				{!this.props.asin && (
					<p>Seleziona un libro per visualizzare i commenti</p>
				)}
				{this.state.isLoading && <Loading />}
				{this.state.isError && <Error />}
				{this.props.asin && (
					<>
						<AddComment asin={this.props.asin} />
						<CommentList commentsToShow={this.state.comments} />
					</>
				)}
			</div>
		);
	}
}

export default CommentArea;
