import React, { useContext, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import login from "../images/backgrounds/login/login.jpg";
import login1 from "../images/backgrounds/login/login1.jpg";
import login3 from "../images/backgrounds/login/login3.jpeg";
import { AuthContext } from "../context/AuthContext";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";


export default function SignupLogin() {
  const { loginUser, registerUser, registerWithGoogle, googleLogin } = useContext(AuthContext);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const location = useLocation();
  const isSignup = location.pathname === "/signup";

  function handleSubmit(e) {
    e.preventDefault();
    if (isSignup) {
      registerUser(email, password);
    } else {
      loginUser(email, password);
    }
  }


  const googleRegister = (tokenResponse) => {
    const user = jwtDecode(tokenResponse); // You can adjust this to get necessary user details
    registerWithGoogle(user); // Register the user after Google OAuth
  };

  const googleLoginHandler = (tokenResponse) => {
    // const user = jwtDecode(tokenResponse); // Adjust as necessary
    googleLogin(tokenResponse); // Handle Google login
  };

  return (
    <div className="min-h-[80vh] flex items-center">
      <div className="min-h-[70vh] grid grid-cols-1 lg:grid-cols-2 p-4 mx-auto sm:w-[85vw] xl:w-[85vw] 2xl:w-[73vw]">
        {/* First Column */}
        <div className="flex justify-center items-center bg-gray-100 p-6">
          <div className="w-full max-w-md">
            <h3 className="text-2xl font-bold text-center mb-4">
              {isSignup ? "Create your account" : "Sign in"}
            </h3>
       
            <div className="w-full my-6 dmax-w-[400px] px-auto flex justify-around">
                <GoogleLogin 

                  className="w-full mx-16"
                  onSuccess={(credentialResponse) =>
                    isSignup
                      ? googleRegister(credentialResponse.credential)
                      : googleLoginHandler(credentialResponse.credential)
                  }
                  onError={() => console.log("Login Failed")}
                  useOneTap
                >
                  <div className="w-full">
                    <button
                      aria-label="Continue with Google"
                      className="w-full bg-yellow-700 py-2 rounded-md mb-6 text-sm text-[#4BAF47] hover:bg-[#4BAF47] hover:text-white border border-[#4BAF47] transition-all duration-200"
                    >
                      {isSignup ? "Sign up with Google" : "Sign in with Google"}
                    </button>
                  </div>

                </GoogleLogin>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Email
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Password
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Enter your password"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#4BAF47] text-white py-2 rounded-md hover:bg-green-500"
              >
                {isSignup ? "Register" : "Login"}
              </button>
            </form>

            <div className="mt-4 text-center">
              <span className="text-gray-700">
                {isSignup
                  ? "Already have an account?"
                  : "Don't have an account?"}{" "}
              </span>
              <Link
                to={isSignup ? "/login" : "/signup"}
                className="text-[#4BAF47] hover:underline"
              >
                {isSignup ? "Login" : "Sign up"}
              </Link>
            </div>
          </div>
        </div>

        {/* Second Column */}
        <div className="hidden md:flex justify-center items-center bg-gray-200">
          <div className="w-full h-full flex flex-col">
            {/* Top Image */}
            <div className="h-3/5">
              <img
                src={login1}
                alt="Top Image"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Bottom Two Images */}
            <div className="h-2/5 grid grid-cols-2 gap-1">
              <img
                src={login3}
                alt="Bottom Left Image"
                className="w-full h-full object-cover"
              />
              <img
                src={login}
                alt="Bottom Right Image"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



const GoogleRegisterLoginComponent = () => {
  const [isInstructor, setIsInstructor] = useState(false);

  const { registerWithGoogle, googleLogin } = useContext(AuthContext);

  const googleRegister = (tokenResponse) => {
      const user = jwtDecode(tokenResponse);

      registerWithGoogle(user ); // Pass the role to the register function
  };

  const google_login = (token) => {
    // const user = jwtDecode(token) 
    console.log("Success")  
    googleLogin(token)     
}

  return (
      <GoogleLogin
          onSuccess={(credentialResponse) => googleRegister(credentialResponse.credential)}
          onError={() => console.log('Login Failed')}
          useOneTap
      >
          <button
              aria-label={`Continue with Google as ${role}`}
              role="button"
              className="mx-auto focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 p-3 border rounded-lg border-gray-700 flex justify-center items-center w-full mt-10 hover:bg-gray-100"
          >
              <FcGoogle />
              <p className="text-base font-medium ml-4 text-gray-700">Register with Google as {role}</p>
          </button>
      </GoogleLogin>
  );
};
