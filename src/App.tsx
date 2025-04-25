import axios from "axios";
import { useEffect, useState } from "react";
import { MovieCard } from "./components/MovieCard";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./components/ui/select";
import "./index.css";
import type { Movie } from "./types/movie";

export function App() {
	const [movies, setMovies] = useState<Movie[]>([]);
	const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);
	const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

	useEffect(() => {
		getGenres();
		getMovies();
	}, []);

	const getGenres = () => {
		axios({
			method: "get",
			url: "https://api.themoviedb.org/3/genre/movie/list",
			params: {
				api_key: import.meta.env.VITE_TMDB_API_TOKEN,
				language: "pt-BR",
			},
		}).then((response) => {
			setGenres(response.data.genres);
		});
	};

	const getMovies = (genreId?: number) => {
		axios({
			method: "get",
			url: "https://api.themoviedb.org/3/discover/movie",
			params: {
				api_key: import.meta.env.VITE_TMDB_API_TOKEN,
				language: "pt-BR",
				with_genres: genreId,
			},
		}).then((response) => {
			setMovies(response.data.results);
		});
	};

	return (
		<>
			<Select
				value={selectedGenre?.toString() ?? ""}
				onValueChange={(value) => {
					const genreId = value ? Number(value) : null;
					setSelectedGenre(genreId);
					getMovies(genreId ?? undefined);
				}}
			>
				<SelectTrigger className="w-[200px]">
					<SelectValue placeholder="Selecione um gênero" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="all">Todos os gêneros</SelectItem>
					{genres.map((genre) => (
						<SelectItem key={genre.id} value={genre.id.toString()}>
							{genre.name}
						</SelectItem>
					))}
				</SelectContent>
			</Select>

			<ul className="grid gap-4 grid w-full grid-cols-3 gap-4 md:grid-cols-5">
				{movies.map((movie) => (
					<MovieCard key={movie.id} movie={movie} />
				))}
			</ul>
		</>
	);
}
