import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import ProjectSummary from "./EducationSummary";
import List from "@material-ui/core/List";

class EducationList extends Component {
  render() {
    const { educations } = this.props;
    console.log("educations");
    console.log(educations);
    return (
      <List>
        {educations &&
          educations.map((project) => {
            return <ProjectSummary project={project} />;
          })}
      </List>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    educations: state.firestore.ordered.education,
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "education" }])
)(EducationList);
