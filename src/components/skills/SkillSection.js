import React from "react";
import Chip from "@material-ui/core/Chip";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";

const SkillSection = (props) => {
  const { skills } = props;
  const skillArray = [
    { title: "Essentials", type: "essential" },
    { title: "Technical", type: "technical" },
    { title: "Framework", type: "framework" },
    { title: "Library", type: "library" },
    { title: "Database", type: "database" },
    { title: "Content Management Systems", type: "cms" },
    { title: "OS", type: "os" },
    { title: "Tools", type: "tools" },
    { title: "Design", type: "design" },
  ];

  const ShowSkills = ({ title, skillType, styleCclass }) => {
    return (
      <Grid item xs={12} className="skill-box">
        <Typography variant="h5" component="h5">
          {title}
        </Typography>
        {skills &&
          skills.map((data) => {
            const content = (
              <span>
                <i class={data.icon}></i> <>{data.name}</>
              </span>
            );
            if (data.type === skillType) {
              return (
                <Chip
                  size="medium"
                  label={content}
                  className={styleCclass}
                ></Chip>
              );
            } else {
              return null;
            }
          })}
      </Grid>
    );
  };

  return (
    <Grid container spacing={12}>
      {skillArray &&
        skillArray.map((data) => {
          return (
            <ShowSkills
              title={data.title}
              skillType={data.type}
              styleCclass={data.type}
            />
          );
        })}
    </Grid>
  );
};

// export default SkillSection;

const mapStateToProps = (state) => {
  return {
    skills: state.firestore.ordered.skills,
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "skills" }])
)(SkillSection);
