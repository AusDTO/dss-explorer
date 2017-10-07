import React from "react";
import PropTypes from "prop-types";
import { graphql, gql } from "react-apollo";
import { Panel, Grid, Row, Col, Tabs, Tab } from "react-bootstrap";
import GoalAssessment from "./GoalAssessment";

class AssessmentPage extends React.Component {
  render() {
    if (this.props.data.loading) {
      return <div>Loading</div>;
    }
    if (this.props.data.error) {
      return <div>Error</div>;
    }
    const assessment = this.props.data.Assessment;
    if (!assessment) {
      return <div>Unknown assessment</div>;
    }
    const title = "Assessment of " + assessment.project.name;
    const goals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    return (
      <div>
        <Panel header={title} bsStyle="primary">
          <Grid>
            <Row>
              <Col>{assessment.when}</Col>
              <Col>{assessment.next}</Col>
              <Col>{assessment.summary}</Col>
            </Row>
          </Grid>
        </Panel>
        <Panel header="Goals" bsStyle="info">
          <Tabs id="goals-tab">
            {goals.map(goal => {
              const goalAssessment = assessment.goalAssessments.find(
                x => x.goalNumber === goal
              );
              return (
                <Tab key={goal} eventKey={goal} title={goal}>
                  <GoalAssessment
                    assessmentId={assessment.id}
                    goal={goal}
                    goalAssessment={goalAssessment}
                  />
                </Tab>
              );
            })}
          </Tabs>
        </Panel>
      </div>
    );
  }
}

AssessmentPage.propTypes = {
  data: PropTypes.object.isRequired
};

const AssessmentPageQuery = gql`
  query AssessmentPageQuery($assessmentId: ID!) {
    Assessment(id: $assessmentId) {
      id
      when
      summary
      project {
        id
        name
      }
      goalAssessments {
        areasForImprovement
        assessor
        evidence
        goalNumber
        id
        positiveComments
        rating
      }
    }
  }
`;

export default graphql(AssessmentPageQuery, {
  options: props => ({
    variables: {
      assessmentId: props.match.params.id
    }
  })
})(AssessmentPage);
