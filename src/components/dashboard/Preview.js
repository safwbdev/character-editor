import React from "react";
import { Container } from "@material-ui/core";
import SkillSection from "../skills/SkillSection";
import EducationSection from "../education/EducationSection";

const Preview = () => {
  return (
    <Container maxWidth="lg">
      <EducationSection />
      <SkillSection />
    </Container>
  );
};

export default Preview;
