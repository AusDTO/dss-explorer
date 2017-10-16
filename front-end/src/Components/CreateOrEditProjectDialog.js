import React from "react";
import PropTypes from "prop-types";
import { graphql, gql, compose } from "react-apollo";
import { Loading, Error } from "./Basics.js";
import {
  Button,
  Container,
  Modal,
  Menu,
  Tab,
  Input,
  Segment,
  Popup,
  Item
} from "semantic-ui-react";
import DateInput from "./DateInput";

const LabelledField = ({ label, ...props }) => {
  return (
    <div className="ui fluid labeled input">
      <div className="ui label label">{label}</div>
      <div style={{ marginLeft: "1em" }} {...props} />
    </div>
  );
};

class CreateOrEditProjectDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      leadAssessor: "",
      contact: "",
      nextAssessment: "",
      organisation: "",
      ...this.props.project
    };
  }

  handleChange = e => {
    this.setState({ changed: true, [e.target.id]: e.target.value });
  };

  handleCancel = e => {
    console.log("CANCEL!");
    this.close();
  };

  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  handleCreate = () => {
    const vars = {
      id: "",
      ...this.props.project,
      ...this.state,
      nextAssessment: null
    };
    console.log("saving assessment", vars);
    this.props
      .upsertProject({
        variables: vars
      })
      .then(({ data }) => {
        console.log("got data", data);
        this.close();
      })
      .catch(error => {
        console.error("there was an error creating the project", error);
      });
  };

  render() {
    const header = !!this.props.project ? "Edit project" : "Create project";
    return (
      <Modal
        open={this.state.open}
        onOpen={this.open}
        onClose={this.close}
        trigger={this.props.trigger}
      >
        <Modal.Header>{header}</Modal.Header>
        <Modal.Content>
          <Container className="projectDialog">
            <Input
              fluid
              label="Name"
              id="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <Input
              fluid
              label="Organisation"
              id="organisation"
              value={this.state.organisation}
              onChange={this.handleChange}
            />
            <Input
              fluid
              label="Contact"
              id="contact"
              value={this.state.contact}
              onChange={this.handleChange}
            />
            <Input
              fluid
              id="leadAssessor"
              label="Lead Assessor"
              value={this.state.leadAssessor}
              onChange={this.handleChange}
            />
            <LabelledField label="Stage">
              <Button.Group toggle>
                <Button content="Pre-alpha" />
                <Button.Or />
                <Button content="Alpha" />
                <Button.Or />
                <Button content="Beta" />
                <Button.Or />
                <Button content="Live" />
              </Button.Group>
            </LabelledField>
            <LabelledField label="Assessment type">
              <Button.Group toggle>
                <Button content="DTA-led" />
                <Button.Or />
                <Button content="Self assessed" />
              </Button.Group>
            </LabelledField>
          </Container>
        </Modal.Content>
        <Modal.Actions>
          <Button content="Close" onClick={this.handleCancel} />
          <Button positive content="Create" onClick={this.handleCreate} />
        </Modal.Actions>
      </Modal>
    );
  }
}

CreateOrEditProjectDialog.propTypes = {
  project: PropTypes.object
};

const upsertProject = gql`
  mutation upsertProject(
    $id: ID!
    $name: String!
    $leadAssessor: String
    $contact: String
    $nextAssessment: DateTime
    $organisation: String
  ) {
    updateOrCreateProject(
      update: {
        id: $id
        name: $name
        leadAssessor: $leadAssessor
        contact: $contact
        nextAssessment: $nextAssessment
        organisation: $organisation
      }
      create: {
        name: $name
        leadAssessor: $leadAssessor
        contact: $contact
        nextAssessment: $nextAssessment
        organisation: $organisation
      }
    ) {
      id
    }
  }
`;

export default compose(
  graphql(upsertProject, {
    name: "upsertProject",
    options: { refetchQueries: ["ProjectListQuery"] }
  })
)(CreateOrEditProjectDialog);
