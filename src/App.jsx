import {Routes, Route, BrowserRouter} from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";

import Editorial from "./components/Editorial/Editorial";
import CreateEditorial from "./components/Editorial/CreateEditorial";
import UpdateEditorial from "./components/Editorial/UpdateEditorial";

import NotFound from "./utils/NotFound";
import Footer from "./components/Footer/Footer";

function App() {
  localStorage.setItem("API", "http://localhost:4444/api/v1/book-reserve");
  return (
    <BrowserRouter>
      <div className="container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>

          <Route path="/editorial" element={<Editorial />}></Route>
          <Route path="/editorial/create" element={<CreateEditorial />}></Route>
          <Route path="/editorial/update/:editorialId" element={<UpdateEditorial />}></Route>

          <Route path="*" element={<NotFound />}></Route>
        </Routes>
        {/* <Footer /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
