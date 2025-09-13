import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Auth/Login/login.jsx';
import Register from './pages/Auth/Register/register.jsx';
import Home from './pages/Home/Home.jsx';
import Navbar from './components/NavBar.jsx';
import Favourite from './pages/Favourite/Favourite.jsx';
import NotFound from './pages/NotFound.jsx';
import Courses from './pages/Courses/Courses.jsx';
import CourseDetails from './pages/CourseDetails/CourseDetails.jsx'
import Wishlist from './pages/Whishlist/whishlist.jsx';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/courses' element={<Courses />} />
           <Route path='/courses/:id' element={<CourseDetails />} />
          <Route path='/favourite' element={<Favourite />} />
          <Route path='/whishlist' element={<Wishlist />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
