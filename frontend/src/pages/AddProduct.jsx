import { useState } from "react";
import API from "../services/api";

export default function AddProduct() {
  // const [name, setName] = useState("");
  // const [description, setDescription] = useState("");
  // const [price, setPrice] = useState("");
  // const [category, setCategory] = useState("");
  // const [occasion, setOccasion] = useState("");
  // const [image, setImage] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [occasion, setOccasion] = useState("");
  const [fabric, setFabric] = useState("");
  const [careInstruction, setCareInstruction] = useState("");
  const [stock, setStock] = useState(0);
  const [image, setImage] = useState(null);

  const ADMIN_PATH = import.meta.env.VITE_ADMIN_SECRET_PATH;

  // const handleSubmit = async () => {
  //   const formData = new FormData();
  //   formData.append("name", name);
  //   formData.append("description", description);
  //   formData.append("price", price);
  //   formData.append("category", category);
  //   formData.append("occasion", occasion);
  //   formData.append("image", image);

  //   try {
  //     await API.post(`/${ADMIN_PATH}/add-product`, formData, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     });

  //     alert("Product Added Successfully");
  //   } catch (error) {
  //     alert("Error adding product");
  //   }
  // };
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("occasion", occasion);
    formData.append("fabric", fabric);
    formData.append("care_instruction", careInstruction);
    formData.append("stock", stock);
    formData.append("is_featured", false);
    formData.append("image", image);

    try {
      await API.post(`/${ADMIN_PATH}/add-product`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Product Added Successfully");
    } catch (error) {
      console.error(error);
      alert("Error adding product");
    }
  };
  return (
    <div className="min-h-screen p-10 bg-soft">
      <h2 className="text-2xl font-bold text-primary mb-6">
        Add Product
      </h2>

      <div className="space-y-4 max-w-md">

        <input
          type="text"
          placeholder="Product Name"
          className="w-full border p-2 rounded"
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="w-full border p-2 rounded"
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          className="w-full border p-2 rounded"
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="text"
          placeholder="Category"
          className="w-full border p-2 rounded"
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="text"
          placeholder="fabric"
          className="w-full border p-2 rounded"
          onChange={(e) => setFabric(e.target.value)}
        />
        <input
          type="text"
          placeholder="care_instruction"
          className="w-full border p-2 rounded"
          onChange={(e) => setCareInstruction(e.target.value)}
        />

        <input
          type="text"
          placeholder="Occasion"
          className="w-full border p-2 rounded"
          onChange={(e) => setOccasion(e.target.value)}
        />
        <input
          type="number"
          placeholder="stock"
          className="w-full border p-2 rounded"
          onChange={(e) => setStock(e.target.value)}
        />


        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button
          onClick={handleSubmit}
          className="bg-primary text-white px-4 py-2 rounded"
        >
          Upload Product
          {/* {loading ? "Uploading..." : "Upload Product"} */}
        </button>

      </div>
    </div>
  );
}