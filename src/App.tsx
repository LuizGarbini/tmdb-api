import axios from "axios";
import { useEffect, useState } from "react";
import { MovieCard } from "./components/MovieCard";
import { Label } from "./components/ui/label";
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
	const [selectedDate, setSelectedDate] = useState<string | undefined>(
		undefined,
	);

	useEffect(() => {
		getMovies(selectedGenre, selectedVote, selectedDate);
		getGenres();
	}, [selectedGenre, selectedVote, selectedDate]);

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

	const getMovies = async (genreId?: string, vote?: number, year?: string) => {
		axios({
			method: "get",
			url: "https://api.themoviedb.org/3/discover/movie",
			params: {
				api_key: import.meta.env.VITE_TMDB_API_TOKEN,
				language: "pt-BR",
				with_genres: genreId,
				"vote_average.gte": vote,
				primary_release_year: Number(year),
			},
		}).then((response) => {
			setMovies(response.data.results);
		});
	};

	const currentYear = new Date().getFullYear();
	const years = Array.from(
		{ length: currentYear - 1990 + 1 },
		(_, i) => currentYear - i,
	);

	return (
		<>
			<Select
				value={selectedGenre ?? ""}
				onValueChange={(value) => {
					const genreId = value === "all" ? undefined : value;
					setSelectedGenre(genreId);
				}}
			>
				<SelectTrigger className="w-[200px]">
					<SelectValue placeholder="Todos os gêneros" />
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

			<div className="flex flex-col gap-2">
				<Label htmlFor="rating">Avaliação Mínima: {selectedVote}</Label>
				<Slider
					id="rating"
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
			</div>

			<Select
				value={selectedDate ?? ""}
				onValueChange={(value) => {
					const yearDate = value === "all" ? undefined : value;
					setSelectedDate(yearDate);
				}}
			>
				<SelectTrigger className="w-[200px]">
					<SelectValue placeholder="Todos os anos" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="all">Todas as Datas</SelectItem>
					{years.map((year) => (
						<SelectItem key={year} value={year.toString()}>
							{year}
						</SelectItem>
					))}
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
