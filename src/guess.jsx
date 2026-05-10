import {Routes, Route, Link, useParams} from 'react-router-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import './App.css';
import { Settings, getMaxGuesses, getMinRange, getMaxRange  } from './settings.jsx';
import { Header } from './app_header.jsx';
import Game from './game.jsx';
import Stats from './stats.jsx';

// Main application component that sets up routing for:
// game, settings, and statistics pages
function MyRouteApp()
{
	return (
		<Router>
            <Routes>
                <Route path="/" element={<Game />} />
                <Route path="/home" element={<Game />} />
                <Route path="/game" element={<Game />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/stats" element={<Stats />} />
            </Routes>
		</Router>
	)
}

// Main app component that renders the routed content
function MyApp() {    
  return (
      <MyRouteApp />
  );
}

// Export the main app component as the default export
export default MyApp;
