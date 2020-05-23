import React, { Component } from "react";
import { createSkill } from "../../store/actions/skillActions";
import skillReducer from "../../store/reducers/skillReducer";
import { createStore } from "redux";
import { connect } from "react-redux";
import { Container, Grid, Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

class CreateSkill extends Component {
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
    // console.log(this.state);
    this.props.createSkill(this.state);
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
              {/* <TextField
                id="content"
                label="Content"
                multiline
                rows={4}
                variant="outlined"
                onChange={this.handleChange}
                required
                fullWidth
              /> */}
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
      //   <div className="container">
      //     <form className="white" onSubmit={this.handleSubmit}>
      //       <h5 className="grey-text text-darken-3">Create a New Skill</h5>
      //       <div className="input-field">
      //         <input type="text" id="title" onChange={this.handleChange} />
      //         <label htmlFor="title">Skill Name</label>
      //       </div>
      //       <div className="input-field">
      //         <textarea
      //           id="content"
      //           className="materialize-textarea"
      //           onChange={this.handleChange}
      //         ></textarea>
      //         <label htmlFor="content">Project Content</label>
      //       </div>
      //       <div className="input-field">
      //         <button className="btn pink lighten-1">Create</button>
      //       </div>
      //     </form>
      //   </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createSkill: (skill) => dispatch(createSkill(skill)),
  };
};
export default connect(null, mapDispatchToProps)(CreateSkill);
