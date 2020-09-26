import React, { Component } from "react";
import SkillSection from "../skills/SkillSection";
import EducationSection from "../education/EducationSection";
import WorkSection from "../work/WorkSection";
import ProfileSection from "../profile/ProfileSection";
// import ClientProjectSection from "../projects/ClientProjectSection";
import ProjectSection from "../projects/ProjectSection";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import CircularProgress from "@material-ui/core/CircularProgress";

class Preview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: null,
      clientProjects: null,
      personalProjects: null,
      skills: null,
      education: null,
      work: null,
      loading: true,
    };
  }

  componentWillReceiveProps({
    profile,
    clientProjects,
    personalProjects,
    education,
    skills,
    work,
  }) {
    if (profile && clientProjects && personalProjects && education && skills) {
      this.setState({
        profile: profile,
        clientProjects: clientProjects,
        personalProjects: personalProjects,
        education: education,
        skills: skills,
        work: work,
        loading: false,
      });
    }
  }

  render() {
    const {
      profile,
      clientProjects,
      personalProjects,
      education,
      work,
      skills,
      loading,
    } = this.state;

    if (loading) {
      return (
        <div className="loadscreen">
          <CircularProgress /> <h2>Loading</h2>
        </div>
      );
    } else {
      return (
        <>
          <ProfileSection data={profile} />
          <ProjectSection
            getType="client"
            getTitle="Client Projects"
            getSubtitle="* Projects shown are displayed with persmission from the original owners"
            getData={clientProjects}
          />
          <ProjectSection
            getType="personal"
            getTitle="Personal Projects"
            getSubtitle="* Some silly projects I do in my spare time"
            getData={personalProjects}
          />
          <SkillSection data={skills} />
          <WorkSection data={work} />
          <EducationSection data={education} />
        </>
      );
    }
  }
}

const mapStateToProps = (state) => {
  const getProjects = state.firestore.ordered.projects;
  const getProfile = state.firestore.data.profile;
  const id = "main";
  const profile = getProfile ? getProfile[id] : null;
  let clientProjects = [];
  let personalProjects = [];
  getProjects &&
    getProjects.map((data) => {
      if (data.projectType === "client") {
        clientProjects.push(data);
        return null;
      }
      if (data.projectType === "personal") {
        personalProjects.push(data);
        return null;
      }
      return null;
    });
  return {
    profile: profile,
    clientProjects: clientProjects,
    personalProjects: personalProjects,
    education: state.firestore.ordered.education,
    work: state.firestore.ordered.work,
    skills: state.firestore.ordered.skills,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: "profile" },
    { collection: "projects", orderBy: ["order", "asc"] },
    { collection: "education", orderBy: ["endYear", "desc"] },
    { collection: "work", orderBy: ["startDate", "desc"] },
    { collection: "skills", orderBy: ["name", "asc"] },
  ])
)(Preview);
