import React from "react";
import Chip from "@material-ui/core/Chip";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
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

  const ShowEducation = ({ title, skillType, styleCclass }) => {
    return (
      <>
        {education &&
          education.map((data) => {
            return (
              <div className="edu-box">
                lol
                {/* <Card>
                  <CardContent className="edu-content">
                    <Avatar alt="" src={data.photoUrl} className="edu-img" />
                    <div className="block">
                      <Typography component="h6" variant="h6">
                        {data.endYear} | {data.field}
                      </Typography>
                      <Typography variant="subtitle1" variant="subtitle1">
                        {data.name}
                      </Typography>
                      <Typography variant="subtitle2" variant="subtitle2">
                        {data.location}
                      </Typography>
                    </div>
                  </CardContent>
                </Card> */}
              </div>
            );
          })}
      </>
    );
  };

  return (
    <Grid container spacing={12}>
      <Grid item xs={12} className="skill-box">
        <Typography variant="h4" component="h4">
          Education
        </Typography>
      </Grid>
      <Grid item xs={12} className="">
        <Slider {...settings}>
          {/* <ShowEducation /> */}

          {education &&
            education.map((data) => {
              return (
                <div className="edu-box">
                  <Card>
                    <CardContent className="edu-content">
                      <Avatar alt="" src={data.photoUrl} className="edu-img" />
                      <div className="block">
                        <Typography component="h6" variant="h6">
                          {data.endYear} | {data.field}
                        </Typography>
                        <Typography variant="subtitle1" variant="subtitle1">
                          {data.name}
                        </Typography>
                        <Typography variant="subtitle2" variant="subtitle2">
                          {data.location}
                        </Typography>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
        </Slider>
        {/* <Slider {...settings}>
          <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
          <div>
            <h3>7</h3>
          </div>
          <div>
            <h3>8</h3>
          </div>
        </Slider> */}
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
