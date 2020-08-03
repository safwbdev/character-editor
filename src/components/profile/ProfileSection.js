import React from "react";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import { Grid, Typography } from "@material-ui/core";

const ProfileSection = ({ profile }) => {
  //   console.log(profile);

  //   const { linkedin, location, name, role, tel, desc, email, github } = profile;

  const getProfile = ({
    desc,
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
        <Grid item xs={3}>
          <img src={image} alt="" />
        </Grid>
        <Grid item xs={9}>
          {name}
          {linkedin}
          {location}
          {role}
          {tel}
          {desc}
          {email}
          {github}
          {desc}
        </Grid>
      </>
    );
  };
  return (
    <>
      <Grid item xs={12} className="skill-box">
        <Typography variant="h4" component="h4">
          Profile
        </Typography>
      </Grid>
      <Grid container spacing={0}>
        {profile ? getProfile(profile) : null}
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => {
  const getProfile = state.firestore.data.profile;
  const id = "main";
  const profile = getProfile ? getProfile[id] : null;
  return {
    profile: profile,
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "profile" }])
)(ProfileSection);
