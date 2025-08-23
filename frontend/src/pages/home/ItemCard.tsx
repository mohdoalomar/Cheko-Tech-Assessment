import type { Item } from "../types";

interface ItemCardProps {
  item: Item;
  quantity: number;
  onQuantityChange: (itemId: string | number, newQuantity: number) => void;
  onCardClick: (item: Item) => void;
  isDarkMode: boolean;
}

export default function ItemCard({
  item,
  quantity,
  onQuantityChange,
  onCardClick,
  isDarkMode,
}: ItemCardProps) {
  const handleIncrease = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuantityChange(item.id, quantity + 1);
  };

  const handleDecrease = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuantityChange(item.id, quantity - 1);
  };

  return (
    <div
      className={`flex cursor-pointer overflow-hidden rounded-2xl p-4 shadow-md transition-transform hover:scale-105 ${
        isDarkMode ? "bg-cheko-card-gray" : "bg-white"
      }`}
      onClick={() => onCardClick(item)}
    >
      <div className="relative w-1/3">
        {item.isBestSeller && (
          <span className="absolute bottom-2/5 -right-14 h-5 items-center flex justify-center w-20  rounded bg-[#D0EAE3] px-2 py-1 text-xs font-semibold text-[#599887]">
            Best Sale
          </span>
        )}
        <img
          src={item.imageUrl}
          alt={item.name}
          className="h-36 w-full rounded-lg object-cover"
        />
      </div>
      <div className="flex w-2/3 flex-col justify-between pl-4">
        <div>
          <h3
            className={`font-bold text-lg ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {item.name}
          </h3>
          <p
            className={`text-sm ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {item.calories} Cal
          </p>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <p className="font-semibold text-cheko-pink">{item.price} SR</p>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleDecrease}
              className={`flex h-9 w-9 items-center justify-center text-2xl font-bold rounded-lg ${
                isDarkMode
                  ? "border-cheko-pink border  text-cheko-pink"
                  : "bg-pink-100 text-cheko-black"
              }`}
            >
              <span className="mb-1">-</span>
            </button>
            <span
              className={`font-bold ${
                isDarkMode ? "text-gray-200" : "text-gray-800"
              }`}
            >
              {quantity}
            </span>
            <button
              onClick={handleIncrease}
              className={`flex h-9 w-9 items-center justify-center text-2xl font-bold rounded-lg ${
                isDarkMode
                  ? "border-cheko-pink border text-cheko-pink"
                  : "bg-pink-100 text-cheko-black"
              }`}
            >
              <span className="mb-1">+</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
