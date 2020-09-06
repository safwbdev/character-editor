import React from "react";
import desc_image from "./../../assets/desc_bg.jpeg";
import {
  Grid,
  Typography,
  IconButton,
  Hidden,
  Container,
} from "@material-ui/core";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { motion } from "framer-motion";

var descbgStyle = { backgroundImage: `url(${desc_image})` };
const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,

    transition: {
      delay: 1,
    },
  },
  exit: {
    x: "-100vw",
    transition: { ease: "easeInOut" },
  },
};

const ProfileSection = ({ data }) => {
  const getProfile = ({
    email,
    github,
    image,
    linkedin,
    location,
    name,
    role,
    tel,
  }) => {
    return (
      <>
        <Grid item xs={12} sm={12} md={3} className="profile-image">
          <motion.img
            src={image}
            alt=""
            className="profile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            // transition={{ delay: 0.5 }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={9}>
          <Grid container className="detail-links">
            <Grid item xs={12} className="titles">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Typography variant="h2">{name}</Typography>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Typography variant="h3">{role}</Typography>
              </motion.div>
              <Hidden smUp>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  <Typography variant="h6">
                    <IconButton>
                      <LocationOnIcon />
                    </IconButton>
                    {location}
                  </Typography>
                </motion.div>
              </Hidden>
            </Grid>
            <Grid item xs={3} sm={6} md={6}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <a href={tel}>
                  <Typography variant="h6">
                    <IconButton className="link-btn">
                      <PhoneIcon />
                    </IconButton>
                    <Hidden only="xs">{tel}</Hidden>
                  </Typography>
                </a>
              </motion.div>
            </Grid>
            <Grid item xs={3} sm={6} md={6}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <a href={"mailto:" + email}>
                  <Typography variant="h6">
                    <IconButton className="link-btn">
                      <EmailIcon />
                    </IconButton>
                    <Hidden only="xs">{email}</Hidden>
                  </Typography>
                </a>
              </motion.div>
            </Grid>
            <Grid item xs={3} sm={6} md={6}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <a href={github} target="_blank" rel="noopener noreferrer">
                  <Typography variant="h6">
                    <IconButton className="link-btn">
                      <GitHubIcon />
                    </IconButton>
                    <Hidden only="xs">Check Out My Github</Hidden>
                  </Typography>
                </a>
              </motion.div>
            </Grid>
            <Grid item xs={3} sm={6} md={6}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <a href={linkedin} target="_blank" rel="noopener noreferrer">
                  <Typography variant="h6">
                    <IconButton className="link-btn">
                      <LinkedInIcon />
                    </IconButton>
                    <Hidden only="xs">Visit My LinkedIn</Hidden>
                  </Typography>
                </a>
              </motion.div>
            </Grid>
            <Hidden only="xs">
              <Grid item xs={12} sm={12} md={12} className="location">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  <Typography variant="h6">
                    <IconButton>
                      <LocationOnIcon />
                    </IconButton>
                    {location}
                  </Typography>
                </motion.div>
              </Grid>
            </Hidden>
          </Grid>
        </Grid>
      </>
    );
  };

  const getDesc = ({ desc }) => {
    return (
      <Grid item xs={12}>
        <Typography variant="h6">{desc}</Typography>
      </Grid>
    );
  };
  return (
    <div className="intro-section">
      <Container maxWidth="lg" className="profile-row">
        <Grid container spacing={0}>
          {data ? getProfile(data) : null}
        </Grid>
      </Container>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <Grid
          container
          spacing={0}
          className="desc-section"
          style={descbgStyle}
        >
          <Container maxWidth="lg">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              {data ? getDesc(data) : "Loading ..."}
            </motion.div>
          </Container>
        </Grid>
      </motion.div>
    </div>
  );
};

export default ProfileSection;
