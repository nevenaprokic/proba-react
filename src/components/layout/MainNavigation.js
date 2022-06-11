import {Link} from 'react-router-dom';
import classes from './MainNavigation.module.css';
import React from 'react';
import logo from '../../logo2.png';
import { useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LoginIcon from '@mui/icons-material/Login';

function MainNavigation(){
    useEffect(() => {
            localStorage.removeItem("user");
        }, []);
    return <header className={classes.header}>
        <div><img src={logo} /></div>
        <div className={classes.logo}></div>
        <nav>
            <ul>
                <li><Link to='/home-page/unauth-user'><SearchIcon style={{ verticalAlign: '-4' }} /> Search entities</Link></li> 
                <li><Link to='/registration'><HowToRegIcon style={{ verticalAlign: '-4' }} /> Sign up</Link></li>
                <li><Link to='/log-in'><LoginIcon style={{ verticalAlign: '-4' }} /> Log in</Link></li>
            </ul>
        </nav>
    </header>
}

export default MainNavigation;