import { Link } from 'react-router-dom';
import './App.css';

// Navigation component that provides links to different pages
function Nav()
{
	return (
		<ul id='main-nav' style={{ listStyle: 'none', padding: 0 }}>
			<li><Link to="/">Home</Link></li>
			<li><Link to="/settings">Settings</Link></li>
			<li><Link to="/stats">Statistics</Link></li>
		</ul>
	);
}

// Header component that includes the navigation
function Header()
{
    return (
    <div>
        <Nav />
    </div>
    )
}

// Exporting both Nav and Header components for use in other parts of the application
export { Nav, Header };