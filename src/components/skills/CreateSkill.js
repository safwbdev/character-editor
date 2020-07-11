import React, { Component } from "react";
import { createSkill } from "../../store/actions/skillActions";
import { connect } from "react-redux";
import {
  Container,
  Grid,
  Button,
  Typography,
  TextField,
  FormControl,
  Select,
  InputLabel,
} from "@material-ui/core";
import fontawesome from "./fontawsome5.json";

class CreateSkill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      skillType: null,
      skillIcon: null,
    };
  }

  handleName = (e) => {
    this.setState({
      name: e.target.value,
    });
  };
  handleChange = (e) => {
    this.setState({
      skillType: e.target.value,
    });
  };
  handleIcon = (e) => {
    this.setState({
      skillIcon: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    // this.props.createSkill(data);
    // this.props.history.push("/");
  };

  render() {
    return (
      <Container maxWidth="lg">
        {/* <form onSubmit={handleSubmit(onSubmit)}> */}
        <form onSubmit={this.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} />
            <Grid item xs={12}>
              <Typography variant="h5" component="h5">
                Add New Skill
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="name"
                type="text"
                name="name"
                label="Skill Name"
                variant="outlined"
                onChange={this.handleName}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="oylined-age-native-simple">
                  Project Type
                </InputLabel>
                <Select
                  native
                  onChange={this.handleChange}
                  label="Project"
                  name="projectType"
                  id="projectType"
                  type="type"
                >
                  <option aria-label="None" value="" />
                  <option value="essential">Essential</option>
                  <option value="technical">Technical</option>
                  <option value="framework">Framework</option>
                  <option value="library">Library</option>
                  <option value="database">Database</option>
                  <option value="cms">CMS</option>
                  <option value="os">OS</option>
                  <option value="tools">Tools</option>
                  <option value="design">Design</option>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={10}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="oylined-age-native-simple">
                  Select Icon
                </InputLabel>
                <Select
                  native
                  onChange={this.handleIcon}
                  label="Skill Icon"
                  name="icon"
                  id="icon"
                  type="icon"
                >
                  <option aria-label="None" value="" />
                  {fontawesome.map((icon, index) => {
                    let val = icon;
                    let val1 = val.replace("fas ", "");
                    let val2 = val1.replace("fab ", "");
                    let val3 = val2.replace("far ", "");
                    let text = val3.replace("fa-", "");
                    return (
                      <option key={index} value={icon}>
                        {text}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              {this.state.skillIcon ? (
                <Typography variant="h3" component="h3">
                  <i className={this.state.skillIcon}></i>
                </Typography>
              ) : null}
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
    createSkill: (skill) => dispatch(createSkill(skill)),
  };
};
export default connect(null, mapDispatchToProps)(CreateSkill);
