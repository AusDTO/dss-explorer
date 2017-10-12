import React from "react";
import PropTypes from "prop-types";
import { get } from "lodash";
import moment from "moment";
import { graphql, gql, compose } from "react-apollo";
import { Loading, TopInnerHeading, Error } from "./Basics.js";
import {
  Container,
  Menu,
  Tab,
  Input,
  Segment,
  Popup,
  Item
} from "semantic-ui-react";
import Timestamp from "./Timestamp";
import GoalLight from "./GoalLight";
import GoalAssessment from "./GoalAssessment";
import { Goals, CalculateGoalTitle } from "./Goals";
import DateInput from "./DateInput";
import Breadcrumbs from "./Breadcrumbs";

class AssessmentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleChange = e => {
    this.setState({ changed: true, [e.target.id]: e.target.value });
  };
  handleBlur = e => {
    console.log("blur", this.state.changed);
    if (this.state.changed) {
      this.setState({ changed: false });
      this.handleSave(this.state);
    }
  };
  handleSave = ({ id, when, leadAssessor, summary }) => {
    console.log("saving assessment", id, when, leadAssessor, summary);
    this.props
      .updateAssessmentMutation({
        variables: {
          id: id,
          when: moment(when),
          leadAssessor: leadAssessor,
          summary: summary
        }
      })
      .then(({ data }) => {
        console.log("got data", data);
      })
      .catch(error => {
        console.log("there was an error creating the assessment", error);
      });
  };
  render() {
    // console.log(JSON.stringify(this.props.data.Assessment));
    if (this.props.data.loading) {
      return <Loading />;
    }
    if (this.props.data.error) {
      return <Error data={this.props.data} />;
    }
    var model = get(this.props.data, "Assessment", fakeData);
    if (!model) {
      return <div>Unknown assessment</div>;
    }
    // Initialize state -- can't do this in the constructor since the data is still loading at that point
    if (model.updatedAt !== this.state.updatedAt) {
      const dt = moment(model.when);
      this.state = {
        ...model,
        summary: model.summary || "",
        when: dt.isValid ? dt.format("D MMM YYYY") : model.when
      };
    }
    const panels = Goals.map(goal => {
      const goalAssessment = model.goalAssessments.find(
        x => x.goalNumber === goal.number
      );
      return {
        menuItem: (
          <Menu.Item key={goal.number} fitted>
            <div className="something" style={{ margin: "0.5em" }}>
              <Popup
                key={goal.number}
                flowing
                trigger={
                  <GoalLight
                    text={goal.number}
                    ga={goalAssessment}
                    size="big"
                  />
                }
              >
                <Item.Group>
                  <Item
                    header={CalculateGoalTitle(goal)}
                    description={goal.description}
                  />
                </Item.Group>
              </Popup>
            </div>
          </Menu.Item>
        ),
        pane: {
          key: goal.number,
          content: (
            <GoalAssessment
              assessmentId={model.id}
              goal={goal}
              goalAssessment={goalAssessment}
              project={model.project}
            />
          )
        }
      };
    });

    const breadcrumbs = [
      { key: "home", content: "Home", href: "/" },
      { key: "projects", content: "Projects", href: "/projects" },
      {
        key: "project",
        content: model.project.name,
        href: "/project/" + model.project.id
      },
      {
        key: "assessment",
        content: Timestamp({ when: model.when }),
        active: true
      }
    ];

    return (
      <Container>
        <Breadcrumbs crumbs={breadcrumbs} />
        <Segment>
          <TopInnerHeading>
            {"Assessment of " + model.project.name + " - "}
            <Timestamp when={model.when} />
          </TopInnerHeading>
          <DateInput
            fluid
            label="When"
            id="when"
            value={this.state.when}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
          <div style={{ paddingTop: "0.5em" }} />
          <Input
            fluid
            id="leadAssessor"
            label="Lead Assessor"
            value={this.state.leadAssessor}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
          <div style={{ paddingTop: "0.5em" }} />
          <Input
            fluid
            id="summary"
            label="Summary"
            value={this.state.summary}
            type="textarea"
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
        </Segment>
        <Tab
          panes={panels}
          renderActiveOnly={false}
          onTabChange={this.handleTabChange}
        />
      </Container>
    );
  }
}

