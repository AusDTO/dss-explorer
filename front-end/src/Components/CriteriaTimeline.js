import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Feed, Label, Segment, Header } from "semantic-ui-react";
import Timestamp from "./Timestamp";
import { CalculateRatingColor } from "./Goals";
import "./CriteriaTimeline.css";

class CriteriaTimeline extends React.Component {
  render() {
    const { goal, assessmentId, project } = this.props;
    const assessment = project.assessments.find(x => x.id === assessmentId);
    const gaForCriteria = project.assessments.map(a => {
      const ga = a.goalAssessments.find(x => x.goalNumber === goal.number);
      return {
        when: a.when,
        ...ga
      };
    });
    const history = gaForCriteria
      .filter(x => !!x)
      .filter(x => !assessment || moment(x.when) < moment(assessment.when))
      .filter(x => !!x.rating && x.rating !== "Unknown" && x.rating !== "NA");
    const events = history.map(ga => {
      const body = (
        <div>
          {!!ga.positiveComments && (
            <div>
              <h4>Positive</h4>
              {ga.positiveComments}
            </div>
          )}
          {ga.areasForImprovement && (
            <div>
              <h4>Area for improvement</h4>
              {ga.areasForImprovement}
            </div>
          )}
        </div>
      );
      return {
        key: ga.id,
        summary: ga.assessor,
        image: <Label circular empty color={CalculateRatingColor(ga.rating)} />,
        extraText: body,
        date: Timestamp({ when: ga.when })
      };
    });
    return (
      <Segment className="criteriaTimeline">
        <Header>History</Header>
        {events.length ? (
          <Feed events={events} />
        ) : (
          <p>No previous assessments</p>
        )}
      </Segment>
    );
  }
}

CriteriaTimeline.propTypes = {
  project: PropTypes.object.isRequired
};

export default CriteriaTimeline;
