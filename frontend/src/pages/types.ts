// src/pages/types.ts

export type ItemCategory = "BREAKFAST" | "DRINK" | "SOUP" | "SUSHI" | "OTHER";

export interface Item {
    id: string | number;
    name: string;
    description: string;
    imageUrl: string;
    category: ItemCategory;
    calories: number;
    isBestSeller: boolean;
    price: number;
}

export type CategoryCounts = {
    [key in ItemCategory]?: number;
};

export interface ApiItemResponse {
    content: Item[];
    last: boolean;
    totalPages: number;
    totalElements: number;
    number: number;
}

export interface ApiResponse {
    items: ApiItemResponse;
    counts: CategoryCounts;
}
export interface Location {
    latitude: number;
    longitude: number;
    imageUrl: string;
    restaurantName: string;
}