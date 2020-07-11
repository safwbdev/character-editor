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
import { deleteProject } from "../../store/actions/projectActions";
import { connect } from "react-redux";
import { compose } from "redux";

const ProjectSummary = (props) => {
  const { data } = props;
  const deleteRow = (id) => {
    props.deleteProject(id);
  };
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar src={data.image} variant="square" alt="" />
      </ListItemAvatar>
      <ListItemText primary={data.title} />
      <ListItemSecondaryAction>
        <Link to={"/edit-project/" + data.id}>
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
    deleteProject: (id) => dispatch(deleteProject(id)),
  };
};

export default compose(connect(null, mapDispatchToProps))(ProjectSummary);
// export default compose(
//   connect(null, mapDispatchToProps),
//   firestoreConnect([{ collection: "projects" }])
// )(ProjectSummary);
