import Swal from 'sweetalert2'
import { getAuth, signInWithPopup,createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword  } from 'firebase/auth';
import {  googleAuthProvider } from '../firebase/firebaseConfig';
import {Types} from '../types/Types';
import { FinishLoading, StartLoading } from './ui';
import { logOutNote } from './notes';

export const startLoginEmailPassword = (email,password)=>{
    
    return (dispatch)=>{
        dispatch(StartLoading());
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then(({user}) => {                     
            dispatch(login(user.uid,user.displayName));
           dispatch(FinishLoading());

        })
        .catch((error) => {
            dispatch(FinishLoading());
             //const errorCode = error.code;
             const errorMessage = error.message;

             //console.log(errorCode);
             //console.log(errorMessage);
             Swal.fire({
                title: 'ups!',
                text: errorMessage,
                icon: 'error',
                //timer:3000,
                confirmButtonColor: '#2E86C1',
                confirmButtonText:'Entendido'
              })
        });
    }

    // return (dispatch)=>{
    //     setTimeout(() => {
    //         dispatch(login(1004,'Lila'))
    //     }, 3500);
    // }
}

export const startRegisterWithEmailPasswordName =(email,password,name)=>{
    return (dispatch)=>{
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then( async ({user}) =>{
                await updateProfile(user,{displayName:name});
                dispatch(login(user.uid,user.displayName))
            }).catch(e=>{

                console.log(e);
                Swal.fire({
                    title: 'ups!',
                    text: e,
                    icon: 'error',
                    //timer:3000,
                    confirmButtonColor: '#2E86C1',
                    confirmButtonText:'Entendido'
                  })
            });
    }
}

export const startGoogleLogin = () =>{
    return (dispatch) =>{
        const auth = getAuth();
        signInWithPopup(auth, googleAuthProvider)
            .then(({user}) =>{
                dispatch(login(user.uid, user.displayName))
            });
    }
}

export const login = (uid,displayName) =>{
    return{
        type:Types.login,
        payload:{
            uid,
            displayName
        }
    }
}

export const startLogout = () =>{
    return async (dispatch)=>{
        
        const auth = getAuth();
      await auth.signOut(auth).then(() => {
            dispatch(logout());
            dispatch(logOutNote());
        }).catch((error) => {
            Swal.fire({
                title: 'ups!',
                text:  error.message,
                icon: 'error',
                //timer:3000,
                confirmButtonColor: '#2E86C1',
                confirmButtonText:'Entendido'
              })
        });
    }
}

export const logout = ()=>({
    type : Types.logout
})