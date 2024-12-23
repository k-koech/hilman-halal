import { Link } from "react-router-dom";
import aboutbg1 from "../images/backgrounds/about/aboutbg1.jpg"
import aboutbg2 from "../images/backgrounds/about/aboutbg2.jpeg"
import mission from "../images/backgrounds/about/mission.jpg"
import vision from "../images/backgrounds/about/vision.webp"
import { FaGlobe, FaHandHoldingHeart, FaSeedling, FaShieldAlt, FaStar } from "react-icons/fa";
import { FaBalanceScale, FaCheckCircle, FaLeaf, FaUserFriends, FaLightbulb } from 'react-icons/fa';

const About = () => 
{



return (
<div className="mt-4 mx-auto sm:w-[85vw] xl:w-[85vw] 2xl:w-[73vw]">

  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 min-h-[70vh] ">
      <div className="md:relative">
          <img src={aboutbg1} alt="First"
            className="rounded-2xl h-full  mx-auto w-[90%] md:w-[80%] object-cover md:absolute right-0"
          />
          <img src={aboutbg2} alt="Second"
            className="rounded-xl h-[30vh] hidden md:w-[40%] object-cover md:absolute left-0 top-1/2 transform -translate-y-1/2"
          />
      </div>
   
      {/* Second Column */}
      <div className="mx-5 sm:mx-0  bg-gray-100 p-6 font-manrope flex flex-col justify-around">
        <div>
          <p className="font-covered text-2xl text-[#EEC044]">Get to Know Us</p>
          <h2 className="font-extrabold text-xl md:text-5xl mt-4">The Best Halal Foods<br/>Market</h2>
          <div className="mt-6 flex flex-col gap-6">
            <div>
                <h4 className="text-[#4BAF47] font-bold">Quality</h4>
                <p className="mt-2 text-lg">We are committed to delivering top-quality meats sourced from 
                trusted pastoralist communities, ensuring excellence  in every product.</p>
            </div>
            <div>
                <h4 className="text-[#4BAF47] font-bold">Sustainability</h4>
                <p className="mt-2 text-lg">We prioritize sustainable sourcing practices, environmental
                stewardship, and the well-being of pastoralist communities,
                contributing to a more sustainable future.</p>
            </div>
            <div>
                <h4 className="text-[#4BAF47] font-bold">Customer Focus</h4>
                <p className="mt-2 text-lg">We place our customers' needs at the forefront, striving to exceed
                expectations and provide exceptional service at every step.</p>
            </div>
          </div>

          <div className="flex flex-row justify-between sm:w-[50%] gap-2 sm:gap-3 xl:gap-6 my-6">
            <Link to="/shop" type="button" className="whitespace-nowrap text-white bg-[#4BAF47]  focus:outline-none hover:bg-green-400 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-lg px-16 py-4 me-2 mb-2 Ddark:bg-gray-800 Ddark:text-white Ddark:border-gray-600 Ddark:hover:bg-gray-700 Ddark:hover:border-gray-600 Ddark:focus:ring-gray-700">
              Shop now
            </Link>              
          </div>
        </div>
       
      </div>
    </div>

    {/* row 2 */}
    <div className="grid md:grid-cols-2 gap-20 items-center font-manrope my-16  mx-5 sm:mx-0  bg-gray-100 p-6">
      <div>
        <h6 className="text-[#E8563F] text-2xl tracking-[16px]">Who We Are</h6>
        <h2 className="text-xl md:text-5xl font-bold my-4">Mission</h2>
        <p className="text-lg leading-10">
        Our mission is to provide high-quality, Halal-certified products that nourish and enrich the lives of our customers. We are committed to upholding the highest standards of ethical sourcing, sustainability,and excellence in everything we do. Our goal is to deliver nutritious and delicious offerings that respect and celebrate the diverse dietary needs of our community, fostering health, wellness, and a sense of
        belonging.
        </p>
        <div>
          <img src={mission} alt="mission" />
        </div>
      </div>

      <div>
          <h2 className="text-xl md:text-5xl font-bold my-4">Vision</h2>
          <p className="text-lg leading-10">
              To be the leading global provider of exceptional Halal food products, nourishing bodies and souls with the highest quality, authenticity, and ethical standards.
          </p>
            <h6 className="font-bold text-lg md:text-2xl my-10">Key elements of our vision:</h6>
            <ul className="space-y-14 sm:space-y-4">
            <li className="flex flex-col sm:flex-row items-center space-x-3">
              <FaGlobe size={24} className="w-10 h-10 rounded-full bg-white sm:bg-transparent p-1 text-blue-500" />
              <span className="text-lg font-medium mt-4 sm:mt-0">Global Leadership: Aim to be a recognized leader in the Halal food industry worldwide.</span>
            </li>
            <li className="flex flex-col sm:flex-row items-center space-x-3">
              <FaStar size={24} className="w-10 h-10 rounded-full bg-white sm:bg-transparent p-1 text-yellow-500" />
              <span className="text-lg font-medium mt-4 sm:mt-0">Exceptional Products: Produce a diverse range of high-quality, delicious, and innovative Halal food products.</span>
            </li>
            <li className="flex flex-col sm:flex-row items-center space-x-3">
              <FaShieldAlt size={24} className="w-10 h-10 rounded-full bg-white sm:bg-transparent p-1 text-green-500" />
              <span className="text-lg font-medium mt-4 sm:mt-0">Authenticity: Maintain unwavering commitment to Halal principles and practices in every aspect of the business.</span>
            </li>
            <li className="flex flex-col sm:flex-row items-center space-x-3">
              <FaHandHoldingHeart size={24} className="w-10 h-10 rounded-full bg-white sm:bg-transparent p-1 text-red-500" />
              <span className="text-lg font-medium mt-4 sm:mt-0">Ethical Standards: Prioritize sustainability, fair labor practices, and social responsibility in all operations.</span>
            </li>
            <li className="flex flex-col sm:flex-row  items-center space-x-3">
              <FaSeedling size={24} className="w-10 h-10 rounded-full bg-white sm:bg-transparent p-1 text-green-600" />
              <span className="text-lg font-medium mt-4 sm:mt-0">Nourishing Bodies and Souls: Provide food that not only satisfies hunger but also aligns with Islamic dietary guidelines and promotes well-being.</span>
            </li>
          </ul>

          <img src={vision} className="mt-4" alt="vision" />

          
          <div className="mt-6"> 
            <h2 className="text-xl md:text-5xl font-bold my-4">Core Values</h2>
            <ul className="space-y-8 sm:space-y-4">
              <li className="flex flex-row items-center space-x-3">
                <FaBalanceScale size={24} className="w-6 h-6 text-blue-500" />
                <span className="text-lg font-medium">Integrity</span>
              </li>
              
              <li className="flex flex-row items-center space-x-3">
                <FaCheckCircle size={24} className="w-6 h-6 text-green-500" />
                <span className="text-lg font-medium">Quality</span>
              </li>
              <li className="flex flex-row items-center space-x-3">
                <FaLeaf size={24} className="w-6 h-6 text-green-600" />
                <span className="text-lg font-medium">Sustainability</span>
              </li>
              <li className="flex flex-row items-center space-x-3">
                <FaUserFriends size={24} className="w-6 h-6 text-purple-500" />
                <span className="text-lg font-medium">Customer Focus</span>
              </li>
              <li className="flex flex-row items-center space-x-3">
                <FaLightbulb size={24} className="w-6 h-6 text-yellow-500" />
                <span className="text-lg font-medium">Innovation</span>
              </li>
            </ul>
          </div>
      </div>

    </div>

</div>
  )
}

export default About;
