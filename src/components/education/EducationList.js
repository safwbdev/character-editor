import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import EducationSummary from "./EducationSummary";
import List from "@material-ui/core/List";

class EducationList extends Component {
  render() {
    const { educations } = this.props;
    return (
      <List>
        {educations &&
          educations.map((data, index) => {
            return <EducationSummary key={index} data={data} />;
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