AssessmentPage.propTypes = {
  data: PropTypes.object.isRequired
};

const AssessmentPageQuery = gql`
  query AssessmentPageQuery($assessmentId: ID!) {
    Assessment(id: $assessmentId) {
      id
      when
      summary
      leadAssessor
      updatedAt
      project {
        id
        name
        assessments(orderBy: when_DESC) {
          id
          when
          summary
          leadAssessor
          goalAssessments {
            areasForImprovement
            assessor
            evidence
            goalNumber
            id
            positiveComments
            rating
            updatedAt
          }
        }
      }
      goalAssessments {
        areasForImprovement
        assessor
        evidence
        goalNumber
        id
        positiveComments
        rating
        updatedAt
      }
    }
  }
`;

const UpdateAssessmentMutation = gql`
  mutation UpdateAssessmentMutation(
    $id: ID!
    $when: DateTime!
    $leadAssessor: String
    $summary: String
  ) {
    updateAssessment(
      id: $id
      when: $when
      leadAssessor: $leadAssessor
      summary: $summary
    ) {
      id
      when
      updatedAt
    }
  }
`;

export default compose(
  graphql(UpdateAssessmentMutation, { name: "updateAssessmentMutation" }),
  graphql(AssessmentPageQuery, {
    name: "data",
    options: props => ({
      variables: {
        assessmentId: props.match.params.id
      }
    })
  })
)(AssessmentPage);

