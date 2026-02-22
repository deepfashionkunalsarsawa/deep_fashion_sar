// import API from "./api";

// export const getProducts = async () => {
//   const res = await API.get("/products");
//   return res.data;
// };

// export const getProductById = async (id) => {
//   const res = await API.get(`/products/${id}`);
//   return res.data;
// };
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const getProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      images:product_images(*)
    `);

  if (error) {
    console.error("Supabase error:", error);
    throw error;
  }

  return data;
};

export const getProductById = async (id) => {
  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      images:product_images(*)
    `)
    .eq("id", id)
    .single();

  if (error) {
    console.error("Supabase error:", error);
    throw error;
  }

  return data;
};