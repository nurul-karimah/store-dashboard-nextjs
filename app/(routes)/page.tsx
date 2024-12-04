import getAllProducts from "@/actions/get-all-products";
import getBanner from "@/actions/get-banner";
import getProducts from "@/actions/get-products";
import Banner from "@/components/banner";
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";

export const revalidate = 0;

const HomePage = async () => {
  const products = await getProducts({ isFeatured: true });
  const allProducts = await getAllProducts();
  const banner = await getBanner("ba568ea9-fcdd-49a2-89f1-f9a3d87c4f36");
  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Banner data={banner} />
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title="Produk Unggulan" items={products} />
          <ProductList title="Semua Produk" items={allProducts} />
        </div>
      </div>
    </Container>
  );
};

export default HomePage;