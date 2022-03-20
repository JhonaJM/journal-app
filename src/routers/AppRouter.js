import { getAuth,onAuthStateChanged  } from 'firebase/auth';
import React, { useEffect,useState } from 'react'
import { useDispatch } from 'react-redux';
import {
    Routes ,
    Route,
  } from "react-router-dom";

import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import {login} from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { startLoadingNotes } from '../actions/notes';
  
export const AppRouter = () => {

  const dispatch = useDispatch();

  const [checking, setchecking] = useState(true);
  const  [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {   
      if(user?.uid){
        dispatch(login(user.uid,user.displayName));
        
        dispatch(startLoadingNotes(user.uid));
        setIsLoggedIn(true);
      }else
        setIsLoggedIn(false);

      setchecking(false);
    });
    
  }, [dispatch,setchecking,setIsLoggedIn])

    if(checking){
      return(
        <h1>Espere...</h1>
      )
    }

 
    return (             
          <Routes>
            <Route path="/auth/*" element = {
              <PublicRoute isAuth={isLoggedIn}>
                <AuthRouter/>
              </PublicRoute>
            } />
            <Route path="/" element = {
              <PrivateRoute isAuth={isLoggedIn}>
                <JournalScreen/>
              </PrivateRoute>
              }/>
            <Route path="*" element={
              <PublicRoute isAuth={isLoggedIn}>
                <AuthRouter/>
             </PublicRoute>
            } />                   
          </Routes> 
    )
}
