import { useState, useEffect } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";

const CommentArea = props => {
	// state = {
	// 	comments: [],
	// 	isLoading: false,
	// 	isError: false,
	// };
	const [comments, setComment] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	// componentDidUpdate(prevProps) {
	// 	if (prevProps.asin !== this.props.asin) {
	// 		this.fetchComments();
	// 	}
	// }
	useEffect(() => {
		fetchComments();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.asin]);

	const fetchComments = async () => {
		setIsError(false);
		setIsLoading(true);
		try {
			let response = await fetch(
				"https://striveschool-api.herokuapp.com/api/comments/" + props.asin,
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
				// this.setState({ comments, isLoading: false });
				setComment(comments);
				setIsLoading(false);
			} else {
				setIsError(true);
				setIsLoading(false);
			}
		} catch (error) {
			console.log(error);

			setIsError(true);
			setIsLoading(false);
		}
	};

	return (
		<div className="text-center comment-list">
			{!props.asin && <p>Seleziona un libro per visualizzare i commenti</p>}
			{isLoading && <Loading />}
			{isError && <Error />}
			{props.asin && (
				<>
					<AddComment asin={props.asin} />
					<CommentList commentsToShow={comments} />
				</>
			)}
		</div>
	);
};

export default CommentArea;
