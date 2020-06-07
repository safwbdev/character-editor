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

  const deleteRow = (id) => {
    props.deleteWork(id);
  };
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar src={work.photoUrl} variant="square" alt="" />
      </ListItemAvatar>
      <ListItemText primary={work.name} />
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

const mapDispatchToProps = (dispatch) => {
  return {
    deleteWork: (id) => dispatch(deleteWork(id)),
  };
};

export default compose(
  connect(null, mapDispatchToProps),
  firestoreConnect([{ collection: "work" }])
)(WorkSummary);
