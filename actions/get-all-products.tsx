import { Product } from "@/types";

const URL = `${process.env.PUBLIC_API_URL}/items`

const getAllProducts = async (): Promise<Product[]> => {
  const url = URL;
  
  const res = await fetch(url);

  return res.json();
};

export default getAllProducts;
