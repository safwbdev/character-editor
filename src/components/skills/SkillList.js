import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import SkillSummary from "./SkillSummary";
import List from "@material-ui/core/List";

class SkillList extends Component {
  render() {
    const { skills } = this.props;

    return (
      <List>
        {skills &&
          skills.map((skill) => {
            return <SkillSummary skill={skill} />;
          })}
      </List>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    skills: state.firestore.ordered.skills,
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "skills" }])
)(SkillList);
