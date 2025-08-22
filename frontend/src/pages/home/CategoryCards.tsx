import type { ItemCategory, CategoryCounts } from '../types';
import { Coffee, Soup, Wheat, Croissant, UtensilsCrossed } from 'lucide-react'; // Example icons

const categoryIcons: { [key in ItemCategory]: React.ReactNode } = {
    BREAKFAST:<div className="bg-cheko-pink rounded-xl my-auto w-14 h-14 "> <Croissant size={30} className=" rotate-45  m-auto mt-3 text-black"/> </div>,
    DRINK: <div className=" bg-cheko-light-blue rounded-xl my-auto w-14 h-14  "> <Coffee size={30} className="bg-cheko-light-blue  m-auto mt-3 text-black"/></div>,
    SOUP: <div className="bg-cheko-light-mauve rounded-xl my-auto w-14 h-14  "> <Soup size={30} className="bg-cheko-light-mauve  m-auto mt-3  text-black"/></div>,
    SUSHI: <div className="bg-cheko-lavender rounded-xl  my-auto w-14 h-14"> <UtensilsCrossed size={30} className="bg-cheko-lavender  m-auto mt-3 text-black" /> </div>,
    OTHER: <div className="bg-cheko-teal rounded-xl  my-auto w-14 h-14"> <Wheat size={30} className="bg-cheko-teal  m-auto mt-3 text-black"/> </div>,
};

interface CategoryCardsProps {
    counts: CategoryCounts;
    isDarkMode: boolean;
}

export default function CategoryCards({ counts, isDarkMode }: CategoryCardsProps) {

    const categories = Object.keys(counts) as ItemCategory[];

    return (
        <div className="grid grid-cols-2  sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-8 mx-auto">
            {categories.reverse().map((cat) => {
                const categoryName = cat.charAt(0) + cat.slice(1).toLowerCase();
                return (
                    <div
                        key={cat}
                        className={`flex items-center justify-start max-w-64 space-x-2 rounded-lg px-2.5 py-2 text-sm font-medium shadow ${
                            isDarkMode ? "bg-cheko-card-gray text-gray-200" : "bg-white text-black"
                        }`}
                    >
                        {categoryIcons[cat]}
                        <span>{categoryName}</span>
                        <span className="font-semibold">{counts[cat]}</span>
                    </div>
                );
            })}
        </div>
    );
}
