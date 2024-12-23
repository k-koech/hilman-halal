import React, { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import configData from "../config.json";
import { AuthContext } from "./AuthContext";
const  SERVER_URL = configData.SERVER_URL;


export const ProductContext = createContext();

const ProductProvider = ({ children }) => 
{
  const {authToken} = useContext(AuthContext)
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [onDataChange, setOnDataChange] = useState(false);

  // Fetch all categories
  const fetchCategories = () => {
    fetch(`${SERVER_URL}/categories/`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => toast.error("Failed to load categories!"));
  };

  
  // Create a category
  const createCategory = (name, description) => {
    fetch(`${SERVER_URL}/categories/create/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          toast.success("Category created successfully!");
          fetchCategories();
        } else {
          toast.error(response.error || "Failed to create category!");
        }
      });
  };

  // Update a category
  const updateCategory = (id, name, description) => {
    fetch(`${SERVER_URL}/categories/${id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          toast.success("Category updated successfully!");
          fetchCategories();
        } else {
          toast.error(response.error || "Failed to update category!");
        }
      });
  };

  // Delete a category
  const deleteCategory = (id) => {
    fetch(`${SERVER_URL}/categories/${id}/`, { method: "DELETE" })
      .then((res) => {
        if (res.ok) {
          toast.success("Category deleted successfully!");
          fetchCategories();
        } else {
          toast.error("Failed to delete category!");
        }
      });
  };

  // Fetch all products
  const fetchProducts = () => {
    fetch(`${SERVER_URL}/products/`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => toast.error("Failed to load products!"));
  };

  // Create a product
  const createProduct = (product) => {
    fetch(`${SERVER_URL}/products/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`
      },
      body: JSON.stringify( product ),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          toast.success("Product created successfully!");
          fetchProducts();
        } else {
          toast.error(response.error || "Failed to create product!");
        }
      });
  };

  // Update a product
  const updateProduct = (id, product) => {
    fetch(`${SERVER_URL}/products/${id}/`, {
      method: "PUT",
      body: product,
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          toast.success("Product updated successfully!");
          fetchProducts();
        } else {
          toast.error(response.error || "Failed to update product!");
        }
      });
  };

  // Delete a product
  const deleteProduct = (id) => {
    fetch(`${SERVER_URL}/products/${id}/`, { method: "DELETE" })
      .then((res) => {
        if (res.ok) {
          toast.success("Product deleted successfully!");
          fetchProducts();
        } else {
          toast.error("Failed to delete product!");
        }
      });
  };


  // CART
  const [cart, setCart] = useState({
    items: [],
    totalCost: 0, // Initialize the total cost to 0
    address_id: null
  });
    
  // Function to add a product to the cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.items.findIndex(
        (item) => item.id === product.id
      );
  
      let updatedItems;
      let newTotalCost = prevCart.totalCost;
  
      if (existingProductIndex === -1) {
        // Add new product
        updatedItems = [...prevCart.items, { ...product, quantity: 1 }];
        newTotalCost += parseFloat(product.price);
      } else {
        // Update quantity for existing product
        updatedItems = [...prevCart.items];
        updatedItems[existingProductIndex].quantity += 1;
        newTotalCost += parseFloat(product.price);
      }
  
      return {
        items: updatedItems,
        totalCost: newTotalCost,
      };
    });
  };
  
// Function to update the quantity of a product in the cart
const updateCartQuantity = (productId, quantityChange) => {
  setCart((prevCart) => {
    // Update quantities and remove items with quantity 0
    const updatedItems = prevCart.items
      .map((product) => {
        if (product.id === productId) {
          const newQuantity = product.quantity + quantityChange;
          return { ...product, quantity: Math.max(newQuantity, 0) }; // Ensure quantity is not negative
        }
        return product;
      })
      .filter((product) => product.quantity > 0); // Remove items with quantity 0

    // Recalculate the total cost
    const newTotalCost = updatedItems.reduce(
      (total, item) => total + item.quantity * parseFloat(item.price),
      0
    );

    return {
      items: updatedItems,
      totalCost: newTotalCost,
    };
  });
};

// Function to remove a product from the cart
const removeFromCart = (productId) => {
  setCart((prevCart) => {
    const updatedItems = prevCart.items.filter((product) => product.id !== productId);

    const newTotalCost = updatedItems.reduce(
      (total, item) => total + item.quantity * parseFloat(item.price),
      0
    );

    return {
      items: updatedItems,
      totalCost: newTotalCost,
    };
  });
};

  const contextData ={
    categories,
    products,
    fetchCategories,
    fetchProducts,
    createCategory,
    updateCategory,
    deleteCategory,
    createProduct,
    updateProduct,
    deleteProduct,
    onDataChange,
    setOnDataChange,
 
    cart,
    setCart,
    addToCart,
    updateCartQuantity, 
    removeFromCart,
  }

  return (
    <ProductContext.Provider
      value={contextData}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
