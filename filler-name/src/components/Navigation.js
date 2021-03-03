import {Link} from 'react-router-dom';
import './Navigation.css';

function Navigation(props) {
    return (
        <nav>
            <h3>Whatever logo here</h3>
            <ul className='nav-bar'>
                <Link to='/home'>
                    <li>Home</li>
                </Link>
                {props.authenticated && <>
                <Link to= '/feed'>
                    <li>Feed</li>
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