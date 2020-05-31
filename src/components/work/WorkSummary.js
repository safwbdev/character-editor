import React from "react";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Link } from "react-router-dom";
import { deleteWork } from "../../store/actions/workActions";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";

const WorkSummary = (props) => {
  const { work } = props;

  console.log(work);
  const deleteRow = (id) => {
    console.log("DELETE PRESSED! " + id);
    props.deleteWork(id);
  };
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          {/* <FolderIcon /> */}
          {/* <i class={skill.icon}></i> */}W
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={work.name} secondary={work.role} />
      <ListItemSecondaryAction>
        <Link to={"/edit-work/" + work.id}>
          <IconButton edge="end" aria-label="delete">
            <EditIcon />
          </IconButton>
        </Link>
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => deleteRow(work.id)}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

// export default ProjectSummary;

const mapDispatchToProps = (dispatch) => {
  return {
    deleteWork: (id) => dispatch(deleteWork(id)),
  };
};
// export default connect(null, mapDispatchToProps)(CreateProject);

const mapStateToProps = (state) => {
  return {
    work: state.firestore.ordered.work,
  };
};
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "work" }])
)(WorkSummary);
