import { Product } from "@/types";

import qs from "query-string";

const URL = `http://localhost:3000/api/c2752ab2-c6ea-4018-bf25-dc0f59eb1687/items`;

interface Query {
  categoryId?: string;
  isFeatured?: boolean;
}

const getAllProducts = async (): Promise<Product[]> => {
  const url = URL;
  
  const res = await fetch(url);

  return res.json();
};

export default getAllProducts;
