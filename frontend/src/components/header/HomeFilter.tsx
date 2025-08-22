import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { Filters } from '../../hooks/useItems';
import type {ItemCategory, CategoryCounts} from "../../pages/types.ts"

// @ts-ignore
const FilterButton = ({ active, children, ...props }) => (
    <button
        className={`px-4 py-2 text-sm rounded-full border transition-colors ${
            active
                ? 'bg-black text-white border-black'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
        }`}
        {...props}
    >
        {children}
    </button>
);

interface FilterModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentFilters: Filters;
    onApplyFilters: (newFilters: Filters) => void;
    categoryCounts: CategoryCounts;
}

export default function FilterModal({
                                        isOpen,
                                        onClose,
                                        currentFilters,
                                        onApplyFilters,
                                        categoryCounts
                                    }: FilterModalProps) {
    // Manages the user's selections before they are applied
    const [tempFilters, setTempFilters] = useState<Filters>(currentFilters);
    const defaultFilters: Filters = { category: null, bestSeller: null, sortBy: 'price', sortAscending: true };

    // Resets the temporary selections to match the applied filters when the modal opens
    useEffect(() => {
        if (isOpen) {
            setTempFilters(currentFilters);
        }
    }, [isOpen, currentFilters]);

    if (!isOpen) return null;

    const handleApply = () => {
        onApplyFilters(tempFilters);
        onClose();
    };

    const handleClear = () => {
        setTempFilters(defaultFilters);
    };

    return (
        <div className="fixed inset-0 bg-black/30 flex justify-end z-50">
            <div
                onClick={onClose}
                className="absolute inset-0"
                aria-hidden="true"
            ></div>
            <div className="relative bg-white w-full max-w-sm h-full flex flex-col p-6 shadow-xl">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Filters</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200"><X size={24} /></button>
                </div>

                {/* Filter Sections */}
                <div className="flex-grow overflow-y-auto pr-2">
                    {/* Sort By */}
                    <div className="mb-6">
                        <h3 className="font-semibold mb-3">Sort by</h3>
                        <div className="flex gap-2">
                            <FilterButton
                                active={tempFilters.sortBy === 'price'}
                                onClick={() => setTempFilters(f => ({ ...f, sortBy: 'price' }))}
                            >
                                Price
                            </FilterButton>
                            <FilterButton
                                active={tempFilters.sortBy === 'calories'}
                                onClick={() => setTempFilters(f => ({ ...f, sortBy: 'calories' }))}
                            >
                                Calories
                            </FilterButton>
                        </div>
                    </div>

                    {/* Order */}
                    <div className="mb-6">
                        <h3 className="font-semibold mb-3">Order</h3>
                        <div className="flex gap-2">
                            <FilterButton active={tempFilters.sortAscending} onClick={() => setTempFilters(f => ({ ...f, sortAscending: true }))}>
                                Low to High
                            </FilterButton>
                            <FilterButton active={!tempFilters.sortAscending} onClick={() => setTempFilters(f => ({ ...f, sortAscending: false }))}>
                                High to Low
                            </FilterButton>
                        </div>
                    </div>

                    {/* Status */}
                    <div className="mb-6">
                        <h3 className="font-semibold mb-3">Status</h3>
                        <div className="flex gap-2">
                            <FilterButton active={tempFilters.bestSeller === true} onClick={() => setTempFilters(f => ({ ...f, bestSeller: true }))}>
                                Best Sellers
                            </FilterButton>
                            <FilterButton active={tempFilters.bestSeller === null} onClick={() => setTempFilters(f => ({ ...f, bestSeller: null }))}>
                                All Items
                            </FilterButton>
                        </div>
                    </div>

                    {/* Category */}
                    <div>
                        <h3 className="font-semibold mb-3">Category</h3>
                        <div className="flex flex-wrap gap-2">
                            <FilterButton active={tempFilters.category === null} onClick={() => setTempFilters(f => ({ ...f, category: null }))}>
                                All
                            </FilterButton>
                            {Object.keys(categoryCounts).map((cat) => (
                                <FilterButton
                                    key={cat}
                                    active={tempFilters.category === cat}
                                    onClick={() => setTempFilters(f => ({ ...f, category: cat as ItemCategory }))}
                                >
                                    {cat}
                                </FilterButton>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex-shrink-0 pt-6 border-t">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleClear}
                            className="w-1/2 rounded-lg border border-gray-300 px-4 py-2.5 font-semibold text-black transition-colors hover:bg-gray-100"
                        >
                            Clear All
                        </button>
                        <button
                            onClick={handleApply}
                            className="w-1/2 rounded-lg bg-black px-4 py-2.5 font-semibold text-white transition-colors hover:bg-gray-800"
                        >
                            Apply Filters
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}