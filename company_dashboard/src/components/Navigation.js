import React from 'react';
import { Link } from 'react-router-dom';

import SignOutButton from './SignOut';
import * as ROUTES from '../constants/routes';
import './Navigation.css'

const Navigation = () => (
  <div className="navigation">
    <img src="https://i.ibb.co/Mpy1WhB/3029ba78-770c-49a3-aaa6-6a6cfc58b56c.png" alt="logo" />
    <div className="navigation-links">
      <Link to={ROUTES.CHAT_DASHBOARD}>Chat Dashboard</Link>
      <Link to={ROUTES.ADMIN_SETTINGS}>Account</Link>
      <Link to={ROUTES.LANDING}>Log Out</Link>
    </div>
  </div>
);

export default Navigation;

