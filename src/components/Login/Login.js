import React, {useState, useEffect} from 'react'
import './Login.css';
import {auth} from '../../firebase';
import {login} from '../../app/userSlice';
import {useDispatch} from 'react-redux';

function Login() {
    
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [name,setName] = useState('');
    const dispatch = useDispatch();
    
    useEffect(() => {
        document.body.style.backgroundColor = "white";
    },[]);
    
    const register = (e) => {
        e.preventDefault();
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
        <div className="login-wrapper">
            <img src={process.env.PUBLIC_URL + '/assets/LI-Logo.png'} alt="logo"/>
            <div className="illustration-container">
                <img src={process.env.PUBLIC_URL + '/assets/illustration-min.jpg'} alt="illustration"/>
            </div>
            <div className="login">
            <h1 className="welcome-headline">Welcome to your professional community</h1>
            <form>
                <input value={name} onChange={e => setName(e.target.value)} placeholder='Full name (Required, if registering)' type="text"/>
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email"/>
                <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password"/>
                <button type="submit" onClick={logIntoApp}>Sign in</button>
            </form>
                    <p><span>or</span></p>
                    <a className="login__register" href="/" onClick={register}>
                        Register Now
                    </a>
                    <p className="credit">Made by <a href="https://www.akshilshah.com" rel="noreferrer" target="_blank" title="Akshil Shah - LinkedIn">Akshil Shah</a></p>
            </div>
        </div>
    )
}

export default Login
