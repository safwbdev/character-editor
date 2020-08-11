import React from "react";
import { Link } from "react-router-dom";
import Links from "./Links";
import {
  Hidden,
  makeStyles,
  AppBar,
  Toolbar,
  Container,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
const Navbar = () => {
  const classes = useStyles();
  return (
    <Hidden only="xs">
      <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar>
            <Link to="/" className={classes.title}>
              Character Editor
            </Link>
            <Links />
          </Toolbar>
        </Container>
      </AppBar>
    </Hidden>
  );
};

export default Navbar;
