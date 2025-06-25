"use client";
import { ProductType } from "@/helpers/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProductCard({ product }: { product: ProductType }) {
  //   console.log(product, "...product");
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
    images: product.images,
  });

  const handleDelete = async () => {
    const confirmed = confirm(
      `Apakah anda ingin menghapus produk ${product.name} ?`
    );
    if (!confirmed) return;

    try {
      console.log(product._id, ">>>productCard");
      const res = await fetch(`api/products/${product._id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to delete product");
      }

      alert("Product Delete Successfully");
      router.push('/products');
    } catch (error: any) {
      console.log(error);
      alert(error.message || "Failed to delete product.");
    }
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`api/products/${product._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update product");
      }

      alert("Product updated successfully");
      setOpenModal(false);
      router.push('/products');
    } catch (error: any) {
      alert(error.message || "Failed to update product");
    }
  };

  return (
    <>
      <div className="p-4 w-auto rounded-lg bg-orange-50 m-4">
        <div className="relative pb-2">
          <img
            className="w-full h-64 object-cover cursor-pointer rounded-lg"
            src={product.images}
            alt={product.name}
          />
          <hr className="py-2" />
          <h3 className="text-gray-800 text-lg font-semibold hover:underline">
            {product.name}
          </h3>
          <h6 className="">{product.description}</h6>
          <h3>Rp. {product.price}</h3>
          <div className="flex justify-between px-12 py-1 mt-2 bg-amber-100">
            <button
              onClick={handleDelete}
              className="bg-red-700 text-white rounded p-1"
            >
              Hapus
            </button>
            <button
              onClick={() => setOpenModal(true)}
              className="bg-blue-500 rounded p-1"
            >
              Ubah
            </button>
          </div>
        </div>
      </div>

      {openModal && (
        <div className="fixed inset-0 bg-amber-200/45 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 relative shadow-lg">
            <h2 className="text-xl font-bold mb-4">Ubah Produk</h2>
            <form onSubmit={handleUpdate} className="space-y-3">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full rounded border p-2"
              />
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border p-2 rounded"
                ></textarea>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: +e.target.value })}
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                value={formData.images}
                onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                className="w-full border p-2 rounded"
              />
              <div className="flex justify-between mt-4">
                <button onClick={() =>  setOpenModal(false)} className="bg-gray-300 px-3 py-1">Batal</button>
                <button type="submit" className="bg-green-500 text-white px-4 py-1 rounded">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
