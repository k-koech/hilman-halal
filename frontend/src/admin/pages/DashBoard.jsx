import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import FormatDate from '../../components/utils/FormatDate'
import { FaRegTrashAlt } from 'react-icons/fa'
import { OrderContext } from '../../context/OrderContext'
import { ProductContext } from '../../context/ProductContext'
import AdminOrders from "../pages/AdminOrders"

export default function DashBoard() 
{
    const [email, setEmail] = useState()

  const {registerStaff, usersData, deleteUser} = useContext(AuthContext)
  const {all_orders, fetchAllOrders} = useContext(OrderContext)
  const {products, categories,fetchProducts, fetchCategories} = useContext(ProductContext)

  useEffect(() => {
    fetchAllOrders();
    fetchProducts(); 
    fetchCategories();
}, []);

  console.log(all_orders);
  

  const [activeTab, setActiveTab] = useState("overview");

  // Mock data (replace with API data in real projects)
  const cartItems = 8;

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      {/* Header */}
      <header className="bg-white shadow p-4 mb-5 rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
      </header>

      {/* Overview Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <Card title="Total Orders" value={all_orders && all_orders.length} color="bg-blue-500" />
        <Card title="Total Products" value={products && products.length} color="bg-green-500" />
        <Card title="Total Categories" value={categories && categories.length} color="bg-yellow-500" />
        <Card title="Cart Items" value={cartItems} color="bg-red-500" />
      </section>

      <AdminOrders />

      {/* Tabs Navigation
      <nav className="flex space-x-4 bg-white shadow p-4 rounded-lg mb-8">
        {["overview", "orders", "products", "categories", "cart"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded ${
              activeTab === tab ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </nav> */}

      {/* Active Tab Content */}
      {/* <main>
        {activeTab === "overview" && <Overview />}
        {activeTab === "orders" && <Orders />}
        {activeTab === "products" && <Products />}
        {activeTab === "categories" && <Categories />}
        {activeTab === "cart" && <Cart />}
      </main> */}
    </div>
  );
};

// Reusable Card Component
const Card = ({ title, value, color }) => (
  <div className={`${color} text-white p-5 rounded-lg shadow-lg`}>
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-3xl font-bold">{value}</p>
  </div>
);



// const Overview = () => (
//   <div className="bg-white p-5 rounded-lg shadow-lg">
//     <h2 className="text-xl font-bold mb-4">Overview</h2>
//     <p>Welcome to the dashboard! Use the tabs above to manage your data.</p>
//   </div>
// );


// const Orders = () => (
//   <div className="bg-white p-5 rounded-lg shadow-lg">
//     <h2 className="text-xl font-bold mb-4">Orders</h2>
//     <p>Here you can manage orders. (e.g., place, cancel, and fetch orders)</p>
//   </div>
// );


// const Products = () => (
//   <div className="bg-white p-5 rounded-lg shadow-lg">
//     <h2 className="text-xl font-bold mb-4">Products</h2>
//     <p>Here you can manage products. (e.g., create, update, delete products)</p>
//   </div>
// );


// const Categories = () => (
//   <div className="bg-white p-5 rounded-lg shadow-lg">
//     <h2 className="text-xl font-bold mb-4">Categories</h2>
//     <p>Here you can manage categories. (e.g., create, update, delete categories)</p>
//   </div>
// );


// const Cart = () => (
//   <div className="bg-white p-5 rounded-lg shadow-lg">
//     <h2 className="text-xl font-bold mb-4">Cart</h2>
//     <p>Here you can manage cart items. (e.g., add, update, remove items)</p>
//   </div>
// );
