import React, { Component } from "react";
import { updateSkill } from "../../store/actions/skillActions";
import { connect } from "react-redux";
import { Container, Grid, Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import fontawesome from "./fontawsome5.json";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

class EditSkill extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      type: "",
      icon: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const id = this.props.match.params.id;
    this.props.updateSkill(id, this.state);
    this.props.history.push("/");
  };
  componentWillReceiveProps(skill) {
    const data = skill.skill;
    if (data) {
      console.log("LOADED");
      this.setState({
        name: data.name,
        type: data.type,
        icon: data.icon,
      });
      console.log("Get Data");
    }
  }
  render() {
    return (
      <Container maxWidth="lg">
        <form onSubmit={this.handleSubmit} autoComplete="off">
          <Grid container spacing={3}>
            <Grid xs={12} />
            <Grid item xs={12}>
              <Typography variant="h5" component="h5">
                Edit Skill
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="name"
                label="Skill Name"
                variant="outlined"
                onChange={this.handleChange}
                value={this.state.name}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="oylined-age-native-simple">
                  Skill Type
                </InputLabel>
                <Select
                  native
                  name="type"
                  id="type"
                  type="type"
                  onChange={this.handleChange}
                  label="Skill Type"
                >
                  <option aria-label="None" value="" />
                  {skillTypes &&
                    skillTypes.map((data) => {
                      if (data.value === this.state.type) {
                        return (
                          <option value={data.value} selected>
                            {data.label}
                          </option>
                        );
                      } else {
                        return <option value={data.value}>{data.label}</option>;
                      }
                    })}
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
                  name="icon"
                  id="icon"
                  type="icon"
                  onChange={this.handleChange}
                  label="Skill Icon"
                >
                  <option aria-label="None" value="" />
                  {fontawesome.map((icon) => {
                    let val = icon;
                    let val1 = val.replace("fas ", "");
                    let val2 = val1.replace("fab ", "");
                    let val3 = val2.replace("far ", "");
                    let text = val3.replace("fa-", "");

                    if (icon === this.state.icon) {
                      return (
                        <option value={icon} selected>
                          {text}
                        </option>
                      );
                    } else {
                      return <option value={icon}>{text}</option>;
                    }
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="h3" component="h3">
                <i class={this.state.icon}></i>
              </Typography>
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

const skillTypes = [
  { value: "essential", label: "Essential" },
  { value: "technical", label: "Technical" },
  { value: "framework", label: "Framework" },
  { value: "library", label: "Library" },
  { value: "database", label: "Database" },
  { value: "cms", label: "CMS" },
  { value: "os", label: "OS" },
  { value: "tools", label: "Tools" },
  { value: "design", label: "Design" },
];

const mapDispatchToProps = (dispatch) => {
  return {
    updateSkill: (id, skill) => dispatch(updateSkill(id, skill)),
  };
};
const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const skills = state.firestore.data.skills;
  const skill = skills ? skills[id] : null;
  return {
    skills: skills,
    skill: skill,
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "skills" }])
)(EditSkill);
