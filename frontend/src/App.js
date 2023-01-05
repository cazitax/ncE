import { ToastContainer } from "react-toastify";
import "./index.css";
import Homepage from "./pages/HomePage";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import Loginpage from "./pages/LoginPage";
import Registerpage from "./pages/RegisterPage";
import Productinfopage from "./pages/ProductInfoPage";
import Cartpage from "./pages/CartPage";
import "./styleshit/layout.css";
import "./styleshit/product.css";
import "./styleshit/auth.css";
import "react-toastify/dist/ReactToastify.css";
import Orderspage from "./pages/OrdersPage";
import Adminpage from "./pages/AdminPage";
import { getDoc, getFireStore, doc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import fireDB from "./fireConfig";
import { useState } from "react";
const auth = getAuth();
const App = () => {
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            exact
            element={
              <ProtectedRoutes>
                <Homepage />
              </ProtectedRoutes>
            }
          />
          <Route path="/login" exact element={<Loginpage />} />
          <Route path="/register" exact element={<Registerpage />} />
          <Route
            path="/productinf/:productid"
            exact
            element={
              <ProtectedRoutes>
                <Productinfopage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/cart"
            exact
            element={
              <ProtectedRoutes>
                <Cartpage />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/orders"
            exact
            element={
              <ProtectedRoutes>
                <Orderspage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/admin"
            exact
            element={
              <ProtectedRoutes>
                <PrivateRoute>
                  <Adminpage />
                </PrivateRoute>
              </ProtectedRoutes>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
export const ProtectedRoutes = ({ children }) => {
  if (localStorage.getItem("currentUser")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

// quitarla para funcionar del app route

export const PrivateRoute = ({ children }) => {
  const [user, setUser] = useState(null);

  const getRol = async (uid) => {
    const docuRef = doc(fireDB, `users/${uid}`);
    const docuCI = await getDoc(docuRef);
    const infoFinal = docuCI.data().rol;
    return infoFinal;
  };

  onAuthStateChanged(auth, (users) => {
    if (users) {
      if (!user) {
        getRol(users.uid).then((rol) => {
          const userData = {
            uid: users.uid,
            email: users.email,
            rol: rol,
          };

          setUser(userData);
          console.log(userData);
        });
      }
    }
  });

  if (user.rol === "admin") return <Outlet />;
  else {
    return <Navigate to="/" />;
  }
};
