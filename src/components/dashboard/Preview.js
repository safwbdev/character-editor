import React from "react";
import { Container } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import SkillSection from "../skills/SkillSection";

const Preview = () => {
  return (
    <Container maxWidth="lg">
      {/* <Grid container spacing={3}> */}
      <SkillSection />
      {/* </Grid> */}
    </Container>
  );
};

export default Preview;
