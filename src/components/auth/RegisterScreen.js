import React from 'react'
import { Link } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import { useForm } from '../../hooks/useForm'
import validator from 'validator'
import { RemoveError, setError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {
    const dispatch = useDispatch();
    const {ui} = useSelector(state => state);

   

    const [formValues,handleInputChange] =useForm({
        name : '',
        email :'',
        password : '',
        password2 : ''
    });

    const {name,email,password,password2} = formValues;
    const handleRegister = (e)=>{
        e.preventDefault();
        //console.log(name,email,password,password2);
        if(isFormValid())
        {
            
           dispatch(startRegisterWithEmailPasswordName(email,password,name))
        }else{
            
        }
    }

    const isFormValid =()=>{
        if(name.trim().length === 0)
        {
            dispatch(setError("Name is requiered"));
            
            return false
        }else if(!validator.isEmail(email)){
           
            dispatch(setError("Email is required"));
            return false;
        }else if(password !== password2 || password.length < 5 )
        {
            dispatch(setError("Password error"));
            
            return false;
        }
        dispatch(RemoveError());
        return true;
    }
    return (
        <div>
            {
                ui.msgError &&
                (
                    <div className='auth__alert-error'>{ui.msgError}</div>
                )
            }
            
           <h3 className='auth__title'>Register</h3>
           <form onSubmit={handleRegister}>
                <input type="text" placeholder='Nanme'  name='name' value={name} onChange={handleInputChange} autoComplete='off' className='auth__input' autoComplete='off' />
                <input type="text" placeholder='Email'  name='email'  value={email} onChange={handleInputChange} autoComplete='off' className='auth__input' autoComplete='off' />
                <input type="password" placeholder='Password' name='password'  value={password} onChange={handleInputChange}  className='auth__input' />
                <input type="password" placeholder='Confirm password' name='password2' value={password2} onChange={handleInputChange} className='auth__input' />
                <button className='btn btn-primary btn-block  mb-5' type='submit'>Register</button>                                         
            <Link to="/auth/login" className='link' >
                Already Register?
            </Link>

           </form>
        </div>
    )
}
