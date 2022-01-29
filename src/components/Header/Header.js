import React from 'react';
import './Header.css';
import HeaderOption from './HeaderOption';

// Importing Material UI icons
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatIcon from '@mui/icons-material/Chat';

import { useDispatch } from 'react-redux';
import {useSelector} from "react-redux";
import { logout } from '../../app/userSlice';
import {selectUser} from '../../app/userSlice';
import { auth } from '../../firebase';




export default function Header() {

    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    const logoutOfApp = () => {
        dispatch(logout());
        auth.signOut();
    }


    return (
        <div className="header">
            <div className="header__left">
                <img src={process.env.PUBLIC_URL + '/assets/linkedin.png'} alt="logo"/>
                <div className="header__search">
                    <SearchIcon/>
                    <input type="text"></input>
                </div>
            </div>
            <div className="header__right">
                <HeaderOption Icon={HomeIcon} title="Home"/>
                <HeaderOption Icon={SupervisorAccountIcon} title="My Network"/>
                <HeaderOption Icon={BusinessCenterIcon} title="Jobs"/>
                <HeaderOption Icon={ChatIcon} title="Messaging"/>
                <HeaderOption Icon={NotificationsIcon} title="Notifications"/>
                {user &&
                    <HeaderOption avatar={true} title="Logout" onClick={logoutOfApp} />
                }
            </div>
        </div> 
    )
    
  
}
