import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
import Preview from "./components/dashboard/Preview";
import CreateProject from "./components/projects/CreateProject";
import CreateSkill from "./components/skills/CreateSkill";
import EditSkill from "./components/skills/EditSkill";
import CreateEducation from "./components/education/CreateEducation";
import EditEducation from "./components/education/EditEducation";
import EditProject from "./components/projects/EditProject";
import EditProfile from "./components/profile/EditProfile";
import CreateWork from "./components/work/CreateWork";
import { Hidden } from "@material-ui/core";
import EditWork from "./components/work/EditWork";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          {/* <Hidden only="xs">
            <Navbar />
          </Hidden> */}
          <Switch>
            <Route exact path="/" component={Preview} />
            <Route exact path="/list" component={Dashboard} />
            <Route exact path="/create-project" component={CreateProject} />
            <Route exact path="/create-skill" component={CreateSkill} />
            <Route exact path="/edit-skill/:id" component={EditSkill} />
            <Route exact path="/edit-work/:id" component={EditWork} />
            <Route exact path="/edit-profile" component={EditProfile} />
            <Route exact path="/edit-education/:id" component={EditEducation} />
            <Route exact path="/edit-project/:id" component={EditProject} />
            <Route exact path="/create-education" component={CreateEducation} />
            <Route exact path="/create-work" component={CreateWork} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
