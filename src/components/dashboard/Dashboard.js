import React from "react";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import { Container } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import SkillList from "../skills/SkillList";
import WorkList from "../work/WorkList";
import ProjectList from "../projects/ProjectList";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default function SimpleTabs() {
  const [value, setValue] = React.useState(0);

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
              <Tab label="Education" disabled />
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
        </Grid>
      </Grid>
    </Container>
  );
}
