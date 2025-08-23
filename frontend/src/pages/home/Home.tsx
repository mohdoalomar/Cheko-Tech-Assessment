// src/pages/home/Home.tsx

import { useItems } from "../../hooks/useItems";
import CategoryCards from "./CategoryCards.tsx";
import ItemGrid from "./ItemGrid";
import PageSkeleton from "./PageSkeleton";
import HomeFilter from "../../components/header/HomeFilter.tsx";

export interface HomeProps {
  isDarkMode: boolean;
  isFilterOpen: boolean;
  setIsFilterOpen: (isOpen: boolean) => void;
  searchTerm: string;
}

export default function Home({
  isDarkMode,
  setIsFilterOpen,
  isFilterOpen,
  searchTerm,
}: HomeProps) {
  const {
    items,
    loading,
    initialLoading,
    hasNextPage,
    loadMore,
    counts,
    filters,
    setFilters,
  } = useItems(searchTerm);

  if (initialLoading) {
    return (
      <div className="container mx-auto p-8">
        <PageSkeleton isDarkMode={isDarkMode} />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 ">
      <CategoryCards counts={counts} isDarkMode={isDarkMode} />
      <ItemGrid
        items={items}
        loadMore={loadMore}
        hasNextPage={hasNextPage}
        loading={loading}
        isDarkMode={isDarkMode}
      />
      <HomeFilter
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        currentFilters={filters}
        onApplyFilters={setFilters}
        categoryCounts={counts}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}
