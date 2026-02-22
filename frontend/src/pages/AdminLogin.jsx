import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const ADMIN_PATH = import.meta.env.VITE_ADMIN_SECRET_PATH;

  const handleLogin = async () => {
    const formData = new URLSearchParams();
    formData.append("username", email);
    formData.append("password", password);

    try {
      const res = await API.post(`/${ADMIN_PATH}/login`, formData);

      localStorage.setItem("token", res.data.access_token);

      navigate(`/${ADMIN_PATH}/dashboard`); // redirect using secret path
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-soft">
      <div className="bg-white p-8 rounded-xl shadow-md w-80 space-y-4">
        <h2 className="text-2xl font-bold text-primary text-center">
          Admin Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-primary text-white py-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}