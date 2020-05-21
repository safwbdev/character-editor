import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <ul className="right">
      <li>
        <NavLink to="/create-project">New Project</NavLink>
      </li>
      <li>
        <NavLink to="/create-skill">New Skill</NavLink>
      </li>
      <li>
        <NavLink to="/create-work">New Work</NavLink>
      </li>
      <li>
        <NavLink to="/create-edu">New Education</NavLink>
      </li>
    </ul>
  );
};

export default Navbar;
