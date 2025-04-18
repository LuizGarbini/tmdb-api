import axios from "axios";
import { useState } from "react";
import { Button } from "./components/ui/button";

export function App() {
	const [movies, setMovies] = useState([]);

	const getMovies = () => {
		axios({
			method: "get",
			url: "https://api.themoviedb.org/3/discover/movie",
			params: {
				api_key: "5428078da291e842d9062de26fc1c031",
				language: "pt-BR",
			},
		}).then((response) => {
			console.log(response);
		});
	};

	getMovies();

	return (
		<div>
			<h1>Hello World</h1>
			<Button> Click me</Button>
		</div>
	);
}
