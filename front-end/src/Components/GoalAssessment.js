import React from "react";
import PropTypes from "prop-types";
import { CalculateGoalTitle } from "./Goals";
import GoalAssessmentDetail from "./GoalAssessmentDetail";
import GoalAssessmentHistory from "./GoalAssessmentHistory";

import {
  Container,
  Header,
  Button,
  Segment,
  Transition,
  Grid
} from "semantic-ui-react";

class GoalAssessment extends React.Component {
  constructor(props) {
    super(props);
    this.state = { historyVisible: false };
  }
  render() {
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
          <span style={{ marginLeft: "1em" }} />
          <Button
            compact
            circular
            onClick={() => this.setState({ visible: !this.state.visible })}
            icon={!!this.state.visible ? "chevron down" : "chevron up"}
          />
          <Transition.Group animation="fade down" duration={500}>
            {!!this.state.visible && (
              <Segment secondary>{this.props.goal.description}</Segment>
            )}
          </Transition.Group>
        </div>

        <Grid columns={16} style={{ clear: "both" }}>
          <Grid.Row>
            <Grid.Column width={this.state.historyVisible ? 8 : 16}>
              <GoalAssessmentDetail {...this.props} />
            </Grid.Column>
            {!!this.state.historyVisible && (
              <Grid.Column width={8}>
                <GoalAssessmentHistory {...this.props} />
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
