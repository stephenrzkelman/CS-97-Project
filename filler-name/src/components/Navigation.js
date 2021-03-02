import './App.css';
import {Link} from 'react-router-dom';

function Navigation() {

    const navigationStyle = {
        color: 'white'
    };

    return (
        <nav>
            <h3>Whatever logo here</h3>
            <ul className="Navigation_links">
                <Link style={navigationStyle} to='/Home'>
                <li>Home</li>
                </Link>
                <Link style={navigationStyle} to= '/Profile'>
                <li>Profile</li>
                </Link>
                <Link style={navigationStyle} to= '/Feed'>
                <li>Feed</li>
                </Link>
                <Link style={navigationStyle} to= '/Calendar'>
                <li>Calendar</li>
                </Link>
                <Link style={navigationStyle} to='Workout'>
                <li>Workout</li>
                </Link>
                {/* <Link to='Login'>
                <li>Login</li>
                </Link>
                <li>Logout</li> */}

            </ul>
        </nav>
    );
}

export default Navigation;