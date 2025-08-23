import { useState, useEffect, memo } from "react";
import { useInView } from "react-intersection-observer";
import ItemCard from "./ItemCard";
import CardModal from "./CardModal";
import type { Item } from "../types";

interface ItemGridProps {
  items: Item[];
  loadMore: () => void;
  hasNextPage: boolean;
  loading: boolean;
  isDarkMode: boolean;
}

type Quantities = { [itemId: string | number]: number };

const GridSkeleton = memo(() => (
  <>
    {Array.from({ length: 3 }).map((_, i) => (
      <div
        key={i}
        className="h-32 w-full animate-pulse rounded-2xl bg-gray-200"
      />
    ))}
  </>
));

export default function ItemGrid({
  items,
  loadMore,
  hasNextPage,
  loading,
  isDarkMode,
}: ItemGridProps) {
  const [quantities, setQuantities] = useState<Quantities>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const { ref, inView } = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (inView && hasNextPage && !loading) {
      loadMore();
    }
  }, [inView, hasNextPage, loading, loadMore]);

  const handleQuantityChange = (
    itemId: string | number,
    newQuantity: number
  ) => {
    setQuantities((prev) => ({
      ...prev,
      [itemId]: Math.max(0, newQuantity), // Ensure quantity doesn't go below 0
    }));
  };

  const handleCardClick = (item: Item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const currentModalQuantity = selectedItem
    ? quantities[selectedItem.id] || 0
    : 0;

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.isArray(items) &&
          items.map((item) => {
            const quantity = quantities[item.id] || 0;
            return (
              <ItemCard
                key={item.id}
                item={item}
                quantity={quantity}
                onQuantityChange={handleQuantityChange}
                onCardClick={handleCardClick}
                isDarkMode={isDarkMode}
              />
            );
          })}
      </div>

      <div ref={ref} className="col-span-full mt-6 h-1">
        {hasNextPage && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <GridSkeleton />
          </div>
        )}
      </div>

      {isModalOpen && selectedItem && (
        <CardModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          item={selectedItem}
          quantity={currentModalQuantity}
          onQuantityChange={(newQuantity) =>
            handleQuantityChange(selectedItem.id, newQuantity)
          }
          isDarkMode={isDarkMode}
        />
      )}
    </>
  );
}
