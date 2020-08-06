import React from "react";
import SkillSection from "../skills/SkillSection";
import EducationSection from "../education/EducationSection";
import WorkSection from "../work/WorkSection";
import ProfileSection from "../profile/ProfileSection";

const Preview = () => {
  return (
    <>
      <ProfileSection />
      <SkillSection />
      <WorkSection />
      <EducationSection />
    </>
  );
};

export default Preview;
