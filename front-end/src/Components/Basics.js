import React from "react";
import { Message, Icon, Header } from "semantic-ui-react";

export const TopHeading = props => {
  return (
    <Header style={{ fontSize: "2em", paddingTop: "0.5em", color: "#273cb3" }}>
      {props.children}
    </Header>
  );
};

export class Loading extends React.Component {
  render() {
    return (
      <Message icon>
        <Icon name="circle notched" loading />
        <Message.Content>
          <Message.Header>Just one second</Message.Header>
          We're fetching that content for you.
        </Message.Content>
      </Message>
    );
  }
}

export class Error extends React.Component {
  render() {
    console.log(this.props.data);
    return (
      <Message icon>
        <Icon name="warning" />
        <Message.Content>
          <Message.Header>Oops. Something bad happened</Message.Header>
          {this.props.data.error.message}
        </Message.Content>
      </Message>
    );
  }
}
