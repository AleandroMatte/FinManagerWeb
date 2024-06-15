import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { SidebarData, LogoutButton } from './SidebarData.jsx';
import './navbar.css';
import { IconContext } from 'react-icons';
import { Button, useToast } from '@chakra-ui/react';
import handlePostResponse from '../ToastMessage/Toast';
import useTokenCheck from '../../custom_hooks/index.jsx';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const toast = useToast();
  const showSidebar = () => setSidebar(!sidebar);
  const navigate = useNavigate();

  useTokenCheck();

  async function logout() {
    try {
      localStorage.removeItem('user_token');
    } catch {}
    finally{
      handlePostResponse(toast,true,"Logout Feito","Logout Feito Com sucesso")
      navigate("/")

    }
  }
  return (
    <>
      <IconContext.Provider value={{ color: '#ffffff' }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Button  className="menu-bars">
                <AiIcons.AiOutlineClose color='black'/>
              </Button>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path? item.path : "/#"}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
            <li className={LogoutButton.cName} onClick={logout}>
              <a>
                {LogoutButton.icon}
                <span>{LogoutButton.title}</span>
              </a>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
