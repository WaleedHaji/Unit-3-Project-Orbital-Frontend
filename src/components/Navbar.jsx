
import { Link } from 'react-router'

function Navbar({ user, handleLogout }) {
  return (
    <nav className="navbar">

      <Link to="/" className="navbar-logo">
        ORBITAL
      </Link>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/planets">Planets</Link>
        <Link to="/missions">Space Missions</Link>
        <Link to="/astronauts">Astronauts</Link>
      </div>

      <div className="navbar-buttons">
        {user ? (
          <button className="navbar-logout" onClick={handleLogout}>
            Sign Out
          </button>
        ) : (
          <>
            <Link to="/sign-in" className="navbar-signin">
              Sign In
            </Link>

            <Link to="/sign-up" className="navbar-signup">
              Sign Up
            </Link>
          </>
        )}
      </div>

    </nav>
  )
}

export default Navbar
