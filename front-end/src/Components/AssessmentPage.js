import React from "react";
import PropTypes from "prop-types";
import { get } from "lodash";
import { graphql, gql } from "react-apollo";
import { Loading, TopHeading, Error } from "./Basics.js";
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

const fakeData = {
  id: "cj8dvy6da1olc0195hy26ayqe",
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
    this.setState({ [e.target.id]: e.target.value });
  };
  render() {
    if (this.props.data.loading) {
      return <Loading />;
    }
    // if (this.props.data.error) {
    //   return <Error data={this.props.data} />;
    // }
    var model = get(this.props.data, "Assessment", fakeData);
    if (!model) {
      return <div>Unknown assessment</div>;
    }
    // Initialize state -- can't do this in the constructor since the data is still loading at that point
    if (!this.state.when) {
      this.state = { ...model };
    }
    const panels = Goals.map(goal => {
      const goalAssessment = model.goalAssessments.find(
        x => x.goalNumber === goal.number
      );
      return {
        menuItem: (
          <Menu.Item key={goal.number} fitted>
            <div className="something" style={{ margin: "0.5em" }}>
              <GoalLight goal={goal} assessment={model} size="big" />
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
        <TopHeading>
          {"Assessment of " + model.project.name + " - "}
          <Timestamp when={model.when} />
        </TopHeading>
        <Segment>
          <Input
            fluid
            label="When"
            id="when"
            value={this.state.when}
            onChange={this.handleChange}
          />
          <div />
          <Input
            fluid
            id="summary"
            label="Summary"
            value={this.state.summary}
            type="textarea"
            onChange={this.handleChange}
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
