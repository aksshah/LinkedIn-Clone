import React from 'react'
import "./HeaderOption.css";
import {Avatar} from '@material-ui/core';
import {useSelector} from "react-redux";
import {selectUser} from '../../app/userSlice';

function HeaderOption({avatar, title, Icon, onClick}) {

    const user = useSelector(selectUser);
    
    return (
        <div className="headerOption" onClick={onClick}>
            {Icon && <Icon className="headerOption__icon"/>}

            {avatar && (
                <Avatar src={user.photoUrl} className="headerOption__icon">
                </Avatar>
            )}
            
            <h3 className="headerOption__title">{title}</h3>
        </div>
    )
}

export default HeaderOption
