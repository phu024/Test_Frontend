import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";

import Toolbar from "@material-ui/core/Toolbar";

import Typography from "@material-ui/core/Typography";

import IconButton from "@material-ui/core/IconButton";

import MenuIcon from "@material-ui/icons/Menu";

import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  root: { flexGrow: 1 },

  menuButton: { marginRight: theme.spacing(2) },

  title: { flexGrow: 1 },
  user: {
    marginRight: theme.spacing(2),
  },

  navlink: { color: "white", textDecoration: "none" },
}));

const message = "Phuwadon Decharam";

function Navbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>

          <Link className={classes.navlink} to="/">
            <Typography variant="h6" className={classes.title}>
              ระบบจัดการคนไข้นอก
            </Typography>
          </Link>

          
          
            <div  >
              <Grid container wrap="nowrap"  spacing={1}>
                <Grid item>
                  <Avatar>P</Avatar>
                </Grid>
                <Grid item xs={12}>
                  <Typography noWrap>{message}</Typography>
                </Grid>
              </Grid>
            </div>
          


        </Toolbar>
      </AppBar>
    </div>
  );
}
export default Navbar;
