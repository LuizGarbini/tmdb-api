import type { Movie } from "@/types/movie";
import { StarRating } from "../StarRating";

export interface Props {
	movie: Movie;
}

export function MovieCard(props: Props) {
	const movie = props.movie;
	return (
		<li>
			<div>
				<img
					src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
					alt={movie.title}
				/>
			</div>
			<StarRating rating={movie.vote_average} />
			<div>
				<p className="text-white">{movie.title}</p>
			</div>
			<div>
				<p className="text-yellow-300">{movie.overview}</p>
			</div>
			<p className="text-white">{movie.vote_average}</p>
		</li>
	);
}
