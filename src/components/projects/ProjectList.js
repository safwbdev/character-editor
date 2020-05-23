import React from "react";
import ProjectSummary from "./ProjectSummary";
import { Grid } from "@material-ui/core";
const ProjectList = ({ projects }) => {
  return (
    <Grid container spacing={3}>
      {projects &&
        projects.map((project) => {
          return <ProjectSummary project={project} key={project.id} />;
        })}
    </Grid>
  );
};

export default ProjectList;
