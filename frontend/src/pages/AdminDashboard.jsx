import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const ADMIN_PATH = import.meta.env.VITE_ADMIN_SECRET_PATH;

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (error) {
      alert("Failed to load products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      await API.delete(`/${ADMIN_PATH}/delete-product/${id}`);
      fetchProducts();
    } catch (error) {
      alert("Delete failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate(`/${ADMIN_PATH}/login`);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-6">
        <h2 className="text-2xl font-bold text-primary mb-8">
          Deep Fashion Admin
        </h2>

        <div className="space-y-4">
          <button
            onClick={() => navigate(`/${ADMIN_PATH}/dashboard`)}
            className="w-full text-left px-4 py-2 rounded hover:bg-gray-100"
          >
            Dashboard
          </button>

          <button
            onClick={() => navigate(`/${ADMIN_PATH}/add-product`)}
            className="w-full text-left px-4 py-2 rounded hover:bg-gray-100"
          >
            Add Product
          </button>
        </div>

        <button
          onClick={handleLogout}
          className="mt-10 w-full bg-red-500 text-white py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-500">
            Total Products: {products.length}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Stock</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t">

                  <td className="p-3">{product.id}</td>

                  <td className="p-3">
                    <img
                      src={product.images?.[0]?.image_url}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>

                  <td className="p-3">{product.name}</td>
                  <td className="p-3">₹ {product.price}</td>
                  <td className="p-3">{product.category}</td>
                  <td className="p-3">{product.stock}</td>

                  <td className="p-3 space-x-2">
                    <button
                      onClick={() =>
                        navigate(`/${ADMIN_PATH}/edit-product/${product.id}`)
                      }
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>

          {products.length === 0 && (
            <p className="text-center text-gray-500 mt-6">
              No products available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}