const fakeData = {
  id: "cj8l6zrsabqq90100y8kjiq81",
  when: "2017-10-10T00:00:00.000Z",
  summary: "first working update off blur",
  leadAssessor: "Leisa Reichelt",
  updatedAt: "2017-10-10T05:55:27.000Z",
  project: {
    id: "cj8dmhvkw1hai0195g2vkn4cs",
    name: "Identity IDP",
    assessments: [
      {
        id: "cj8l6zrsabqq90100y8kjiq81",
        when: "2017-10-10T00:00:00.000Z",
        summary: "first working update off blur",
        leadAssessor: "Leisa Reichelt",
        goalAssessments: [
          {
            areasForImprovement:
              "The user should be able to use the system without reading the manual first! No RTFM here!!",
            assessor: "Leisa Reichelt",
            evidence: "",
            goalNumber: 1,
            id: "cj8lhjnvrbpq20113ehpz4hiz",
            positiveComments: "Meh",
            rating: "Amber",
            updatedAt: "2017-10-11T03:22:16.000Z",
            __typename: "GoalAssessment"
          },
          {
            areasForImprovement: "",
            assessor: "",
            evidence: "",
            goalNumber: 2,
            id: "cj8lhjzaxbvld01009vxslr6f",
            positiveComments: "",
            rating: "Amber",
            updatedAt: "2017-10-10T10:50:51.000Z",
            __typename: "GoalAssessment"
          },
          {
            areasForImprovement: "",
            assessor: "",
            evidence: "",
            goalNumber: 3,
            id: "cj8lhk123bpqa011375w49tcc",
            positiveComments: "",
            rating: "Red",
            updatedAt: "2017-10-10T10:50:54.000Z",
            __typename: "GoalAssessment"
          },
          {
            areasForImprovement: "",
            assessor: "",
            evidence: "",
            goalNumber: 4,
            id: "cj8lhk2ljbvli0100bir0jbt2",
            positiveComments: "",
            rating: "Green",
            updatedAt: "2017-10-10T10:50:56.000Z",
            __typename: "GoalAssessment"
          },
          {
            areasForImprovement: "",
            assessor: "",
            evidence: "",
            goalNumber: 5,
            id: "cj8lhk3xubvln010069qv0q4x",
            positiveComments: "",
            rating: "Red",
            updatedAt: "2017-10-10T10:50:57.000Z",
            __typename: "GoalAssessment"
          },
          {
            areasForImprovement: "What are you actually doing???",
            assessor: "",
            evidence: "",
            goalNumber: 5,
            id: "cj8lhkcjebvlu0100nfuz9b2h",
            positiveComments: "",
            rating: "Red",
            updatedAt: "2017-10-10T10:51:09.000Z",
            __typename: "GoalAssessment"
          },
          {
            areasForImprovement: "",
            assessor: "",
            evidence: "",
            goalNumber: 7,
            id: "cj8mg9o6a0t4i01965bwu8uko",
            positiveComments: "",
            rating: "Amber",
            updatedAt: "2017-10-11T03:02:37.000Z",
            __typename: "GoalAssessment"
          },
          {
            areasForImprovement: "",
            assessor: "Phillip Piper",
            evidence: "",
            goalNumber: 7,
            id: "cj8mg9zclcr4h0113pedqy57h",
            positiveComments: "",
            rating: "Amber",
            updatedAt: "2017-10-11T03:02:51.000Z",
            __typename: "GoalAssessment"
          },
          {
            areasForImprovement: "",
            assessor: "Phillip Piper",
            evidence: "",
            goalNumber: 7,
            id: "cj8mgbpsg0t5y0196tld4dmv1",
            positiveComments: "Good support for OIDC AND WSDL.",
            rating: "Amber",
            updatedAt: "2017-10-11T03:04:12.000Z",
            __typename: "GoalAssessment"
          },
          {
            areasForImprovement: "Need to consider SAML as ",
            assessor: "Phillip Piper",
            evidence: "",
            goalNumber: 7,
            id: "cj8mgc6ppcr5x0113hxx6fx74",
            positiveComments: "Good support for OIDC AND WSDL.",
            rating: "Amber",
            updatedAt: "2017-10-11T03:04:34.000Z",
            __typename: "GoalAssessment"
          },
          {
            areasForImprovement: "Need to consider SAML as ",
            assessor: "Phillip Piper",
            evidence: "Doesn't work with SAML identity based sites.",
            goalNumber: 7,
            id: "cj8mgcgekcr6d011337sp1d3i",
            positiveComments: "Good support for OIDC AND WSDL.",
            rating: "Amber",
            updatedAt: "2017-10-11T03:04:47.000Z",
            __typename: "GoalAssessment"
          },
          {
            areasForImprovement: "Need to consider SAML as priority.",
            assessor: "Phillip Piper",
            evidence: "Doesn't work with SAML identity based sites.",
            goalNumber: 7,
            id: "cj8mgclde0t6f01966fn9lkdr",
            positiveComments: "Good support for OIDC AND WSDL.",
            rating: "Amber",
            updatedAt: "2017-10-11T03:04:53.000Z",
            __typename: "GoalAssessment"
          },
          {
            areasForImprovement: "",
            assessor: "",
            evidence: "",
            goalNumber: 6,
            id: "cj8mgd5hm0t700196sdgz0356",
            positiveComments: "",
            rating: "Green",
            updatedAt: "2017-10-11T03:05:19.000Z",
            __typename: "GoalAssessment"
          },
          {
            areasForImprovement: "",
            assessor: "",
            evidence: "",
            goalNumber: 9,
            id: "cj8mgexhi0t7q01968opxbudr",
            positiveComments: "",
            rating: "Amber",
            updatedAt: "2017-10-11T03:20:35.000Z",
            __typename: "GoalAssessment"
          },
          {
            areasForImprovement: "",
            assessor: "",
            evidence: "",
            goalNumber: 8,
            id: "cj8mgfsul0t890196j4v7q84r",
            positiveComments: "",
            rating: "Amber",
            updatedAt: "2017-10-11T03:07:23.000Z",
            __typename: "GoalAssessment"
          },
          {
            areasForImprovement: "",
            assessor: "",
            evidence: "",
            goalNumber: 11,
            id: "cj8mglt3t0tcy0196f3r32o45",
            positiveComments: "",
            rating: "Green",
            updatedAt: "2017-10-11T03:12:03.000Z",
            __typename: "GoalAssessment"
          },
          {
            areasForImprovement: "",
            assessor: "",
            evidence: "",
            goalNumber: 11,
            id: "cj8mgmost0tdn0196vqqls5xt",
            positiveComments: "",
            rating: "Amber",
            updatedAt: "2017-10-11T03:13:09.000Z",
            __typename: "GoalAssessment"
          },
          {
            areasForImprovement: "",
            assessor: "",
            evidence: "",
            goalNumber: 12,
            id: "cj8mgwi6l0tpg0196qa4uxcrt",
            positiveComments: "",
            rating: "Red",
            updatedAt: "2017-10-11T03:20:22.000Z",
            __typename: "GoalAssessment"
          },
          {
            areasForImprovement: "",
            assessor: "",
            evidence: "",
            goalNumber: 10,
            id: "cj8mgwxavcrsu0113bpjbbl7c",
            positiveComments: "",
            rating: "Green",
            updatedAt: "2017-10-11T03:20:42.000Z",
            __typename: "GoalAssessment"
          },
          {
            areasForImprovement: "",
            assessor: "",
            evidence: "",
            goalNumber: 13,
            id: "cj8mgx7l6crt70113iuvnz769",
            positiveComments: "",
            rating: "NA",
            updatedAt: "2017-10-11T03:20:58.000Z",
            __typename: "GoalAssessment"
          }
        ],
        __typename: "Assessment"
      },
      {
        id: "cj8in3m8s3tyy0113yv3tyq7q",
        when: "2017-10-08T11:02:47.352Z",
        summary: null,
        leadAssessor: null,
        goalAssessments: [
          {
            areasForImprovement: "",
            assessor: "",
            evidence: "",
            goalNumber: 1,
            id: "cj8k7c5dda43u0100hv4vb5sh",
            positiveComments: "",
            rating: "Green",
            updatedAt: "2017-10-09T13:17:04.000Z",
            __typename: "GoalAssessment"
          },
          {
            areasForImprovement: "",
            assessor: "",
            evidence: "",
            goalNumber: 2,
            id: "cj8k7cmcv9za10113lm7jjixd",
            positiveComments: "",
            rating: "Amber",
            updatedAt: "2017-10-09T13:17:26.000Z",
            __typename: "GoalAssessment"
          },
          {
            areasForImprovement: "",
            assessor: "",
            evidence: "",
            goalNumber: 3,
            id: "cj8k7cobl9za80113vd4kx7du",
            positiveComments: "",
            rating: "Red",
            updatedAt: "2017-10-09T13:17:28.000Z",
            __typename: "GoalAssessment"
          },
          {
            areasForImprovement: "",
            assessor: "",
            evidence: "",
            goalNumber: 4,
            id: "cj8kyxozpb8u5011322vxncz9",
            positiveComments: "",
            rating: "Amber",
            updatedAt: "2017-10-10T02:09:39.000Z",
            __typename: "GoalAssessment"
          },
          {
            areasForImprovement: "Still needs more details",
            assessor: "Nicola Piper",
            evidence: "Demo, design documents",
            goalNumber: 4,
            id: "cj8kz0bcmb8w70113wnd5ddxq",
            positiveComments: "Great stuff",
            rating: "Amber",
            updatedAt: "2017-10-10T02:11:41.000Z",
            __typename: "GoalAssessment"
          }
        ],
        __typename: "Assessment"
      },
      {
        id: "cj8l5n2n6bonh01004midyg1h",
        when: "2017-10-07T00:00:00.000Z",
        summary: "Still have a long way to go",
        leadAssessor: "Phillip Piper",
        goalAssessments: [
          {
            areasForImprovement: "",
            assessor: "",
            evidence: "",
            goalNumber: 1,
            id: "cj8l5nme8boot0100b65nzj9a",
            positiveComments: "",
            rating: "Green",
            updatedAt: "2017-10-10T05:17:46.000Z",
            __typename: "GoalAssessment"
          },
          {
            areasForImprovement: "",
            assessor: "",
            evidence: "",
            goalNumber: 2,
            id: "cj8l5nr0dbop301005tf1lrc6",
            positiveComments: "",
            rating: "Amber",
            updatedAt: "2017-10-10T05:17:52.000Z",
            __typename: "GoalAssessment"
          },
          {
            areasForImprovement: "",
            assessor: "",
            evidence: "",
            goalNumber: 3,
            id: "cj8l5nshubiqx0113nob6mjwo",
            positiveComments: "",
            rating: "Amber",
            updatedAt: "2017-10-10T05:17:54.000Z",
            __typename: "GoalAssessment"
          },
          {
            areasForImprovement: "",
            assessor: "",
            evidence: "",
            goalNumber: 4,
            id: "cj8l5nu4xbirb0113jptbvxaf",
            positiveComments: "",
            rating: "Green",
            updatedAt: "2017-10-10T05:17:56.000Z",
            __typename: "GoalAssessment"
          },
          {
            areasForImprovement: "",
            assessor: "",
            evidence: "",
            goalNumber: 5,
            id: "cj8l5nvzzbirk0113nvjni04o",
            positiveComments: "",
            rating: "Red",
            updatedAt: "2017-10-10T05:17:58.000Z",
            __typename: "GoalAssessment"
          },
          {
            areasForImprovement: "",
            assessor: "",
            evidence: "",
            goalNumber: 6,
            id: "cj8l5nxoebopf0100vfqpbygg",
            positiveComments: "",
            rating: "Green",
            updatedAt: "2017-10-10T05:18:01.000Z",
            __typename: "GoalAssessment"
          },
          {
            areasForImprovement: "",
            assessor: "",
            evidence: "",
            goalNumber: 7,
            id: "cj8l5nzhzbopk0100xvb63vjt",
            positiveComments: "",
            rating: "Green",
            updatedAt: "2017-10-10T05:18:03.000Z",
            __typename: "GoalAssessment"
          },
          {
            areasForImprovement: "",
            assessor: "",
            evidence: "",
            goalNumber: 8,
            id: "cj8l5o1gsbis80113yaf31qau",
            positiveComments: "",
            rating: "Green",
            updatedAt: "2017-10-10T05:18:05.000Z",
            __typename: "GoalAssessment"
          },
          {
            areasForImprovement: "",
            assessor: "",
            evidence: "",
            goalNumber: 9,
            id: "cj8l5o3hibopu010014nwwsmt",
            positiveComments: "",
            rating: "Amber",
            updatedAt: "2017-10-10T05:18:08.000Z",
            __typename: "GoalAssessment"
          },
          {
            areasForImprovement: "",
            assessor: "",
            evidence: "",
            goalNumber: 10,
            id: "cj8l5o59ibopz0100dltj7azj",
            positiveComments: "",
            rating: "Green",
            updatedAt: "2017-10-10T05:18:10.000Z",
            __typename: "GoalAssessment"
          },
          {
            areasForImprovement: "",
            assessor: "",
            evidence: "",
            goalNumber: 11,
            id: "cj8l5o7inboq90100oi4a1nv7",
            positiveComments: "",
            rating: "Amber",
            updatedAt: "2017-10-10T05:18:13.000Z",
            __typename: "GoalAssessment"
          },
          {
            areasForImprovement: "",
            assessor: "",
            evidence: "",
            goalNumber: 12,
            id: "cj8l5o9lrboqs01006fmag9ly",
            positiveComments: "",
            rating: "Red",
            updatedAt: "2017-10-10T05:18:16.000Z",
            __typename: "GoalAssessment"
          },
          {
            areasForImprovement: "",
            assessor: "",
            evidence: "",
            goalNumber: 13,
            id: "cj8l5od1lbor60100r0jjlenz",
            positiveComments: "",
            rating: "Red",
            updatedAt: "2017-10-10T05:18:20.000Z",
            __typename: "GoalAssessment"
          }
        ],
        __typename: "Assessment"
      },
      {
        id: "cj8dvy6da1olc0195hy26ayqe",
        when: "2017-10-05T03:11:13.052Z",
        summary: "Good effort. Needs to try harder.",
        leadAssessor: null,
        goalAssessments: [
          {
            areasForImprovement: "",
            assessor: "tyuasdf asdf",
            evidence: "",
            goalNumber: 1,
            id: "cj8fhvyii7l5v0100zy3qdxkn",
            positiveComments: "mostly positive",
            rating: "Red",
            updatedAt: "2017-10-09T22:28:44.000Z",
            __typename: "GoalAssessment"
          },
          {
            areasForImprovement: "",
            assessor: "asd;'lfkas'd;lfk",
            evidence: "",
            goalNumber: 2,
            id: "cj8fhwp4zaav30112dm82xp2o",
            positiveComments: "something positive",
            rating: "Green",
            updatedAt: "2017-10-09T11:07:05.000Z",
            __typename: "GoalAssessment"
          },
          {
            areasForImprovement: "",
            assessor: "",
            evidence: "",
            goalNumber: 3,
            id: "cj8k5cuida2v60100mmklvfok",
            positiveComments: "",
            rating: "Amber",
            updatedAt: "2017-10-09T12:21:37.000Z",
            __typename: "GoalAssessment"
          },
          {
            areasForImprovement:
              "Almost everything. What are you people even doing?",
            assessor: "Joe Blogs",
            evidence: "",
            goalNumber: 4,
            id: "cj8k5d3z29y230113i33jyxcb",
            positiveComments: "Nothing!",
            rating: "Red",
            updatedAt: "2017-10-09T23:13:09.000Z",
            __typename: "GoalAssessment"
          },
          {
            areasForImprovement: "",
            assessor: "",
            evidence: "",
            goalNumber: 5,
            id: "cj8k5fb7ha2vt0100rmm6h5t0",
            positiveComments: "",
            rating: "Green",
            updatedAt: "2017-10-09T12:23:32.000Z",
            __typename: "GoalAssessment"
          },
          {
            areasForImprovement: "",
            assessor: "",
            evidence: "",
            goalNumber: 6,
            id: "cj8k5fgnza2w101005dctufqv",
            positiveComments: "",
            rating: "Green",
            updatedAt: "2017-10-09T12:23:39.000Z",
            __typename: "GoalAssessment"
          }
        ],
        __typename: "Assessment"
      },
      {
        id: "cj8lhlnz8bpqo01130e3igknx",
        when: "2017-03-09T13:00:00.000Z",
        summary:
          "Sometimes, I just want to scream. How have things gotten to this point where I can't even stand to look at what you have done.",
        leadAssessor: "Phillip",
        goalAssessments: [
          {
            areasForImprovement: "asdfasdfsfdsdfsdaf asdf asd fsd",
            assessor: "sdfgsdfgdfgsdfg asdf asdf sa sdfsdf",
            evidence: "asdfasdfasdfasdfsadf asd fasd fsd",
            goalNumber: 1,
            id: "cj8lmvvsqbs730113rvg4slk9",
            positiveComments:
              "sadfasdfasdfasdf asdf asdf s\nthis is\nsome multiline text\nthat has lots of interesting information",
            rating: "Green",
            updatedAt: "2017-10-11T00:52:22.000Z",
            __typename: "GoalAssessment"
          },
          {
            areasForImprovement: "",
            assessor: "",
            evidence: "",
            goalNumber: 1,
            id: "cj8lmw3hcby270100cwsymbq5",
            positiveComments: "",
            rating: "Amber",
            updatedAt: "2017-10-10T13:20:15.000Z",
            __typename: "GoalAssessment"
          }
        ],
        __typename: "Assessment"
      },
      {
        id: "cj8f5p2v26n030112y799jpqf",
        when: "1979-10-31T00:00:00.000Z",
        summary: "something",
        leadAssessor: null,
        goalAssessments: [
          {
            areasForImprovement: "asdf32",
            assessor: "asdf1",
            evidence: "asdf4",
            goalNumber: 1,
            id: "cj8fi1eyx7lri0100l4wnw4ak",
            positiveComments: "asdf2",
            rating: "Red",
            updatedAt: "2017-10-06T06:17:48.000Z",
            __typename: "GoalAssessment"
          }
        ],
        __typename: "Assessment"
      }
    ],
    __typename: "Project"
  },
  goalAssessments: [
    {
      areasForImprovement:
        "The user should be able to use the system without reading the manual first! No RTFM here!!",
      assessor: "Leisa Reichelt",
      evidence: "",
      goalNumber: 1,
      id: "cj8lhjnvrbpq20113ehpz4hiz",
      positiveComments: "Meh",
      rating: "Amber",
      updatedAt: "2017-10-11T03:22:16.000Z",
      __typename: "GoalAssessment"
    },
    {
      areasForImprovement: "",
      assessor: "",
      evidence: "",
      goalNumber: 2,
      id: "cj8lhjzaxbvld01009vxslr6f",
      positiveComments: "",
      rating: "Amber",
      updatedAt: "2017-10-10T10:50:51.000Z",
      __typename: "GoalAssessment"
    },
    {
      areasForImprovement: "",
      assessor: "",
      evidence: "",
      goalNumber: 3,
      id: "cj8lhk123bpqa011375w49tcc",
      positiveComments: "",
      rating: "Red",
      updatedAt: "2017-10-10T10:50:54.000Z",
      __typename: "GoalAssessment"
    },
    {
      areasForImprovement: "",
      assessor: "",
      evidence: "",
      goalNumber: 4,
      id: "cj8lhk2ljbvli0100bir0jbt2",
      positiveComments: "",
      rating: "Green",
      updatedAt: "2017-10-10T10:50:56.000Z",
      __typename: "GoalAssessment"
    },
    {
      areasForImprovement: "",
      assessor: "",
      evidence: "",
      goalNumber: 5,
      id: "cj8lhk3xubvln010069qv0q4x",
      positiveComments: "",
      rating: "Red",
      updatedAt: "2017-10-10T10:50:57.000Z",
      __typename: "GoalAssessment"
    },
    {
      areasForImprovement: "What are you actually doing???",
      assessor: "",
      evidence: "",
      goalNumber: 5,
      id: "cj8lhkcjebvlu0100nfuz9b2h",
      positiveComments: "",
      rating: "Red",
      updatedAt: "2017-10-10T10:51:09.000Z",
      __typename: "GoalAssessment"
    },
    {
      areasForImprovement: "",
      assessor: "",
      evidence: "",
      goalNumber: 7,
      id: "cj8mg9o6a0t4i01965bwu8uko",
      positiveComments: "",
      rating: "Amber",
      updatedAt: "2017-10-11T03:02:37.000Z",
      __typename: "GoalAssessment"
    },
    {
      areasForImprovement: "",
      assessor: "Phillip Piper",
      evidence: "",
      goalNumber: 7,
      id: "cj8mg9zclcr4h0113pedqy57h",
      positiveComments: "",
      rating: "Amber",
      updatedAt: "2017-10-11T03:02:51.000Z",
      __typename: "GoalAssessment"
    },
    {
      areasForImprovement: "",
      assessor: "Phillip Piper",
      evidence: "",
      goalNumber: 7,
      id: "cj8mgbpsg0t5y0196tld4dmv1",
      positiveComments: "Good support for OIDC AND WSDL.",
      rating: "Amber",
      updatedAt: "2017-10-11T03:04:12.000Z",
      __typename: "GoalAssessment"
    },
    {
      areasForImprovement: "Need to consider SAML as ",
      assessor: "Phillip Piper",
      evidence: "",
      goalNumber: 7,
      id: "cj8mgc6ppcr5x0113hxx6fx74",
      positiveComments: "Good support for OIDC AND WSDL.",
      rating: "Amber",
      updatedAt: "2017-10-11T03:04:34.000Z",
      __typename: "GoalAssessment"
    },
    {
      areasForImprovement: "Need to consider SAML as ",
      assessor: "Phillip Piper",
      evidence: "Doesn't work with SAML identity based sites.",
      goalNumber: 7,
      id: "cj8mgcgekcr6d011337sp1d3i",
      positiveComments: "Good support for OIDC AND WSDL.",
      rating: "Amber",
      updatedAt: "2017-10-11T03:04:47.000Z",
      __typename: "GoalAssessment"
    },
    {
      areasForImprovement: "Need to consider SAML as priority.",
      assessor: "Phillip Piper",
      evidence: "Doesn't work with SAML identity based sites.",
      goalNumber: 7,
      id: "cj8mgclde0t6f01966fn9lkdr",
      positiveComments: "Good support for OIDC AND WSDL.",
      rating: "Amber",
      updatedAt: "2017-10-11T03:04:53.000Z",
      __typename: "GoalAssessment"
    },
    {
      areasForImprovement: "",
      assessor: "",
      evidence: "",
      goalNumber: 6,
      id: "cj8mgd5hm0t700196sdgz0356",
      positiveComments: "",
      rating: "Green",
      updatedAt: "2017-10-11T03:05:19.000Z",
      __typename: "GoalAssessment"
    },
    {
      areasForImprovement: "",
      assessor: "",
      evidence: "",
      goalNumber: 9,
      id: "cj8mgexhi0t7q01968opxbudr",
      positiveComments: "",
      rating: "Amber",
      updatedAt: "2017-10-11T03:20:35.000Z",
      __typename: "GoalAssessment"
    },
    {
      areasForImprovement: "",
      assessor: "",
      evidence: "",
      goalNumber: 8,
      id: "cj8mgfsul0t890196j4v7q84r",
      positiveComments: "",
      rating: "Amber",
      updatedAt: "2017-10-11T03:07:23.000Z",
      __typename: "GoalAssessment"
    },
    {
      areasForImprovement: "",
      assessor: "",
      evidence: "",
      goalNumber: 11,
      id: "cj8mglt3t0tcy0196f3r32o45",
      positiveComments: "",
      rating: "Green",
      updatedAt: "2017-10-11T03:12:03.000Z",
      __typename: "GoalAssessment"
    },
    {
      areasForImprovement: "",
      assessor: "",
      evidence: "",
      goalNumber: 11,
      id: "cj8mgmost0tdn0196vqqls5xt",
      positiveComments: "",
      rating: "Amber",
      updatedAt: "2017-10-11T03:13:09.000Z",
      __typename: "GoalAssessment"
    },
    {
      areasForImprovement: "",
      assessor: "",
      evidence: "",
      goalNumber: 12,
      id: "cj8mgwi6l0tpg0196qa4uxcrt",
      positiveComments: "",
      rating: "Red",
      updatedAt: "2017-10-11T03:20:22.000Z",
      __typename: "GoalAssessment"
    },
    {
      areasForImprovement: "",
      assessor: "",
      evidence: "",
      goalNumber: 10,
      id: "cj8mgwxavcrsu0113bpjbbl7c",
      positiveComments: "",
      rating: "Green",
      updatedAt: "2017-10-11T03:20:42.000Z",
      __typename: "GoalAssessment"
    },
    {
      areasForImprovement: "",
      assessor: "",
      evidence: "",
      goalNumber: 13,
      id: "cj8mgx7l6crt70113iuvnz769",
      positiveComments: "",
      rating: "NA",
      updatedAt: "2017-10-11T03:20:58.000Z",
      __typename: "GoalAssessment"
    }
  ],
  __typename: "Assessment"
};
