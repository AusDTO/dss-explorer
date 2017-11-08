import React from "react";
import { Container, Segment, Tab } from "semantic-ui-react";
import { TopInnerHeading } from "./Basics.js";
import AdminReporting from "./AdminReporting.js";
import AdminUsers from "./AdminUsers.js";

class Admin extends React.Component {
  render() {
    const panels = [
      {
        menuItem: "Users",
        render: () => <AdminUsers key="1" />
      },
      {
        menuItem: "Reporting",
        render: () => <AdminReporting key="2" />
      },
      {
        menuItem: "Projects",
        pane: {
          key: "3",
          content: "Showing something about PROJECTS",
          size: "large"
        }
      }
    ];
    return (
      <Container className="admin">
        <Segment>
          <TopInnerHeading>Admin</TopInnerHeading>
          <Tab panes={panels} menu={{ fluid: true, vertical: true }} />
        </Segment>
      </Container>
    );
  }
}

export default Admin;
