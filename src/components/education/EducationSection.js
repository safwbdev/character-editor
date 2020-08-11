import React from "react";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  Grid,
  Container,
  Typography,
  Card,
  CardContent,
  Hidden,
} from "@material-ui/core";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const EducationSection = (props) => {
  const { education } = props;
  const settings = {
    dots: true,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1.2,
    slidesToScroll: 1,
    initialSlide: 0,
  };

  const EducationBox = ({ data }) => {
    const { image, endYear, field, name, location } = data;
    return (
      <div className="edu-box">
        <Card>
          <CardContent className="edu-content">
            <img alt="" src={image} className="edu-img" />
            <div className="block">
              <Typography component="h6" variant="h6">
                {endYear} <i className="fas fa-graduation-cap "></i>{" "}
                <Hidden smUp>
                  <br />
                </Hidden>
                {field}
              </Typography>
              <Typography variant="subtitle1">{name}</Typography>
              <Typography variant="subtitle2">{location}</Typography>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };
  const EducationSlider = (education) => {
    return (
      <Slider {...settings}>
        {education &&
          education.map((data, index) => {
            return <EducationBox key={index} data={data} />;
          })}
      </Slider>
    );
  };

  const EducationList = (education) => {
    return (
      <>
        {education &&
          education.map((data, index) => {
            return (
              <Grid key={index} item xs={12} sm={6}>
                <EducationBox key={index} data={data} />
              </Grid>
            );
          })}
      </>
    );
  };

  return (
    <div className="education-section">
      <Grid item xs={12} className="skill-box">
        <Typography variant="h4" component="h4">
          Education
        </Typography>
      </Grid>
      <Hidden only="xs">
        <Container maxWidth="lg">
          <Grid container spacing={0} className="edu-slider">
            {EducationList(education)}
          </Grid>
        </Container>
      </Hidden>
      <Hidden smUp>
        <Grid container spacing={0} className="edu-slider">
          {EducationSlider(education)}
        </Grid>
      </Hidden>
    </div>
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
