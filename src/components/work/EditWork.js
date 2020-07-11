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
} from "@material-ui/core";
import { firestoreConnect } from "react-redux-firebase";

class EditWork extends Component {
  constructor(props) {
    super(props);
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.state = {
      image: null,
      name: "",
      location: "",
      role: "",
      startDate: "",
      endDate: "",
      desc: "",
    };
  }
  componentWillReceiveProps({ work }) {
    if (work) {
      this.setState({
        image: work.image,
        name: work.name,
        location: work.location,
        role: work.role,
        startDate: work.startDate,
        endDate: work.endDate,
        desc: work.desc,
      });
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
      name,
      location,
      role,
      startDate,
      endDate,
      desc,
    } = this.state;
    return (
      <Container maxWidth="lg">
        <form onSubmit={this.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} />
            <Grid item sm={4}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h5" component="h5">
                    Work Image
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
                    Edit Work Experience
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="name"
                    type="name"
                    name="name"
                    autoComplete="name"
                    label="Company Name"
                    variant="outlined"
                    value={name}
                    onChange={this.handleChange}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="role"
                    type="role"
                    name="role"
                    autoComplete="role"
                    label="Role"
                    variant="outlined"
                    value={role}
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
                    value={location}
                    onChange={this.handleChange}
                    required
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    id="startDate"
                    name="startDate"
                    label="Start Date"
                    type="date"
                    value={startDate}
                    onChange={this.handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    required
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    id="endDate"
                    name="endDate"
                    label="End Date"
                    type="date"
                    value={endDate}
                    onChange={this.handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
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
                    value={desc}
                    onChange={this.handleChange}
                    multiline
                    fullWidth
                    required
                    rows={4}
                    variant="outlined"
                  />
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
  const getWork = state.firestore.data.work;
  const id = ownProps.match.params.id;
  const work = getWork ? getWork[id] : null;

  return {
    work: work,
  };
};
// export default compose(connect(mapStateToProps, mapDispatchToProps))(EditWork);
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "work" }])
)(EditWork);
