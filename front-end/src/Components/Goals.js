import { get } from "lodash";

export const CalculateRatingColor = (goalAssessment, defaultColor = null) => {
  var rating = get(goalAssessment, "rating");
  if (rating === "Red") return "red";
  if (rating === "Amber") return "orange";
  if (rating === "Green") return "green";
  if (rating === "NA") return "grey";
  return defaultColor;
};

export const CalculateRatingText = goalAssessment => {
  var rating = get(goalAssessment, "rating");
  if (rating === "Red") return "Failing";
  if (rating === "Amber") return "In progress";
  if (rating === "Green") return "Pass";
  if (rating === "NA") return "Not assessed";
  return null;
};

const Goals = [
  {
    number: 1,
    summary: "Understand user needs",
    description:
      "Research to develop a deep knowledge of the users and their context for the service."
  },
  {
    number: 2,
    summary: "Have a multi-disciplinary team",
    description:
      "Establish a sustainable multi-disciplinary team to design, build, operate and iterate the service, led by an experienced product manager with decision-making responsibility."
  },
  {
    number: 3,
    summary: "Agile and user-centered process",
    description:
      "Design and build the service using the service design and delivery process, taking an agile and user-centred approach."
  },
  {
    number: 4,
    summary: "Understand tools and systems",
    description:
      "Understand the tools and systems required to build, host, operate and measure the service and how to adopt, adapt or procure them."
  },
  {
    number: 5,
    summary: "Make it secure",
    description:
      "Identify the data and information the service will use or create. Put appropriate legal, privacy and security measures in place."
  },
  {
    number: 6,
    summary: "Consistent and responsive design",
    description:
      "Build the service with responsive design methods using common design patterns and the style guide."
  },
  {
    number: 7,
    summary: "Use open standards and common platforms",
    description:
      "Build using open standards and common government platforms where appropriate."
  },
  {
    number: 8,
    summary: "Make open source code",
    description: "Make all new source code open by default."
  },
  {
    number: 9,
    summary: "Make it accessible",
    description:
      "Ensure the service is accessible to all users regardless of their ability and environment."
  },
  {
    number: 10,
    summary: "Test the service",
    description:
      "Test the service from end to end, in an environment that replicates the live version."
  },
  {
    number: 11,
    summary: "Measure performance",
    description:
      "Measure performance against KPIs set out in the guides. Report on public dashboard."
  },
  {
    number: 12,
    summary: "Don’t forget the non-digital experience",
    description:
      "Ensure that people who use the digital service can also use the other available channels if needed, without repetition or confusion."
  },
  {
    number: 13,
    summary: "Encourage everyone to use the digital service",
    description:
      "Encourage users to choose the digital service and consolidate or phase out existing alternative channels where appropriate."
  }
];

export default Goals;
