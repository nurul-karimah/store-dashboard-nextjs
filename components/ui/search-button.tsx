import React from "react";

interface SearchButtonProps {
  search: string; // Nilai pencarian dari luar
  onSearchChange: (value: string) => void; // Fungsi untuk menangani perubahan input
  placeholder?: string; // Placeholder opsional
  className?: string; // Untuk menyesuaikan gaya input
}

const SearchButton: React.FC<SearchButtonProps> = ({
  search,
  onSearchChange,
  placeholder = "Cari...",
  className = "",
}) => {
  return (
    <div className="flex justify-center my-4">
      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={placeholder}
        className={`border p-2 rounded-md w-1/2 ${className}`}
      />
    </div>
  );
};

export default SearchButton;
