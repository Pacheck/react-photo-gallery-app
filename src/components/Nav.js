import React from 'react';
// import { NavLink } from 'react-router-dom';

const Nav = ({ onSearch }) => (
  <nav className="main-nav">
    <ul>
      <li onClick={() => onSearch('cats')}>
        {/* <NavLink to="/cats">Cats</NavLink> */}
        <p>Cats</p>
      </li>
      <li onClick={() => onSearch('dogs')}>
        {/* <NavLink to="/dogs">Dogs</NavLink> */}
        <p>Dogs</p>
      </li>
      <li onClick={() => onSearch('computers')}>
        {/* <NavLink to="/computers">Computers</NavLink> */}
        <p>Computers</p>
      </li>
    </ul>
  </nav>
);

export default Nav;
