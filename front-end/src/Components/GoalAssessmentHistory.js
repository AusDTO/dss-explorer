import React from "react";
import PropTypes from "prop-types";

import { Dropdown, Button } from "semantic-ui-react";
import "./GoalAssessmentHistory.css";
import GoalAssessmentDetailReadOnly from "./GoalAssessmentDetailReadOnly";
import Timestamp from "./Timestamp";
import { CalculateRatingColor } from "./Goals";
import { get } from "lodash";

class GoalAssessmentHistory extends React.Component {
  constructor(props) {
    super(props);
    const { assessmentId, project } = this.props;
    // By default, start browsing the history at the assessment historically before the given id
    var idx = 1 + project.assessments.findIndex(x => x.id === assessmentId);
    if (idx >= project.assessments.length - 1) idx = 0;
    this.state = {
      selectedAssessmentId: project.assessments[idx].id
    };
  }

  handleSelectionChange = (event, data) => {
    this.setState({
      selectedAssessmentId: data.value
    });
  };

  handleClickPrevious = () => {
    const { project } = this.props;
    var idx =
      project.assessments.findIndex(
        x => x.id === this.state.selectedAssessmentId
      ) + 1;
    if (idx >= project.assessments.length - 1) idx = 0;
    this.setState({
      selectedAssessmentId: project.assessments[idx].id
    });
  };

  handleClickNext = () => {
    const { project } = this.props;
    var idx =
      project.assessments.findIndex(
        x => x.id === this.state.selectedAssessmentId
      ) - 1;
    if (idx < 0) idx = 0;
    this.setState({
      selectedAssessmentId: project.assessments[idx].id
    });
  };

  calculateGoalColor = (assessment, goal) => {
    return CalculateRatingColor(
      assessment.goalAssessments.find(x => x.goalNumber === goal.number)
    );
  };

  render() {
    const { assessmentId, goal, project } = this.props;
    const history = project.assessments.map(x => {
      return {
        key: x.id,
        icon: x.id === assessmentId ? "chevron right" : null,
        label: {
          color: this.calculateGoalColor(x, goal),
          empty: true,
          circular: true
        },
        text: Timestamp({ when: x.when }),
        value: x.id
      };
    });
    const selectedAssessment = project.assessments.find(
      x => x.id === this.state.selectedAssessmentId
    );
    const selectedGoalAssessment = selectedAssessment.goalAssessments.find(
      x => x.goalNumber === goal.number
    );
    return (
      <div className="historian">
        <div className="title">History</div>
        <div className="navigation">
          <Button
            icon="chevron circle left"
            onClick={this.handleClickPrevious}
          />
          <Dropdown
            header="Assessment History"
            upward
            selection
            options={history}
            value={this.state.selectedAssessmentId}
            onChange={this.handleSelectionChange}
          />
          <Button icon="chevron circle right" onClick={this.handleClickNext} />
        </div>
        <div>
          <GoalAssessmentDetailReadOnly
            goalAssessment={selectedGoalAssessment}
          />
        </div>
      </div>
    );
  }
}

GoalAssessmentHistory.propTypes = {
  assessmentId: PropTypes.string.isRequired,
  goal: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired
};

export default GoalAssessmentHistory;
