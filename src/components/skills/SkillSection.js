import React, { useEffect } from "react";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import { Grid, Container } from "@material-ui/core";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const SkillSection = (props) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const { data } = props;
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
        {data &&
          data.map((data, index) => {
            const content = (
              <span>
                <i className={data.icon}></i> <>{data.name}</>
              </span>
            );
            if (data.type === skillType) {
              return (
                <Chip
                  key={index}
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
    <Container maxWidth="lg" className="skill-section">
      <motion.div
        ref={ref}
        animate={controls}
        initial="hidden"
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: 300 },
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} className="skill-box">
            <Typography variant="h4" component="h4">
              Skills
            </Typography>
          </Grid>
          {skillArray &&
            skillArray.map((data, index) => {
              return (
                <ShowSkills
                  key={index}
                  title={data.title}
                  skillType={data.type}
                  styleCclass={data.type}
                />
              );
            })}
        </Grid>
      </motion.div>
    </Container>
  );
};

export default SkillSection;
