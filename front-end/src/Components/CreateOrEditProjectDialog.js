import React from "react";
import PropTypes from "prop-types";
import { graphql, gql, compose } from "react-apollo";
import { Loading, Error } from "./Basics.js";
import {
  Button,
  Container,
  Modal,
  Form,
  Tab,
  Input,
  Segment,
  Popup,
  Item
} from "semantic-ui-react";
import DateInput from "./DateInput";

const LabelledField = ({ id, text, ...props }) => {
  return (
    <div className="ui fluid labeled input">
      <label htmlFor={id || text} className="ui label label">
        {text}
      </label>
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
      stage: "PreAlpha",
      assessorType: "DTA",
      ...this.props.project
    };
  }

  handleChange = e => {
    this.handleFieldChange(e.target.id, e);
  };

  handleFieldChange = (field, e) => {
    this.setState({ changed: true, [field]: e.target.value });
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
      nextAssessment: null,
      ...this.props.project,
      ...this.state
    };
    console.log("saving project", vars);
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

  makeStageButton = (text, stage, color) => {
    return (
      <Button
        key={stage}
        value={stage}
        color={this.state.stage === stage ? color : null}
        content={text}
      />
    );
  };

  makeAssessorButton = (text, stage, color) => {
    return (
      <Button
        key={stage}
        value={stage}
        color={this.state.assessorType === stage ? color : null}
        content={text}
      />
    );
  };

  render() {
    const header = !!this.props.project ? "Edit project" : "Create project";
    const emptyName = !this.state.name;
    return (
      <Modal
        dimmer="blurring"
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
              autoFocus
              label="Name"
              id="name"
              value={this.state.name}
              onChange={this.handleChange}
              error={emptyName}
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
            <LabelledField text="Stage">
              <Button.Group
                id="stage"
                onClick={e => this.handleFieldChange("stage", e)}
              >
                {this.makeStageButton("Pre-alpha", "PreAlpha", "olive")}
                <Button.Or />
                {this.makeStageButton("Alpha", "Alpha", "green")}
                <Button.Or />
                {this.makeStageButton("Beta", "Beta", "teal")}
                <Button.Or />
                {this.makeStageButton("Live", "Live", "blue")}
              </Button.Group>
            </LabelledField>
            <LabelledField text="Assessor type">
              <Button.Group
                id="assessorType"
                onClick={e => this.handleFieldChange("assessorType", e)}
              >
                {this.makeAssessorButton("DTA-led", "DTA", "teal")}
                <Button.Or />
                {this.makeAssessorButton("Self assessed", "Self", "blue")}
              </Button.Group>
            </LabelledField>
          </Container>
        </Modal.Content>
        <Modal.Actions>
          <Button content="Close" onClick={this.handleCancel} />
          <Button
            disabled={emptyName}
            positive
            content="Create"
            onClick={this.handleCreate}
          />
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
    $stage: String
    $assessorType: String
  ) {
    updateOrCreateProject(
      update: {
        id: $id
        name: $name
        leadAssessor: $leadAssessor
        contact: $contact
        nextAssessment: $nextAssessment
        organisation: $organisation
        stage: $stage
        assessorType: $assessorType
      }
      create: {
        name: $name
        leadAssessor: $leadAssessor
        contact: $contact
        nextAssessment: $nextAssessment
        organisation: $organisation
        stage: $stage
        assessorType: $assessorType
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