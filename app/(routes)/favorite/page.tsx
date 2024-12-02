"use client";

import { Product } from "@/types";
import { useState, useEffect } from "react";
import ProductList from "@/components/product-list";
import NoResults from "@/components/ui/no-results";

export default function Favorite() {
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);

  // Mengambil produk favorit dari localStorage saat komponen dimuat
  useEffect(() => {
    const fetchFavoriteProducts = () => {
      // Ambil data produk favorit dari localStorage
      const savedFavorites = localStorage.getItem("favorites");

      // Jika ada produk favorit yang disimpan
      if (savedFavorites) {
        // Parse data JSON favorit menjadi array
        const parsedFavorites: Product[] = JSON.parse(savedFavorites);

        // Update state dengan produk favorit yang diambil
        setFavoriteProducts(parsedFavorites);
      }
    };

    fetchFavoriteProducts();
  }, []);

  return (
    <div className="space-y-4 p-9">
      {/* Tampilkan produk favorit, atau pesan jika tidak ada produk favorit */}
      {favoriteProducts.length > 0 ? (
        <ProductList title="Produk Favorit" items={favoriteProducts} />
      ) : (
        <NoResults /> // Menampilkan pesan jika tidak ada produk favorit
      )}
    </div>
  );
}
