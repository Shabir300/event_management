import React, {useState} from 'react'
import './register.scss';
import { makeRequest } from '../../axios.js';

const Register = () => {

    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}));
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const res = await makeRequest.post('/register', inputs);
            console.log('response', res)
            return res;
        } catch(err) {
            return err;
        }

    };

  return (
    <div className='register'>

        <div>
            <img src='/static/Logo.png' alt='logo' />
            <h1>Discover tailored <br />events.<br />
            Sign up for<br /> personalized <br />recommendations today!
            </h1>
        </div>

        <div>
           <a href='http://localhost:3000'> <i class="bi bi-x" ></i></a>
            <h1>Create Account</h1>
            <form>
                <div>
                    <label>Full name</label>
                    <input type='text' placeholder='Enter your full name' name='name' onChange={handleChange} />
                </div>
                <div>
                    <label>E-mail Address</label>
                    <input type='text' placeholder='Enter your email' name='email' onChange={handleChange} />
                </div>
                <div>
                    <label>Password</label>
                    <input type='text' placeholder='Enter your password' name='password' onChange={handleChange} />
                </div>
                <div>
                    <button onClick={handleRegister}>Create Account</button>
                </div>
                <div>
                    Already have an account? <a href='http://localhost:3000/login'>Log In</a>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Register