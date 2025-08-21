// src/pages/home/Home.tsx

import { useItems } from '../../hooks/useItems';
import CategoryCards from './CategoryCards.tsx';
import ItemGrid from './ItemGrid';
import PageSkeleton from './PageSkeleton';

interface HomeProps {
    isDarkMode: boolean;
}

export default function Home({ isDarkMode }: HomeProps) {
    const { items, loading, initialLoading, hasNextPage, loadMore, counts } = useItems();

    if (initialLoading) {
        return <div className="container mx-auto p-8"><PageSkeleton isDarkMode={isDarkMode} /></div>;
    }

    return (
        <div className="container mx-auto p-8 ">
            <CategoryCards
                counts={counts}
                isDarkMode={isDarkMode}
            />
            <ItemGrid
                items={items}
                loadMore={loadMore}
                hasNextPage={hasNextPage}
                loading={loading}
                isDarkMode={isDarkMode}
            />
        </div>
    );
}
