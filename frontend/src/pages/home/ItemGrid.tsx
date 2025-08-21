import { useInView } from 'react-intersection-observer';
import { useEffect, memo } from 'react';
import ItemCard from './ItemCard';
import type { Item } from '../types';

interface ItemGridProps {
    items: Item[];
    loadMore: () => void;
    hasNextPage: boolean;
    loading: boolean;
    isDarkMode: boolean;
}

const GridSkeleton = memo(({ isDarkMode }: { isDarkMode: boolean }) => (
    <>
        {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className={`h-32 w-full animate-pulse rounded-2xl ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`} />
        ))}
    </>
));

export default function ItemGrid({ items, loadMore, hasNextPage, loading, isDarkMode }: ItemGridProps) {
    const { ref, inView } = useInView({ threshold: 0.5 });

    useEffect(() => {
        if (inView && hasNextPage && !loading) {
            loadMore();
        }
    }, [inView, hasNextPage, loading, loadMore]);

    return (
        <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.isArray(items) &&
                    items.map((item) => (
                        <ItemCard key={item.id || item.name} item={item} isDarkMode={isDarkMode} />
                    ))}
            </div>
            <div ref={ref} className="col-span-full mt-6 h-1">
                {hasNextPage && (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <GridSkeleton isDarkMode={isDarkMode} />
                    </div>
                )}
                {!hasNextPage && items?.length > 0 && (
                    <p className="text-center text-gray-500">You've reached the end! 👋</p>
                )}
            </div>
        </>
    );
}
