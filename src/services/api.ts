
export const apiUrl = "https://dummyjson.com/products";  // API base URL

export const fetchProducts = async (endpoint: string) => {
  try {
    const response = await fetch(`${apiUrl}${endpoint}`); // Use apiUrl + endpoint
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error; 
  }
};


