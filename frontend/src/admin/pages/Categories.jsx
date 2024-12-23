import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../context/ProductContext";
import Swal from "sweetalert2";

export default function Categories() {
  const {
    categories,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  } = useContext(ProductContext);

  const [category, setCategory] = useState({ name: "", description: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateCategory(editId, category.name, category.description);
    } else {
      createCategory(category.name, category.description);
    }
    setCategory({ name: "", description: "" });
    setIsEditing(false);
  };


  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4BAF47",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCategory(id)
        Swal.fire({
          title: "Deleted!",
          text: "Category deleted.",
          icon: "success"
        });
      }
    });
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Manage Categories
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Category Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Category Name"
              value={category.name}
              onChange={(e) =>
                setCategory({ ...category, name: e.target.value })
              }
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Category Description
            </label>
            <textarea
              id="description"
              placeholder="Category Description"
              value={category.description}
              onChange={(e) =>
                setCategory({ ...category, description: e.target.value })
              }
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#4BAF47] text-white py-2 px-4 rounded-lg hover:bg-[#59d055]"
          >
            {isEditing ? "Update Category" : "Create Category"}
          </button>
        </form>
        <ul className="mt-8 space-y-4">
          {categories.map((cat) => (
            <li
              key={cat.id}
              className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm"
            >
              <div>
                <h3 className="text-lg font-medium text-gray-800">{cat.name}</h3>
                <p className="text-sm text-gray-600">{cat.description}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleDelete(cat.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    setCategory({ name: cat.name, description: cat.description });
                    setIsEditing(true);
                    setEditId(cat.id);
                  }}
                  className="px-4 py-2 bg-[#4BAF47] text-white rounded-lg hover:bg-[#59d055]"
                >
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
