import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../context/ProductContext";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import configData from "../../config.json";
const  SERVER_URL = configData.SERVER_URL;

export default function AdminProducts() {
  const {
    products,
    categories,
    fetchProducts,
    fetchCategories,
    createProduct,
    updateProduct,
    deleteProduct,
  } = useContext(ProductContext);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    image: null,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [filterCategory, setFilterCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  console.log("csd fzds ", products);
  

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("stock", product.stock);
    formData.append("category_id", product.category);

    console.log("Category ", product.category);
    
    if (product.image) formData.append("image", product.image);

    if (isEditing) {
      updateProduct(editId, formData);
    } else {
      createProduct(formData);
    }

    // setProduct({
    //   name: "",
    //   description: "",
    //   price: "",
    //   stock: "",
    //   category: "",
    //   image: null,
    // });
    setIsEditing(false);
  };

  // Filtered and paginated data
  const filteredProducts = products.filter(
    (prod) =>
      (!filterCategory || prod.category?.id === parseInt(filterCategory)) &&
      (prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.category?.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className=" md:max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Manage Products</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-6 py-4 mb-8"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={product.name}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
          />
          <textarea
            name="description"
            placeholder="Product Description"
            value={product.description}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={product.stock}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
          />
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <input
            type="file"
            onChange={handleFileChange}
            className="border rounded px-3 py-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-[#4BAF47] hover:bg-[#59d055] text-white px-4 py-2 rounded"
        >
          {isEditing ? "Update" : "Create"}
        </button>
      </form>

      {/* Filters */}
      {/* <div className="flex items-center gap-4 mb-6">
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="">Filter by Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search by Name or Category"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded px-3 py-2 flex-1"
        />
      </div> */}

      {/* Table */}
      <div className="min-h-[50vh] sm:w-full w-[92vw] mx-auto">
      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">No products available</p>
      ) : (
        <div className="overflow-x-auto">
        <table className="w-full border rounded-lg overflow-hidden shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2">Image</th>
              <th className="text-left px-4 py-2">Name</th>
              <th className="text-left px-4 py-2">Category</th>
              <th className="text-left px-4 py-2">Description</th>
              <th className="text-center px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedProducts.map((prod) => (
              <tr key={prod.id} className="border-t">
                <td className="px-4 py-2">
                  {prod.image ? (
                    <img
                      src={SERVER_URL + prod.image}
                      alt={prod.name}
                      className="h-12 w-12 object-cover rounded"
                    />
                  ) : (
                    <div className="h-12 w-12 bg-gray-200 rounded"></div>
                  )}
                </td>
                <td className="px-4 py-2">{prod.name}</td>
                <td className="px-4 py-2">{prod.category?.name || "None"}</td>
                <td className="px-4 py-2">{prod.description}</td>
                <td className="px-4 flex justify-between py-2 text-center">
                  <button
                    onClick={() => {
                      setProduct({
                        name: prod.name,
                        description: prod.description,
                        price: prod.price,
                        stock: prod.stock,
                        category: prod.category?.id || "",
                        image: null,
                      });
                      setIsEditing(true);
                      setEditId(prod.id);
                    }}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => deleteProduct(prod.id)}
                    className="text-red-600 hover:text-red-800 ml-2"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
      </div>

      {/* Pagination */}
        <div className="flex justify-center mt-6">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 mx-1 rounded ${
                currentPage === i + 1
                  ? "bg-[#4BAF47] text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
    </div>
  );
}
