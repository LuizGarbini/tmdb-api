import type { Movie } from "@/types/movie";
import { StarRating } from "../StarRating";

export interface Props {
	movie: Movie;
}

export function MovieCard(props: Props) {
	const movie = props.movie;

	return (
		<li className="group flex flex-col gap-1 relative hover:cursor-pointer">
			<div>
				<img
					className="transition-opacity duration-600 group-hover:opacity-50"
					src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
					alt={movie.title}
				/>
			</div>
			<div className="flex flex-col gap-1.5 absolute bottom-0 bg-[linear-gradient(#00000000,_#000000_90%)] justify-end p-2.5">
				<div>
					<p className="text-white text-xs">{movie.title}</p>
				</div>
				{movie.vote_average > 0 && <StarRating rating={movie.vote_average} />}
				<div className="flex flex-col gap-1.5 overflow-hidden h-0 opacity-0 relative group-hover:opacity-100 group-hover:h-12 transition-all duration-600">
					<div>
						{movie.overview && (
							<p className="text-white text-xs">
								{movie.overview.length > 90
									? `${movie.overview.substring(0, 90)}...`
									: movie.overview}
							</p>
						)}
					</div>
				</div>
			</div>
		</li>
	);
}
