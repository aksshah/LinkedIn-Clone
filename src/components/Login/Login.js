import React, {useState} from 'react'
import './Login.css';
import {auth} from '../../firebase';
import {login} from '../../app/userSlice';
import {useDispatch} from 'react-redux';

function Login() {
    
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [name,setName] = useState('');
    const dispatch = useDispatch();
    
    const register = () => {
        if(!name){
            return alert('Please enter a full name.');
        }
        auth.createUserWithEmailAndPassword(email, password)
        .then((userAuth) => {
            userAuth.user
            .updateProfile({
                displayName: name,
            })
            .then(()=>{
                dispatch(login({
                    email:userAuth.user.email,
                    uid:userAuth.user.uid,
                    displayName:name,
                }));
                console.log('registration successfull');
            })
        }).catch((error)=>{alert(error)});
    }
    const logIntoApp = (e) => {
        e.preventDefault();

        auth.signInWithEmailAndPassword(email,password)
        .then(userAuth => {
            dispatch(login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: userAuth.user.displayName,
                profileUrl: userAuth.user.photoURL
            }))
        }).catch(error=>alert(error));
    }

    return (
        <div className="login">
           <img src={process.env.PUBLIC_URL + '/assets/LI-Logo.png'} alt="logo"/>
           <form>
               <input value={name} onChange={e => setName(e.target.value)} placeholder='Full name (Required, if registering)' type="text"/>
               <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email"/>
               <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password"/>
               <button type="submit" onClick={logIntoApp}>Sign In</button>
           </form>
           <p>
                Not a member?
                <span className="login__register" onClick={register}>
                    Register Now
                </span>
           </p>
        </div>
    )
}

export default Login
