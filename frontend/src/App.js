//BrowserRouter surround everything that needs routing
import { BrowserRouter, Routes, Route } from "react-router-dom";

//pages & components
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Signup from "./pages/Signup"
import Items from "./pages/Items";
import ItemForm from "./components/ItemForm";
import WorkerForm from "./components/WorkerForm";
import Workers from "./pages/Workers";
import Login from "./pages/Login";
import Admin from "./pages/Admin";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages text-white">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/items" element={<Items />} />
            <Route path="/workers" element={<Workers />} />
            <Route path="/items/add" element={<ItemForm />} />
            <Route path="/workers/add" element={<WorkerForm />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
