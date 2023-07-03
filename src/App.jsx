import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Login from './components/Login/Login';

import Editorial from './components/Editorial/Editorial';
import CreateEditorial from './components/Editorial/CreateEditorial';
import UpdateEditorial from './components/Editorial/UpdateEditorial';

import Author from './components/Author/Author';
import CreateAuthor from './components/Author/CreateAuthor';
import UpdateAuthor from './components/Author/UpdateAuthor';

import Book from './components/Book/Book';
import CreateBook from './components/Book/CreateBook';
import UpdateBook from './components/Book/UpdateBook';

import Client from './components/Client/Client';
import CreateClient from './components/Client/CreateClient';
import UpdateClient from './components/Client/UpdateClient';

import Reservation from './components/Reservation/Reservation';
import CreateReservation from './components/Reservation/CreateReservation';
import UpdateReservation from './components/Reservation/UpdateReservation';

import PageNotFound from './utils/PageNotFound';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>

          <Route path="/editorial" element={<Editorial />}></Route>
          <Route path="/editorial/create" element={<CreateEditorial />}></Route>
          <Route path="/editorial/update/:editorialId" element={<UpdateEditorial />}></Route>

          <Route path="/author" element={<Author />}></Route>
          <Route path="/author/create" element={<CreateAuthor />}></Route>
          <Route path="/author/update/:authorId" element={<UpdateAuthor />}></Route>

          <Route path="/book" element={<Book />}></Route>
          <Route path="/book/create" element={<CreateBook />}></Route>
          <Route path="/book/update/:bookId" element={<UpdateBook />}></Route>

          <Route path="/client" element={<Client />}></Route>
          <Route path="/client/create" element={<CreateClient />}></Route>
          <Route path="/client/update/:clientId" element={<UpdateClient />}></Route>

          <Route path="/reservation" element={<Reservation />}></Route>
          <Route path="/reservation/create" element={<CreateReservation />}></Route>
          <Route path="/reservation/update/:reservationId" element={<UpdateReservation />}></Route>

          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
        {/* <Footer /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
