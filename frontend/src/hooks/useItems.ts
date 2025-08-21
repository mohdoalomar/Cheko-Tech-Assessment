import { useState, useEffect, useCallback } from 'react';
import type {Item, ApiResponse, CategoryCounts} from '../pages/types';

export const useItems = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [page, setPage] = useState(0);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [counts, setCounts] = useState<CategoryCounts>({});

    const fetchItems = useCallback(async (currentPage: number) => {
        setLoading(true);
        if (currentPage === 0) setInitialLoading(true);

        try {
            const apiUrl = `http://localhost:8081/items?&page_number=${currentPage}&page_size=9`;
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error('Network response was not ok');
            const data: ApiResponse = await response.json();

            const newItems = data.items.content;

            setItems(prev => (currentPage === 0 ? newItems : [...prev, ...newItems]));
            setHasNextPage(!data.items.last);
            if (currentPage === 0) {
                setCounts(data.counts);
            }
        } catch (error) {
            console.error("Failed to fetch items:", error);
        } finally {
            setLoading(false);
            setInitialLoading(false);
        }
    }, []);

    useEffect(() => {
        setItems([]);
        setPage(0);
        setHasNextPage(true);
        fetchItems(0);
    }, [ fetchItems]);

    const loadMore = () => {
        if (!loading && hasNextPage) {
            const nextPage = page + 1;
            setPage(nextPage);
            fetchItems(nextPage);
        }
    };

    return { items, loading, initialLoading, hasNextPage, loadMore, counts };
};