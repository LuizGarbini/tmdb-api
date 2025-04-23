import { Star } from "lucide-react";

export interface Props {
	rating: number;
}

export function StarRating(props: Props) {
	const numStars = Math.round(props.rating / 2);

	const fullStars = [];
	const emptyStars = [];

	for (let i = 0; i < 5; i++) {
		if (i < numStars) {
			fullStars.push(i);
		} else {
			emptyStars.push(i);
		}
	}

	return (
		<div className="flex">
			{fullStars.map((index) => (
				<Star size={18} className="fill-yellow-300 stroke-0" key={index} />
			))}
			{emptyStars.map((index) => (
				<Star size={18} className="stroke-1" key={index} />
			))}
		</div>
	);
}
