import React, { useEffect } from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Hidden,
  Container,
} from "@material-ui/core";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import WorkDialog from "./WorkDialog";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const WorkSection = (props) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const { data } = props;
  const settings = {
    dots: true,
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
    let currentStatus = endDate ? getWorkDate(endDate) : "Current";
    return (
      <div className="work-box">
        <Card>
          <CardContent className="work-content">
            {/* <Avatar alt="" src={image} className="edu-img" /> */}
            <img alt="" src={image} className="work-img" />
            <div className="block">
              <Typography component="h6" variant="h6">
                {role}
              </Typography>
              <Typography variant="subtitle1" className="company">
                {name}
              </Typography>
              <Typography variant="subtitle1" className="">
                {getWorkDate(startDate)} - {currentStatus}
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
                <br />
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
    <motion.div
      className="work-section"
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 300 },
      }}
    >
      <Grid item xs={12} className="skill-box">
        <Typography variant="h4" component="h4">
          Work History
        </Typography>
      </Grid>
      <Hidden only="xs">
        <Container maxWidth="lg">
          <Grid container spacing={0} className="work-slider">
            {WorkList(data)}
          </Grid>
        </Container>
      </Hidden>

      <Hidden smUp>
        <Grid container spacing={0} className="work-slider">
          {WorkSlider(data)}
        </Grid>
      </Hidden>
    </motion.div>
  );
};

export default WorkSection;
