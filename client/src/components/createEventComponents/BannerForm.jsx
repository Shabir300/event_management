import { useState } from "react";
import { setBanner } from "../../redux/createEventSlice.js";
import { useDispatch, useSelector } from "react-redux";
// import '../../pages/createEvent/createEvent.scss'


const BannerForm = () => {

    const [bannerUrl, setBannerUrl] = useState('');
    const dispatch = useDispatch();
    // const banner = useSelector(state => state.createEvent.bannerObj);

    const [bannerTypeError, setBannerTypeError] = useState('');
    const imageTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];

    const handleBanner = (e) => {
        const file = e.target.files[0];
        if(file) {
            if(imageTypes.includes(file.type)) {
                dispatch(setBanner(file));
                setBannerTypeError('');
                const url = URL.createObjectURL(file);
                console.log('url here: ', url)
                setBannerUrl(url);
            } else {
                setBannerTypeError('Invalid file format');
            }
        }
    };

    return (
    <div className='createEvent__inputsForm'>

        <div className='createEvent__inputsForm__details'>
            <span className='createEvent__inputsForm__details__title'>Upload Image</span>
    
            <div className='createEvent__inputsForm__details__inputBox'>
                {/* <label>Event Title</label> */}
                <input type='file' onChange={e => handleBanner(e)}  />
                {/* {bannerUrl  && <img src={bannerUrl} alt='banner' />} */}
                {bannerUrl && (
                        <img
                            src={bannerUrl}
                            alt='banner'
                            style={{ maxWidth: '100%', height: 'auto' }}
                        />
                    )}
                <span>Feature Image must be at least 1170 pixels wide by 504 pixels high.<br />
                Valid file formats: JPG, GIF, PNG.
                </span>
                {bannerTypeError && 
                <span className='text-danger fw-bold'> <i class="bi bi-exclamation-triangle me-1"></i>{bannerTypeError}</span>
                }
                
            </div>
    
        </div>

    </div>
    )
};

export default BannerForm;