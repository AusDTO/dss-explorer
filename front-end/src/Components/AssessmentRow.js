import React from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col } from "react-bootstrap";

class AssessmentRow extends React.Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col>
            {this.props.assessment.when}
          </Col>
          <Col>
            {this.props.assessment.summary}
          </Col>
          <Col>
            {this.props.assessment.assessmentCount}
          </Col>
        </Row>
      </Grid>
    );
  }
}

AssessmentRow.propTypes = {
    assessment: PropTypes.object.isRequired
};

export default AssessmentRow;
