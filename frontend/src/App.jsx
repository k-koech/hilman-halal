import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./components/HomePage/HomePage";
import About from './pages/About';
import Layout from './layout/Layout';
import NoPage from './pages/NoPage';
import AdminLayout from './admin/layout/AdminLayout';
import { AuthProvider } from "./context/AuthContext";
import Signup from "./pages/SignupLogin";
import Profile from "./pages/Profile";
import ContactUs from "./pages/ContactUs";
import { UserPrivateRoute } from "./components/UserPrivateRoute";
import { UserProvider } from "./context/UserContext";
import Cart from "./pages/Cart";
import Shop from "./pages/Shop";
import SignupLogin from "./pages/SignupLogin";
import ProductProvider from "./context/ProductContext";
import Categories from "./admin/pages/Categories";
import AdminProducts from "./admin/pages/AdminProducts";
import Orders from "./pages/Orders";
import OrderProvider from "./context/OrderContext";
import Order from "./pages/Order";
import AdminOrders from "./admin/pages/AdminOrders";
import AdminOrder from "./admin/pages/AdminOrder";
import DashBoard from "./admin/pages/DashBoard";
import { AdminPrivateRoute } from "./components/AdminPrivateRoute";


function App() {
  

  return (
    <BrowserRouter>
    <AuthProvider>
      <ProductProvider>
        <OrderProvider>
        <UserProvider>
        <Routes>
          <Route path='/' element={<Layout/>}>
           <Route index element={<HomePage />} />
           <Route path='about' element={<About />} />
           <Route path='contact' element={<ContactUs />} />
           <Route path='cart' element={ <UserPrivateRoute>  <Cart />  </UserPrivateRoute> } />
           <Route path='shop' element={<Shop />} />
           <Route path="login" element={<SignupLogin />} />
           <Route path="signup" element={<SignupLogin />} />
           <Route path="profile" element={<UserPrivateRoute>  <Profile /> </UserPrivateRoute>} />
           <Route path="orders" element={<UserPrivateRoute>  <Orders />  </UserPrivateRoute>} />
           <Route path="order/:id" element={<UserPrivateRoute>  <Order />  </UserPrivateRoute>} />
           <Route path="*" element={<NoPage />} />
          </Route>
          <Route path='/admin/' element={<AdminLayout/>}>
            <Route index element={<AdminPrivateRoute>  <DashBoard />  </AdminPrivateRoute>} />
            <Route path="signup" element={<Signup />} />
            <Route path="categories" element={<AdminPrivateRoute> <Categories />  </AdminPrivateRoute>} />
            <Route path="products" element={<AdminPrivateRoute> <AdminProducts />  </AdminPrivateRoute>} />
            <Route path="orders" element={<AdminPrivateRoute> <AdminOrders /> </AdminPrivateRoute>} />
            <Route path="order/:id" element={<AdminPrivateRoute><AdminOrder /></AdminPrivateRoute>} />
            <Route path="profile" element={<AdminPrivateRoute> <Profile /> </AdminPrivateRoute>} />
          </Route>
        </Routes>
        </UserProvider>
        </OrderProvider>
        </ProductProvider>
    </AuthProvider>
      </BrowserRouter>
  )
}

export default App
