import React from "react";
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

class App extends React.Component {
  render() {
    return (
      <div className="react-root">
        <PageHeader />
        <Router>
          <div className="body-content">
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
