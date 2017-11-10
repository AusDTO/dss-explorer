import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { get, flowRight } from "lodash";
import moment from "moment";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Loading, Error } from "./Basics.js";
import { Container, Button, Table, Item, Segment, Popup, Header, Icon } from "semantic-ui-react";
import GoalsLightBoard from "./GoalsLightBoard";
import Timestamp from "./Timestamp";
import DateInput from "./DateInput";
import Breadcrumbs from "./Breadcrumbs";
import "./ProjectAssessments.css";
import CreateOrEditProjectDialog from "./CreateOrEditProjectDialog";
import ProjectDetails from "./ProjectDetails";

class ProjectAssessments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps = newProps => {
    var model = get(newProps.data, "Project");

    if (!model) {
      return;
    }
    if (this.state.updatedAt && model.updatedAt === this.state.updatedAt) {
      return;
    }

    const dt = moment(model.nextAssessment);
    this.setState({
      ...model,
      contact: model.contact || "",
      leadAssessor: model.leadAssessor || "",
      nextAssessment: dt.isValid() ? dt.format("D MMM YYYY") : ""
    });
  };

  handleChange = e => {
    this.setState({ changed: true, [e.target.id]: e.target.value });
  };

  handleSettingChange = (field, value) => {
    this.setState({ [field]: value });
  };

  handleBlur = e => {
    if (this.state.changed) {
      this.setState({ changed: false });
      this.handleSave(this.state);
    }
  };

  handleSave = ({ id, contact, leadAssessor, nextAssessment }) => {
    console.log("updating project details", contact, leadAssessor, nextAssessment);
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
    const breadcrumbs = [
      { key: "home", content: "Home", href: "/" },
      { key: "projects", content: "Projects", href: "/projects" },
      { key: "project", content: model.name, active: true }
    ];
    return (
      <Container className="projectAssessments">
        <Breadcrumbs crumbs={breadcrumbs} />
        <Segment>
          <CreateOrEditProjectDialog
            project={model}
            trigger={<Button className="editButton" icon="pencil" content="Edit" />}
          />
          <Header>
            {model.name}
            <Popup content={<ProjectDetails model={model} />} trigger={<Icon name="info circle" />} />
          </Header>
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
              <Table.HeaderCell className="header2">Assessments</Table.HeaderCell>

              <Table.HeaderCell textAlign="right">
                <Popup
                  content="Create a new assessment"
                  trigger={
                    <Button
                      positive
                      icon="plus"
                      content="New"
                      onClick={() => this.handleCreate(model.id, model.leadAssessor)}
                    />
                  }
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
            {!model.assessments.length && (
              <Table.Row>
                <div className="notFound">No assessments yet</div>
              </Table.Row>
            )}
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
      organisation
      contact
      leadAssessor
      nextAssessment
      createdAt
      updatedAt
      stage
      assessorType
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
  mutation UpdateProjectMutation($projId: ID!, $contact: String, $leadAssessor: String, $nextAssessment: DateTime) {
    updateProject(id: $projId, contact: $contact, leadAssessor: $leadAssessor, nextAssessment: $nextAssessment) {
      id
      updatedAt
      contact
      leadAssessor
      nextAssessment
    }
  }
`;

const CreateAssessmentMutation = gql`
  mutation CreateAssessmentMutation($projId: ID!, $when: DateTime!, $leadAssessor: String) {
    createAssessment(when: $when, projectId: $projId, leadAssessor: $leadAssessor) {
      id
    }
  }
`;

export default flowRight(
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

const fakeData = {
  id: "fakeId1",
  name: "Identity - IDP",
  contact: "Meera Pankhania",
  leadAssessor: "Leisa Reichart",
  nextAssessment: "2017-12-01",
  createdAt: "2016-03-27",
  updatedAt: "2016-03-27",
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
