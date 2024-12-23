import CountUp from 'react-countup';
import { FaCheckCircle } from "react-icons/fa";
import { GiFarmer } from "react-icons/gi";
import { GiFarmTractor } from "react-icons/gi";
import { FcShipped } from "react-icons/fc";
import { RiRefund2Fill } from "react-icons/ri";

import landing_image from '../../assets/landing_image.png';
import home1 from '../../images/backgrounds/home1.webp'
import home2 from '../../images/backgrounds/home2.png'
import home3 from '../../images/backgrounds/home3.png'
import home4 from '../../images/backgrounds/home4.jpg'
import home5 from '../../images/backgrounds/home5.avif'


import { Link } from "react-router-dom";
import Product from '../Product';
import { ProductContext } from '../../context/ProductContext';
import { useContext, useEffect } from 'react';

const HomePage = () => 
{

  const { products, fetchProducts, fetchCategories, categories } = useContext(ProductContext);


   useEffect(()=>{
       fetchProducts()
   }, [])

  return (
    <>
    <div  style={{ backgroundImage: `url(${landing_image})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat:"no-repeat", height: '75vh',  // Adjust height as needed width: '100%',
      }} className="flex items-center">
  
      <div className="sm:w-[85vw] xl:w-[85vw] 2xl:w-[73vw] mx-auto p-3">
        <div className="relative z-0">          
          <div className={`${window.innerWidth < 768 ? 'absolute top-1/2 left-1/2 sm:left-1/3 lg:sm:left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-opacity-50 p-2'  : 'md:block' }`}>
            <div className="font-bold text-3xl md:text-3xl xl:text-7xl tracking-normal">
            <p className='text-6xl sm:text-9xl font-covered text-[#4BAF47] font-normal'>Hilman</p>

              <p className='text-white whitespace-nowrap sm:whitespace-wrap font-manrope'>Halal Foods<br/>Market</p>
              
            </div>
            <div className="w-[80%] my-6 text-lg md:text-xl text-white">
              <p>
              Nourishing you, the Halal way
              </p>
            </div>
            <div className="flex flex-row justify-between sm:w-[50%] gap-2 sm:gap-3 xl:gap-6 my-6">
              <Link to="/shop" type="button" className="whitespace-nowrap text-white bg-[#4BAF47]  focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-xl text-sm sm:text-lg px-12 py-3 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                Shop now
              </Link>              
            </div>
          </div>
          </div>
      </div>       

    </div>


    <div className='-mt-16 container lg:w-[73vw] mx-auto grid grid-cols-1 sm:grid-cols-2 gaps-4 gap-14 sm:gap-8 justify-around'>
       <div className='flex bg-white flex-row items-center justify-center gap-2 sm:gap-4 rounded-xl p-8 mx-8 md:mx-0 shadow-lg  border'>
          <h1 className='font-bold text-4xl sm:text-4xl md:10xl'>
            <RiRefund2Fill size="48" />
          </h1>
          <p className='font-semibold text-nowrap sm:text-lg'>Money Guarantee</p>
       </div>
       <div className='flex bg-white flex-row items-center justify-center gap-2 sm:gap-4 rounded-xl p-8 mx-8 md:mx-0 shadow-lg  border'>
          <h1 className='font-bold text-4xl sm:text-3xl md:9xl'>
             <FcShipped size="48" />
          </h1>
          <p className='font-semibold sm:text-lg'>Fast Shipping</p>
       </div>
    </div>

    {/* Latest */}
    <div className="p-4 mx-auto sm:w-[85vw] xl:w-[85vw] 2xl:w-[73vw] my-16 shadow">
      <h4 className='text-xl sm:text-3xl text-center font-covered text-[#EEC044]'>Recently Added</h4>
      <h2 className='text-2xl sm:text-4xl text-center font-bold my-8'>Latest Products</h2>

      <div className='grid grid-cols-1 md:grid-cols-3 space-y-6 md:space-y-0 md:gap-16 font-sans my-10'>
        {products.slice(0, 6).map((product) => (
            <Product product={product} key={product.id} />
        ))}
      </div>

      <div className='flex justify-center p-6'>
      <Link to="/shop" type="button" className="text-white bg-[#4BAF47] font-medium text-sm sm:text-lg hover:bg-[#5ad556] rounded-full px-8 sm:px-12 py-2.5 me-2 mb-2 dark:bg-blue-400 dark:hover:bg-blue-600 ">
        View More
      </Link>
      </div>
    </div>

  {/*  */}
  <div className='relative bg-cover bg-center mt-48 py-36 px-40  sm:p-48' style={{backgroundImage: `url(${home1})`}}>
      <div class="grid grid-cols-2 gap-2 md:gap-10 absolute -top-24 xs:-top-28 sm:-top-48 left-0 right-0  overflow-hidden h-[20vh] sm:h-[35vh] mx-auto w-[78vw]xs: w-[80vw] sm:w-[85vw] xl:w-[85vw] 2xl:w-[73vw]">

          <div className="h-[20vh] sm:h-[35vh] rounded-lg relative bg-[#EEC044]">
              <img src={home3} alt="Image 1" className="w-full h-full object-cover rounded-lg"   />
              
              <div className="absolute inset-0 flex flex-col ml-4 md:ml-20 items-start justify-center rounded">
                <p className='font-thin text-white text-sm sm:text-md '>100% ORGANIC</p>
                <div className="font-covered my-1 sm:my-4 text-lg xs:text-xl sm:text-2xl md:text-3xl text-white">
                  <h3>Quality Organic</h3>
                  <h3>Food Store</h3>
                </div>
                <Link
                  to="/shop"
                  type="button"
                  className="xs:mt-4 bg-white font-medium text-xs xs:text-sm sm:text-lg hover:text-white hover:bg-[#5ad556] rounded-lg px-2 xs:px-6 sm:px-8 py-1.5 xs:py-2.5 me-2 mb-2"                >
                  Order Now
                </Link>
              </div>
          </div>

          <div className="h-[20vh] sm:h-[35vh] rounded-lg relative bg-[#4BAF47]">
              <img src={home2} alt="Image 1" className="w-full h-full object-cover rounded-lg"  />
              
              <div className="absolute inset-0 flex flex-col ml-4 md:ml-20 items-start justify-center rounded">
                <p className='font-thin text-white text-sm sm:text-md '>100% ORGANIC</p>
                <div className="font-covered my-1 sm:my-4 text-lg xs:text-xl sm:text-2xl md:text-3xl text-white">
                  <h3>Healthy Products</h3>
                  <h3>Everyday</h3>
                </div>
                <Link
                  to="/shop"
                  type="button"
                  className="xs:mt-4 bg-white font-medium text-xs xs:text-sm sm:text-lg hover:text-white hover:bg-[#5ad556] rounded-lg px-2 xs:px-6 sm:px-8 py-1.5 xs:py-2.5 me-2 mb-2"
                >
                  Order Now
                </Link>
              </div>
          </div>

        <div className='bg-[#4BAF47]'>
            <img src={home3} alt="Image 2" class="w-full h-full object-cover rounded" />
            <div>
              <div className='font-covered my-4 text-3xl bg-black/30'>
                <h3>Healthy Products</h3>
                <h3>Everyday</h3>
              </div>
              <Link to="/shop" type="button" className="mt-4 bg-white font-medium text-sm sm:text-lg hover:text-white hover:bg-[#5ad556] rounded-lg px-6 sm:px-8 py-2.5 me-2 mb-2 dark:bg-blue-400 dark:hover:bg-blue-600 ">
                Order Now
              </Link>

            </div>
        </div>
      </div>
      
    <div class="flex justify-center items-center w-full h-[40vh] ">
      <div class="wd-[60vw] text-center md:p-4">
        <h1 class="text-white text-xl sm:text-2xl bg-black/55 p-2 rounded-xl md:text-4xl font-bold">Be Healthy & Eat Only Fresh<br/>Organic Vagetables</h1>
        <Link to="/shop" type="button" className="mt-10 text-nowrap mx-12 text-white bg-[#4BAF47] font-medium text-sm sm:text-lg hover:bg-[#5ad556] rounded-lg px-8 sm:px-12 py-2.5  mb-2 dark:bg-blue-400 dark:hover:bg-blue-600 ">
          Shop Now
        </Link>
      </div>
    </div>
  </div>



  {/* Container */}
  <div class="container mx-auto p-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-16 min-h-[50vh]">
        <div class="relative overflow-hidden">
          <img src={home4} alt="Organic Food" class="h-full w-auto object-cover rounded-md shadow-md" />
          <div class="absolute top-0 left-0 bg-[#4BAF47] text-white text-lg sm:text-xl px-8 py-4 rounded-l">
            Best Organic Food
          </div>
        </div>

        <div>
          <small class="text-xl sm:text-3xl text-center font-covered text-[#EEC044]">Our Products Benefits</small>
          <h2 class="text-2xl sm:text-4xl font-bold mt-2">Hilman Halal Market</h2>
          <p class="text-gray-700 mt-2">
            At Hilman Halal Foods we take pride in our unwavering commitment to delivering the highest standards of quality in every aspect of our operations. Our dedication to quality is evident in:
          </p>
          <div class="flex items-center mt-4">
            <div class="w-10 tfext-white rounded-full p-2">
              <FaCheckCircle color='#4BAF47'  size={24} />
            </div>
            <h4 class="ml-2 text-lg font-semibold">Certified Organic</h4>

          </div>
          <div className='flex items-center mt-4'>
            <div class="w-10">   </div>
            <p className='ml-3'>
              We source our meat from trusted suppliers and pastoralist communities know for their exceptional quality
            </p>
          </div>

          <div class="flex items-center mt-4">
            <div class="w-10 tfext-white rounded-full p-2">
              <FaCheckCircle color='#EEC044' size={24} />
            </div>
            <h4 class="ml-2 text-lg font-semibold">Quality Products</h4>
          </div>
          <div className='flex items-center mt-4'>
            <div class="w-10">   </div>
            <p className='ml-3'>
                Our team of experts monitors every stage of production to uphold<br/>
                quality consistency and integrity. We conduct thorough quality<br/>
                checks, including hygiene, temperature control, and packaging, to<br/>
                guarantee the freshness and safety of our products.
            </p>
          </div>

          <div className='flex items-center mt-4'>
            <div class="w-10">   </div>
            <Link to="/about" type="button" className="mt-4 text-white bg-[#4BAF47] font-medium text-sm md:text-lg hover:bg-[#5ad556] rounded-lg px-8 sm:px-14 py-3 me-2 mb-2 ">
              Discover More
            </Link>
          </div>

        </div>
      </div>

      {/* <!-- Second Row --> */}
      <div class="grid sm:grid-cols-2 gap-8 md:gap-16 min-h-[40vh] my-16">
        <div class="relative overflow-hidden">
          <img src={home5} alt="Organic Food" class="h-full w-auto object-cover rounded-md shadow-md" />
        </div>

        <div>
          <small class="text-xl sm:text-3xl font-covered text-[#EEC044]">Quality Products</small>
          <h2 class="text-2xl sm:text-4xl font-bold mt-2">Only Organic Food</h2>
          <p class="text-gray-700 mt-2">
            There are many variations of passages of lorem ipsum available but the
            majority have suffered alteration in some form by injected humor or
            random word.          
          </p>

          <div class="flex items-center mt-4">
            <div class="w-12 tfext-white rounded-full p-2">
              <GiFarmer  color='#4BAF47'  size={48} />
            </div>
            <div className='ml-8'>
                <h4 class="text-lg font-semibold">Professional Farmers</h4>
                <p> There are many variation of passages of lorem ipsum.            </p>
            </div>
          </div>

          <div class="flex items-center mt-4">
            <div class="w-12 tfext-white rounded-full p-2">
              <GiFarmTractor  color='#EEC044'  size={48} />
            </div>
            <div className='ml-8'>
                <h4 class="text-lg font-semibold">Professional Farmers</h4>
                <p> There are many variation of passages of lorem ipsum.            </p>
            </div>
          </div>
    
          <div className='flex items-center mt-4'>
            <div class="w-10">   </div>
            <Link to="/shop" type="button" className="mt-4 text-white bg-[#4BAF47] font-medium text-sm md:text-lg hover:bg-[#5ad556] rounded-lg px-8 sm:px-14 py-3 me-2 mb-2 ">
              Start Shopping Now
            </Link>
          </div>

        </div>
      </div>

     
</div>





    </>
  );
};

export default HomePage;


