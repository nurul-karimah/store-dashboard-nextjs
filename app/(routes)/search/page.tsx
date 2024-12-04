'use client'
import { useState, useEffect, useCallback } from "react";
import getItems from "@/actions/get-items"; // untuk mencari produk berdasarkan kata kunci
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";
import SearchButton from "@/components/ui/search-button";
import NoResults from "@/components/ui/no-results"; // Pastikan NoResults ada
import { Product } from "@/types";

const SearchPage = () => {
  const [search, setSearch] = useState(""); // State untuk input pencarian
  const [debouncedSearch, setDebouncedSearch] = useState(""); // State untuk pencarian setelah debounce
  const [searchResults, setSearchResults] = useState<Product[]>([]); // Hasil pencarian produk
  const [loading, setLoading] = useState(false); // Loading state

  // Fungsi untuk memuat produk berdasarkan pencarian
  const loadProducts = useCallback(async () => {
    if (debouncedSearch.trim() === "") {
      setSearchResults([]); // Kosongkan hasil pencarian jika tidak ada pencarian
      return;
    }

    setLoading(true);
    try {
      const fetchedProducts = await getItems({ search: debouncedSearch });
      setSearchResults(fetchedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search); // Update debouncedSearch setelah delay
    }, 500); // 500ms delay

    return () => clearTimeout(timer); // Bersihkan timer jika search berubah
  }, [search]);

  // Panggil loadProducts setelah debouncedSearch berubah
  useEffect(() => {
    loadProducts();
  }, [debouncedSearch, loadProducts]);

  return (
    <Container>
      <div className="space-y-10 pb-10">
        {/* Menampilkan komponen pencarian */}
        <SearchButton search={search} onSearchChange={setSearch} />

        {/* Menampilkan loading saat data sedang dimuat */}
        {loading ? (
          <div className="loading-container flex items-center justify-center">
            <div className="loading-spinner"></div>
          </div>
        ) : (
          <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
            {/* Menampilkan hasil pencarian */}
            {debouncedSearch ? (
              <ProductList title="Hasil Pencarian" items={searchResults} />
            ) : (
              <NoResults />
            )}

          </div>
        )}
      </div>
    </Container>
  );
};

export default SearchPage;
