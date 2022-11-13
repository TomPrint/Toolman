//BrowserRouter surround everything that needs routing
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//pages & components
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Signup from "./pages/Signup"
import Items from "./pages/Items";
import ItemForm from "./components/ItemForm";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import { useAuthContext } from './hooks/useAuthContext'


function App() {
  const { user } = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages text-white">
          <Routes>

            <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
            <Route path="/admin" element={user ? <Admin /> : <Navigate to="/login" />} />
            <Route path="/signup" element={user ? <Signup /> : <Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/items" element={user ? <Items /> : <Navigate to="/login" />} />
            <Route path="/items/add" element={user ? <ItemForm /> : <Navigate to="/login" />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
