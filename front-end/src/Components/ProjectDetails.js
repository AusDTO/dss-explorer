import React from "react";
import { get } from "lodash";
import moment from "moment";
import { Container, Button, Table, Item, Segment, Popup, Header, Input, Message } from "semantic-ui-react";
import Timestamp from "./Timestamp";
import "./ProjectDetails.css";

const LabelledField = ({ id, text, value }) => {
  const idOrText = id || text;
  return (
    <div className="ui fluid labeled input">
      <div className="ui label label">{text}</div>
      <div className="staticValue">{value}</div>
    </div>
  );
};

class ProjectDetails extends React.Component {
  render() {
    const model = get(this.props, "model");
    if (!model) {
      return <div className="notFound">No project</div>;
    }
    console.log(model);
    return (
      <div className="projectDetails">
        <Message attached="top">Project Details</Message>
        <Segment attached>
          <LabelledField text="Name" value={model.name} />
          <LabelledField text="Organisation" value={model.organisation} />
          <LabelledField text="Contact" value={model.contact} />
          <LabelledField text="Lead Assessor" value={model.leadAssessor} />
          <LabelledField text="Stage" value={model.stage} />
        </Segment>
      </div>
    );
  }
}

export default ProjectDetails;
