import React, { Component } from "react";
import { createWork } from "../../store/actions/workActions";
import { connect } from "react-redux";
import { compose } from "redux";
import Resizer from "react-image-file-resizer";
import {
  Container,
  Grid,
  Button,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
} from "@material-ui/core";
import { firestoreConnect } from "react-redux-firebase";
import Autocomplete from "@material-ui/lab/Autocomplete";

class EditWork extends Component {
  constructor(props) {
    super(props);
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.state = {
      getSkills: null,
      image: null,
      title: "",
      github: "",
      demo: "",
      projectType: "",
      //   getSkills: "",
      skillType: "",
      stack: "",
      desc: "",
    };
  }
  componentWillReceiveProps(props) {
    console.log(props);
    const { project } = props;
    if (project) {
      this.setState({
        image: project.image,
        title: project.title,
        desc: project.desc,
        github: project.github,
        demo: project.demo,
        projectType: project.projectType,
        // getSkills: skills,
        skillType: project.skillType,
        stack: project.stacks,
      });
    }
    // if (skills) {
    //   this.setState({
    //     getSkills: skills,
    //   });
    // }
  }
  fileChangedHandler(event) {
    var fileInput = false;
    if (event.target.files[0]) {
      fileInput = true;
    }
    if (fileInput) {
      Resizer.imageFileResizer(
        event.target.files[0],
        700,
        700,
        "JPEG",
        100,
        0,
        (uri) => {
          this.setState({ image: uri });
        },
        "base64"
      );
    }
  }
  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.image) {
      console.log(this.state);
      //   this.props.createWork(this.state);
      //   this.props.history.push("/");
    } else {
      alert("Please upload an image.");
    }
  };

  render() {
    const {
      image,
      title,
      github,
      demo,
      projectType,
      getSkills,
      skillType,
      //   stack,
      desc,
    } = this.state;
    console.log(this.state);
    return (
      <Container maxWidth="lg">
        <form onSubmit={this.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} />
            <Grid item sm={4}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h5" component="h5">
                    Project Image
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <label htmlFor="file-upload" className="imageInput-label">
                    {image ? "Upload a Different Image" : "Upload Image"}
                  </label>
                </Grid>
                <Grid item xs={12}>
                  <input
                    type="file"
                    id="file-upload"
                    accept="image/*"
                    className="imageInput"
                    onChange={this.fileChangedHandler}
                  />
                  {image ? (
                    <img src={image} className="full-width" alt="" />
                  ) : null}
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={8}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h5" component="h5">
                    Add New Project
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="title"
                    type="text"
                    name="title"
                    autoComplete="title"
                    label="Project Title"
                    variant="outlined"
                    value={title}
                    onChange={this.handleChange}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="desc"
                    name="desc"
                    type="text"
                    autoComplete="desc"
                    label="Description"
                    value={desc}
                    multiline
                    fullWidth
                    required
                    rows={4}
                    variant="outlined"
                    onChange={this.handleChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    id="github"
                    type="text"
                    name="github"
                    value={github}
                    autoComplete="github"
                    label="Github Url"
                    variant="outlined"
                    onChange={this.handleChange}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    id="demo"
                    type="text"
                    name="demo"
                    autoComplete="demo"
                    value={demo}
                    label="Demo Url"
                    variant="outlined"
                    onChange={this.handleChange}
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
                      value={projectType}
                    >
                      <option aria-label="None" value="" />
                      <option value="client">Client</option>
                      <option value="personal">Personal</option>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  {getSkills ? (
                    <Autocomplete
                      multiple
                      id="tags-outlined"
                      options={getSkills}
                      getOptionLabel={(option) => option.name}
                      filterSelectedOptions
                      defaultValue={skillType}
                      onChange={(e, data) => {
                        this.setState({ skillType: data });
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="Stacks Used"
                          fullWidth
                          id="stack"
                          name="stack"
                          type="stack"
                          autoComplete="stack"
                        />
                      )}
                    />
                  ) : (
                    "There was an error loading. Please refresh the page."
                  )}
                </Grid>

                <Grid item xs={12} align="right">
                  <Button type="submit" variant="contained">
                    Update
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createWork: (data) => dispatch(createWork(data)),
  };
};
// export default connect(null, mapDispatchToProps)(CreateProject);

const mapStateToProps = (state, ownProps) => {
  //   console.log(state.firestore.data.skills);
  const getWork = state.firestore.data.projects;
  const id = ownProps.match.params.id;
  const work = getWork ? getWork[id] : null;
  const getSkills = state.firestore.ordered.skills;
  const skills = getSkills ? getSkills : null;
  return {
    project: work,
    skills: skills,
  };
};
// export default compose(connect(mapStateToProps, mapDispatchToProps))(EditWork);
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "projects" }, { collection: "skills" }])
)(EditWork);
