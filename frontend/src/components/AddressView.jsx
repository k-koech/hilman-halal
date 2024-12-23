import React, { useContext, useEffect, useState } from "react";
import { OrderContext } from "../context/OrderContext";
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";

export default function AddressView() 
{

    const { addresses, loading, createAddress, updateAddress, deleteAddress } = useContext(OrderContext);
    const [formData, setFormData] = useState({
        country: "Kenya",
        address_line1: "",
        city: "",
        state: "",
    });
    const [editingId, setEditingId] = useState(null);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingId) {
            updateAddress(editingId, formData);
            setEditingId(null);
        } else {
            createAddress(formData);
        }
        setFormData({ country: "Kenya", address_line1: "", city: "", state: "" });
    };
    console.log("Addresses ",addresses);
    

    const handleEdit = (address) => {
        setEditingId(address.id);
        setFormData({
            country: address.country,
            address_line1: address.address_line1,
            city: address.city,
            state: address.state,
        });
    };


  return (
    <div className="mt-4">
    <h1 className="text-2xl font-bold mb-4">Address Management</h1>
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md rounded-md mb-6">
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block mb-2 text-sm font-medium">Country</label>
                <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="border rounded-md p-2 w-full"
                >
                    <option value="Kenya">Kenya</option>
                    <option value="Dubai">Dubai</option>
                </select>
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium">Address Line 1</label>
                <input
                    type="text"
                    name="address_line1"
                    value={formData.address_line1}
                    onChange={handleChange}
                    className="border rounded-md p-2 w-full"
                    required
                />
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium">City</label>
                <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="border rounded-md p-2 w-full"
                    required
                />
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium">State</label>
                <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="border rounded-md p-2 w-full"
                    required
                />
            </div>
        </div>
        <button
            type="submit"
            className="mt-4 bg-gray-600 text-white py-2 px-4 rounded-md"
        >
            {editingId ? "Update Address" : "Add Address"}
        </button>
    </form>
    {loading ? (
        <p>Loading...</p>
    ) : (
        <div className="space-y-4">
            {addresses && addresses.map((address) => (
                <div key={address.id} className="bg-gray-100 p-4 rounded-md shadow-md flex justify-between items-center"  >
                    <div>
                        <p className="font-bold">{address.address_line1}</p>
                        <p>{address.city}, {address.state}</p>
                        <p>{address.country}</p>
                    </div>
                    <div className="space-x-2">
                        <button
                            onClick={() => handleEdit(address)}
                            className="bg-yellow-500 text-white py-1 px-2 rounded-md"
                        >
                            <AiOutlineEdit />
                        </button>
                        <button
                            onClick={() => deleteAddress(address.id)}
                            className="bg-red-600 text-white py-1 px-2 rounded-md"
                        >
                            <MdDeleteOutline />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )}
</div>
  )
}
