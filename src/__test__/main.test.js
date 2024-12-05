import { fireEvent, render, screen } from "@testing-library/react";
import Welcome from "../components/Welcome";
import AllTheBooks from "../components/AllTheBooks";
import BookList from "../components/BookList";
import fantasy from "../data/fantasy.json";
import App from "../App";

describe("Welcome check", () => {
	test("renders Welcome", () => {
		render(<Welcome />);
		const welcome = screen.getByText(/Benvenuti in EpiBooks!/i);
		expect(welcome).toBeInTheDocument();
	});
});

describe("number of books", () => {
	test("lenght array of books", async () => {
		render(<AllTheBooks />);
		const arrayOfBooks = await screen.findAllByAltText("book-card");
		expect(arrayOfBooks).toHaveLength(150);
	});

	test("Comment area test", async () => {
		render(<BookList books={fantasy} />);
		// const arrayOfBooks = await screen.findAllByAltText("book-card");
		// fireEvent.click(arrayOfBooks);
		const comment = await screen.getByText(
			"Seleziona un libro per visualizzare i commenti",
		);
		expect(comment).toBeInTheDocument();
	});
});

describe("search bar", () => {
	test("input presente all'avvio", () => {
		render(<App />);
		const input = screen.getByPlaceholderText(/cerca un libro/i);
		expect(input).toBeInTheDocument();
	});
	test("funzionamento barra ricerca", async () => {
		render(<App />);
		const input = screen.getByPlaceholderText(/cerca un libro/i);
		fireEvent.change(input, { target: { value: "cs" } });
		const arrayOfBooks = await screen.findAllByTestId("gigio");
		expect(arrayOfBooks).toHaveLength(1);
	});
	test("border color of book", async () => {
		render(<BookList books={fantasy} />);
		const arrayOfBooks = await screen.findAllByTestId("gigio");
		fireEvent.click(arrayOfBooks[1]);
		expect(arrayOfBooks[1]).toHaveStyle({ border: "3px solid red" });
	});
	test("comments", async () => {
		render(<App />);
		const arrayOfBooks = await screen.findAllByTestId("gigio");

		const arrayOfComments = screen.findAllByTestId("comment-show");
		const book = arrayOfBooks[1];

		fireEvent.click(book);
		expect(arrayOfComments[1]).toBeInTheDocument();
	});
});
