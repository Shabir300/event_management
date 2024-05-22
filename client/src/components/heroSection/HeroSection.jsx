import './heroSection.scss';

const HeroSection = () => {
  return (
    <div className='heroSection'>
        <div>
            <h1>Don’t miss out!<br/>
            Explore the vibrant events happening locally and globally.
            </h1>
        </div>
        <div>
            <input type='text'
             placeholder='Search Events, Categories, Location,...'
           />
           <i class="bi bi-search"></i>
        </div>
    </div>
  )
}

export default HeroSection