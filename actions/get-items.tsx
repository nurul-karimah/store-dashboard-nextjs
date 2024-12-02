import { Product } from "@/types";
import qs from "query-string";

const URL = `${process.env.PUBLIC_API_URL}/products`;

interface Query {
  categoryId?: string;
  isFeatured?: boolean;
  search?: string; // Menambahkan parameter search
}

const getItems = async (query: Query): Promise<Product[]> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      categoryId: query.categoryId,
      isFeatured: query.isFeatured,
      search: query.search, // Menambahkan parameter search
    },
  });

  const res = await fetch(url);
  return res.json();
};

export default getItems;
