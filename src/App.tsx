import axios from "axios";
import { useEffect, useState } from "react";
import "./index.css";

export function App() {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		getMovies();
	}, []);

	const getMovies = () => {
		axios({
			method: "get",
			url: "https://api.themoviedb.org/3/discover/movie",
			params: {
				api_key: "5428078da291e842d9062de26fc1c031",
				language: "pt-BR",
			},
		}).then((response) => {
			setMovies(response.data.results);
		});
	};

	getMovies();

	return (
		<>
			<ul className="movie-list">
				{movies.map((movie) => (
					<li>
						<p>{movie.title}</p>
						<p className="">{movie.overview}</p>
					</li>
				))}
			</ul>
		</>
	);
}
