"use client";

import { Checkbox } from "@headlessui/react";
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

interface FavoriteButtonProps {
  data: any; // seluruh data produk
}

export default function FavoriteButton({ data }: FavoriteButtonProps) {
  const [enabled, setEnabled] = useState(false);

  // Periksa apakah data sudah ada di localStorage saat komponen dirender
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const isFavorite = favorites.some((item: any) => item.id === data.id);
    setEnabled(isFavorite);
  }, [data]);

  const handleChange = (checked: boolean) => {
    setEnabled(checked);

    // Ambil daftar produk favorit dari localStorage
    let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    if (checked) {
      // Tambahkan data produk ke dalam daftar favorit jika belum ada
      const exists = favorites.some((item: any) => item.id === data.id);
      if (!exists) {
        favorites.push(data);
      }
    } else {
      // Hapus data produk dari daftar favorit jika ada
      favorites = favorites.filter((item: any) => item.id !== data.id);
    }

    // Simpan kembali daftar favorit ke localStorage
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  return (
    <Checkbox
      checked={enabled}
      onChange={handleChange}
      className="group relative flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 transition-colors bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      title="Tambahkan ke favorit"
    >
      <Heart
        className={`w-6 h-6 transition-transform ${
          enabled ? "fill-red-500 stroke-red-500 scale-110" : "stroke-gray-500"
        }`}
        fill={enabled ? "red" : "none"}
      />
    </Checkbox>
  );
}
