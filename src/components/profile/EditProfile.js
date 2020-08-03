import React, { Component } from "react";
import { editProfile } from "../../store/actions/profileAction";
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

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.state = {
      image: null,
      name: "",
      role: "",
      location: "",
      email: "",
      tel: "",
      desc: "",
      github: "",
      linkedin: "",
    };
  }
  componentWillReceiveProps({ education }) {
    if (education) {
      this.setState({
        image: education.image,
        name: education.name,
        role: education.role,
        email: education.email,
        location: education.location,
        desc: education.desc,
        tel: education.tel,
        github: education.github,
        linkedin: education.linkedin,
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
      this.props.editProfile(this.state);
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
      email,
      desc,
      tel,
      github,
      linkedin,
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
                    Profile Image
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
                    Edit Profile
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="name"
                    type="text"
                    name="name"
                    autoComplete="name"
                    label="Full Name"
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
                    name="field"
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
                    id="email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={this.handleChange}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="tel"
                    type="tel"
                    name="tel"
                    autoComplete="tel"
                    label="Phone Number"
                    variant="outlined"
                    value={tel}
                    onChange={this.handleChange}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="github"
                    type="text"
                    name="github"
                    autoComplete="github"
                    label="Github"
                    variant="outlined"
                    value={github}
                    onChange={this.handleChange}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="linkedin"
                    type="text"
                    name="linkedin"
                    autoComplete="linkedin"
                    label="LinkedIn"
                    variant="outlined"
                    value={linkedin}
                    onChange={this.handleChange}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="location"
                    type="text"
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
                <Grid item xs={12}>
                  <TextField
                    id="desc"
                    type="text"
                    name="desc"
                    autoComplete="desc"
                    label="Summary"
                    variant="outlined"
                    value={desc}
                    onChange={this.handleChange}
                    required
                    fullWidth
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
    editProfile: (data) => dispatch(editProfile(data)),
  };
};

const mapStateToProps = (state, ownProps) => {
  const getProfile = state.firestore.data.profile;
  const id = "main";
  const work = getProfile ? getProfile[id] : null;

  return {
    education: work,
  };
};
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "profile" }])
)(EditProfile);
