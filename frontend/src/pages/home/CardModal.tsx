import { X, Plus, Minus } from 'lucide-react'

// @ts-ignore
export default function CardModal({ isOpen, onClose, product, quantity, setQuantity, isDarkMode }) {

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className={`rounded-3xl shadow-xl w-full max-w-md p-6 relative animate-fade-in-up ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
                <button onClick={onClose} className={`absolute top-4 right-4 rounded-full p-2 transition-colors ${isDarkMode ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-200 text-gray-600 hover:bg-gray-300"}`}><X size={20} /></button>
                <div className="flex items-center space-x-3 mb-1">
                    <h2 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>{product.title}</h2>
                    {product.isBestSale && <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${isDarkMode ? "bg-green-900 text-green-300" : "bg-green-100 text-green-800"}`}>Best Sale</span>}
                </div>
                <p className={`mb-4 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{product.calorie}</p>
                <p className={`text-sm mb-6 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>{product.description}</p>
                <div className="mb-6 rounded-2xl overflow-hidden shadow-lg"><img src={product.imageUrl} alt={product.title} className="w-full h-auto object-cover" onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x400/f7fafc/a0aec0?text=Image+Not+Found'; }}/></div>
                <div className="flex justify-between items-center">
                    <p className={`text-2xl font-bold ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>{product.price} <span className="text-lg">SR</span></p>
                    <div className="flex items-center space-x-4 bg-gray-100 dark:bg-gray-700 rounded-full p-2">
                        <button onClick={() => setQuantity(quantity - 1)} className="bg-white dark:bg-gray-600 rounded-full w-8 h-8 flex items-center justify-center text-pink-500 shadow transition-transform hover:scale-110"><Minus size={16} /></button>
                        <span className="text-lg font-bold text-gray-900 dark:text-white w-4 text-center">{quantity}</span>
                        <button onClick={() => setQuantity(quantity + 1)} className="bg-white dark:bg-gray-600 rounded-full w-8 h-8 flex items-center justify-center text-pink-500 shadow transition-transform hover:scale-110"><Plus size={16} /></button>
                    </div>
                </div>
            </div>
        </div>
    );
};
