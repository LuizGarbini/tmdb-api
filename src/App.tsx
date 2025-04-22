import axios from "axios";
import { useEffect, useState } from "react";
import "./index.css";

export interface MovieType {
	id: number;
	title: string;
	poster_path: string;
	overview: string;
	vote_average: number;
}

export function App() {
	const [movies, setMovies] = useState<MovieType[]>([]);

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
			<ul className="movie-list">
				{movies.map((movie) => (
					<li key={movie.id}>
						<p className="text-white">{movie.title}</p>
						<p className="text-yellow-300">{movie.overview}</p>
						<img
							src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
							alt=""
						/>
						<p className="text-white">{movie.vote_average}</p>
					</li>
				))}
			</ul>
		</>
	);
}
