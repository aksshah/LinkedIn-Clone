import './App.css';
import {login, logout, selectUser} from './app/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import Login from './components/Login/Login';
import { auth } from './firebase';
import React,{Fragment, useEffect} from 'react';
import Feed from './components/Feed/Feed';
import Header from './components/Header/Header';
import Widgets from './components/Widgets/Widgets';
import Sidebar from './components/Sidebar/Sidebar';


function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(!user){
      dispatch(logout());
    }else{
      dispatch(
        login({
          email:user.email,
          name:user.name
        })
      );
    }

    auth.onAuthStateChanged((userAuth)=>{
      if(userAuth){
        //user is logged in
        localStorage.setItem('userId', userAuth.uid);
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoUrl: userAuth.photoURL
          })
        );
      }else{
        localStorage.removeItem('userId');
        dispatch(logout());
      }
    });
  },[])

  return (
    <div className="app"> 
     {!user  
        ? (<Login/>) 
        : (
            <Fragment>
              <Header/>
              <div className="app__body">
                  <Sidebar/>
                  <Feed />
                  <Widgets />
              </div>
            </Fragment>
          )
     }
    </div>
  );
}

export default App;
