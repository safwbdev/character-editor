import React from "react";
import { Container } from "@material-ui/core";
import SkillSection from "../skills/SkillSection";
import EducationSection from "../education/EducationSection";
import WorkSection from "../work/WorkSection";
import ProfileSection from "../profile/ProfileSection";

const Preview = () => {
  return (
    <>
      <ProfileSection />
      <Container maxWidth="lg">
        <WorkSection />
        <EducationSection />
        <SkillSection />
      </Container>
    </>
  );
};

export default Preview;
