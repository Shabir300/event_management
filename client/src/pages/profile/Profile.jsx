import React, {useEffect, useState} from 'react';
import Header from '../../components/header/Header';
import './profile.scss';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { makeRequest } from '../../axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import Footer from '../../components/footer/Footer';

const Profile = () => {

    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [showErrorToast, setShowErrorToast] = useState(false);
    const [toastText, setToastText] = useState('');

// function AutohideExample() {
//     return (
//         <Row className='autoHideToast'>
//         <Col xs={6}>
//             <Toast  bg='success' onClose={() => setShowSuccessToast(false)} show={showSuccessToast} delay={5000} autohide>
//             <Toast.Body className='text-white'>{toastText}</Toast.Body>
//             </Toast>
//         </Col>
//         </Row>
//     );
// };

// function AutohideExampleError() {
//     return (
//         <Row className='autoHideToast'>
//         <Col xs={6}>
//             <Toast  bg='danger' onClose={() => setShowErrorToast(false)} show={showErrorToast} delay={5000} autohide>
//             <Toast.Body className='text-white'>{toastText}</Toast.Body>
//             </Toast>
//         </Col>
//         </Row>
//     );
// }

    const queryClient = useQueryClient();

    // const user = useSelector(state => state.user.user);
    // console.log('react redux user: ', user);

    const { data} = useQuery({
        queryKey: ['user'],
        queryFn: () => makeRequest.get('/get-user').then(res => res.data),
    });

    const userMutation = useMutation({
        mutationKey: ['user'],
        mutationFn: (inputs) => makeRequest.put('/edit-user', inputs).then(res => res),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] });
            setToastText('Account Info saved!');
            setShowSuccessToast(true);
        },
        onError: (err) => {
            setToastText(err?.response.data || 'Failed to updated user!');
            setShowErrorToast(true);
        },
    });



    const user = data && data[0];
    // console.log('user data from query: ', user)

    const [inputs, setInputs] = useState({
        profilePic: '',
        name: '',
        website: '',
        company: '',
        address: '',
        city: '',
        country: '',
        pincode: 0,
        phoneNumber: '',
    });

    useEffect(() => {
        if (user) {
            setInputs({
                profilePic: user.profilePic,
                name: user.name,
                website: user.website,
                company: user.company,
                address: user.address,
                city: user.city,
                country: user.country,
                pincode: user.pincode,
                phoneNumber: user.phoneNumber,
            })
        }
    }, [user]);

    const handleChange = (e) => {
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}));
    }

const AccountInfo = () => { 

    const [file, setFile] = useState(null);
    const [fileUrl, setFileUrl] = useState(''); 

    const handleFileChange = (e) => {
        // e.preventDefault();
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        const url = URL.createObjectURL(selectedFile);
        setFileUrl(url);
    };

    const profileMutation = useMutation({
        mutationKey: ['user'],
        mutationFn: (formData) => makeRequest.post('/upload', formData).then(res => res),
        onSuccess: (res) => {
            const updatedInputs = {...inputs, profilePic: res.data};
            setInputs(updatedInputs);
            // queryClient.invalidateQueries({ queryKey: ['user'] });
            // console.log('profile: ', res.data)

        }
    });

    console.log('inputs: ', inputs)

    const handleSave = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        
        try {
            await profileMutation.mutateAsync(formData);
            userMutation.mutate(inputs);
        } catch (error) {
            // Handle error
        }
        
    };



        return (
            <div className='profile'>
        <h1>Account Information</h1>

        <div className='profile__form'>
            <div className='profile__form__singleSection'>
                <h2>Profile Photo</h2>
                <img src={fileUrl ===  '' && user?.profilePic ? `/uploads/${user.profilePic}` : `${fileUrl}`} alt='profile-img' className='profile__form__singleSection__profileImage' />
                <label className=''>
                    <i className="bi bi-camera-fill"></i>
                    <input type='file' hidden onChange={handleFileChange} />
                </label>
            
            </div>
            <div className='profile__form__singleSection'>
                <h2>Profile Information</h2>
                <div className='profile__form__singleSection__inputBox'>
                    <label>Full Name:</label>
                    <input type='text' name='name' value={inputs.name} onChange={handleChange} placeholder='Enter first name' />
                </div>
                {/* <div className='profile__form__singleSection__inputBox'>
                    <label>Last Name:</label>
                    <input type='text' name='name' placeholder='Enter last name' />
                </div> */}
                <div className='profile__form__singleSection__inputBox'>
                    <label>Website:</label>
                    <input type='text' name='website' value={inputs.website} onChange={handleChange} placeholder='Enter website' />
                </div>
                <div className='profile__form__singleSection__inputBox'>
                    <label>Company:</label>
                    <input type='text' name='company' value={inputs.company} onChange={handleChange} placeholder='Enter company name' />
                </div>
            </div>
            <div className='profile__form__singleSection'>
                <h2>Contact Details</h2>
                <div className='profile__form__singleSection__inputBox'>
                    <label>Phone Number:</label>
                    <input type='text' name='phoneNumber' value={inputs.phoneNumber} onChange={handleChange} placeholder='Enter phone number' />
                </div>
                <div className='profile__form__singleSection__inputBox'>
                    <label>Address:</label>
                    <input type='text' name='address' value={inputs.address} onChange={handleChange} placeholder='Enter address' />
                </div>
                <div className='profile__form__singleSection__inputBox'>
                    <label>City/Town:</label>
                    <input type='text' name='city' value={inputs.city} onChange={handleChange} placeholder='Enter city/town' />
                </div>
                <div className='profile__form__singleSection__inputBox'>
                    <label>Country:</label>
                    <input type='text' name='country' value={inputs.country} onChange={handleChange} placeholder='Enter country' />
                </div>
                <div className='profile__form__singleSection__inputBox'>
                    <label>Pincode:</label>
                    <input type='text' name='pincode' value={inputs.pincode} onChange={handleChange} placeholder='Enter pincode' />
                </div>
            </div>

            <button onClick={handleSave} className='profile__form__saveProfileBtn'>
                Save My Profile
            </button>
        </div>

        
    </div>
        )
    };

