import React, { useEffect, useState } from "react";
import { createProject } from "../../store/actions/projectActions";
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
// import fontawesome from "./fontawsome5.json";
import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";
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

const CreateProject = (props) => {
  // const { register, handleSubmit, setValue } = useForm();
  const { register, handleSubmit, errors, setValue } = useForm();
  const [skillType, setSkillType] = useState([]);
  const [skillIcon, setSkillIcon] = useState("");
  let skillCollection = [];

  console.log(skillCollection);
  // console.log("lolo");
  const handleChange = (e) => {
    setSkillType(e.target.value);
  };
  const handleIcon = (e) => {
    setSkillIcon(e.target.value);
  };
  useEffect(() => {
    register({ name: "stacks" });
    if (props.skills) {
      setSkillType(props.skills);
    }
  });

  const onSubmit = (data, e) => {
    e.preventDefault();
    console.log("SUBMIT");
    console.log(data);
    props.createProject(data);
    props.history.push("/");
  };
  return (
    <Container maxWidth="lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid xs={12} />
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
          <Grid item xs={12}>
            {skillType ? (
              <Autocomplete
                multiple
                id="tags-outlined"
                options={skillType}
                getOptionLabel={(option) => option.name}
                filterSelectedOptions
                onChange={(e, data) => {
                  setValue("stacks", data);
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
    createProject: (skill) => dispatch(createProject(skill)),
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
