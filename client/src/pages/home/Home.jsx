import './home.scss';
import Header from '../../components/header/Header';
import HeroSection from '../../components/heroSection/HeroSection';
import PopularEvents from '../../components/popularEvents/PopularEvents';

const Home = () => {  
  return (
    <div>
        <Header />
        <HeroSection />
        <PopularEvents />
    </div>
  )
}

export default Home;