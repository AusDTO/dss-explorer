import { get } from "lodash";

export const CalculateRatingColor = (
  goalAssessmentOrRating,
  defaultColor = null
) => {
  var rating = get(goalAssessmentOrRating, "rating", goalAssessmentOrRating);
  if (rating === "Red") return "red";
  if (rating === "Amber") return "orange";
  if (rating === "Green") return "green";
  if (rating === "NA") return "grey";
  return defaultColor;
};

export const CalculateRatingText = (
  goalAssessmentOrRating,
  defaultText = null
) => {
  var rating = get(goalAssessmentOrRating, "rating", goalAssessmentOrRating);
  if (rating === "Red") return "Failing";
  if (rating === "Amber") return "In progress";
  if (rating === "Green") return "Pass";
  if (rating === "NA") return "Not assessed";
  return defaultText;
};

export const CalculateGoalTitle = goal => {
  return "#" + goal.number + ". " + goal.summary;
};

export const Goals = [
  {
    number: 1,
    summary: "Understand user needs",
    description: `Understand user needs. Research to develop a deep knowledge of the users and their context for using the service.`,
    reason: `<p>You need to understand the people who use your service (your users) and what they want to do (their user needs) in order to build a service that works for them. You need to understand users and their needs from their point of view and not solely through the lens of the project you have been tasked with.</p>
  
  <p>To do this, you will need to really understand what users are trying to do when they encounter your part of the service and you need to design services that address that context. This will often involve understanding things that are not ‘in scope’ or part of your responsibility so that you can design better services.</p>
  
  <p>You will need to understand all aspects (end to end and across channels) of your users’ current experience. You should include as users everyone who is involved in the service delivery: end users, public servants delivering the service and other intermediaries who support end users to access the service.</p>
  
  <p>Your user research needs to cover a wide range of users and show that you understand how different user scenarios may impact service design and delivery. You must include from the earliest stages users who may need assistance to interact digitally, or are unable to interact digitally at all.</p>`,
    advice: `<p>During the <a target="_blank" href="https://www.dta.gov.au/standard/service-design-and-delivery-process/discovery/">Discovery</a> and Alpha stages the entire team should have spent a lot of time with end users and learned a lot about their needs. You should understand and be able to show evidence to demonstrate:</p>
  
  <ul>
    <li><strong>Who are the users?</strong> What about their motivations, triggers, contexts are significant for your service? How can you find them to invite them to participate in user research? You must include users with varying needs (such as needs arising from disability, cultural diversity, literacy and remoteness). Consider all the users in the service including end users, users in government who are delivering the service, and key intermediaries (professional and personal network)</li>
    <li><strong>What is the real task(s) that people are trying to achieve</strong> when they encounter your service. What is the ‘job’ people are trying to get done that your service is a part of? (You need to describe this in words that real end users would use, not using government terminology)</li>
    <li><strong>How are users currently doing the task</strong> your service aims to help them do and key touch points, for example through journey maps.  What other relevant government and non-government services are also in use at this time? Where are the pain points in the current experience?</li>
    <li><strong>What are the user needs?</strong> What are the opportunities to remove or reduce the pain points? How might we better meet the user needs? (Demonstrate this through research, testing and validating possible solutions with prototypes)</li>
    <li><strong>Are you designing the right thing?</strong> How have your insights from user research helped you to define your minimum viable product (MVP)? How does the MVP create value for users and government by better meeting user needs?</li>
  </ul>
  
  <p>During the Beta stage your understanding of what your users value will have matured through testing design prototypes with them. By the end of the Beta stage you should be able to show:</p>
  
  <ul>
    <li>Greater depth and diversity of knowledge on all of the points above from Alpha/Beta as well as</li>
    <li><strong>How has your service been shaped by user needs?</strong> Show how you have made changes in the service and interaction design in response to user research and usability testing. You can evidence this by showing how the design has changed over time and the appropriate research findings that have driven this change</li>
    <li><strong>How you tested the system in the users’ context with a full range of users</strong> (including users with varying needs). You can evidence this with artefacts of research, for example, video clips and outcomes from research analysis</li>
    <li><strong>Are you prepared for ongoing user research?</strong> Show how you plan to continue to test the system with users and the resources for this, for example through an ongoing research plan and budget</li>
    <li><strong>What have you not solved yet?</strong> What the significant design challenges are, for example through key insights, how have you approached them? How do you plan to continue to tackle them?</li>
    <li><strong>How will you know if your design is working?</strong> Make sure that research has fed into the <a target="_blank" href="https://www.dta.gov.au/standard/11-measure-performance/">metrics you have developed</a> to know that you continue to meet your user needs</li>
  </ul>
  
  <p>By the time you are ready to go live you should:</p>
  
  <ul>
    <li>Be able to show greater depth of knowledge for all the points above as well as</li>
    <li><strong>Show how you are using data from real use</strong> to understand which parts of the task users are finding difficult and how you are designing experiments to reduce friction and increase success for users</li>
    <li>Know how you will <a target="_blank" href="https://www.dta.gov.au/standard/11-measure-performance/">measure and monitor your service</a> to ensure it is serving its users well</li>
  </ul>`
  },
  {
    number: 2,
    summary: "Have a multidisciplinary team",
    description: `Establish a sustainable multidisciplinary team to design, build, operate and iterate the service, led by an experienced product manager with decision-making responsibility.`,
    reason: `<p>Good government services are built quickly and iteratively, based on user needs. Your <a target="_blank" href="https://www.dta.gov.au/standard/design-guides/the-team/">digital delivery team</a> must be set up in the right way to do this. They need:</p>
  
  <ul>
    <li>a broad mix of skills and roles from the start</li>
    <li>quick decision-making processes and the ability to change and adapt as the service evolves</li>
    <li>to be adequately resourced and empowered to deliver the product or service.</li>
  </ul>`,
    advice: `<p>This criterion applies through <a target="_blank" href="https://www.dta.gov.au/standard/service-design-and-delivery-process/">all service design and delivery stages</a>. The composition of the team will change depending on the stage and need.
  You must be able to:</p>
  
  <ul>
    <li>describe your digital delivery team - it should have, or easily get, the following roles, as relevant to your service
      <ul>
        <li>service manager</li>
        <li>product manager</li>
        <li>delivery manager</li>
        <li>technical architect</li>
        <li>service and/or interaction designer(s)</li>
        <li>content designer</li>
        <li>user researcher(s)</li>
        <li>developer</li>
        <li>web operations engineer</li>
        <li>performance analyst</li>
      </ul>
    </li>
    <li>show the team principles, vision, rituals and agile practices, for example through team charter</li>
    <li>demonstrate you have a product manager with the knowledge and power to make day-to-day decisions to improve the service</li>
    <li>show how team members stay with the service through the stages and how new members will establish empathy with the users</li>
    <li>show the decision making and approval processes</li>
    <li>know who the stakeholders are</li>
    <li>show that the team’s user research activities were developed and overseen by an experienced user researcher and that all team members participated in research</li>
    <li>demonstrate an understanding of where gaps may emerge in the team structure and how to fill them</li>
    <li>demonstrate how you plan to share information, collaborate and troubleshoot issues within the team as well as with key people external to the team</li>
    <li>explain your plan to transfer knowledge and skills from any external people who work with the team.</li>
  </ul>`
  },
  {
    number: 3,
    summary: "Agile and user-centred process",
    description: `Design and build the service using the service design and delivery process, taking an agile and user-centred approach.`,
    reason: `<p>Designing services in a user-centred way means that the services you deliver will be easy to use and convenient for the people who need to use them, helping them to stay in the digital channel.</p>
  
  <p>Designing using agile methods allows you to be more proactive and respond easily to change, both in technology and government policy. Services should be improved frequently; they will be cheaper and more accountable to users.</p>`,
    advice: `<p>This criterion applies through all stages of the <a target="_blank" href="https://www.dta.gov.au/standard/service-design-and-delivery-process/">service design and delivery process</a>. You should:</p>
  
  <ul>
    <li>work in an agile way, based on <a href="http://www.agilemanifesto.org/principles.html">agile values and principles</a>, and using agile tools and techniques</li>
    <li>review and iterate your processes to be able to respond to feedback, continue to improve and adapt to change</li>
    <li>be able to demonstrate how your team uses agile tools and techniques to communicate with each other to increase collaboration and transparency</li>
    <li>be able to show that your governance is appropriate to the size and scale of your service, and that it is human-centred, based on clear and measurable goals, with a clear focus on managing change and risk in real time.</li>
  </ul>
  
  <p>During the <a target="_blank" href="https://www.dta.gov.au/standard/service-design-and-delivery-process/discovery/">Discovery</a> and Alpha stages you would have become comfortable with working collaboratively in very fast feedback loops that are guided by user research. During Alpha you should:</p>
  
  <ul>
    <li>test hypotheses and underlying assumptions with several prototypes</li>
    <li>follow a user-centred approach; include the user in all areas of the prototyping (design, iterations and so on)</li>
    <li>work out incrementally what is the “right thing to build”</li>
    <li>determine the minimum viable product (MVP).</li>
  </ul>
  
  <p>During the Beta and through to the Live stage you would be working closely with users. You should be able to:</p>
  
  <ul>
    <li>show how the service has responded to user research and usability testing</li>
    <li>clearly describe the lifecycle of a user story, from user research to production</li>
    <li>explain the deployment process and how you are able to support frequent deployments with minimal impact to users.</li>
  </ul>`
  },
  {
    number: 4,
    summary: "Understand tools and systems",
    description: `Understand the tools and systems required to build, host, operate and measure the service and how to adopt, adapt or procure them.`,
    reason: `<p>The technology you choose to build your service must help you respond quickly and regularly to the needs and expectations of users. This criterion ensures you:</p>
  
  <ul>
    <li>consider all the risks and constraints associated with the technology you choose</li>
    <li>avoid contracts that lock you into particular solutions and limit your ability to make decisions to improve the service</li>
    <li>build a sustainable system that can be easily managed once live</li>
    <li>identify the required infrastructure to successfully and continuously deliver the digital service</li>
    <li>have a procurement approach that will not restrict, inhibit or limit ongoing and future service delivery</li>
    <li>consider existing tools and systems and avoid unnecessary fragmentation and/or costs</li>
    <li>consider appropriate tools and systems already in use in government</li>
    <li>embed measurement tools at the start of development.</li>
  </ul>`,
    advice: `<p>During the Alpha stage you should be thinking about what you need to build the service. You should:</p>
  
  <ul>
    <li>review the types of tools and systems already available</li>
    <li>identify potential development tools and software to build the product</li>
    <li>identify the appropriate languages, frameworks, and other technical choices that are required to build the product</li>
    <li>understand who will own the intellectual property</li>
    <li>understand any data requirements of the service</li>
    <li>understand the development tool chain required for Beta</li>
    <li>understand the existing IT systems, data stores and in-flight processes for the service</li>
    <li>understand any potential external dependencies or integrations that would be required to build the product</li>
    <li>know the initial and ongoing costs for proposed tools and systems.</li>
  </ul>
  
  <p>During the Beta stage you will be building the service and testing prototypes with users. You should:</p>
  
  <ul>
    <li>manage any constraints that the chosen development tools and software have placed on the service</li>
    <li>have a strong rationale for the technology choices you’ve made, including the languages, frameworks and development tools</li>
    <li>procure the appropriate tools, systems and contractual arrangements and ensure you are getting value for money</li>
    <li>have the ability to conduct technical health checks of the service</li>
    <li>arrange for appropriate ongoing technical support and service level agreements for underlying or dependent services</li>
    <li>outsource decision-making about technology only where appropriate.</li>
  </ul>
  
  <p>By the time you go live you should have in place:</p>
  
  <ul>
    <li>procedures for ongoing operations, including iterations, maintenance, monitoring, patching and upgrading system components</li>
    <li>funding to cover the long-term life of the product, including activities such as security accreditation</li>
    <li>evidence or artefacts that demonstrate you achieved the objective of the criteria for the Live stage.</li>
  </ul>`
  },
  {
    number: 5,
    summary: "Make it secure",
    description: `Identify the data and information the service will use or create. Put appropriate legal, privacy and security measures in place.`,
    reason: `<p>People who use government services must have confidence that:</p>
  
  <ul>
    <li>any information they provide is confidential and stored appropriately</li>
    <li>the system they’re using is safe and secure</li>
    <li>they know how their information will be used by government</li>
    <li>they can easily retrieve information they provide.</li>
  </ul>
  
  <p>If a service cannot guarantee confidentiality, integrity and availability of the system, people will not use it.</p>`,
    advice: `<p>During Alpha you’ll have an understanding of the users, data and threats that affect your service. You will have established an appropriate approach to integrate relevant security and privacy measures into your design with minimal user impact.</p>
  
  <p>You should:</p>
  
  <ul>
    <li>identify secure and private methods of generating or processing data within or between datastores, the solution and users</li>
    <li>identify appropriate authentication methods that are as seamless as possible to the user</li>
    <li>understand to what degree the solution has to comply with the <a href="http://www.asd.gov.au/infosec/ism/">Information Security Manual</a> and <a href="https://www.protectivesecurity.gov.au/Pages/default.aspx">Protective Security Policy Framework</a>, and internal agency security policies, and create a plan on how to achieve this</li>
    <li>conduct a privacy impact assessment</li>
    <li>conduct a threat and risk assessment, and an <a href="http://www.asd.gov.au/infosec/irap/index.htm">Information Security Registered Assessors Program Assessment</a> (IRAP) if appropriate</li>
    <li>identify potential threats to your service, including potential pathways for insider threats and hackers, and demonstrate an understanding of how to mitigate the identified threats.</li>
  </ul>
  
  <p>To support the work in Alpha you should:</p>
  
  <ul>
    <li><a href="https://ausdto.github.io/service-handbook/discovery/2-starting-discovery/2-4-activities.html">map the systems, data and responsible agencies</a></li>
    <li>understand what user data might be needed or collected by the service</li>
    <li>understand what existing statistical datasets may be relevant to your service and the <a href="http://statistical-data-integration.govspace.gov.au/">Australian Government principles on data integration</a></li>
    <li>understand which data you collect is (and isn’t) personal information and how it might be stored, accessed and disseminated</li>
    <li>involve relevant security professionals throughout the Alpha stage</li>
    <li>understand the service requirements relating to
      <ul>
        <li>legal constraints</li>
        <li><a href="http://www.naa.gov.au/information-management/managing-information-and-records/index.aspx">records management</a></li>
        <li>privacy, including the <a href="https://www.legislation.gov.au/Series/C2004A03712">Privacy Act</a> and <a href="https://www.oaic.gov.au/individuals/privacy-fact-sheets/general/privacy-fact-sheet-17-australian-privacy-principles">Australian Privacy Principles</a></li>
        <li>copyright and open licensing, including the <a href="https://www.oaic.gov.au/information-policy/information-policy-resources/principles-on-open-public-sector-information">principles on open public sector information</a>, <a href="https://www.communications.gov.au/policy/policy-listing/australian-government-intellectual-property-rules">Australian Government intellectual property rules</a> and <a href="https://www.opengovpartnership.org/countries/australia">Australia’s commitment to the Open Government Partnership</a></li>
        <li>the <a href="https://www.oaic.gov.au/freedom-of-information/foi-act">Freedom of Information Act</a></li>
        <li>the <a href="https://www.legislation.gov.au/Series/C2004A01214">Spam Act</a></li>
        <li>state and territory government policies, if relevant.</li>
      </ul>
    </li>
  </ul>
  
  <p>During the Beta stage you’ll develop a secure system that integrates seamlessly into the proposed solution. It will have appropriate security controls embedded within it to mitigate all identified threats. You should:</p>
  
  <ul>
    <li>involve all relevant stakeholders within the project, including
      <ul>
        <li>business owners</li>
        <li>information risk and compliance teams</li>
        <li>SIRO (Senior Information Risk Owner)</li>
        <li>IAO (Information Asset Owner)</li>
        <li>IT security teams</li>
        <li>internal fraud teams, if appropriate</li>
      </ul>
    </li>
    <li>address all legal and privacy issues associated with protecting and sharing user data</li>
    <li>develop an appropriate cookie and privacy policy, and keep it up to date</li>
    <li>create a solution to test and implement security patches quickly and efficiently</li>
    <li>demonstrate that effective security controls are in place to protect data used or accessed by the solution</li>
    <li>integrate into or create relevant security documentation</li>
    <li>create a risk treatment plan to track risks and mitigations</li>
    <li>test the security of the solution and address all vulnerabilities discovered</li>
    <li>build detection and prevention mechanisms into the solution, including
      <ul>
        <li>incident response plan</li>
        <li>logging solution that can fully trace a user as they traverse each part of the system</li>
        <li>appropriate business rules that check the validity of interactions with the solution.</li>
      </ul>
    </li>
  </ul>
  
  <p>As you go live you should be able to show that you have created a robust secure solution that meets all security, legislative and legal requirements. It should:</p>
  
  <ul>
    <li>manage frequent security updates</li>
    <li>identify malicious or fraudulent activity</li>
    <li>have appropriate policies in place to respond quickly to security events</li>
    <li>have the ability to integrate into existing security monitoring solutions</li>
    <li>allow users to interact securely with the solution with minimal impact on user experience</li>
    <li>have mitigated all known vulnerabilities in the solution.</li>
  </ul>`
  },
  {
    number: 6,
    summary: "Consistent and responsive design",
    description: `Build the service with responsive design methods using common design patterns and the style guide for digital content`,
    reason: `<p>Using responsive design, following common design patterns and style guidance for digital content, and <a target="_blank" href="https://www.dta.gov.au/standard/design-guides/inclusive-services/">making sure the service is accessible</a> means it will be simpler, clearer and faster for all users. It will also be available on the <a target="_blank" href="https://www.dta.gov.au/blog/what-do-we-mean-by-digital/">platforms and devices that users choose</a>.</p>
  
  <p>Consistent design that is responsive to different devices helps you to save time and money by re-using something that already exists that follows better practice, and is based on data and user research. This means you can concentrate on the unique things your service needs to do.</p>
  
  <p>Responsive design ensures that users can interact with your service regardless of their device size or type, and browser or device processing power. The service should follow mobile-first design principles, consider users on slow internet connections or with limited download data, work well for both mouse and touch devices, and use front-end technology that works well regardless of device processing power.</p>
  
  <p>Writing and designing content so it is consistent, plain and in the language of your users helps people gain trust and confidence in using different services. By providing information they can easily understand they may be less likely to use alternative websites that could be misleading.</p>`,
    advice: `<p>During Alpha you need to consider the <a target="_blank" href="https://www.dta.gov.au/standard/design-guides/gov-au-guides/">design methods and patterns</a> you could apply in your service, and how you can communicate simply and clearly with your users. You should show that you:</p>
  
  <ul>
    <li>understand how you will use responsive design for platform independence</li>
    <li>understand how you will use existing design patterns and a front-end toolkit to make the service consistent</li>
    <li>create simpler and clearer information by understanding the language of your users, using plain language by default, and applying contemporary online writing methods</li>
    <li>follow accessibility better practice and are planning how your public prototype will meet <a href="https://www.w3.org/WAI/intro/wcag">WCAG 2.0 level AA</a></li>
    <li>ensure appropriate design, content design and front-end developer support is provided to the team.</li>
  </ul>
  
  <p>As you develop through Beta and progress to Live, you should be applying these principles and design methods and will be expected to show them in your service.</p>`
  },
  {
    number: 7,
    summary: "Use open standards and common platforms",
    description: `Build using open standards and common government platforms where appropriate.`,
    reason: `<p>Using <a href="https://en.wikipedia.org/wiki/Open_standard">open standards</a> and common government platforms helps you to:</p>
  
  <ul>
    <li>meet the needs of your users by building with proven solutions</li>
    <li>make users’ experience of government more consistent, which generates trust</li>
    <li>save time and money by reusing things that are already available</li>
    <li>be more efficient by sharing data appropriately</li>
    <li>move between different technologies when you need to, avoiding vendor lock-in.</li>
  </ul>`,
    advice: `<p>During Alpha you should understand what open standards and common platforms can be used for your service. You should:</p>
  
  <ul>
    <li>build using the open standards of HTML, CSS and JavaScript to develop prototypes</li>
    <li>follow government better practice and standards in the design of the service</li>
    <li>identify tools, systems, processes that can be adopted or reused from other services</li>
    <li>search for similar solutions in other jurisdictions.</li>
  </ul>
  
  <p>During Beta and as you go live you should continue applying government solutions while also:</p>
  
  <ul>
    <li>building using the <a href="https://www.w3.org/standards/">Open Web Platform standards</a></li>
    <li>avoiding lock-in to any proprietary solutions where an open standard is available</li>
    <li>addressing any common user needs in a way that is consistent with the rest of government.</li>
  </ul>`
  },
  {
    number: 8,
    summary: "Make source code open",
    description: `Make all new source code open by default.`,
    reason: `<p>It’s important to share your source code so others with a similar need can reuse it.</p>
  
  <p>Open source helps to:</p>
  
  <ul>
    <li>reduce costs for your project and others’</li>
    <li>avoid lock-in</li>
    <li>stop duplication</li>
    <li>increase transparency</li>
    <li>add benefits, from improvements by other developers.</li>
  </ul>`,
    advice: `<p>Final code will not be produced in Alpha, however you should still be thinking about how you can share what you create. During the Alpha stage, you’ll need to:</p>
  
  <ul>
    <li>show that you have considered a plan to release it under a <a href="http://choosealicense.com/">licence</a> that is suitable for your service</li>
    <li>consider publishing the source code on a platform with wide adoption in the open source community, such as <a href="https://github.com/">GitHub</a>.</li>
  </ul>
  
  <p>During Beta you’ll have developed further working code and should be ready to share your code in a repository. By the time you go live you should be able to show:</p>
  
  <ul>
    <li>how you are making new source code open and reusable, for example, storing in repositories, releasing code under licence, using APIs</li>
    <li>you have provided a plan or guidance for contributors</li>
    <li>how you’re handling updates and bug fixes to the code.</li>
  </ul>`
  },
  {
    number: 9,
    summary: "Make it accessible",
    description: `Ensure the service is accessible to all users regardless of their ability and environment.`,
    reason: `<p>You need to make sure everyone who needs your service can use it. This includes people with disabilities and older people, and people who can’t use, or struggle with, digital services.</p>
  
  <p>Your service must be accessible to users regardless of their digital confidence and access to a digital environment. This includes users in remote areas and users’ different  devices.</p>`,
    advice: `<p>During the <a target="_blank" href="https://www.dta.gov.au/standard/service-design-and-delivery-process/discovery/">Discovery stage</a> you will have developed a good understanding of how your users may access your service. To make sure everyone will be able to use your service you need to show:</p>
  
  <ul>
    <li>the type of environments users may access the service in, including with different browsers and desktop and mobile devices, and when connections are slower and there may be limited data; for example, through user stories</li>
    <li>diversity in research recruitment and targeted users, including people from different cultural backgrounds and people with disability</li>
    <li>consideration of situational and environmental limitations that affect a user’s ability to access the product</li>
    <li>the plan to meet accessibility requirements in the design of the product, for example how it will meet <a href="https://www.w3.org/WAI/intro/wcag">WCAG 2.0 AA</a></li>
    <li>what digital assistance might be needed to support users; for example web chat, telephone assistance, face-to-face, clear instructions, checklists, and so on.</li>
  </ul>
  
  <p>During the Alpha stage, you should be able to show:</p>
  
  <ul>
    <li>your prototypes can accommodate users from different backgrounds and users with disability</li>
    <li>any accessibility issues and barriers that might need addressing in the Beta stage</li>
    <li>you have access to facilities to perform testing on various devices or platforms, for example a plan for testing.</li>
  </ul>
  
  <p>During the Beta stage you will be developing your service and you must ensure accessibility requirements and needs of all your users are being met.</p>
  
  <p>You will need to show:</p>
  
  <ul>
    <li>iteration in the design and content of your service to meet accessibility requirements and improve usability for people with disability</li>
    <li>non-digital access and support for people unable to use, or struggling with, the digital service</li>
    <li>end-to-end user journeys, including assisted digital journeys, and demonstrate that they work and how you tested them</li>
    <li>how you’ve included cultural and linguistically diverse communities in your design</li>
    <li>a plan to include translation for non-English speaking audiences, as appropriate</li>
    <li>you have testing environments, systems and approaches for non-digital parts of the service (including assisted digital routes); for example, a testing plan</li>
    <li>how the service will perform under expected loads (including assisted digital routes)</li>
    <li>strong understanding of the environments your users may access the service in, for example which browsers, desktop and mobile devices they will use, and which remote locations; you might use user stories and a journey map to show this</li>
    <li>definition of supported browsers and devices, and how they are accommodated</li>
    <li>any barriers to the digital service and its content on mobile devices, and plans to address them</li>
    <li>the design requirements for users using a mobile device and other identified environments, for example design specifications</li>
    <li>how you have tested for the users’ ability to complete all digital transactions on supported devices and platforms</li>
    <li>detail of users’ interactions with the product during testing</li>
    <li>a demonstration your service in a live-like environment</li>
    <li>the majority of users can access the service in their environment.</li>
  </ul>
  
  <p>As you go live you will need to show:</p>
  
  <ul>
    <li>your service is accessible</li>
    <li>evidence of usability testing, including
      <ul>
        <li>users with low level digital skills</li>
        <li>people with disability</li>
        <li>people from different cultural and linguistic backgrounds</li>
      </ul>
    </li>
    <li>a run through of how you’ve designed and tested for users of assistive technologies based on user research, usability testing and analytics</li>
    <li>ongoing testing plans for accessibility so that your users can continue to access the service.</li>
  </ul>`
  },
  {
    number: 10,
    summary: "Test the service",
    description: `Test the service from end to end, in an environment that replicates the live version.`,
    reason: `<p>All government services should be clear, simple and easy to use, regardless of the technology your users use, their expertise with the subject matter, or their level of digital skill.</p>
  
  <p>You cannot wait until the service is live to discover problems that stop people from using the service. You need to rigorously and comprehensively test every part of the service during development.</p>`,
    advice: `<p>During Alpha you should be testing your prototypes with users.</p>
  
  <p>As you move into Beta and then onto Live, you need to be able to show:</p>
  
  <ul>
    <li>the steps required to achieve an end-to-end service delivery outcome for the user</li>
    <li>the testing environment; using test plans, real world scenarios and user stories</li>
    <li>the deployment environment</li>
    <li>ability to create new environments quickly and easily</li>
    <li>that your service can perform under expected loads with suitable scale contingencies</li>
    <li>you understand the systems you need and the testing environments for non-digital parts of the service</li>
    <li>that users can seamlessly move between channels as required</li>
    <li>how you explored integrating automated testing into the deployment process</li>
    <li>you have a business continuity plan and a roll-back option.</li>
  </ul>`
  },
  {
    number: 11,
    summary: "Measure performance",
    description: `Measure performance against KPIs set out in the guides. Report on public dashboard.`,
    reason: `<p>Every service must aim for continuous improvement. Metrics are an important starting point for discussions about a service’s strengths and weaknesses. By <a target="_blank" href="https://www.dta.gov.au/standard/measuring-performance/">identifying and capturing the right metrics</a> - with the right tools - you can make sure all your decisions to improve the service are supported by data.</p>
  
  <h3 id="key-performance-indicators">Key performance indicators</h3>
  
  <p>All services must, at a minimum, measure 4 KPIs.</p>
  
  <ul>
    <li><strong>User satisfaction</strong> - to help continually improve the user experience of your service</li>
    <li><strong>Digital take-up</strong> - to show how many people are using the service and to help encourage users to choose the digital service</li>
    <li><strong>Completion rate</strong> - to show which parts of the service you need to fix</li>
    <li><strong>Cost per transaction</strong> - to make your service more cost efficient</li>
  </ul>
  
  <p>There will be other metrics your service needs to measure and monitor to understand how it is performing, such as:</p>
  
  <ul>
    <li>error rates</li>
    <li>time to completion</li>
    <li>costs, benefits and return on investment</li>
    <li>content metrics (readability, length).</li>
  </ul>
  
  <h3 id="dashboard">Dashboard</h3>
  
  <p>The <a target="_blank" href="https://www.dta.gov.au/what-we-do/platforms/performance/">Performance Dashboard</a> collects service data and presents it in a consistent and structured format. This is important so that you can:</p>
  
  <ul>
    <li>make quick data-driven decisions about how to improve your service</li>
    <li>compare data across multiple government services</li>
    <li>be open and transparent to the public about your service’s performance.</li>
  </ul>`,
    advice: `<p>You’ll have started early measurement activity during <a target="_blank" href="https://www.dta.gov.au/standard/service-design-and-delivery-process/discovery/">Discovery</a> with your user research dashboard.</p>
  
  <p>You will need to consider how you’ll measure your service in more detail as you enter Alpha. By the end of Alpha you should have:</p>
  
  <ul>
    <li>explored the data that is already available for an existing service, where it is kept and how you might access and use it, and also shared your own insights</li>
    <li>collected baseline data for the service operation in all of its channels</li>
    <li>estimated the number of people you expect to use the service</li>
    <li>started creating a performance framework outlining your objectives and what metrics your team will use to demonstrate you meet them</li>
    <li>considered the metrics you will need to <a target="_blank" href="https://www.dta.gov.au/standard/measuring-performance/">measure the 4 KPIs</a> and where the data will come from.</li>
  </ul>
  
  <p>By the end of Beta you will be able to show:</p>
  
  <ul>
    <li>which metrics and measurements you will use to monitor your KPIs</li>
    <li>the baseline measures and the benchmarks for success</li>
    <li>that the team is ready to report their performance on the <a target="_blank" href="https://www.dta.gov.au/our-work/performance/">Performance Dashboard</a></li>
    <li>which tools you use for analysis and web analytics in Beta (and Alpha if appropriate)</li>
    <li>what you have learned from qualitative and quantitative data; for example key evidence.</li>
  </ul>
  
  <p>During the public Beta stage you’ll have been able to test your methods for data collection, validated that the data is accurate, and published service performance data on the Performance Dashboard.</p>
  
  <p>As you go live you should be able to show service data on the Performance Dashboard and improvement to the service based on performance data.</p>
  
  <p>Your data should show:</p>
  
  <ul>
    <li>user satisfaction has increased</li>
    <li>digital take-up is increasing in line with service plans</li>
    <li>completion rate has been maintained</li>
    <li>cost per transaction is decreasing in line with service plans.</li>
  </ul>`
  },
  {
    number: 12,
    summary: "Don’t forget the non-digital experience",
    description: `Ensure that people who use the digital service can also use the other available channels if needed, without repetition or confusion.`,
    reason: `<p>People often start using a service and have to come back to it later, or switch to a non-digital channel to complete the transaction. We need to make sure users’ transitions between non-digital and digital channels, when they need to happen, are as smooth as possible.</p>`,
    advice: `<p>During <a target="_blank" href="https://www.dta.gov.au/standard/service-design-and-delivery-process/discovery/">Discovery</a> and Alpha you should have developed a good understanding of where users will go for the service you are building. You should understand what proportion of users rely on non-digital channels, wholly or in part, and have a plan for how you will address this in your build.</p>
  
  <p>During Alpha you should show you understand:</p>
  
  <ul>
    <li>all the touchpoints in users’ journeys, their contexts of use, and the digital limitations affecting different groups of users</li>
    <li>existing channels and how they interact with the service and with each other</li>
    <li>the channels required to support all groups of users of the service, and where a user may need to change channels</li>
    <li>if there are any repeat transactions by users over different channels</li>
    <li>the interactions occurring between the channels that deliver and capture user transactions.</li>
  </ul>
  
  <p>During the Beta stage you will apply the knowledge gained in Alpha to design a service that works with the other channels, as appropriate.</p>
  
  <p>By the end of Beta and going live, you should:</p>
  
  <ul>
    <li>detail the channels required to support all groups of users of the service</li>
    <li>understand the non-digital service channels and have a <a target="_blank" href="https://www.dta.gov.au/standard/13-encourage-use-of-the-digital-service/">plan to move users to the digital channel</a> where appropriate</li>
    <li>have developed and tested the service so that a user can change channels without repeating themselves.</li>
  </ul>
  
  <p><strong>Last updated</strong>: 6 May 2016</p>
  
  
  <!-- Umm...? -->`
  },
  {
    number: 13,
    summary: "Encourage everyone to use the digital service",
    description: `Encourage users to choose the digital service and consolidate or phase out existing alternative channels where appropriate.`,
    reason: `<p>As we build simpler, clearer and faster government services the digital channel will become more convenient for users than non-digital channels like post, phone and shopfronts. Increased digital take-up will mean users can spend less time interacting with government. This will result in greater cost efficiencies for government.</p>
  
  <p>Measuring digital take-up helps you to understand how well your service is being used. It’s one of the <a target="_blank" href="https://www.dta.gov.au/standard/measuring-performance/">4 mandatory KPIs</a> services must report on the <a target="_blank" href="https://www.dta.gov.au/what-we-do/platforms/performance/">Performance Dashboard</a>.</p>
  
  <p>We still need to help users who are unable to use digital channels and provide support to those who need it. But we want to ensure digital channels are used whenever possible and to scale back, or phase out, alternative channels when we can.</p>`,
    advice: `<p>Your user research will give you a good understanding of where people want to access your service and their levels of digital skill. Through the <a target="_blank" href="https://www.dta.gov.au/standard/service-design-and-delivery-process/discovery/">Discovery</a> and Alpha stages you need to understand:</p>
  
  <ul>
    <li>the users’ journeys and how they interact with your service, digitally or otherwise</li>
    <li>existing alternative channels and how users currently interact with them</li>
    <li>what percentage of users access digital and non-digital channels</li>
    <li>how you will increase digital take-up and what targets you will set.</li>
  </ul>
  
  <p>As you continue developing your service and start testing it with users in Beta, you should:</p>
  
  <ul>
    <li>be increasing digital take-up; revising your targets and considering relevant performance metrics</li>
    <li>have a plan of how to move users to the digital channel where possible, including a communications plan to promote the service</li>
    <li>have agreed analytics/metrics for the volume of usage across channels</li>
    <li>understand the full impact of retiring any potentially redundant services and channels.</li>
  </ul>
  
  <p>As you progress your service to Live you will need to show:</p>
  
  <ul>
    <li>how you’ve revised the targets you made in the Beta stage to increase the number of users (including users we need to assist) of your digital service</li>
    <li>what you’ve learned from testing different approaches to encourage users (including users we need to assist) to choose the digital service over non-digital alternatives, and which ones you’ll use in the Live stage</li>
    <li>your retirement strategy for any redundant services and channels</li>
    <li>that your service load capacity is scalable to meet increased digital take-up</li>
    <li>how you will promote your service and encourage people to use it, including how your messaging will appear in places where the users will see it.</li>
  </ul>`
  }
];

export default Goals;
