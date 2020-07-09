import React, { Component } from "react";
import { createEducation } from "../../store/actions/eduActions";
import { connect } from "react-redux";
import { compose } from "redux";
import Resizer from "react-image-file-resizer";
import {
  Container,
  Grid,
  Button,
  Typography,
  TextField,
} from "@material-ui/core";
import { firestoreConnect } from "react-redux-firebase";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Autocomplete from "@material-ui/lab/Autocomplete";

class CreateEducation extends Component {
  constructor(props) {
    super(props);
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.state = {
      image: null,
      title: null,
      desc: null,
      github: null,
      demo: null,
      projectType: null,
      getSkills: null,
      skillType: null,
      stack: null,
    };
  }
  componentWillReceiveProps({ skills }) {
    if (skills) {
      this.setState({ getSkills: skills });
    }
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
      alert("UPLADED");
      console.log(this.state);
      // props.createEducation(data, url, photoID);
      // props.history.push("/");
    } else {
      alert("Please upload an image.");
    }
  };

  render() {
    const { image } = this.state;
    return (
      <Container maxWidth="lg">
        <form onSubmit={this.handleSubmit}>
          <Grid container spacing={3}>
            <Grid xs={12} />
            <Grid item sm={4}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h5" component="h5">
                    Education Image
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
                    type="title"
                    name="title"
                    autoComplete="title"
                    label="Project Title"
                    variant="outlined"
                    onChange={this.handleChange}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="desc"
                    name="desc"
                    type="desc"
                    autoComplete="desc"
                    label="Description"
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
                    type="github"
                    name="github"
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
                    type="demo"
                    name="demo"
                    autoComplete="demo"
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
                    >
                      <option aria-label="None" value="" />
                      <option value="client">Client</option>
                      <option value="personal">Personal</option>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  {this.state.getSkills ? (
                    <Autocomplete
                      multiple
                      id="tags-outlined"
                      options={this.state.getSkills}
                      getOptionLabel={(option) => option.name}
                      filterSelectedOptions
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
                    Submit
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
    createEducation: (education, url, photoID) =>
      dispatch(createEducation(education, url, photoID)),
  };
};
// export default connect(null, mapDispatchToProps)(CreateProject);

const mapStateToProps = (state) => {
  //   console.log("qwerty");
  const getSkills = state.firestore.ordered.skills;
  return {
    skills: getSkills,
  };
};
// export default compose(connect(mapStateToProps, mapDispatchToProps))(
//   CreateEducation
// );
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "skills" }])
)(CreateEducation);
