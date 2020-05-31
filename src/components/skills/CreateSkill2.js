import React, { useEffect, useState } from "react";
import { createSkill } from "../../store/actions/skillActions";
import { connect } from "react-redux";
import { Container, Grid, Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useForm } from "react-hook-form";
import fontawesome from "./fontawsome5.json";
import Autocomplete from "@material-ui/lab/Autocomplete";

const CreateSkill = (props) => {
  const { register, handleSubmit, errors, setValue } = useForm();
  const [skillType, setSkillType] = useState("");
  const [skillIcon, setSkillIcon] = useState("");
  const handleChange = (e) => {
    setSkillType(e.target.value);
  };
  const handleIcon = (e) => {
    setSkillIcon(e.target.value);
  };
  useEffect(() => {
    register({ name: "icon" });
  });

  const onSubmit = (data, e) => {
    e.preventDefault();
    console.log("submit");
    console.log(data);
    // props.createSkill(data);
    // props.history.push("/");
  };
  return (
    <Container maxWidth="lg">
      <form onSubmit={handleSubmit(onSubmit)}>
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
              type="name"
              name="name"
              autoComplete="name"
              label="Skill Name"
              variant="outlined"
              errors={!!errors.name}
              inputRef={register({
                required: true,
              })}
              //   onChange={handleChange}
              required
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
                onChange={handleChange}
                errors={!!errors.type}
                inputRef={register({
                  required: true,
                })}
                label="Skill Type"
                inputProps={{
                  name: "type",
                  id: "type",
                  type: "type",
                }}
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
          {/* <Grid item xs={10}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="oylined-age-native-simple">
                Select Icon
              </InputLabel>
              <Select
                native
                onChange={handleIcon}
                errors={!!errors.type}
                inputRef={register({
                  required: true,
                })}
                label="Skill Icon"
                inputProps={{
                  name: "icon",
                  id: "icon",
                  type: "icon",
                }}
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
          </Grid> */}
          <Grid item xs={12}>
            <Autocomplete
              id="combo-box-demo"
              options={fontawesome}
              // onChange={handleIcon}
              getOptionLabel={(option) => option}
              // style={{ width: 300 }}
              fullWidth
              onChange={(e, data) => {
                setValue("icon", data);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Icon"
                  variant="outlined"
                  id="icon"
                  name="icon"
                  type="icon"
                  autoComplete="icon"
                />
              )}
            />
          </Grid>
          {/* <Grid item xs={2}>
            <Typography variant="h3" component="h3">
              <i class={this.state.icon}></i>
            </Typography>
          </Grid> */}
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
    createSkill: (skill) => dispatch(createSkill(skill)),
  };
};
export default connect(null, mapDispatchToProps)(CreateSkill);
