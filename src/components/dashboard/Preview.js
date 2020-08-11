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

class Preview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientProjects: null,
      personalProjects: null,
      loaded: false,
    };
  }
  // const Preview = ({ clientProjects, personalProjects }) => {
  // if (personalProjects) {

  componentWillReceiveProps({ clientProjects, personalProjects }) {
    if (clientProjects) {
      this.setState({
        clientProjects: clientProjects,
      });
    }
    if (personalProjects) {
      this.setState({
        personalProjects: personalProjects,
        loaded: true,
      });
    }
  }

  render() {
    const { clientProjects, personalProjects, loaded } = this.state;

    if (loaded) {
      return (
        <>
          <ProfileSection />
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
          <SkillSection />
          <WorkSection />
          <EducationSection />
        </>
      );
    } else {
      return <h1>LOADING</h1>;
    }
  }
}

const mapStateToProps = (state) => {
  const getProjects = state.firestore.ordered.projects;
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
    clientProjects: clientProjects,
    personalProjects: personalProjects,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "projects" }])
)(Preview);
