import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { get } from "lodash";
import moment from "moment";
import { graphql, gql, compose } from "react-apollo";
import { Loading, TopInnerHeading, Error } from "./Basics.js";
import {
  Container,
  Button,
  Table,
  Item,
  Segment,
  Input
} from "semantic-ui-react";
import GoalsLightBoard from "./GoalsLightBoard";
import Timestamp from "./Timestamp";
import DateInput from "./DateInput";
import Breadcrumbs from "./Breadcrumbs";
import "./ProjectAssessments.css";

const fakeData = {
  id: "fakeId1",
  name: "Identity - IDP",
  contact: "Meera Pankhania",
  leadAssessor: "Leisa Reichart",
  nextAssessment: "2017-12-01",
  createdAt: "2016-03-27",
  assessments: [
    {
      id: "cj8dvy6da1olc0195hy26ayqeA",
      when: "2017-10-05T03:11:13.052Z",
      summary: "Good effort. Needs to try harder.",
      leadAssessor: "Leisa Reichart",
      project: {
        id: "cj8dmhvkw1hai0195g2vkn4cs",
        name: "Identity IDP"
      },
      goalAssessments: [
        {
          areasForImprovement: "a lot!",
          assessor: "tyu",
          evidence: "",
          goalNumber: 1,
          id: "cj8fhvyii7l5v0100zy3qdxkn",
          positiveComments: "mostly positive",
          rating: "Red"
        },
        {
          areasForImprovement: "",
          assessor: "",
          evidence: "",
          goalNumber: 2,
          id: "cj8fhwp4zaav30112dm82xp2o",
          positiveComments: "something positive",
          rating: "Green"
        }
      ]
    },
    {
      id: "cj8dvy6da1olc0195hy26ayqeB",
      when: "2017-09-17T03:11:13.052Z",
      summary: "Terrible. There are simply no words :(",
      leadAssessor: "Julie Reynolds",
      project: {
        id: "cj8dmhvkw1hai0195g2vkn4cs",
        name: "Identity IDP"
      },
      goalAssessments: [
        {
          areasForImprovement: "a lot!",
          assessor: "tyu",
          evidence: "",
          goalNumber: 1,
          id: "cj8fhvyii7l5v0100zy3qdxknA",
          positiveComments: "mostly positive",
          rating: "Red"
        },
        {
          areasForImprovement: "Read a book",
          assessor: "",
          evidence: "",
          goalNumber: 2,
          id: "cj8fhwp4zaav30112dm82xp2oB",
          positiveComments: "",
          rating: "Amber"
        },
        {
          areasForImprovement: "Words fail me",
          assessor: "",
          evidence: "",
          goalNumber: 3,
          id: "cj8fhwp4zaav30112dm82xp2oC",
          positiveComments: "",
          rating: "Amber"
        }
      ]
    }
  ]
};

class ProjectAssessments extends React.Component {
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

  handleSave = ({ id, contact, leadAssessor, nextAssessment }) => {
    console.log(
      "updating project details",
      contact,
      leadAssessor,
      nextAssessment
    );
    this.props
      .updateProjectMutation({
        variables: {
          projId: id,
          contact: contact,
          leadAssessor: leadAssessor,
          nextAssessment: moment(nextAssessment)
        }
      })
      .then(({ data }) => {
        console.log("saved data", data);
      })
      .catch(error => {
        console.log("there was an error saving the project details", error);
      });
  };

