import React, { useState } from "react";

import AddressView from "./AddressView";

const Address = () => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown toggle state




    return (
        <div className="relative">
            <button
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="bg-[#4BAF47] text-white py-2 px-4 rounded-md"
            >
                {isDropdownOpen ? "Hide Address Management" : "Show Address Management"}
            </button>
            {isDropdownOpen && (
                <AddressView/>
            )}
        </div>
    );
};

export default Address;
