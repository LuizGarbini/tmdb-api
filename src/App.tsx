import axios from "axios";
import { useEffect, useState } from "react";
import { MovieCard } from "./components/MovieCard";
import "./index.css";
import type { Movie } from "./types/movie";

export function App() {
	const [movies, setMovies] = useState<Movie[]>([]);

	useEffect(() => {
		getMovies();
	}, []);

	const getMovies = () => {
		axios({
			method: "get",
			url: "https://api.themoviedb.org/3/discover/movie",
			params: {
				api_key: import.meta.env.VITE_TMDB_API_TOKEN,
				language: "pt-BR",
			},
		}).then((response) => {
			setMovies(response.data.results);
		});
	};

	return (
		<>
			<ul>
				{movies.map((movie) => (
					<MovieCard key={movie.id} movie={movie} />
				))}
			</ul>
		</>
	);
}
