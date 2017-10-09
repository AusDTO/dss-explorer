import React from "react";
import { Container, Divider, List, Segment } from "semantic-ui-react";
import Logo from "./Logo.js";

class PageFooter extends React.Component {
  render() {
    return (
      <div>
        <Segment inverted style={{ padding: "0.1em 0em" }}>
          <Container textAlign="center">
            <Divider inverted section />
            <div style={{ margin: "1em" }}>
              <Logo centered />
            </div>
            <List horizontal inverted divided link>
              <List.Item as="a" href="#">
                Site Map
              </List.Item>
              <List.Item as="a" href="#">
                Contact Us
              </List.Item>
              <List.Item as="a" href="#">
                Terms and Conditions
              </List.Item>
              <List.Item as="a" href="#">
                Privacy Policy
              </List.Item>
            </List>
          </Container>
        </Segment>
      </div>
    );
  }
}

export default PageFooter;
