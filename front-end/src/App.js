import React, { Component } from "react";
import "./App.css";
import Navigation from "./Components/Navigation.js";
import Dashboard from "./Components/Dashboard.js";
import Projects from "./Components/Projects.js";
import ProjectDetail from "./Components/ProjectDetail.js";
import AssessmentPage from "./Components/AssessmentPage.js";
import Admin from "./Components/Admin.js";
import Home from "./Components/Home.js";
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <Router>
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/projects" component={Projects} />
            <Route path="/project/:id" component={ProjectDetail} />
            <Route path="/assessment/:id" component={AssessmentPage} />
            <Route path="/admin" component={Admin} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
