import { X } from 'lucide-react';
import type { Item } from '../types';

interface CardModalProps {
    isOpen: boolean;
    onClose: () => void;
    item: Item;
    quantity: number;
    onQuantityChange: (newQuantity: number) => void;
    isDarkMode: boolean;
}

export default function CardModal({ isOpen, onClose, item, quantity, onQuantityChange, isDarkMode }: CardModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/45 flex items-center justify-center z-50 p-10">
            <div className={`rounded-3xl shadow-xl w-full max-w-lg px-7 relative animate-fade-in-up ${isDarkMode ? "bg-cheko-card-gray text-white" : "bg-white text-gray-900"}`}>
                <button onClick={onClose} className={`absolute top-4 right-4 rounded-full p-2 transition-colors ${isDarkMode ? "bg-cheko-search-gray hover:bg-gray-600 text-gray-300" : "bg-gray-200 hover:bg-gray-300 text-gray-600"}`}><X size={20} /></button>
                <div className="p-6">
                    <div className="flex items-center space-x-3 mb-2">
                        <h2 className="text-2xl font-bold">{item.name}</h2>
                        {item.isBestSeller && <span className={`h-5 items-center flex justify-center w-20  rounded bg-[#D0EAE3] px-2 py-1 text-xs font-semibold  text-[#599887] "}`}>Best Sale</span>}
                    </div>
                    <p className={`mb-4 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{item.calories} Cal</p>
                    <p className={`text-sm mb-6 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>{item.description}</p>
                </div>
                <div className="rounded-b-3xl overflow-hidden ">
                    <img src={item.imageUrl} alt={item.name} className="max-h-96 object-cover mx-auto" onError={(e) => { e.currentTarget.src = '[https://placehold.co/600x400/f7fafc/a0aec0?text=Image+Not+Found](https://placehold.co/600x400/f7fafc/a0aec0?text=Image+Not+Found)'; }}/>
                    <div className="flex items-center justify-between p-6">
                        <p className="text-2xl font-bold text-cheko-pink">{item.price} <span className="text-lg">SR</span></p>
                        <div className="flex items-center space-x-4 rounded-full p-2">
                            <button onClick={() => onQuantityChange(quantity - 1)}        className={`flex h-9 w-9 items-center justify-center text-2xl font-bold rounded-lg ${isDarkMode ? "border-cheko-pink border text-cheko-pink" : "bg-pink-100 text-cheko-black"}`}
                            >
                                <span className="mb-1">-</span>
                            </button>
                            <span className={`text-lg font-bold ${isDarkMode? "text-gray-400" : "text-cheko-black"}  w-4 text-center`}>{quantity}</span>
                            <button onClick={() => onQuantityChange(quantity + 1)}        className={`flex h-9 w-9 items-center justify-center text-2xl font-bold rounded-lg ${isDarkMode ? "border-cheko-pink border text-cheko-pink" : "bg-pink-100 text-cheko-black"}`}
                            >
                                <span className="mb-1">+</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};