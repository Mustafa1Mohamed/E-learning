import './App.css';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
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
  const theme = useSelector(state => state.combineTheme.theme);
  const themeClass = theme === 'Dark' ? 'dark bg-gray-800' : 'bg-white';
  return (
    <div className={themeClass + ' min-h-screen'}>
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
          <Route path='/not-found' element={<NotFound />} />
          <Route path='*' element={<Navigate to='/not-found' replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
