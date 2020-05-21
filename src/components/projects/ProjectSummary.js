import React from "react";
import projectReducer from "../../store/reducers/projectReducer";

const ProjectSummary = ({ project }) => {
  return (
    <div className="project-list section">
      <div className="card z-depth-0 project-summary">
        <div className="card-content grey-text text-darken-3">
          <span className="card-title">{project.title}</span>
          <p>Posted by Stef</p>
          <p className="grey-text">23 May 2020</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectSummary;
