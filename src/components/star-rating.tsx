import {Star} from "lucide-react";

export interface Props {
  rating: number;
}

export function StarRating(props: Props) {
  const numStars = props.rating.toFixed(1);

  return (
    <div className="flex items-center gap-0.5">
      <Star size={18} className="fill-yellow-300 stroke-0" />
      <p className="text-xs">{numStars}</p>
    </div>
  );
}
