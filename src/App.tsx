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
	const [genres, setGenres] = useState<{ id: string; name: string }[]>([]);
	const [selectedGenre, setSelectedGenre] = useState<string | undefined>(
		undefined,
	);
	const [selectedVote, setSelectedVote] = useState<string | undefined>(
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

	const getMovies = async (genreId?: string, vote?: string) => {
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

			<Select
				value={selectedVote ?? ""}
				onValueChange={(value) => {
					const vote = value === "all" ? undefined : value;
					setSelectedVote(vote);
				}}
			>
				<SelectTrigger className="w-[200px]">
					<SelectValue placeholder="Selecione uma nota minima" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="all">Sem preferência</SelectItem>
					<SelectItem key={1} value={"1"}>
						1
					</SelectItem>
					<SelectItem key={2} value={"2"}>
						2
					</SelectItem>
					<SelectItem key={3} value={"3"}>
						3
					</SelectItem>
					<SelectItem key={4} value={"4"}>
						4
					</SelectItem>
					<SelectItem key={5} value={"5"}>
						5
					</SelectItem>
					<SelectItem key={6} value={"6"}>
						6
					</SelectItem>
					<SelectItem key={7} value={"7"}>
						7
					</SelectItem>
					<SelectItem key={8} value={"8"}>
						8
					</SelectItem>
					<SelectItem key={9} value={"9"}>
						9
					</SelectItem>
					<SelectItem key={10} value={"10"}>
						10
					</SelectItem>
				</SelectContent>
			</Select>

			<ul className="grid gap-4 w-full grid-cols-3 md:grid-cols-5">
				{movies.map((movie) => (
					<MovieCard key={movie.id} movie={movie} />
				))}
			</ul>
		</>
	);
}
