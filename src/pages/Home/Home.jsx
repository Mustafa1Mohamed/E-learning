

import Header from '../../components/Header'
import Feature from '../../components/Feature'
import Footer from '../../components/Footer'
import FeaturedCourses from '../../components/FeaturedCourses'
import { useSelector } from 'react-redux';

function Home() {
  const theme = useSelector(state => state.combineTheme.theme);
  const themeBg = theme === 'Dark' ? 'bg-gray-800' : 'bg-white';
  const themeText = theme === 'Dark' ? 'dark:text-white' : '';
  return (
    <div className={`${themeBg} ${themeText} min-h-screen`}>
      <Header />
      <Feature />
      <FeaturedCourses />
      <Footer />
    </div>
  )
}

export default Home