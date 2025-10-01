import { apiFetch } from "@/api/apiClient";
import { ENDPOINT } from "@/constants/endpoints";
import { GalleryItem } from "@/types/galleryTypes";

// Get all gallery
export const fetchAllGalleryItems = async (): Promise<GalleryItem[]> => {
    return apiFetch<GalleryItem[]>(ENDPOINT.Get_All_Gallery);
};

// Get one item by ID
export const fetchGalleryItemById = async (id: string): Promise<GalleryItem> => {
    const endpoint = ENDPOINT.Get_One_By_Id.replace(":id", id);
    return apiFetch<GalleryItem>(endpoint);
};