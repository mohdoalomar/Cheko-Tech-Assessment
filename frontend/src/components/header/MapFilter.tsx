import { X } from "lucide-react";
import { useState } from "react";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentDistance: number;
  onApplyFilter: (distance: number) => void;
}

export default function MapFilter({
  isOpen,
  onClose,
  currentDistance,
  onApplyFilter,
}: FilterModalProps) {
  const [distance, setDistance] = useState(currentDistance);
  if (!isOpen) return null;

  const handleApply = () => {
    onApplyFilter(distance);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Filter by Distance</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-200"
          >
            <X size={20} />
          </button>
        </div>
        <div className="mb-6">
          <label
            htmlFor="distance"
            className="block text-sm font-medium text-gray-700"
          >
            Max Distance: <span className="font-bold">{distance} km</span>
          </label>
          <input
            id="distance"
            type="range"
            min="1"
            max="25"
            value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        <button
          onClick={handleApply}
          className="w-full rounded-lg bg-cheko-pink px-4 py-2.5 font-semibold text-black transition-colors hover:bg-cheko-pink/75"
        >
          Apply Filter
        </button>
      </div>
    </div>
  );
}
