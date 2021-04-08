import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  CssBaseline,
  Container,
  Grid,
  AppBar,
  Typography,
  Button,
  IconButton,
  Toolbar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PenIcon from "@material-ui/icons/Create";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import PostList from "./components/PostList";
import AddPostForm from "./components/AddPostForm";
import { fetchPosts } from "./actions/post";

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
  container: {
    marginTop: theme.spacing(3),
  },
}));

const App = () => {
  const dispatch = useDispatch();
  const [open, setopen] = useState(false);
  const handleOpen = () => {
    setopen(true);
  };
  const handleClose = () => {
    setopen(false);
  };

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <Container maxWidth='lg'>
        <AppBar position='static' color='inherit' elevation={1}>
          <Toolbar>
            <IconButton
              edge='start'
              className={classes.container}
              color='inherit'
            />
            <Typography
              variant='h6'
              color='secondary'
              className={classes.title}
            >
              <a href='/'> Blogify </a>
            </Typography>

            <Button
              color='primary'
              variant='outlined'
              startIcon={<PenIcon />}
              onClick={handleOpen}
            >
              Yeni Yazı
            </Button>
          </Toolbar>
        </AppBar>
        <Grid container className={classes.container}>
          <Grid item xs='12'>
            <Router>
              <Switch>
                <Route exact path='/posts' component={PostList} />
              </Switch>
              <Redirect from='/' to='/posts' />
            </Router>
          </Grid>
        </Grid>

        <AddPostForm open={open} handleClose={handleClose} />
      </Container>
    </>
  );
};

export default App;
