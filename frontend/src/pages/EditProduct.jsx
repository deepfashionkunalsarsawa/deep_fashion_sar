import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const ADMIN_PATH = import.meta.env.VITE_ADMIN_SECRET_PATH;

  const [form, setForm] = useState({});
  const [newImages, setNewImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await API.get(`/products/${id}`);
      setForm(res.data);
      setExistingImages(res.data.images || []);
    } catch (error) {
      alert("Failed to load product");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDeleteImage = async (imageId) => {
    if (!window.confirm("Delete this image?")) return;

    try {
      await API.delete(`/${ADMIN_PATH}/delete-product-image/${imageId}`);
      setExistingImages(
        existingImages.filter((img) => img.id !== imageId)
      );
    } catch (error) {
      alert("Failed to delete image");
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("category", form.category);
    formData.append("occasion", form.occasion);
    formData.append("fabric", form.fabric);
    formData.append("care_instruction", form.care_instruction);
    formData.append("stock", form.stock);
    formData.append("is_featured", form.is_featured || false);

    for (let i = 0; i < newImages.length; i++) {
      formData.append("images", newImages[i]);
    }

    try {
      setLoading(true);

      await API.put(`/${ADMIN_PATH}/update-product/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Product updated successfully ✅");
      navigate(`/${ADMIN_PATH}/dashboard`);
    } catch (error) {
      alert("Update failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-10 bg-soft">
      <h2 className="text-2xl font-bold text-primary mb-6">
        Edit Product
      </h2>

      <div className="space-y-4 max-w-lg">

        {/* Existing Images */}
        <div>
          <p className="font-semibold mb-2">Current Images:</p>
          <div className="flex gap-3 flex-wrap">
            {existingImages.map((img) => (
              <div key={img.id} className="relative">
                <img
                  src={img.image_url}
                  className="w-24 h-24 object-cover rounded-lg border"
                />
                <button
                  onClick={() => handleDeleteImage(img.id)}
                  className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-2 text-xs"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Upload New Images */}
        <input
          type="file"
          multiple
          onChange={(e) => setNewImages(e.target.files)}
        />

        {/* Inputs */}
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

        <textarea
          name="description"
          value={form.description || ""}
          placeholder="Description"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="occasion"
          value={form.occasion || ""}
          placeholder="Occasion"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="fabric"
          value={form.fabric || ""}
          placeholder="Fabric"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="care_instruction"
          value={form.care_instruction || ""}
          placeholder="Care Instruction"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="stock"
          type="number"
          value={form.stock || ""}
          placeholder="Stock"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-2 rounded text-white bg-primary hover:opacity-90"
        >
          {loading ? "Updating..." : "Update Product"}
        </button>

      </div>
    </div>
  );
}