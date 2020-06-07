import React, { useEffect, useState } from "react";
import { createProject } from "../../store/actions/projectActions";
import { connect } from "react-redux";
import { Container, Grid, Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { useForm } from "react-hook-form";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { firestoreConnect } from "react-redux-firebase";
import { storage } from "../../config/config";
import { compose } from "redux";
import Avatar from "@material-ui/core/Avatar";
import LinearProgress from "@material-ui/core/LinearProgress";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const CreateProject = (props) => {
  // image upload
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [photoID, setphotoID] = useState("");
  const [progress, setProgress] = useState(0);

  // form stuff
  const { register, handleSubmit, errors } = useForm();
  const [skillType, setSkillType] = useState([]);
  const [skillArray, setSkillArray] = useState([]);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleSkillTYpe = (e) => {
    setSkillArray(e);
  };

  useEffect(() => {
    if (props.skills) {
      setSkillType(props.skills);
    }
  });

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
      const imageUrl = "images/projects/";
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
      props.createProject(data, url, photoID, skillArray);
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
              Profile Image
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
              errors={!!errors.title}
              inputRef={register({
                required: true,
              })}
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
              errors={!!errors.desc}
              inputRef={register({
                required: true,
              })}
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
              errors={!!errors.github}
              inputRef={register({
                required: false,
              })}
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
              errors={!!errors.demo}
              inputRef={register({
                required: false,
              })}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="oylined-age-native-simple">
                Skill Type
              </InputLabel>
              <Select
                native
                // onChange={handleChange}
                errors={!!errors.type}
                inputRef={register({
                  required: true,
                })}
                label="Skill Type"
                name="type"
                id="type"
                type="type"
              >
                <option aria-label="None" value="" />
                <option value="client">Client</option>
                <option value="personal">Personal</option>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            {skillType ? (
              <Autocomplete
                multiple
                id="tags-outlined"
                options={skillType}
                getOptionLabel={(option) => option.name}
                filterSelectedOptions
                onChange={(e, data) => {
                  // setValue("stacks", data);
                  handleSkillTYpe(data);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Stacks Used"
                    // placeholder="Stacks used"
                    fullWidth
                    // required
                    id="stack"
                    name="stack"
                    type="stack"
                    autoComplete="stack"
                    // errors={!!errors.stack}
                    // inputRef={register({
                    //   required: true,
                    // })}
                  />
                )}
              />
            ) : (
              "There was an error loading. Please refresh the page."
            )}
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
    createProject: (data, url, photoID, skillArray) =>
      dispatch(createProject(data, url, photoID, skillArray)),
  };
};
// export default connect(null, mapDispatchToProps)(CreateProject);

const mapStateToProps = (state) => {
  return {
    skills: state.firestore.ordered.skills,
  };
};
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "skills" }])
)(CreateProject);
