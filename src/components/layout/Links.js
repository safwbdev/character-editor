import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const Navbar = () => {
  return (
    <>
      <NavLink to="/list">
        <Button>List</Button>
      </NavLink>
      <NavLink to="/edit-profile">
        <Button>Profile</Button>
      </NavLink>
      <NavLink to="/create-project">
        <Button>
          <AddCircleIcon /> Project
        </Button>
      </NavLink>
      <NavLink to="/create-skill">
        <Button>
          <AddCircleIcon /> Skill
        </Button>
      </NavLink>
      <NavLink to="/create-work">
        <Button>
          <AddCircleIcon /> Work
        </Button>
      </NavLink>
      <NavLink to="/create-education">
        <Button>
          <AddCircleIcon /> Education
        </Button>
      </NavLink>
    </>
  );
};

export default Navbar;
