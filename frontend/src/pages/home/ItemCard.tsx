// src/pages/home/ItemCard.tsx

// src/pages/home/ItemCard.tsx
import type {Item} from '../types';

interface ItemCardProps {
    item: Item;
}

export default function ItemCard({ item }: ItemCardProps) {
    const quantity = 0;
    const onQuantityChange = (newQuantity: number) => console.log(`Quantity for ${item.name} changed to ${newQuantity}`);
    const onCardClick = (clickedItem: Item) => console.log(`${clickedItem.name} card clicked`);

    return (
        <div
            className="flex cursor-pointer overflow-hidden rounded-2xl bg-white p-4 shadow-md transition-transform hover:scale-105 dark:bg-gray-800"
            onClick={() => onCardClick(item)}
        >
            <div className="relative w-1/3">
                <img src={item.imageUrl} alt={item.name} className="h-full w-full rounded-lg object-cover" />
                {item.isBestSeller && (
                    <span className="absolute bottom-2 left-2 rounded-full bg-teal-100 px-2 py-1 text-xs font-semibold text-teal-800">
            Best Sale
          </span>
                )}
            </div>
            <div className="flex w-2/3 flex-col justify-between pl-4">
                <div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">{item.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.calories} Cal</p>
                </div>
                <div className="mt-2 flex items-center justify-between">
                    <p className="font-semibold text-pink-500">{item.price} SR</p>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={(e) => { e.stopPropagation(); onQuantityChange(quantity - 1); }}
                            className="flex h-7 w-7 items-center justify-center rounded-lg bg-pink-100 text-pink-600 dark:bg-pink-900/50 dark:text-pink-300"
                        >
                            -
                        </button>
                        <span className="font-bold text-gray-800 dark:text-gray-200">{quantity}</span>
                        <button
                            onClick={(e) => { e.stopPropagation(); onQuantityChange(quantity + 1); }}
                            className="flex h-7 w-7 items-center justify-center rounded-lg bg-pink-100 text-pink-600 dark:bg-pink-900/50 dark:text-pink-300"
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}