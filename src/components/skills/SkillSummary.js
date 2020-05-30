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

const deleteRow = (id) => {
  console.log("DELETE PRESSED! " + id);
};
const ProjectSummary = ({ skill }) => {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          {/* <FolderIcon /> */}
          <i class={skill.icon}></i>
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={skill.name} secondary={skill.type} />
      <ListItemSecondaryAction>
        <Link to={"/edit-skill/" + skill.id}>
          <IconButton edge="end" aria-label="delete">
            <EditIcon />
          </IconButton>
        </Link>
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => deleteRow(skill.id)}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default ProjectSummary;
