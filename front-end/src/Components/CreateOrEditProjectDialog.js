import React from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Button, Container, Modal, Input } from "semantic-ui-react";
import { CalculateStageColor, CalculateStageText } from "./Stage";

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
      nextAssessment: null,
      organisation: "",
      stage: "Discovery",
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

  makeStageButton = stage => {
    return (
      <Button
        key={stage}
        value={stage}
        color={this.state.stage === stage ? CalculateStageColor(stage) : null}
        content={CalculateStageText(stage)}
      />
    );
  };

  makeAssessorButton = (text, stage, color) => {
    return <Button key={stage} value={stage} color={this.state.assessorType === stage ? color : null} content={text} />;
  };

  render() {
    const header = !!this.props.project ? "Edit project" : "Create project";
    const buttonLabel = !!this.props.project ? "Save" : "Create";
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
            <Input fluid label="Contact" id="contact" value={this.state.contact} onChange={this.handleChange} />
            <Input
              fluid
              id="leadAssessor"
              label="Lead Assessor"
              value={this.state.leadAssessor}
              onChange={this.handleChange}
            />
            <LabelledField text="Stage">
              <Button.Group id="stage" onClick={e => this.handleFieldChange("stage", e)}>
                {this.makeStageButton("Discovery")}
                <Button.Or />
                {this.makeStageButton("Alpha")}
                <Button.Or />
                {this.makeStageButton("Beta")}
                <Button.Or />
                {this.makeStageButton("Live")}
              </Button.Group>
            </LabelledField>
            <LabelledField text="Assessor type">
              <Button.Group id="assessorType" onClick={e => this.handleFieldChange("assessorType", e)}>
                {this.makeAssessorButton("DTA-led", "DTA", "teal")}
                <Button.Or />
                {this.makeAssessorButton("Self assessed", "Self", "blue")}
              </Button.Group>
            </LabelledField>
          </Container>
        </Modal.Content>
        <Modal.Actions>
          <Button content="Close" onClick={this.handleCancel} />
          <Button disabled={emptyName} positive content={buttonLabel} onClick={this.handleCreate} />
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
    $stage: Stage
    $assessorType: AssessorType
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

export default graphql(upsertProject, {
  name: "upsertProject",
  options: { refetchQueries: ["ProjectListQuery"] }
})(CreateOrEditProjectDialog);
