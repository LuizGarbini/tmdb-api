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
import { Slider } from "./components/ui/slider";
import "./index.css";
import type { Movie } from "./types/movie";

export function App() {
	const [movies, setMovies] = useState<Movie[]>([]);
	const [genres, setGenres] = useState<{ id: string; name: string }[]>([]);
	const [selectedGenre, setSelectedGenre] = useState<string | undefined>(
		undefined,
	);
	const [selectedVote, setSelectedVote] = useState<number | undefined>(
		undefined,
	);

	useEffect(() => {
		getMovies(selectedGenre, selectedVote);
		getGenres();
	}, [selectedGenre, selectedVote]);

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

	const getMovies = async (genreId?: string, vote?: number) => {
		axios({
			method: "get",
			url: "https://api.themoviedb.org/3/discover/movie",
			params: {
				api_key: import.meta.env.VITE_TMDB_API_TOKEN,
				language: "pt-BR",
				with_genres: genreId,
				"vote_average.gte": vote,
			},
		}).then((response) => {
			setMovies(response.data.results);
		});
	};

	return (
		<>
			<Select
				value={selectedGenre ?? ""}
				onValueChange={(value) => {
					const genreId = value === "all" ? undefined : value;
					setSelectedGenre(genreId);
					console.log(genreId);
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

			<Slider
				defaultValue={[0.5]}
				value={selectedVote ? [selectedVote] : [0.5]}
				onValueChange={(value) => {
					const vote = value[0];
					setSelectedVote(vote);
				}}
				max={10}
				step={0.5}
				min={0.5}
			/>

			<ul className="grid gap-4 w-full grid-cols-3 md:grid-cols-5">
				{movies.map((movie) => (
					<MovieCard key={movie.id} movie={movie} />
				))}
			</ul>
		</>
	);
}
