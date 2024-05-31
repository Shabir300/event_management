import './home.scss';
import Header from '../../components/header/Header';
import HeroSection from '../../components/heroSection/HeroSection';
import PopularEvents from '../../components/popularEvents/PopularEvents';
import Footer from '../../components/footer/Footer';

const Home = () => {  
  return (
    <div className='home'>
        <Header />
        <HeroSection />
        <PopularEvents />
        <Footer />
    </div>
  )
}

export default Home;