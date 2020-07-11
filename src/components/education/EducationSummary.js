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
import { connect } from "react-redux";
import { compose } from "redux";

const WorkSummary = (props) => {
  const { data } = props;

  const deleteRow = (id) => {
    props.deleteWork(id);
  };
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar src={data.image} variant="square" alt="" />
      </ListItemAvatar>
      <ListItemText primary={data.name} />
      <ListItemSecondaryAction>
        <Link to={"/edit-education/" + data.id}>
          <IconButton edge="end" aria-label="delete">
            <EditIcon />
          </IconButton>
        </Link>
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => deleteRow(data.id)}
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

export default compose(connect(null, mapDispatchToProps))(WorkSummary);
