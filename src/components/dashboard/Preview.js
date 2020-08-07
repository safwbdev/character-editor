import React from "react";
import SkillSection from "../skills/SkillSection";
import EducationSection from "../education/EducationSection";
import WorkSection from "../work/WorkSection";
import ProfileSection from "../profile/ProfileSection";
import ClientProjectSection from "../projects/ClientProjectSection";
import PersonalProjectSection from "../projects/PersonalProjectSection";

const Preview = () => {
  return (
    <>
      <ProfileSection />
      <ClientProjectSection />
      <PersonalProjectSection />
      <SkillSection />
      <WorkSection />
      <EducationSection />
    </>
  );
};

export default Preview;
