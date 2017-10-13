import React from "react";
import "./App.css";
import PageHeader from "./Components/PageHeader";
import PageFooter from "./Components/PageFooter";
import Overview from "./Components/Overview.js";
import Projects from "./Components/Projects.js";
import ProjectAssessments from "./Components/ProjectAssessments.js";
import AssessmentPage from "./Components/AssessmentPage.js";
import Admin from "./Components/Admin.js";

import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="react-root">
          <PageHeader />
          <div className="body-content">
            <Route exact path="/" component={Overview} />
            <Route path="/projects" component={Projects} />
            <Route path="/project/:id" component={ProjectAssessments} />
            <Route path="/assessment/:id" component={AssessmentPage} />
            <Route path="/admin" component={Admin} />
          </div>
          <PageFooter />
        </div>
      </Router>
    );
  }
}

export default App;
