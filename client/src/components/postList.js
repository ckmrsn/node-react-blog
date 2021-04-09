import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { Grid, Button } from "@material-ui/core";
import Post from "./Post";
import Gridthree from "../images/grid_three.svg";
import Gridfour from "../images/grid_four.svg";

const useStyles = makeStyles((theme) => ({
  layoutShifter: {
    float: "right",
    margin: theme.spacing(2),
  },
}));

const PostList = () => {
  const posts = useSelector((state) => state.posts.posts);
  const [layout, setlayout] = useState("Gridthree");

  const calculateMd = () => {
    return layout === "Gridthree" ? 4 : 3;
  };

  const classes = useStyles();
  return (
    <>
      <div className={classes.layoutShifter}>
        <Button
          variant='text'
          size='small'
          onClick={() => setlayout("Gridthree")}
        >
          <img
            src={Gridthree}
            alt='Three Colums'
            style={{ background: layout === "Gridthree" ? "#ccc" : "" }}
          />
        </Button>
        <Button
          variant='text'
          size='small'
          onClick={() => setlayout("Gridfour")}
        >
          <img
            src={Gridfour}
            alt='Four Colums'
            style={{ background: layout === "Gridfour" ? "#ccc" : "" }}
          />
        </Button>
      </div>
      <Grid container spacing={2} alignContent='stretch'>
        {posts.length > 0 &&
          posts.map((post) => (
            <Grid item key={post?._id} xs={12} md={calculateMd()}>
              <Post {...post} />
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default PostList;