const EmailInfo = () => {

    const emailMutation = useMutation({
        mutationKey: ['user'],
        mutationFn: (emailInputs) => makeRequest.put('/change-email', emailInputs).then(res => res),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] });
            setEmailInputs({
                email: '',
                confirmEmail: '',
            });
            setToastText('New email saved!');
            setShowSuccessToast(true);
        },
        onError: (err) => {
            setToastText(err?.response.data || 'Email cannot be updated!');
            setShowErrorToast(true);
        },
    });

    const [confirmEmailError, setConfirmEmailError] = useState('');
    const [emailInputs, setEmailInputs] = useState({
        email: '',
        confirmEmail: '',
    });

    const handleEmailChange = (e) => {
        setEmailInputs(prev => ({...prev, [e.target.name]: e.target.value}));
    };

    const handleSaveEmail = (e) => {
        e.preventDefault();
        if (emailInputs.email === emailInputs.confirmEmail) {
            emailMutation.mutate(emailInputs);
        } else {
            setConfirmEmailError(`emails must match!`)
        }
        
    }

        return (
    <div className='profile'>
        <h1>Change Email</h1>

        <div className='profile__form'>
            <div className='profile__form__singleSection'>
                <div className='profile__form__singleSection__inputBox'>
                    <label>Current email:</label>
                    <label>{user?.email}</label>
                </div>
                <div className='profile__form__singleSection__inputBox'>
                    <label>New Email:</label>
                    <input type='text' placeholder='Enter new email' name='email' onChange={handleEmailChange}  />
                </div>
                <div className='profile__form__singleSection__inputBox'>
                    <label>Confirm Email:</label>
                    <input type='text' placeholder='Enter again' name='confirmEmail' onChange={handleEmailChange} />
                </div>
                <span className='text-danger fw-bold'>{confirmEmailError && confirmEmailError}</span>
            </div>

            <button onClick={handleSaveEmail} className='profile__form__saveProfileBtn'>
                Save new Email
            </button>
        </div>
        
    </div>
        )
    };
   
const PasswordInfo = () => {

        const [passwordInputs, setPasswordInputs] = useState({
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        });

        const handleChange = (e) => {
            setPasswordInputs(prev => ({...prev, [e.target.name]: e.target.value}))
        };

        const passwordMutation = useMutation({
            mutationKey: ['user'],
            mutationFn: (passwordInputs) => makeRequest.put('/change-password', passwordInputs).then(res => res),
            onSuccess: (res) => {
                queryClient.invalidateQueries({ queryKey: ['user'] });
                console.log('pass change res: ', res)
                if (res.status === 201) {
                    // setInputs({
                    //     currentPassword: '',
                    //     newPassword: '',
                    //     confirmPassword: ''
                    // });
                }
                setToastText('Your password has been changed!');
                setShowSuccessToast(true);
            },
            onError: (err) => {
                setShowErrorToast(true);
                setToastText(err?.response.data || 'Password cannot be changed!')
            }

        })

        const handleSavePassword = async (e) => {
            e.preventDefault();
            passwordMutation.mutate(passwordInputs);
        }

        return (
    <div className='profile'>
        <h1>Change Password</h1>

        <div className='profile__form'>
            <div className='profile__form__singleSection'>
                <div className='profile__form__singleSection__inputBox'>
                    <label>Enter current Password:</label>
                    <input type='text' placeholder='Enter current password' name='currentPassword' onChange={handleChange} />
                </div>
                <div className='profile__form__singleSection__inputBox'>
                    <label>New Password:</label>
                    <input type='text' placeholder='Enter new password' name='newPassword' onChange={handleChange} />
                </div>
                <div className='profile__form__singleSection__inputBox'>
                    <label>Confirm Password:</label>
                    <input type='text' placeholder='Enter again' name='confirmPassword' onChange={handleChange} />
                </div>
            </div>

            <button onClick={handleSavePassword} className='profile__form__saveProfileBtn'>
                Save new Password
            </button>
        </div>
        
    </div>
        )
    };
    
  return (
<>
    <Header />
    {/* <AutohideExample />
    <AutohideExampleError /> */}
    <Row className='autoHideToast'>
                <Col xs={6}>
                    <Toast bg='success' onClose={() => setShowSuccessToast(false)} show={showSuccessToast} delay={5000} autohide>
                        <Toast.Body className='text-white'>{toastText}</Toast.Body>
                    </Toast>
                </Col>
                <Col xs={6}>
                    <Toast bg='danger' onClose={() => setShowErrorToast(false)} show={showErrorToast} delay={5000} autohide>
                        <Toast.Body className='text-white'>{toastText}</Toast.Body>
                    </Toast>
                </Col>
            </Row>

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

    <Footer />
    
</>
  )
}

export default Profile