export const fetchProducts = async () => {
  try {
    const response = await fetch("https://upload-data-api.vercel.app/api/products");
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error al obtener productos");
    }

    return data;
  } catch (error) {
    console.error("Fetch products error:", error.message);
    throw error;
  }
};