import React from "react";
import { Segment, Breadcrumb, Icon } from "semantic-ui-react";

const Breadcrumbs = ({ crumbs, ...props }) => {
  return (
    <div className="breadcrumbs">
      <Segment inverted>
        <Breadcrumb
          size="small"
          divider={<Icon inverted name="chevron right" />}
          sections={crumbs}
          {...props}
        />
      </Segment>
    </div>
  );
};

export default Breadcrumbs;
