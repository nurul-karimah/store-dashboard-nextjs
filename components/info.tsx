"use client";

import { Product } from "@/types";
import Currency from "./ui/currency";
import { Button } from "./ui/button";
import { MessageCircleIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import FavoriteButton from "./ui/favorite-button";
import { usePathname } from "next/navigation";
import usePreviewModal from "@/hooks/use-preview-modal";

interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const URL = `${window.location.origin}/product/${data.id}`;
  const telp = process.env.NEXT_PUBLIC_TELP;
  const pesan = `Halo saya ingin membeli ${data.name} - ${data.price} dengan link: ${URL}`;
  const link = `https://wa.me/${telp}?text=${pesan}`;

  // State untuk accordion
  const [openSection, setOpenSection] = useState<string | null>(null);
  const toggleSection = (section: string) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };
  const previewModal = usePreviewModal();
  return (
    <div className="flex flex-col h-96 w-full">
      {/* Nama dan Harga Produk */}
      <h1 className="lg:text-3xl font-bold text-gray-900">{data.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <p className="lg:text-2xl text-gray-900">
          <Currency value={data?.price} />
        </p>
        <p className="text-gray-500">{data?.category?.name}</p>
      </div>
      <hr className="my-4" />
      {/* Tombol Chat dan Favorite */}
      <div className="mb-5 flex items-center gap-x-3 justify-between">
        <Link href={link} target="_blank">
          <Button className="flex items-center gap-x-2">
            Chat
            <MessageCircleIcon size={20} />
          </Button>
        </Link>
        <FavoriteButton data={data} />
      </div>
{/* Accordion Sections */}
<div className={`space-y-4 overflow-y-auto ${previewModal.isOpen ? "lg:overflow-y-auto" : "lg:overflow-y-visible"}`}>
  {/* Description */}
  <div className="border rounded-md">
    <button
      className="w-full text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 transition flex justify-between items-center"
      onClick={() => toggleSection("description")}
    >
      <span className="font-medium text-gray-700">Deskripsi</span>
      <span>{openSection === "description" ? "-" : "+"}</span>
    </button>
    {openSection === "description" && (
      <div className="px-4 py-2 text-sm text-gray-500">
        {data?.description || "Deskripsi tidak tersedia."}
      </div>
    )}
  </div>

  {/* Benefits */}
  <div className="border rounded-md">
    <button
      className="w-full text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 transition flex justify-between items-center"
      onClick={() => toggleSection("benefits")}
    >
      <span className="font-medium text-gray-700">Keuntungan</span>
      <span>{openSection === "benefits" ? "-" : "+"}</span>
    </button>
    {openSection === "benefits" && (
      <div className="px-4 py-2 text-sm text-gray-500">
        {data?.benefits || "Keuntungan tidak tersedia."}
      </div>
    )}
  </div>

  {/* Usage */}
  <div className="border rounded-md">
    <button
      className="w-full text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 transition flex justify-between items-center"
      onClick={() => toggleSection("usage")}
    >
      <span className="font-medium text-gray-700">Cara Penggunaan</span>
      <span>{openSection === "usage" ? "-" : "+"}</span>
    </button>
    {openSection === "usage" && (
      <div
        className="px-4 py-2 text-sm text-gray-500"
        dangerouslySetInnerHTML={{ __html: data?.usage || "Informasi penggunaan tidak tersedia." }}
      />
    )}
  </div>
</div>


    </div>
  );
};

export default Info;
