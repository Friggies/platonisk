import { Mars, Venus, VenusAndMars } from 'lucide-react';

export default function GenderIcon({ gender }) {
  switch (gender?.toLowerCase()) {
    case 'male':
      return (
        <div className="flex items-center gap-1">
          <Mars size={14} />
          <span>Herre</span>
        </div>
      );

    case 'female':
      return (
        <div className="flex items-center gap-1">
          <Venus size={14} />
          <span>Dame</span>
        </div>
      );

    case 'unisex':
      return (
        <div className="flex items-center gap-1">
          <VenusAndMars size={14} />
          <span>Unisex</span>
        </div>
      );

    default:
      return null;
  }
}
