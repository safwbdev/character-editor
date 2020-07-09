import React from "react";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import { Grid, Typography, Card, CardContent, Avatar } from "@material-ui/core";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const EducationSection = (props) => {
  const { education } = props;
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

  const EducationBox = ({ data }) => {
    const { image, endYear, field, name, location } = data;
    return (
      <div className="edu-box">
        <Card>
          <CardContent className="edu-content">
            <Avatar alt="" src={image} className="edu-img" />
            <div className="block">
              <Typography component="h6" variant="h6">
                {endYear} | {field}
              </Typography>
              <Typography variant="subtitle1">{name}</Typography>
              <Typography variant="subtitle2">{location}</Typography>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} className="skill-box">
        <Typography variant="h4" component="h4">
          Education
        </Typography>
      </Grid>
      <Grid item xs={12} className="">
        <Slider {...settings}>
          {education &&
            education.map((data, index) => {
              return <EducationBox key={index} data={data} />;
            })}
        </Slider>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    education: state.firestore.ordered.education,
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "education", orderBy: ["endYear", "desc"] }])
)(EducationSection);
