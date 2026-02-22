import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const ADMIN_PATH = import.meta.env.VITE_ADMIN_SECRET_PATH;

  const [form, setForm] = useState({});
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await API.get(`/products/${id}`);
      setForm(res.data);
    } catch (error) {
      alert("Failed to load product");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    for (let key in form) {
      formData.append(key, form[key]);
    }

    if (image) {
      formData.append("image", image);
    }

    try {
      await API.put(`/${ADMIN_PATH}/update-product/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Product updated");
      navigate(`/${ADMIN_PATH}/dashboard`);
    } catch (error) {
      alert("Update failed");
    }
  };

  return (
    <div className="min-h-screen p-10 bg-soft">
      <h2 className="text-2xl font-bold text-primary mb-6">
        Edit Product
      </h2>

      <div className="space-y-4 max-w-md">

        <input
          name="name"
          value={form.name || ""}
          placeholder="Product Name"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="price"
          type="number"
          value={form.price || ""}
          placeholder="Price"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="category"
          value={form.category || ""}
          placeholder="Category"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="description"
          value={form.description || ""}
          placeholder="Description"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="occasion"
          value={form.occation || ""}
          placeholder="Occasion"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="fabric"
          value={form.fabric || ""}
          placeholder="fabric"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="care_instruction"
          value={form.care_instruction || ""}
          placeholder="care_instruction"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="stock"
          type="number"
          value={form.stock || ""}
          placeholder="stock"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button
          onClick={handleSubmit}
          className="bg-primary text-white px-4 py-2 rounded"
        >
          Update Product
        </button>

      </div>
    </div>
  );
}