import type { Movie } from "@/types/movie";
import { StarRating } from "../StarRating";
import { Button } from "../ui/button";

export interface Props {
	movie: Movie;
}

export function MovieCard(props: Props) {
	const movie = props.movie;
	return (
		<li className="flex flex-col gap-1 relative">
			<div>
				<img
					src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
					alt={movie.title}
				/>
			</div>
			<div className="absolute bottom-0 bg-[linear-gradient(#00000000,_#000000_90%)]">
				<div>
					<p className="text-white">{movie.title}</p>
				</div>
				<StarRating rating={movie.vote_average} />
			</div>
			<div className="overflow-hidden h-0 opacity-0 relative">
				<div>
					<p className="text-yellow-300">{movie.overview}</p>
				</div>
				<Button>Ver mais</Button>
			</div>
		</li>
	);
}
