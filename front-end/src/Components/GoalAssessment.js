import React from "react";
import PropTypes from "prop-types";
import { CalculateGoalTitle } from "./Goals";
import GoalAssessmentDetail from "./GoalAssessmentDetail";
import CriteriaTimeline from "./CriteriaTimeline";
import GoalAssessmentAdvice from "./GoalAssessmentAdvice";
import GoalAssessmentRationale from "./GoalAssessmentRationale";
import "./GoalAssessment.css";

import { Container, Header, Button, Grid, Tab } from "semantic-ui-react";

class GoalAssessment extends React.Component {
  constructor(props) {
    super(props);
    this.state = { historyVisible: true };
  }
  render() {
    const panels = [
      {
        menuItem: "History",
        pane: {
          key: 1,
          content: <CriteriaTimeline {...this.props} />
        }
      },
      {
        menuItem: "Advice",
        pane: {
          key: 2,
          content: <GoalAssessmentAdvice goal={this.props.goal} />
        }
      },
      {
        menuItem: "Why this?",
        pane: {
          key: 3,
          content: <GoalAssessmentRationale goal={this.props.goal} />
        }
      }
    ];
    return (
      <Container>
        <div>
          <Header as="h2" style={{ display: "inline-block" }}>
            {CalculateGoalTitle(this.props.goal)}
          </Header>
          <Button
            floated="right"
            compact
            circular
            onClick={() =>
              this.setState({ historyVisible: !this.state.historyVisible })}
            icon={
              !!this.state.historyVisible ? "chevron right" : "chevron left"
            }
          />
        </div>

        <Grid columns={16} style={{ clear: "both" }}>
          <Grid.Row>
            <Grid.Column width={this.state.historyVisible ? 8 : 16}>
              <GoalAssessmentDetail {...this.props} />
            </Grid.Column>
            {!!this.state.historyVisible && (
              <Grid.Column width={8}>
                <Tab renderActiveOnly={false} panes={panels} />
                {/* <GoalAssessmentHistory {...this.props} /> */}
              </Grid.Column>
            )}
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

GoalAssessment.propTypes = {
  assessmentId: PropTypes.string.isRequired,
  goal: PropTypes.object.isRequired,
  goalAssessment: PropTypes.object
};

export default GoalAssessment;
