import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import ProjectSummary from "./ProjectSummary";
import List from "@material-ui/core/List";

class SkillList extends Component {
  render() {
    const { projects } = this.props;
    console.log("projects");
    console.log(projects);
    return (
      <List>
        {projects &&
          projects.map((project) => {
            return <ProjectSummary project={project} />;
          })}
      </List>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    projects: state.firestore.ordered.projects,
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "projects" }])
)(SkillList);
