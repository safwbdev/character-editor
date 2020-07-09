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
class CreateEducation extends Component {
  constructor(props) {
    super(props);
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.state = {
      image: null,
      name: "",
      field: "",
      location: "",
      startYear: null,
      endYear: null,
    };
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
      this.props.createEducation(this.state);
      this.props.history.push("/");
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
            <Grid item xs={12} />
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
                    Add New Education
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="name"
                    type="name"
                    name="name"
                    autoComplete="name"
                    label="School Name"
                    variant="outlined"
                    onChange={this.handleChange}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="field"
                    type="field"
                    name="field"
                    autoComplete="field"
                    label="Field"
                    variant="outlined"
                    onChange={this.handleChange}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="location"
                    type="location"
                    name="location"
                    autoComplete="location"
                    label="Location"
                    variant="outlined"
                    onChange={this.handleChange}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="startYear"
                    type="number"
                    name="startYear"
                    autoComplete="startYear"
                    label="Start Year"
                    variant="outlined"
                    onChange={this.handleChange}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="endYear"
                    type="number"
                    name="endYear"
                    autoComplete="endYear"
                    label="End Year"
                    variant="outlined"
                    onChange={this.handleChange}
                    required
                    fullWidth
                  />
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
    createEducation: (data) => dispatch(createEducation(data)),
  };
};
// export default connect(null, mapDispatchToProps)(CreateProject);

const mapStateToProps = (state) => {
  return {
    skills: state.firestore.ordered.skills,
  };
};
export default compose(connect(mapStateToProps, mapDispatchToProps))(
  CreateEducation
);
