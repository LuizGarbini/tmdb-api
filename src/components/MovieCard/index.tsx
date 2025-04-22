import type { Movie } from "@/types";

export interface Props {
	movie: Movie;
}

export function MovieCard(props: Props) {
	const movie = props.movie;
	return (
		<li>
			<p className="text-white">{movie.title}</p>
			<p className="text-yellow-300">{movie.overview}</p>
			<img
				src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
				alt=""
			/>
			<p className="text-white">{movie.vote_average}</p>
		</li>
	);
}
