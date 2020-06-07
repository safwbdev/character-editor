import React from "react";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { deleteProject } from "../../store/actions/projectActions";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";

const ProjectSummary = (props) => {
  const { project } = props;
  const deleteRow = (id) => {
    props.deleteProject(id);
  };
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar src={project.photoUrl} variant="square" alt="" />
      </ListItemAvatar>
      <ListItemText primary={project.title} />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete">
          <EditIcon />
        </IconButton>
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => deleteRow(project.id)}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteProject: (id) => dispatch(deleteProject(id)),
  };
};

export default compose(
  connect(null, mapDispatchToProps),
  firestoreConnect([{ collection: "project" }])
)(ProjectSummary);
