// src/pages/home/Home.tsx

import { useItems } from '../../hooks/useItems';
import CategoryCards from './CategoryCards.tsx';
import ItemGrid from './ItemGrid';
import PageSkeleton from './PageSkeleton';

export default function Home() {
    const { items, loading, initialLoading, hasNextPage, loadMore, counts } = useItems();

    if (initialLoading) {
        return <div className="container mx-auto p-8"><PageSkeleton /></div>;
    }

    return (
        <div className="container mx-auto p-8">
            <CategoryCards
                counts={counts}
            />
            <ItemGrid
                items={items}
                loadMore={loadMore}
                hasNextPage={hasNextPage}
                loading={loading}
            />
        </div>
    );
}