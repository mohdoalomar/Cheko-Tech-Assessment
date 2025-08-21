import type { ItemCategory, CategoryCounts } from '../types';
import { Coffee, Soup, Wheat, UtensilsCrossed, Inbox } from 'lucide-react'; // Example icons

const categoryIcons: { [key in ItemCategory]: React.ReactNode } = {
    BREAKFAST: <Wheat size={20} />,
    DRINK: <Coffee size={20} />,
    SOUP: <Soup size={20} />,
    SUSHI: <UtensilsCrossed size={20} />,
    OTHER: <Wheat size={20} />,
};

interface CategoryCardsProps {
    counts: CategoryCounts;
}

export default function CategoryCards({ counts }: CategoryCardsProps) {
    // Return null if there are no counts to display, preventing an empty container
    if (!counts || Object.keys(counts).length === 0) {
        return null;
    }

    const categories = Object.keys(counts) as ItemCategory[];

    return (
        <div className="mb-8 flex flex-wrap gap-3">
            {categories.map((cat) => {
                const categoryName = cat.charAt(0) + cat.slice(1).toLowerCase();
                return (
                    // Use a non-interactive div for display
                    <div
                        key={cat}
                        className="flex items-center space-x-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-200"
                    >
                        {categoryIcons[cat]}
                        <span>{categoryName}</span>
                        <span className="font-semibold">{counts[cat]}</span>
                    </div>
                );
            })}
            {/* Orders card can also be a simple div */}
            <div className="flex items-center space-x-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-200">
                <Inbox size={20} />
                <span>Orders</span>
                <span className="font-semibold">3</span>
            </div>
        </div>
    );
}