  handleCreate = (projectId, leadAssessor) => {
    console.log("creating assessment", projectId);
    this.props
      .createAssessmentMutation({
        variables: {
          projId: projectId,
          when: new Date(),
          leadAssessor: leadAssessor
        }
      })
      .then(({ data }) => {
        console.log("got data", data);
        this.props.history.push("/assessment/" + data.createAssessment.id);
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
    var model = get(this.props.data, "Project", fakeData);
    if (!model) {
      return <div>Unknown project</div>;
    }
    // Initialize state -- can't do this in the constructor since the data is still loading at that point
    if (model.updatedAt !== this.state.updatedAt) {
      const dt = moment(model.nextAssessment);
      this.state = {
        ...model,
        contact: model.contact || "",
        leadAssessor: model.leadAssessor || "",
        nextAssessment: dt.isValid() ? dt.format("D MMM YYYY") : ""
      };
    }

    const breadcrumbs = [
      { key: "home", content: "Home", href: "/" },
      { key: "projects", content: "Projects", href: "/projects" },
      { key: "project", content: model.name, active: true }
    ];

    return (
      <Container className="projectAssessments">
        <Breadcrumbs crumbs={breadcrumbs} />
        <Segment>
          <TopInnerHeading>{model.name}</TopInnerHeading>
          <Input
            fluid
            id="contact"
            label="Contact"
            value={this.state.contact}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
          <Input
            fluid
            id="leadAssessor"
            label="Lead Assessor"
            value={this.state.leadAssessor}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
          <DateInput
            fluid
            id="nextAssessment"
            label="Next Assessment"
            value={this.state.nextAssessment}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
        </Segment>
        <Table size="small">
          <Table.Header fullWidth>
            <Table.Row>
              <Table.HeaderCell style={{ fontSize: "1.5rem" }}>
                Assessments
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="right">
                <Button
                  positive
                  icon="star"
                  content="New Assessment"
                  onClick={() =>
                    this.handleCreate(model.id, model.leadAssessor)}
                />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {model.assessments.map(assessment => {
              const href = "/assessment/" + assessment.id;
              return (
                <Table.Row key={assessment.id}>
                  <Table.Cell width={5}>
                    <Item.Group link>
                      <Item>
                        <Item.Content>
                          <Item.Header href={href}>
                            <Timestamp when={assessment.when} />
                          </Item.Header>
                          <Item.Meta>{assessment.leadAssessor}</Item.Meta>
                          <Item.Description>
                            <p>{assessment.summary}</p>
                          </Item.Description>
                        </Item.Content>
                      </Item>
                    </Item.Group>
                  </Table.Cell>
                  <Table.Cell width={11}>
                    <GoalsLightBoard assessment={assessment} />
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

ProjectAssessments.propTypes = {
  data: PropTypes.object.isRequired
};

const ProjectAssessmentsQuery = gql`
  query ProjectAssessmentsQuery($projId: ID!) {
    Project(id: $projId) {
      id
      name
      contact
      leadAssessor
      nextAssessment
      createdAt
      updatedAt
      assessments(orderBy: when_DESC) {
        id
        when
        summary
        leadAssessor
        goalAssessments {
          goalNumber
          rating
          assessor
          positiveComments
          areasForImprovement
        }
      }
    }
  }
`;

const UpdateProjectMutation = gql`
  mutation UpdateProjectMutation(
    $projId: ID!
    $contact: String
    $leadAssessor: String
    $nextAssessment: DateTime
  ) {
    updateProject(
      id: $projId
      contact: $contact
      leadAssessor: $leadAssessor
      nextAssessment: $nextAssessment
    ) {
      id
      updatedAt
      contact
      leadAssessor
      nextAssessment
    }
  }
`;

const CreateAssessmentMutation = gql`
  mutation CreateAssessmentMutation(
    $projId: ID!
    $when: DateTime!
    $leadAssessor: String
  ) {
    createAssessment(
      when: $when
      projectId: $projId
      leadAssessor: $leadAssessor
    ) {
      id
    }
  }
`;

export default compose(
  graphql(UpdateProjectMutation, { name: "updateProjectMutation" }),
  graphql(CreateAssessmentMutation, { name: "createAssessmentMutation" }),
  graphql(ProjectAssessmentsQuery, {
    name: "data",
    options: props => ({
      variables: {
        projId: props.match.params.id
      }
    })
  })
)(withRouter(ProjectAssessments));
