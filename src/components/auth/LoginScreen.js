import React from 'react'
import { Link } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth'
import { useSelector } from 'react-redux'

export const LoginScreen = () => {

    const dispatch = useDispatch();
    const {ui} = useSelector(state => state);
    const [formValues,handleInputChange] =useForm({
        email : '1@1.com',
        password : '123456'
    });

    const {email,password} = formValues;
    const handleLogin = (e)=>{
        e.preventDefault();    
        dispatch(startLoginEmailPassword(email,password));
    }

    const handleGoogleLogin = ()=>{
        dispatch(startGoogleLogin());

      
    }

    
    return (
        <div>
           
           <h3 className='auth__title'>Login</h3>
           <form onSubmit={handleLogin}>
               <input type="text" placeholder='Email'  name='email' className='auth__input' value={email} onChange={handleInputChange} autoComplete='off' />
               <input type="password" placeholder='Password' name='password' className='auth__input' value={password} onChange={handleInputChange} />
               <button className='btn btn-primary btn-block'  style={{cursor: ui.loading && "no-drop"}} disabled={ui.loading} type='submit'>Login</button>              
               <p className='auth__social-network'>login with social networks</p>
               <div className="google-btn" onClick={handleGoogleLogin}>
                    <div className="google-icon-wrapper">
                        <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                    </div>
                    <p className="btn-text">
                        <b>Sign in with google</b>
                    </p>
                </div>

            <Link to="/auth/register" className='link' >
                Create new Account
            </Link>

           </form>
        </div>
    )
}
