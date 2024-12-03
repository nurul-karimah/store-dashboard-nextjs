'use client'
import { useState, useEffect, useCallback } from "react";
import getItems from "@/actions/get-items"; // untuk mencari produk berdasarkan kata kunci
import getBanner from "@/actions/get-banner"; // untuk mendapatkan banner
import getProducts from "@/actions/get-products"; // untuk mendapatkan produk unggulan
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";
import SearchButton from "@/components/ui/search-button";
import Banner from "@/components/banner";
import NoResults from "@/components/ui/no-results"; // Pastikan NoResults ada
import { Product } from "@/types";

const HomePage = () => {
  const [search, setSearch] = useState(""); // State untuk input pencarian
  const [debouncedSearch, setDebouncedSearch] = useState(""); // State untuk pencarian setelah debounce
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]); // Produk unggulan
  const [allProducts, setAllProducts] = useState<Product[]>([]); // Semua produk
  const [searchResults, setSearchResults] = useState<Product[]>([]); // Hasil pencarian produk
  const [banner, setBanner] = useState<any>(null); // State untuk banner
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

  // Fungsi untuk memuat produk unggulan
  const loadFeaturedProducts = useCallback(async () => {
    try {
      const fetchedProducts = await getProducts({ isFeatured: true });
      const fetchAllProducts = await getItems({});
      setFeaturedProducts(fetchedProducts);
      setAllProducts(fetchAllProducts);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  }, []);
  
  // Fungsi untuk memuat banner
  const loadBanner = useCallback(async () => {
    const fetchedBanner = await getBanner("ba568ea9-fcdd-49a2-89f1-f9a3d87c4f36");
    setBanner(fetchedBanner);
  }, []);

  // Debouncing input pencarian
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

  // Panggil loadFeaturedProducts dan loadBanner saat pertama kali halaman dimuat
  useEffect(() => {
    loadFeaturedProducts();
    loadBanner();
  }, [loadFeaturedProducts, loadBanner]);

  return (
    <Container>
      <div className="space-y-10 pb-10">
        {/* Menampilkan komponen pencarian */}
        <SearchButton
          search={search}
          onSearchChange={(value) => setSearch(value)}
        />
        {/* Tampilkan banner jika tidak ada pencarian */}
        {!debouncedSearch && banner ? (
          <Banner data={banner} />
        ) : null}

        {/* Menampilkan loading saat data sedang dimuat */}
        {loading ? (
          <div className="loading-container flex items-center justify-center">
            <div className="loading-spinner"></div>
          </div>
        ) : (
          <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
            {/* Jika ada pencarian, tampilkan hasil pencarian */}
            {debouncedSearch ? (
              <ProductList title="Hasil Pencarian" items={searchResults} />
            ) : (
              <>
                {featuredProducts.length > 0 && allProducts.length > 0 ? (
                  <>
                    <ProductList title="Produk Unggulan" items={featuredProducts} />
                    <ProductList title="Semua Produk" items={allProducts} />
                  </>
                ) : (
                  <NoResults />
                )}
              </>
            )}
          </div>
        )}
      </div>
    </Container>
  );
};

export default HomePage;
