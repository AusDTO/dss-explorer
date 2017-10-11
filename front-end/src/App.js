import React, { Component } from "react";
import "./App.css";
import PageHeader from "./Components/PageHeader";
import PageFooter from "./Components/PageFooter";
import Dashboard from "./Components/Dashboard.js";
import Projects from "./Components/Projects.js";
import ProjectAssessments from "./Components/ProjectAssessments.js";
import AssessmentPage from "./Components/AssessmentPage.js";
import Admin from "./Components/Admin.js";
import Home from "./Components/Home.js";

import { BrowserRouter as Router, Route } from "react-router-dom";

const appStyle = {
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  //background: "linear-gradient(90deg, #dee1e1 10%, #f4f4f4 90%)"
  background:
    "linear-gradient(135deg,rgba(176, 212, 205,1) 0,rgba(78,96,161,1) 100%)"
};
class App extends Component {
  render() {
    return (
      <div style={appStyle}>
        <PageHeader />
        <Router>
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/projects" component={Projects} />
            <Route path="/project/:id" component={ProjectAssessments} />
            <Route path="/assessment/:id" component={AssessmentPage} />
            <Route path="/admin" component={Admin} />
          </div>
        </Router>
        <PageFooter />
      </div>
    );
  }
}

export default App;
