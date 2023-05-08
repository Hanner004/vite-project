import {Routes, Route, BrowserRouter} from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";

import Editorial from "./components/Editorial/Editorial";
import CreateEditorial from "./components/Editorial/CreateEditorial";
import UpdateEditorial from "./components/Editorial/UpdateEditorial";

import Author from "./components/Author/Author";
import CreateAuthor from "./components/Author/CreateAuthor";
import UpdateAuthor from "./components/Author/UpdateAuthor";

import Book from "./components/Book/Book";
import CreateBook from "./components/Book/CreateBook";
import UpdateBook from "./components/Book/UpdateBook";

import PageNotFound from "./utils/PageNotFound";
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

          <Route path="/author" element={<Author />}></Route>
          <Route path="/author/create" element={<CreateAuthor />}></Route>
          <Route path="/author/update/:authorId" element={<UpdateAuthor />}></Route>

          <Route path="/book" element={<Book />}></Route>
          <Route path="/book/create" element={<CreateBook />}></Route>
          <Route path="/book/update/:bookId" element={<UpdateBook />}></Route>

          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
        {/* <Footer /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
