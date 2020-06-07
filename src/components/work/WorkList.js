import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import WorkSummary from "./WorkSummary";
import List from "@material-ui/core/List";

class WorkList extends Component {
  render() {
    const { work } = this.props;
    console.log("iououiiou");
    console.log(work);
    return (
      <List>
        {work &&
          work.map((data) => {
            return <WorkSummary work={data} />;
            // return <p>lol</p>;
            // return <p>{data.name}</p>;
          })}
      </List>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    work: state.firestore.ordered.work,
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "work" }])
)(WorkList);
