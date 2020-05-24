import React from "react";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import FolderIcon from "@material-ui/icons/Folder";

const ProjectSummary = ({ project }) => {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <FolderIcon />
          {/* <i class={skill.icon}></i> */}
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={project.title} />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete">
          <EditIcon />
        </IconButton>
        <IconButton edge="end" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default ProjectSummary;
