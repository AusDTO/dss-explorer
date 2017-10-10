import React from "react";
import PropTypes from "prop-types";
import { get } from "lodash";
import moment from "moment";
import { graphql, gql, compose } from "react-apollo";
import { Loading, TopInnerHeading, Error } from "./Basics.js";
import {
  Container,
  Menu,
  Tab,
  Input,
  Segment,
  Breadcrumb
} from "semantic-ui-react";
import Timestamp from "./Timestamp";
import GoalLight from "./GoalLight";
import GoalAssessment from "./GoalAssessment";
import Goals from "./Goals";
import DateInput from "./DateInput";

const fakeData = {
  id: "cj8dvy6da1olc0195hy26ayqed",
  when: "2017-10-05T03:11:13.052Z",
  summary: "Good effort. Needs to try harder.",
  project: {
    id: "cj8dmhvkw1hai0195g2vkn4cs",
    name: "Identity IDP",
    __typename: "Project"
  },
  goalAssessments: [
    {
      areasForImprovement: "a lot!",
      assessor: "tyu",
      evidence: "",
      goalNumber: 1,
      id: "cj8fhvyii7l5v0100zy3qdxkn",
      positiveComments: "mostly positive",
      rating: "Red",
      __typename: "GoalAssessment"
    },
    {
      areasForImprovement: "",
      assessor: "",
      evidence: "",
      goalNumber: 2,
      id: "cj8fhwp4zaav30112dm82xp2o",
      positiveComments: "something positive",
      rating: "Green",
      __typename: "GoalAssessment"
    }
  ],
  __typename: "Assessment"
};

class AssessmentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleChange = e => {
    this.setState({ changed: true, [e.target.id]: e.target.value });
  };
  handleBlur = e => {
    console.log("blur", this.state.changed);
    if (this.state.changed) {
      this.setState({ changed: false });
      this.handleSave(this.state);
    }
  };
  handleSave = ({ id, when, leadAssessor, summary }) => {
    console.log("saving assessment", id, when, leadAssessor, summary);
    this.props
      .updateAssessmentMutation({
        variables: {
          id: id,
          when: moment(when),
          leadAssessor: leadAssessor,
          summary: summary
        }
      })
      .then(({ data }) => {
        console.log("got data", data);
      })
      .catch(error => {
        console.log("there was an error creating the assessment", error);
      });
  };
  render() {
    if (this.props.data.loading) {
      return <Loading />;
    }
    if (this.props.data.error) {
      return <Error data={this.props.data} />;
    }
    var model = get(this.props.data, "Assessment", fakeData);
    if (!model) {
      return <div>Unknown assessment</div>;
    }
    // Initialize state -- can't do this in the constructor since the data is still loading at that point
    if (!this.state.when) {
      const dt = moment(model.when);
      this.state = {
        ...model,
        summary: model.summary || "",
        when: dt.isValid ? dt.format("D MMM YYYY") : model.when
      };
    }
    const panels = Goals.map(goal => {
      const goalAssessment = model.goalAssessments.find(
        x => x.goalNumber === goal.number
      );
      return {
        menuItem: (
          <Menu.Item key={goal.number} fitted>
            <div className="something" style={{ margin: "0.5em" }}>
              <GoalLight text={goal.number} ga={goalAssessment} size="big" />
            </div>
          </Menu.Item>
        ),
        pane: {
          key: goal.number,
          content: (
            <GoalAssessment
              assessmentId={model.id}
              goal={goal}
              goalAssessment={goalAssessment}
            />
          )
        }
      };
    });

    const breadcrumbs = [
      { key: "home", content: "Home", href: "/" },
      { key: "projects", content: "Projects", href: "/projects" },
      {
        key: "project",
        content: model.project.name,
        href: "/project/" + model.project.id
      },
      {
        key: "assessment",
        content: Timestamp({ when: model.when }),
        active: true
      }
    ];

    return (
      <Container>
        <Breadcrumb divider="/" sections={breadcrumbs} />

        <Segment>
          <TopInnerHeading>
            {"Assessment of " + model.project.name + " - "}
            <Timestamp when={model.when} />
          </TopInnerHeading>
          <DateInput
            fluid
            label="When"
            id="when"
            value={this.state.when}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
          <div style={{ paddingTop: "0.5em" }} />
          <Input
            fluid
            id="leadAssessor"
            label="Lead Assessor"
            value={this.state.leadAssessor}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
          <div style={{ paddingTop: "0.5em" }} />
          <Input
            fluid
            id="summary"
            label="Summary"
            value={this.state.summary}
            type="textarea"
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
        </Segment>
        <Tab
          panes={panels}
          renderActiveOnly={false}
          onTabChange={this.handleTabChange}
        />
      </Container>
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
      leadAssessor
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

const UpdateAssessmentMutation = gql`
  mutation UpdateAssessmentMutation(
    $id: ID!
    $when: DateTime!
    $leadAssessor: String
    $summary: String
  ) {
    updateAssessment(
      id: $id
      when: $when
      leadAssessor: $leadAssessor
      summary: $summary
    ) {
      id
      updatedAt
    }
  }
`;

export default compose(
  graphql(UpdateAssessmentMutation, { name: "updateAssessmentMutation" }),
  graphql(AssessmentPageQuery, {
    name: "data",
    options: props => ({
      variables: {
        assessmentId: props.match.params.id
      }
    })
  })
)(AssessmentPage);
