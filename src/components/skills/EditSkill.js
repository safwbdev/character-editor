// import React, { useEffect, useState } from "react";
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
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useForm } from "react-hook-form";
import fontawesome from "./fontawsome5.json";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

// const EditSkill = (props) => {
//   const { register, handleSubmit, errors } = useForm();
//   const [skillType, setSkillType] = useState("");
//   const [skillIcon, setSkillIcon] = useState("");
//   const handleChange = (e) => {
//     setSkillType(e.target.value);
//   };
//   const handleIcon = (e) => {
//     setSkillIcon(e.target.value);
//   };
//   useEffect(() => {});

//   const onSubmit = (data, e) => {
//     e.preventDefault();
//     console.log(data);
//     props.createSkill(data);
//     // props.history.push("/");
//   };

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
    if (this.state.type === "service") {
      console.log("SERVICE");
      this.setState({ condition: null });
    }
    console.log(this.state);
    // this.props.updateProduct(this.state);
    // this.props.history.push("/manager");
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
      console.log(data);
    }
  }
  render() {
    return (
      <Container maxWidth="lg">
        {/* <form onSubmit={handleSubmit(onSubmit)}> */}
        <form onSubmit={this.handleSubmit} autoComplete="off">
          <Grid container spacing={3}>
            <Grid xs={12} />
            <Grid item xs={12}>
              <Typography variant="h5" component="h5">
                Add New Skill
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
              {/* <TextField
                id="name"
                type="name"
                name="name"
                autoComplete="name"
                label="Skill Name"
                variant="outlined"
                // errors={!!errors.name}
                // inputRef={register({
                //   required: true,
                // })}
                //   onChange={handleChange}
                required
                fullWidth
              /> */}
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="oylined-age-native-simple">
                  Skill Type
                </InputLabel>
                <Select
                  native
                  onChange={this.handleChange}
                  //   errors={!!errors.type}
                  //   inputRef={register({
                  //     required: true,
                  //   })}
                  label="Skill Type"
                  //   inputProps={{
                  //     name: "type",
                  //     id: "type",
                  //     type: "type",
                  //   }}
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
                  //   onChange={handleIcon}
                  //   errors={!!errors.type}
                  //   inputRef={register({
                  //     required: true,
                  //   })}
                  label="Skill Icon"
                  //   inputProps={{
                  //     name: "icon",
                  //     id: "icon",
                  //     type: "icon",
                  //   }}
                >
                  <option aria-label="None" value="" />
                  {fontawesome.map((icon) => {
                    let val = icon;
                    let val1 = val.replace("fas ", "");
                    let val2 = val1.replace("fab ", "");
                    let val3 = val2.replace("far ", "");
                    let text = val3.replace("fa-", "");
                    return <option value={icon}>{text}</option>;
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="h3" component="h3">
                {/* <i class={skillIcon}></i> */}
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

const mapDispatchToProps = (dispatch) => {
  return {
    createSkill: (skill) => dispatch(createSkill(skill)),
  };
};
const mapStateToProps = (state, ownProps) => {
  console.log("MAPPING");
  const id = ownProps.match.params.id;

  console.log(id);
  const skills = state.firestore.data.skills;
  const skill = skills ? skills[id] : null;
  //   console.log(skills.id);
  console.log(skills[id]);
  return {
    skills: skills,
    skill: skill,
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "skills" }])
)(EditSkill);
