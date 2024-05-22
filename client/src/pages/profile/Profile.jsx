import React from 'react';
import Header from '../../components/header/Header';
import './profile.scss';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const Profile = () => {

    const AccountInfo = () => {
        return (
            <div className='profile'>
        <h1>Account Information</h1>

        <div className='profile__form'>
            <div className='profile__form__singleSection'>
                <h2>Profile Photo</h2>
                <img src='/static/hostImage.png' alt='profile-img' className='profile__form__singleSection__profileImage' />
                <label className=''>
                    <i className="bi bi-camera-fill"></i>
                    <input type='file' hidden  />
                </label>
                
            </div>
            <div className='profile__form__singleSection'>
                <h2>Profile Information</h2>
                <div className='profile__form__singleSection__inputBox'>
                    <label>First Name:</label>
                    <input type='text' placeholder='Enter first name' />
                </div>
                <div className='profile__form__singleSection__inputBox'>
                    <label>Last Name:</label>
                    <input type='text' placeholder='Enter last name' />
                </div>
                <div className='profile__form__singleSection__inputBox'>
                    <label>Website:</label>
                    <input type='text' placeholder='Enter website' />
                </div>
                <div className='profile__form__singleSection__inputBox'>
                    <label>Company:</label>
                    <input type='text' placeholder='Enter company name' />
                </div>
            </div>
            <div className='profile__form__singleSection'>
                <h2>Contact Details</h2>
                <div className='profile__form__singleSection__inputBox'>
                    <label>Phone Number:</label>
                    <input type='text' placeholder='Enter phone number' />
                </div>
                <div className='profile__form__singleSection__inputBox'>
                    <label>Address:</label>
                    <input type='text' placeholder='Enter address' />
                </div>
                <div className='profile__form__singleSection__inputBox'>
                    <label>City/Town:</label>
                    <input type='text' placeholder='Enter city/town' />
                </div>
                <div className='profile__form__singleSection__inputBox'>
                    <label>Country:</label>
                    <input type='text' placeholder='Enter country' />
                </div>
                <div className='profile__form__singleSection__inputBox'>
                    <label>Pincode:</label>
                    <input type='text' placeholder='Enter pincode' />
                </div>
            </div>

            <button className='profile__form__saveProfileBtn'>
                Save My Profile
            </button>
        </div>

        
    </div>
        )
    };

    const EmailInfo = () => {
        return (
    <div className='profile'>
        <h1>Change Email</h1>

        <div className='profile__form'>
            <div className='profile__form__singleSection'>
                <div className='profile__form__singleSection__inputBox'>
                    <label>Current email:</label>
                    <label>shabirmuhammadkhan62@gmail.com</label>
                </div>
                <div className='profile__form__singleSection__inputBox'>
                    <label>New Email:</label>
                    <input type='text' placeholder='Enter new email' />
                </div>
                <div className='profile__form__singleSection__inputBox'>
                    <label>Confirm Email:</label>
                    <input type='text' placeholder='Enter again' />
                </div>
            </div>

            <button className='profile__form__saveProfileBtn'>
                Save new Email
            </button>
        </div>
        
    </div>
        )
    };
   
    const PasswordInfo = () => {
        return (
    <div className='profile'>
        <h1>Change Password</h1>

        <div className='profile__form'>
            <div className='profile__form__singleSection'>
                <div className='profile__form__singleSection__inputBox'>
                    <label>Enter current Password:</label>
                    <input type='text' placeholder='Enter current password' />
                </div>
                <div className='profile__form__singleSection__inputBox'>
                    <label>New Password:</label>
                    <input type='text' placeholder='Enter new password' />
                </div>
                <div className='profile__form__singleSection__inputBox'>
                    <label>Confirm Password:</label>
                    <input type='text' placeholder='Enter again' />
                </div>
            </div>

            <button className='profile__form__saveProfileBtn'>
                Save new Password
            </button>
        </div>
        
    </div>
        )
    };
    
  return (
<>
    <Header />
        {/* <UncontrolledExample /> */}
        <Tabs
      defaultActiveKey="home"
      id="uncontrolled-tab-example"
      className="mb-3 tabs"
      fill={true}
      justify={true}
      mountOnEnter={true}
      unmountOnExit={true}

    >
      <Tab eventKey="home" title="Account Info">
        <AccountInfo/>
      </Tab>
      <Tab eventKey="profile" title=" Change Email">
        <EmailInfo />
      </Tab>
      <Tab eventKey="contact" title="Password" >
        <PasswordInfo />
      </Tab>
    </Tabs>
    
</>
  )
}

export default Profile