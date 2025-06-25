"use client";
import ProductCard from "@/components/ProductCard";
import { ProductType } from "@/helpers/types";
import React, { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    images: "",
  });
  async function fetchProducts() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
          cache: 'no-store'
        }
      );

      if (!res.ok) {
        throw new Error("failed to fetch products");
      }
      const response: ProductType[] = await res.json();
      setProducts(response);
      // console.log(response, '>>>response');
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchProducts();
  }, []);
  // console.log(products, '>>>products');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/products`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            price: formData.price,
          }),
        }
      );
      if (!res.ok) throw new Error("Failed to Add Product");
      setShowModal(false);
      setFormData({ name: "", description: "", price: "", images: "" });
      fetchProducts();
    } catch (error) {
      console.log(error);
      alert("Failed to add product");
    }
  };

  return (
    <>
      <div className="bg-emerald-100 min-h-screen p-4">
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 rounded p-2 mt-1 ml-2"
        >
          Tambah Produk Baru
        </button>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1">
          {products.map((product, i) => (
            <ProductCard key={i} product={product} />
          ))}
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-emerald-300/75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2>Tambah Produk Baru</h2>
            <form onSubmit={handleAddProduct} className="space-y-3">
              <input
                type="text"
                name="name"
                placeholder="Nama Produk"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="description"
                placeholder="Keterangan"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="number"
                name="price"
                placeholder="Harga"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="images"
                placeholder="Link Gambar"
                value={formData.images}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              />
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-200 text-black px-4 py-2 rounded"
                >
                    Batal
                </button>
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                    Tambah Produk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
