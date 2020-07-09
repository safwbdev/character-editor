import React from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, Box, Paper, Container, Grid } from "@material-ui/core/";
import SkillList from "../skills/SkillList";
import WorkList from "../work/WorkList";
import ProjectList from "../projects/ProjectList";
import EducationList from "../education/EducationList";

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default function SimpleTabs() {
  const [value, setValue] = React.useState(3);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="Projects" />
              <Tab label="Skills" />
              <Tab label="Work" />
              <Tab label="Education" />
            </Tabs>
          </Paper>
          <TabPanel value={value} index={0}>
            <ProjectList />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <SkillList />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <WorkList />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <EducationList />
          </TabPanel>
        </Grid>
      </Grid>
    </Container>
  );
}
