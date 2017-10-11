import React from "react";
import { Segment, Breadcrumb, Icon } from "semantic-ui-react";

const Breadcrumbs = ({ crumbs, ...props }) => {
  return (
    <Segment inverted style={{ marginTop: "-1.5em" }}>
      <Breadcrumb
        size="small"
        divider={<Icon inverted name="chevron right" />}
        sections={crumbs}
        {...props}
      />
    </Segment>
  );
};

export default Breadcrumbs;
