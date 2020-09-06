import React from 'react'
import Book from '@material-ui/icons/ImportContactsOutlined';
import Call from '@material-ui/icons/CallOutlined';
import Account from '@material-ui/icons/AccountCircleOutlined';
import Bell from '@material-ui/icons/NotificationsNoneOutlined';
import '../Styles/Navabr.css'

function Navbar() {
  return (
    <>
      <nav className="navbar">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a href="/login" className="nav-link">
                <Book />
                <span className="link-text">Diary</span> 
              </a>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link">
                <Account />
                <span className="link-text">Login</span> 
              </a>
            </li>
            <li className="nav-item">
              <a href="/" className="nav-link">
                <Bell />
                <span className="link-text">Notification</span> 
              </a>
            </li>
            <li className="nav-item">
              <a href="/" className="nav-link">
                <Call />
                <span className="link-text">Contact</span> 
              </a>
            </li>
          </ul>
      </nav> 
    </>
  )
}

export default Navbar
