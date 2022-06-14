import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './Menu.css'

export default props => {

  let cosm = false;
  if (cosm) {
    return (
      <Menu right >
        <a className="menu-item" href="/userhomepage" >
          דף הבית
        </a>
        <a className="menu-item" href="/salads">
          אזור אישי
        </a>
        <a className="menu-item" href="/maslulinfo">
          מסלולים
        </a>
      </Menu>
    );
  }
  else
  {
    return (
      <Menu right >
        <a className="menu-item" href="/userhomepage" >
          דף הבית
        </a>
        <a className="menu-item" href="/salads">
          אזור אישי
        </a>
        <a className="menu-item" href="/maslulinfo">
          מסלולים
        </a>
        <a className="menu-item" href="/searchcos">
          חיפוש קוסמטיקאית
        </a>
      </Menu>
    );
  }
  
};