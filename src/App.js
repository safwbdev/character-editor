import React, { Component } from "react";
// import logo from "./logo.svg";
// import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProject from "./components/projects/CreateProject";
import CreateSkill from "./components/skills/CreateSkill";
import EditSkill from "./components/skills/EditSkill";
import CreateEducation from "./components/education/CreateEducation";
import CreateWork from "./components/work/CreateWork";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/create-project" component={CreateProject} />
            <Route exact path="/create-skill" component={CreateSkill} />
            <Route exact path="/edit-skill/:id" component={EditSkill} />
            <Route exact path="/create-education" component={CreateEducation} />
            <Route exact path="/create-work" component={CreateWork} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
