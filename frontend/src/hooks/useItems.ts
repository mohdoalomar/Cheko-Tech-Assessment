import { useState, useEffect, useCallback } from 'react';
import type { Item, ApiResponse, CategoryCounts, ItemCategory } from '../pages/types';
export type Filters = {
    category: ItemCategory | null;
    bestSeller: boolean | null;
    sortBy: string;
    sortAscending: boolean;
};
export const useItems = (searchTerm: string) => {
    const [items, setItems] = useState<Item[]>([]);
    const [page, setPage] = useState(0);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [counts, setCounts] = useState<CategoryCounts>({});

    const [filters, setFilters] = useState<Filters>({
        category: null,
        bestSeller: null,
        sortBy: 'price',
        sortAscending: true,
    });

    const fetchItems = useCallback(async (currentPage: number, currentFilters: Filters) => {
        setLoading(true);
        if (currentPage === 0) setInitialLoading(true);

        try {
            const params = new URLSearchParams({
                page_number: String(currentPage),
                page_size: '9',
                sort_by: currentFilters.sortBy,
                ascending: String(currentFilters.sortAscending),
            });

            if (searchTerm) {
                params.append('search', searchTerm);
            }
            if (currentFilters.category) {
                params.append('category', currentFilters.category);
            }
            if (currentFilters.bestSeller !== null) {
                params.append('best_seller', String(currentFilters.bestSeller));
            }

            const apiUrl = `http://localhost:8081/items?${params.toString()}`;
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
    }, [searchTerm]);

    useEffect(() => {
        setItems([]);
        setPage(0);
        setHasNextPage(true);
        fetchItems(0, filters);
    }, [filters, fetchItems]);

    const loadMore = () => {
        if (!loading && hasNextPage) {
            const nextPage = page + 1;
            setPage(nextPage);
            fetchItems(nextPage, filters);
        }
    };

    return { items, loading, initialLoading, hasNextPage, loadMore, counts, filters, setFilters };
};