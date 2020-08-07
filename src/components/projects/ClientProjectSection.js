import React from "react";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  Grid,
  Container,
  Typography,
  Chip,
  Card,
  Button,
  CardMedia,
  CardActions,
  makeStyles,
  CardContent,
  //   Hidden,
} from "@material-ui/core";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const useStyles = makeStyles({
  root: {
    maxWidth: "95%",
    maxHeight: "inherit",
  },
  media: {
    height: 300,
  },
  frameworks: {
    display: "block",
  },
});

const ProjectSection = ({ getData }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: { arrows: false, slidesToShow: 1.2, slidesToScroll: 1 },
      },
    ],
  };

  const ProjectBox = ({ data }) => {
    const { image, title, desc, skillType, demo, github } = data;
    const classes = useStyles();
    return (
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={image}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {desc}
          </Typography>
        </CardContent>
        <CardActions className={classes.frameworks}>
          {skillType &&
            skillType.map((data, index) => {
              const content = (
                <span>
                  <i className={data.icon}></i> <>{data.name}</>
                </span>
              );
              return <Chip key={index} size="medium" label={content}></Chip>;
            })}
        </CardActions>
        <CardActions>
          {demo ? (
            <a href={demo}>
              <Button variant="contained">Visit Site</Button>
            </a>
          ) : null}
          {github ? (
            <a href={github}>
              <Button variant="contained">Github</Button>
            </a>
          ) : null}
        </CardActions>
      </Card>
    );
  };
  const ProjectSlider = (projectData) => {
    return (
      <Slider {...settings}>
        {projectData &&
          projectData.map((data, index) => {
            return <ProjectBox key={index} data={data} />;
          })}
      </Slider>
    );
  };

  return (
    <div className="education-section">
      <Grid item xs={12} className="skill-box">
        <Typography variant="h4" component="h4">
          Client Projects
        </Typography>
      </Grid>
      <Container maxWidth="lg">
        <Grid container spacing={0} className="edu-slider">
          {ProjectSlider(getData)}
        </Grid>
      </Container>
    </div>
  );
};

export default ProjectSection;
