import React, {useContext, useState} from 'react'
import './login.scss';
import {AuthContext} from '../../context/authContext.js';
import {useNavigate} from 'react-router-dom'

const Login = () => {

    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        email: '', 
        password: '',
    });

    const handleChange = (e) => {
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(inputs);
            navigate('/')
            
        } catch(err) {
            return err;
        }
    };


  return (
    <div className='login'>

        <div>
            <img src='/static/Logo.png' alt='logo' />
            <h1>Discover tailored <br />events.<br />
            Sign in for<br /> personalized <br />recommendations today!
            </h1>
        </div>

        <div>
            <a href='http://localhost:3000'> <i class="bi bi-x" ></i></a>
            <h1>Login</h1>
            <form>
                <div>
                    <label>E-mail Address</label>
                    <input type='text' placeholder='Enter your email' name='email' 
                    onChange={handleChange}
                 />
                </div>
                <div>
                    <label>Password</label>
                    <input type='text' placeholder='Enter your password' name='password' 
                    onChange={handleChange}
                 />
                </div>
                <div>
                    <button onClick={handleLogin}
                    >Login</button>
                </div>
                <div>
                    Don't have an account? <a href='http://localhost:3000/register'>Sign Up</a>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login;