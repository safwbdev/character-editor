import React, { useEffect, useState } from "react";
import { createEducation } from "../../store/actions/eduActions";
import { connect } from "react-redux";
import { Container, Grid, Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { useForm } from "react-hook-form";
import { storage } from "../../config/config";
import { compose } from "redux";
import Avatar from "@material-ui/core/Avatar";
import LinearProgress from "@material-ui/core/LinearProgress";

const CreateEducation = (props) => {
  // image upload
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [photoID, setphotoID] = useState("");
  const [progress, setProgress] = useState(0);

  // form stuff
  const { register, handleSubmit, errors } = useForm();

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  useEffect(() => {});

  const handleUpload = () => {
    let type = "";
    let d = new Date(),
      filename =
        [d.getFullYear(), d.getMonth() + 1, d.getDate()].join("") +
        [d.getHours(), d.getMinutes(), d.getSeconds()].join("");
    let noError = true;

    switch (image.type) {
      case "image/jpeg":
        type = ".jpeg";
        noError = true;
        break;
      case "image/jpg":
        type = ".jpg";
        noError = true;
        break;
      case "image/png":
        type = ".png";
        noError = true;
        break;
      default:
        noError = false;
    }

    if (noError) {
      const imageFile = filename + type;
      const imageUrl = "images/education/";
      const fullUrl = imageUrl + imageFile;
      const uploadTask = storage.ref(fullUrl).put(image);

      setphotoID(filename);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref(imageUrl)
            .child(imageFile)
            .getDownloadURL()
            .then((url) => {
              setUrl(url);
              setImage(null);
              setProgress(0);
            });
        }
      );
    } else {
      alert("Invalid file format. Please use Jpg, Jpeg or Pngs");
    }
  };

  const onSubmit = (data, e) => {
    e.preventDefault();
    console.log("SUBMIT");
    console.log(data);
    if (url) {
      props.createEducation(data, url, photoID);
      props.history.push("/");
    } else {
      alert("Please Upload an image");
    }
  };
  return (
    <Container maxWidth="lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid xs={12} />
          <Grid item xs={12}>
            <Typography variant="h5" component="h5">
              Education Image
            </Typography>
          </Grid>
          <Grid item sm={4}>
            <Avatar
              className="profile-img"
              variant="square"
              src={
                url
                  ? url
                  : "https://via.placeholder.com/400x400?text=Profile+Image"
              }
            />
          </Grid>
          <Grid item sm={8}>
            {progress >= 1 ? (
              <LinearProgress variant="determinate" value={progress} />
            ) : null}
            <br />
            <input type="file" onChange={handleChange} />
            <br />
            <br />
            {image ? (
              <Button variant="contained" onClick={handleUpload}>
                Upload
              </Button>
            ) : (
              <Button variant="contained" disabled>
                Upload
              </Button>
            )}
            <br />
            <br />
          </Grid>
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
              errors={!!errors.name}
              inputRef={register({
                required: true,
              })}
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
              errors={!!errors.field}
              inputRef={register({
                required: true,
              })}
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
              errors={!!errors.location}
              inputRef={register({
                required: true,
              })}
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
              errors={!!errors.startYear}
              inputRef={register({
                required: true,
              })}
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
              errors={!!errors.endYear}
              inputRef={register({
                required: true,
              })}
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
};

const mapDispatchToProps = (dispatch) => {
  return {
    createEducation: (education, url, photoID) =>
      dispatch(createEducation(education, url, photoID)),
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
