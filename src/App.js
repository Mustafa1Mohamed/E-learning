import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Auth/Login/login.jsx';
import Register from './pages/Auth/Register/register.jsx';
import Home from './pages/Home/Home.jsx';
import Navbar from './components/NavBar.jsx';
import Wishlist from './pages/Wishlist/whishlist.jsx';
import Favourite from './pages/Favourite/Favourite.jsx';
import NotFound from './pages/NotFound/NotFound.jsx';
import Courses from './pages/Courses/Courses.jsx';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/favourite' element={<Favourite />} />
          <Route path='/wishlist' element={<Wishlist />} />
          <Route path='/courses' element={<Courses />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
