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
import { deleteSkill } from "../../store/actions/skillActions";
import { connect } from "react-redux";
import { compose } from "redux";

const SkillSummary = (props) => {
  const { skill } = props;
  const deleteRow = (id) => {
    props.deleteSkill(id);
  };
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <i className={skill.icon}></i>
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

const mapDispatchToProps = (dispatch) => {
  return {
    deleteSkill: (id) => dispatch(deleteSkill(id)),
  };
};

export default compose(connect(null, mapDispatchToProps))(SkillSummary);
// export default compose(
//   connect(null, mapDispatchToProps),
//   firestoreConnect([{ collection: "skills" }])
// )(SkillSummary);
