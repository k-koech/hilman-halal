import blog from "../images/blogs/blog.jpeg";

import { useContext, useEffect, useRef, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { MdArrowForwardIos } from "react-icons/md";
import { ProductContext } from "../context/ProductContext";
import Product from "../components/Product"

import configData from "../config.json";
import { convertUSDToKSH } from "../components/utils/convertUSDToKSH";
const SERVER_URL = configData.SERVER_URL;


export default function Shop() {
  const { products, fetchProducts, fetchCategories, categories } = useContext(ProductContext);

  const [searchValue, setSearchValue] = useState()

  const [price, setPrice] = useState(0); // Initial price state
  const [category, setCategory] = useState(null); // State for selected category
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(9); // 9 products per page
  const [totalPages, setTotalPages] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState([])

  // Find the min and max price of products for the price range
  const productPrices = products.map(product => product.price);
  const maxPrice = Math.max(...productPrices);
  const minPrice = Math.min(...productPrices);

  const handlePriceChange = (e) => {
    setPrice(e.target.value); // Update price state
  };

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory); // Set selected category
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected + 1); // Update current page when pagination is clicked
  };

  useEffect(() => {
    const _filteredProducts = products.filter((product) => {
      const isPriceValid = (parseFloat(product.price) >= parseFloat(price)) && (parseFloat(product.price) <= parseFloat(maxPrice) );
      const isCategoryValid = category ? parseInt(product.category.id) === parseInt(category.id) : true;
      return isPriceValid && isCategoryValid;
    });

    

    if (filteredProducts.length > 0) {
      setTotalPages(Math.ceil(_filteredProducts.length / productsPerPage));
    }
    setFilteredProducts(_filteredProducts)
    
    // for searching
    search()

  }, [products, price, category, searchValue]);

  // Filter products based on price and category


  const paginateProducts = () => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  };


    // Search by value
    const search = () =>{
     if(searchValue){
      const filtered = filteredProducts.filter(
        (item) =>
          item.name.toLowerCase().includes(searchValue) ||
          item.description.toLowerCase().includes(searchValue)
      );
      setFilteredProducts(filtered)
    }
  }


    useEffect(() => {
      fetchProducts();
      fetchCategories();
    }, []);


  //====== Handling Categories Dropdown =====
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);




  return (
    <div>
      <div className="h-[6vh] sm:min-h-[13vh] flex justify-center items-center bg-contact-bg bg-cover bg-center">
        <div className='text-white text-center p-4'>
          <div className="hidden sm:block border bg-[#4BAF47] border-[#4BAF47] rounded-full px-2">
            <Link to="/">Home</Link>  /  <Link className='font-bold' to="/contact">Shop</Link>
          </div>
          <h3 className="bg-black/30 mt-1 px-2 rounded-full font-poppins  sm:text-3xl font-semibold">SHOP</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 space-y-6 md:space-y-0 md:gap-3 font-sans p-4 mx-auto sm:w-[85vw] xl:w-[85vw] 2xl:w-[73vw]">
        <div className="flex flex-col gap-4">
          <div className="border rounded-lg p-4">
            <div className="flex flex-col gap-4 mt-3 md:mt-6">
              <input type="text" value={searchValue} onChange={ e => setSearchValue(e.target.value.toLowerCase() ) } className="font-roboto bg-[#EEC044] border-0 text-white text-lg focus:border-[#EEC044] focus:border-0 rounded-lg block w-full p-2.5 py-2 md:py-4 placeholder:text-white Ddark:bg-gray-700 Ddark:border-gray-600 Ddark:placeholder-gray-400 Ddark:text-white " placeholder="Search for products" required />

              <h2 className="text-2xl font-bold md:mb-4">Filter by Price</h2>
              <div className="md:mb-4">
                <label htmlFor="price-range" className="block text-gray-400 font-bold mb-2">
                  Price Range
                </label>
                <input
                  type="range"
                  id="price-range"
                  className="w-full accent-[#4BAF47]"
                  min={minPrice}
                  max={maxPrice}
                  value={price }
                  onChange={handlePriceChange} // Update price dynamically
                />
              </div>
              <div className="flex justify-between items-center text-gray-500">
                <span>Max: ${maxPrice} <br/>Ksh.{convertUSDToKSH(maxPrice)} </span>
                <span>{`$${price!=0? price : minPrice }`} <br/>Ksh.{convertUSDToKSH(minPrice)}</span>
                {/* <button className="px-3 py-2 bg-[#4BAF47] rounded-lg text-white">Apply</button> */}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center md:block border rounded-lg p-2 md:p-4">
            <h3 className="md:mt-3 font-bold text-xl">Categories</h3>
            <div className="md:mt-0">
              {/* Dropdown for Small Screens */}
              <div className="relative md:hidden" ref={dropdownRef}>
                <button className="w-full border p-2 rounded-md text-left"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  {category ? category.name : "Select a Category"}
                </button>
                {isDropdownOpen && (
                  <div className="absolute top-18 -left-28 right-24 w-32 py-3 px-4 mt-0 border border-b-lg rounded-l-lg rounded-b-lg bg-white shadow-lg z-10">
                    {
                      categories && categories.length < 1 && <span className="text-xs">No Category</span>
                    }
                    {categories &&
                      categories.map((categoryItem) => (
                        <div
                          key={categoryItem.id}
                          className={`${
                            category && category.id === categoryItem.id && "text-[#4BAF47]"
                          } flex items-center justify-between cursor-pointer mt-3 `}
                          onClick={() => {
                            handleCategoryChange(categoryItem);
                            setIsDropdownOpen(false);
                          }}
                        >
                          <p>{categoryItem.name}</p>
                          <MdArrowForwardIos />
                        </div>
                      ))}
                  </div>
                )}
              </div>

              {/* List for Medium and Larger Screens */}
              <div className="hidden md:flex flex-col gap-6 mt-6">
                {categories &&
                  categories.map((categoryItem) => (
                    <div
                      key={categoryItem.id}
                      className={`${
                        category && category.id === categoryItem.id && "text-[#4BAF47]"
                      } flex items-center justify-between cursor-pointer`}
                      onClick={() => handleCategoryChange(categoryItem)}
                    >
                      <p>{categoryItem.name}</p>
                      <MdArrowForwardIos />
                    </div>
                  ))}
              </div>
            </div>
          </div>



        </div>

        <div className="col-span-3 border rounded-lg p-2">
          {filteredProducts.length < 1 && (
            <div className="min-h-[40vh] flex justify-center items-center">
                <p>
                  No products found between{" "}
                  <span className="font-bold">{`$${price}`}</span> to{" "}
                  <span className="font-bold">{`$${maxPrice}`}</span>{" "}
                  {category && (
                    <span>
                      {" "}
                      and <span className="font-bold text-lg">{category.name}</span> category
                    </span>
                  )}
                </p>           
            </div>
          )}

          <div className="min-h-[40vh] columns-2 sm:columns-3 3xl:columns-4
           sdxl:columns-5=3xl:columns-6 gap-4 space-y-4">
            {paginateProducts().map((product) => (
               <Product product={product} key={product.id} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6">
            <ReactPaginate
              pageCount={totalPages}
              pageRangeDisplayed={5}
              marginPagesDisplayed={2}
              onPageChange={handlePageClick}
              containerClassName="flex justify-center space-x-2"
              pageClassName="px-3 py-1 bg-gray-200 text-gray-800 rounded cursor-pointer"
              pageLinkClassName="w-full h-full flex items-center justify-center"
              activeClassName="bg-green-600 text-white"
              previousLabel="<"
              nextLabel=">"
              previousClassName="px-3 py-1 bg-gray-200 text-gray-800 rounded cursor-pointer"
              nextClassName="px-3 py-1 bg-gray-200 text-gray-800 rounded cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
