import React from "react";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Avatar,
  Hidden,
} from "@material-ui/core";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const WorkSection = (props) => {
  const { work } = props;
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    // slidesToScroll: 1,
    // initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          //   slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const WorkBox = ({ data }) => {
    const {
      image,
      startDate,
      endDate,
      field,
      name,
      location,
      role,
      desc,
    } = data;
    return (
      <div className="edu-box">
        <Card>
          <CardContent className="edu-content">
            <Avatar alt="" src={image} className="edu-img" />
            <div className="block">
              <Typography component="h6" variant="h6">
                {role} | {startDate} - {endDate}
              </Typography>
              <Typography variant="subtitle1">{name}</Typography>
              <Typography variant="subtitle2">{location}</Typography>
              <Typography variant="p">{desc}</Typography>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };
  const WorkSlider = (work) => {
    return (
      <Slider {...settings}>
        {work &&
          work.map((data, index) => {
            return <WorkBox key={index} data={data} />;
          })}
      </Slider>
    );
  };

  const WorkList = (work) => {
    return (
      <>
        {work &&
          work.map((data, index) => {
            return (
              <Grid key={index} item xs={12} sm={6}>
                <WorkBox key={index} data={data} />
              </Grid>
            );
          })}
      </>
    );
  };

  return (
    <>
      <Grid item xs={12} className="skill-box">
        <Typography variant="h4" component="h4">
          Work Experience
        </Typography>
      </Grid>
      <Grid container spacing={0}>
        <Hidden only="xs">{WorkList(work)}</Hidden>
        <Hidden smUp>{WorkSlider(work)}</Hidden>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    work: state.firestore.ordered.work,
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "work", orderBy: ["endDate", "desc"] }])
)(WorkSection);
