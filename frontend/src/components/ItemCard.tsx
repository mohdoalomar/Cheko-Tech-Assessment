
// @ts-ignore
export default function ItemCard ({ product, quantity, onQuantityChange, onCardClick }) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden flex p-4 transition-transform hover:scale-105 cursor-pointer" onClick={() => onCardClick(product)}>
    <div className="w-1/3 relative">
    <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover rounded-lg" />
        {product.isBestSale && <span className="absolute bottom-2 left-2 bg-teal-100 text-teal-800 text-xs font-semibold px-2 py-1 rounded-full">Best Sale</span>}
        </div>
        <div className="w-2/3 pl-4 flex flex-col justify-between">
    <div>
        <h3 className="font-bold text-lg text-gray-900 dark:text-white">{product.title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{product.calorie}</p>
        </div>
        <div className="flex justify-between items-center mt-2">
    <p className="font-semibold text-pink-500">{product.price} SR</p>
    <div className="flex items-center space-x-2">
    <button onClick={(e) => { e.stopPropagation(); onQuantityChange(quantity - 1); }} className="bg-pink-100 dark:bg-pink-900/50 rounded-lg w-7 h-7 flex items-center justify-center text-pink-600 dark:text-pink-300">-</button>
        <span className="font-bold text-gray-800 dark:text-gray-200">{quantity}</span>
        <button onClick={(e) => { e.stopPropagation(); onQuantityChange(quantity + 1); }} className="bg-pink-100 dark:bg-pink-900/50 rounded-lg w-7 h-7 flex items-center justify-center text-pink-600 dark:text-pink-300">+</button>
        </div>
        </div>
        </div>
        </div>
);
};