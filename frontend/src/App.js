//BrowserRouter surround everything that needs routing
import { BrowserRouter, Routes, Route } from 'react-router-dom'

//pages & components
import Home from "./pages/Home"
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages text-white">
          <Routes>
            <Route
              path ="/"
              element={<Home/>}
            />

          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;