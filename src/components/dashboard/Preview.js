import React from "react";
import { Container } from "@material-ui/core";
import SkillSection from "../skills/SkillSection";
import EducationSection from "../education/EducationSection";
import WorkSection from "../work/WorkSection";

const Preview = () => {
  return (
    <Container maxWidth="lg">
      <WorkSection />
      <EducationSection />
      <SkillSection />
    </Container>
  );
};

export default Preview;
