import { StarHalfIcon, StarIcon } from 'lucide-react';

export default function ProductStars({ rating }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <>
      {Array.from({ length: fullStars }).map((_, i) => (
        <StarIcon key={`full-${i}`} fill="#cbb700ff" strokeWidth={0} />
      ))}

      {hasHalfStar && <StarHalfIcon fill="#cbb700ff" strokeWidth={0} />}
    </>
  );
}
