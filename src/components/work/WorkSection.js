import React from "react";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  // Avatar,
  Hidden,
  Container,
} from "@material-ui/core";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import WorkDialog from "./WorkDialog";

const WorkSection = (props) => {
  const { work } = props;
  const settings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1.2,
    slidesToScroll: 1,
    initialSlide: 0,
  };

  const getWorkDate = (date) => {
    const d = new Date(date);
    const newDate = moment(d).format("MMM YYYY");
    return newDate;
  };
  const WorkBox = ({ data }) => {
    const {
      image,
      startDate,
      endDate,
      //   field,
      name,
      location,
      role,
      desc,
    } = data;
    return (
      <div className="edu-box">
        <Card>
          <CardContent className="edu-content">
            {/* <Avatar alt="" src={image} className="edu-img" /> */}
            <img alt="" src={image} className="edu-img" />
            <div className="block">
              <Typography component="h6" variant="h6">
                {role}
              </Typography>
              <Typography variant="subtitle1" className="company">
                {name}
              </Typography>
              <Typography variant="subtitle1" className="">
                {getWorkDate(startDate)} - {getWorkDate(endDate)}
              </Typography>
              <Typography variant="subtitle2">{location}</Typography>
              <Hidden only="xs">
                <ul className="desc-list">
                  {desc.map((data, index) => {
                    return <li key={index}>{data}</li>;
                  })}
                </ul>
              </Hidden>
              <Hidden smUp>
                <WorkDialog name={name} tasks={desc} />
              </Hidden>
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
              <Grid key={index} item xs={12} sm={12} md={6}>
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
          Work History
        </Typography>
      </Grid>
      <Hidden only="xs">
        <Container maxWidth="lg">
          <Grid container spacing={0} className="work-slider">
            {WorkList(work)}
          </Grid>
        </Container>
      </Hidden>

      <Hidden smUp>
        <Grid container spacing={0} className="work-slider">
          {WorkSlider(work)}
        </Grid>
      </Hidden>
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
