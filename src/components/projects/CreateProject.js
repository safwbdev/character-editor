import React, { Component } from "react";
import { createProject } from "../../store/actions/projectActions";
import projectReducer from "../../store/reducers/projectReducer";
import { createStore } from "redux";
import { connect } from "react-redux";
import { Container, Grid, Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

class CreateProject extends Component {
  state = {
    title: "",
    content: "",
  };
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createProject(this.state);
  };
  render() {
    return (
      <Container maxWidth="lg">
        <form className="white" onSubmit={this.handleSubmit}>
          <Grid container spacing={3}>
            <Grid xs={12} />
            <Grid item xs={12}>
              <Typography variant="h5" component="h5">
                Add New Project
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="title"
                label="Project Title"
                variant="outlined"
                onChange={this.handleChange}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="content"
                label="Content"
                multiline
                rows={4}
                variant="outlined"
                onChange={this.handleChange}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createProject: (project) => dispatch(createProject(project)),
  };
};
export default connect(null, mapDispatchToProps)(CreateProject);
