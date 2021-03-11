import {Link} from 'react-router-dom';
import './Navigation.css';
import eggy from '../logo.png';
function Navigation(props) {
    return (
        <nav>
            <img src = {eggy} height="100px" width="100px"/>
            <ul className='nav-bar'>
                <Link to='/home'>
                    <li>Home</li>
                </Link>
                {props.authenticated && <>
                <Link to= '/explore'>
                    <li>Explore</li>
                </Link>
                <Link to= '/calendar'>
                    <li>Calendar</li>
                </Link>
                <Link to='/profile'>
                    <li>Profile</li>
                </Link></>}
                <Link id="nav-bar-auth" to={props.authenticated ? '/logout' : '/login'}>
                    <li>{props.authenticated ? 'Logout' : 'Login'}</li>
                </Link>
            </ul>
        </nav>
    );
}

export default Navigation;
