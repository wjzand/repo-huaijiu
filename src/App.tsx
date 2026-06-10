import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import BottomNav from "@/components/layout/BottomNav";
import { ToastProvider } from "@/components/common/Toast";

import Home from "@/pages/Home";
import Category from "@/pages/Category";
import Product from "@/pages/Product";
import Quiz from "@/pages/Quiz";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import OrderSuccess from "@/pages/OrderSuccess";
import Profile from "@/pages/profile/Profile";
import OrderList from "@/pages/profile/OrderList";
import CouponList from "@/pages/profile/CouponList";
import Favorites from "@/pages/profile/Favorites";

export default function App() {
  return (
    <ToastProvider>
      <Router>
        <AppShell />
      </Router>
    </ToastProvider>
  );
}

function AppShell() {
  const location = useLocation();
  return (
    <div className="app-shell">
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/category/:type" element={<Category />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/orders" element={<OrderList />} />
        <Route path="/profile/coupons" element={<CouponList />} />
        <Route path="/profile/favorites" element={<Favorites />} />
        <Route
          path="*"
          element={
            <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
              <div className="text-8xl mb-6">🧭</div>
              <h1 className="font-handwriting text-3xl text-wood-700 mb-2">迷路啦～</h1>
              <p className="text-kraft-500 mb-6 font-handwriting">找不到这个货架哦</p>
              <a href="/" className="btn-retro-primary">回杂货铺</a>
            </div>
          }
        />
      </Routes>
      <BottomNav />
    </div>
  );
}
