import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Check,
  Cloud,
  FileCheck2,
  GitBranch,
  Layers3,
  LockKeyhole,
  Network,
  SearchCheck,
  ShieldCheck,
  UsersRound,
  Workflow,
} from 'lucide-react';
import cloudWorkplaceImage from '../assests/img/service-img1.png';
import governanceImage from '../assests/img/service-img2.png';
import automationImage from '../assests/img/service-img3.png';

const subServices = {
  'Security assessments': {
    parent: 'Cybersecurity',
    parentLabel: 'Cybersecurity',
    icon: SearchCheck,
    headline: 'Turn an unclear security posture into a decision-ready plan.',
    intro: 'A focused, evidence-led review of your people, processes, and technology—so leadership can see what matters, why it matters, and what to do next.',
    overview: 'We assess how your security controls actually operate across the systems, identities, data, and business activities you rely on—rather than treating each tool as an island. We connect evidence and stakeholder context, then trace observations back to the business risks they affect. The result is a risk-ranked view of the gaps worth addressing first, with clear ownership and a practical remediation path.',
    focus: ['Identity and access controls', 'Endpoint and device protection', 'Cloud and infrastructure configuration', 'Security policies and operating practices'],
    deliverables: ['Current-state security findings', 'Risk-ranked recommendations', 'Practical remediation roadmap', 'Leadership-ready findings summary'],
    outcomes: ['Clear visibility into material security gaps', 'Remediation priorities connected to business impact', 'A stronger basis for investment and ownership decisions', 'A shared understanding between leadership and security teams of where exposure really sits'],
    steps: ['Set scope and priorities', 'Review controls and evidence', 'Validate findings with your team', 'Present and plan next steps'],
  },
  'Penetration testing': {
    parent: 'Cybersecurity',
    parentLabel: 'Cybersecurity',
    icon: LockKeyhole,
    headline: 'See how an attacker could get in—before they do.',
    intro: 'A controlled, well-governed test that validates real exposure and gives technical owners the evidence to fix it with confidence.',
    overview: 'We agree the rules of engagement, test only approved scope, validate meaningful findings, and translate the result into a prioritized remediation path—not a long list of theoretical vulnerabilities. Each test is planned with your technical and business owners, conducted within agreed boundaries, and explained in language both engineers and leaders can use.',
    focus: ['External attack surface testing', 'Web application security testing', 'Internal network testing', 'Remediation validation'],
    deliverables: ['Agreed test scope and rules of engagement', 'Evidence-backed technical findings', 'Risk-based remediation guidance', 'Retest summary for resolved issues'],
    outcomes: ['Validated understanding of real-world exposure', 'Clear technical evidence for remediation', 'Greater confidence in the controls protecting critical services', 'A documented record of what has been resolved and what remains'],
    steps: ['Agree scope and safeguards', 'Test approved systems', 'Review and prioritize findings', 'Retest agreed fixes'],
  },
  SOC: {
    parent: 'Cybersecurity',
    parentLabel: 'Cybersecurity',
    icon: ShieldCheck,
    headline: 'Know what matters. Act before disruption spreads.',
    intro: 'A Security Operations Center built around your business: focused monitoring, human-led investigation, and a clear route from a meaningful signal to decisive action.',
    overview: 'A useful SOC is not a wall of alerts. It brings together the telemetry that matters, the people who can make decisions, and response playbooks your teams can actually use. Edrisync helps you establish, mature, or augment that capability across cloud, identity, endpoint, network, and business-critical systems.',
    focus: ['Centralized security visibility and signal prioritization', 'Detection engineering mapped to your real risks', 'Analyst-led triage, investigation, and escalation', 'Incident readiness, reporting, and continuous improvement'],
    deliverables: ['SOC maturity and telemetry coverage assessment', 'Practical operating model, roles, and escalation paths', 'Prioritized detection use cases and response playbooks', 'Executive risk reporting and improvement roadmap'],
    outcomes: ['Quicker recognition of credible threats', 'Fewer distracting alerts and clearer analyst focus', 'Coordinated decisions during security incidents', 'Security operations that improve with every investigation'],
    steps: ['Understand the business and threat landscape', 'Connect priority telemetry and define detections', 'Run and refine investigation playbooks', 'Measure outcomes and continuously improve'],
  },
  'GRC program design': {
    parent: 'GRC & Compliance',
    parentLabel: 'GRC & Compliance',
    icon: Layers3,
    headline: 'Make risk and compliance easier to run—not harder to live with.',
    intro: 'A practical GRC operating model that gives leaders visibility, teams clear ownership, and controls a useful place in everyday work.',
    overview: 'We connect obligations, business priorities, risks, controls, evidence, and decision-making routines into one proportionate model. The objective is a program that remains useful after the initial project is complete—designed around named owners, useful decision routines, and evidence teams can maintain rather than adding paperwork disconnected from day-to-day work.',
    focus: ['Governance roles and decision rights', 'Risk assessment and treatment', 'Policies and control framework', 'Evidence, reporting, and review cadence'],
    deliverables: ['GRC operating model and responsibilities', 'Risk register and treatment approach', 'Policy and control framework', 'Implementation roadmap and reporting model'],
    outcomes: ['Clear ownership of key risks and controls', 'More consistent, evidence-informed governance decisions', 'A sustainable foundation for assurance and improvement', 'Reduced audit disruption through organized evidence and clear control ownership'],
    steps: ['Understand business context', 'Map obligations and risks', 'Design roles and control routines', 'Launch, measure, and improve'],
  },
  'ISO 27001 readiness': {
    parent: 'GRC & Compliance',
    parentLabel: 'GRC & Compliance',
    icon: FileCheck2,
    headline: 'Make ISO 27001 readiness a managed journey, not a scramble.',
    intro: 'Understand your current position, sequence the work that matters, and build an ISMS your people can sustain beyond the audit.',
    overview: 'We translate ISO 27001 requirements into practical, risk-based activities for your environment—covering scope, ownership, policies, controls, evidence, and internal review. Readiness support helps prepare for an independent audit; it does not guarantee certification, which is determined independently by an accredited certification body.',
    focus: ['Readiness and gap assessment', 'ISMS scope and risk approach', 'Policy and control alignment', 'Evidence and audit preparation'],
    deliverables: ['ISO 27001 readiness findings', 'Prioritized gap-closure plan', 'ISMS documentation guidance', 'Internal audit and certification preparation support'],
    outcomes: ['A clear picture of readiness and the remaining work', 'Better alignment between risks, controls, and evidence', 'More organized, accessible audit evidence', 'A staged plan that reflects your resources and objectives'],
    steps: ['Confirm scope and context', 'Assess current ISMS practices', 'Prioritize and address gaps', 'Prepare evidence and review readiness'],
  },
  'Microsoft 365 enablement': {
    parent: 'Microsoft & Digital Workplace',
    parentLabel: 'Microsoft Enablement',
    icon: Cloud,
    headline: 'Give people a Microsoft 365 experience they can trust and use.',
    intro: 'Design collaboration that feels natural for users while protecting information, strengthening identity, and keeping the environment governable.',
    overview: 'We help you plan and improve Microsoft 365 across collaboration, identity, security, information management, and adoption—based on how your organization works. The engagement starts with your existing tenant and licensing, identifies improvement opportunities, and prioritizes changes that fit your environment.',
    focus: ['Microsoft 365 tenant and service review', 'Teams and SharePoint collaboration', 'Identity and access configuration', 'Security, governance, and adoption'],
    deliverables: ['Environment assessment and recommendations', 'Target configuration and rollout plan', 'Governance and security guidance', 'User adoption and enablement plan'],
    outcomes: ['More consistent, intuitive collaboration practices', 'Improved visibility, protection, and control', 'A rollout people can adopt with confidence', 'A workplace that scales as your teams and needs grow'],
    steps: ['Discover your current environment', 'Design the target experience', 'Configure and enable teams', 'Measure adoption and optimize'],
  },
  'Azure cloud solutions': {
    parent: 'Microsoft & Digital Workplace',
    parentLabel: 'Microsoft Enablement',
    icon: Cloud,
    headline: 'Build an Azure foundation that lets teams move quickly, safely.',
    intro: 'Create a cloud environment with the guardrails, operating clarity, and flexibility your workloads need to grow responsibly.',
    overview: 'We help establish a governed Azure foundation across identity, networking, security, management, cost, and workload ownership—so cloud adoption does not create new uncertainty or unmanaged risk. The starting point depends on your workloads and goals, whether you are planning early adoption or improving an existing environment.',
    focus: ['Azure landing zone planning', 'Cloud security and identity', 'Workload migration and modernization', 'Governance, monitoring, and cost visibility'],
    deliverables: ['Cloud readiness and architecture review', 'Azure foundation and guardrail recommendations', 'Workload migration roadmap', 'Operational and cost management guidance'],
    outcomes: ['A clearer, more controlled cloud environment', 'Improved workload, access, and cost visibility', 'A practical path from cloud ambition to operational adoption', 'Day-two operating practices that keep cloud use sustainable'],
    steps: ['Assess workloads and readiness', 'Design the Azure foundation', 'Migrate or modernize in stages', 'Operate, govern, and optimize'],
  },
  'Workflow automation': {
    parent: 'Digital Transformation',
    parentLabel: 'Digital Transformation',
    icon: Workflow,
    headline: 'Remove the friction from work people repeat every day.',
    intro: 'Find the manual steps worth changing and create dependable workflows that keep decisions, exceptions, and ownership visible.',
    overview: 'We start with the real process—not a tool. By mapping handoffs, decisions, information, and exceptions, we identify automation opportunities that make work simpler while preserving the governance your organization needs. Tool selection depends on your existing environment, requirements, governance, and support model.',
    focus: ['Process discovery and prioritization', 'Microsoft Power Platform opportunities', 'Approvals and task automation', 'Workflow monitoring and ownership'],
    deliverables: ['Process maps and automation shortlist', 'Solution design and workflow prototype', 'Implementation and testing plan', 'Documentation and handover guidance'],
    outcomes: ['Fewer repetitive manual steps and avoidable delays', 'More consistent handoffs, approvals, and exceptions', 'Better visibility into work in progress and ownership', 'A support model that keeps workflows useful after launch'],
    steps: ['Map the current process', 'Prioritize automation opportunities', 'Design and build the workflow', 'Test, launch, and improve'],
  },
  'Systems integration': {
    parent: 'Digital Transformation',
    parentLabel: 'Digital Transformation',
    icon: Network,
    headline: 'Make the systems behind your business work as one.',
    intro: 'Connect applications and data with integration patterns that are secure, observable, and designed to withstand change.',
    overview: 'We clarify how information should move, who owns it, and what happens when it fails. Then we shape a practical integration approach that accounts for APIs, security, reliability, monitoring, and long-term support—so connections stay dependable as your environment evolves.',
    focus: ['Application and data-flow discovery', 'Integration architecture and APIs', 'Microsoft and third-party connectivity', 'Monitoring, security, and support model'],
    deliverables: ['Current-state integration map', 'Target architecture and interface design', 'Prioritized integration roadmap', 'Testing, monitoring, and ownership guidance'],
    outcomes: ['Less duplicate data entry and fewer manual workarounds', 'More dependable, traceable information flows', 'A clearer foundation for future integration and change', 'Defined ownership and support for every connection'],
    steps: ['Discover systems and data owners', 'Design secure integration patterns', 'Build and validate connections', 'Monitor and evolve the solution'],
  },
};

const serviceExamples = {
  'Security assessments': [
    ['Before a major change', 'Review security controls before a new platform, acquisition, or operating model changes your exposure.'],
    ['When priorities are unclear', 'Turn a long list of security concerns into a short, risk-ranked plan your team can act on.'],
    ['For leadership visibility', 'Give decision-makers a clear view of strengths, gaps, and the next investments to consider.'],
  ],
  'Penetration testing': [
    ['Before a product launch', 'Test approved application and infrastructure scope before it becomes business-critical.'],
    ['After significant changes', 'Check that new features, cloud changes, or network updates have not introduced avoidable exposure.'],
    ['After remediation', 'Retest agreed fixes and provide evidence that priority weaknesses have been addressed.'],
  ],
  SOC: [
    ['When alerts outnumber attention', 'Create a triage model that distinguishes routine noise from signals that warrant investigation and action.'],
    ['After cloud or identity change', 'Extend visibility across new services, privileged access, endpoints, and the systems your teams depend on.'],
    ['When incident roles are unclear', 'Define decision-makers, technical owners, communication paths, and tested playbooks before a high-pressure event occurs.'],
  ],
  'GRC program design': [
    ['Growing organizations', 'Establish clear risk ownership and governance routines as teams, systems, and obligations expand.'],
    ['Fragmented controls', 'Bring overlapping policies, controls, and reporting into one understandable operating model.'],
    ['Leadership assurance', 'Create a consistent way to review risk, make decisions, and track agreed actions.'],
  ],
  'ISO 27001 readiness': [
    ['First-time certification', 'Understand the work needed to scope and establish an information security management system.'],
    ['Existing ISMS improvement', 'Identify where current practices or evidence need attention before an external audit.'],
    ['Supplier assurance', 'Strengthen a structured security program to support customer and partner requirements.'],
  ],
  'Microsoft 365 enablement': [
    ['Collaboration redesign', 'Improve how teams use Teams and SharePoint while keeping information organized and governed.'],
    ['Security improvement', 'Review identity, access, and Microsoft 365 security configuration against your needs.'],
    ['Low adoption', 'Make it easier for people to use the tools through practical guidance and role-based enablement.'],
  ],
  'Azure cloud solutions': [
    ['Cloud adoption planning', 'Establish a governed Azure foundation before moving important workloads.'],
    ['Workload modernization', 'Assess applications and plan migration or modernization in achievable stages.'],
    ['Cloud control improvement', 'Improve visibility into access, security, operations, and cloud cost management.'],
  ],
  'Workflow automation': [
    ['Manual approvals', 'Replace email-driven approvals with a traceable process and clear ownership.'],
    ['Repeated data entry', 'Reduce avoidable rekeying between forms, business applications, and team workflows.'],
    ['Unclear handoffs', 'Make process status, responsibility, and exceptions easier for teams to see.'],
  ],
  'Systems integration': [
    ['Disconnected applications', 'Connect business systems so essential information moves without repeated manual entry.'],
    ['Inconsistent reporting', 'Clarify data flows and improve the reliability of information used by decision-makers.'],
    ['New platform rollout', 'Plan secure integrations that help a new platform fit into your existing environment.'],
  ],
};

const serviceQuestions = {
  'Security assessments': [
    ['How is the assessment scoped?', 'We agree priorities, systems, stakeholders, and available evidence with you first. The scope is shaped around your business context and the questions you need answered.'],
    ['Will this disrupt day-to-day work?', 'The review is planned with your team to minimize disruption. Any technical validation is agreed in advance and kept within the boundaries you approve.'],
    ['What happens after findings are shared?', 'We help explain the findings, prioritize remediation, and identify practical owners and next steps. Your team can use the roadmap to sequence improvement work.'],
  ],
  'Penetration testing': [
    ['What can be included in a test?', 'Testing may cover approved external assets, applications, or internal environments. The exact targets, methods, timing, and exclusions are agreed in writing before testing begins.'],
    ['How do you manage operational risk?', 'We define rules of engagement and emergency contacts with you, avoid unapproved activity, and coordinate testing windows to reduce the chance of interruption.'],
    ['Do you help validate fixes?', 'Yes. Retesting can be included or agreed as a follow-up so your team can verify whether priority issues have been addressed.'],
  ],
  SOC: [
    ['What does the SOC monitor?', 'We begin with the assets and business activities that matter most, then prioritize telemetry from identity, endpoints, cloud services, network controls, email, and other agreed sources.'],
    ['Will Edrisync respond directly to an incident?', 'The response model is agreed with you up front. We can define escalation, investigation, containment coordination, and communication paths that fit your internal team and service providers.'],
    ['How do we know the SOC is improving?', 'We establish practical measures such as detection coverage, alert quality, investigation outcomes, response readiness, and remediation progress—not vanity metrics.'],
  ],
  'GRC program design': [
    ['Is this only for organizations with a mature GRC team?', 'No. The program can start with the responsibilities and practices you already have, then build proportionately around your needs and available capacity.'],
    ['Will you introduce a new GRC tool?', 'Not by default. We first understand the existing process and tools. Technology recommendations are considered only where they support a clear business need.'],
    ['How do you keep the program practical?', 'We design around named owners, useful decision routines, and evidence teams can maintain, rather than adding paperwork that is disconnected from day-to-day work.'],
  ],
  'ISO 27001 readiness': [
    ['Does readiness support guarantee certification?', 'No. Edrisync can help assess readiness and prepare your organization, but certification is determined independently by an accredited certification body.'],
    ['Can we use existing policies and controls?', 'Yes. We review what you already have and identify where it can be aligned, improved, or supplemented rather than assuming everything must be replaced.'],
    ['What if we are early in the process?', 'We can help clarify scope, understand current practices, prioritize gaps, and establish a staged plan that reflects your resources and objectives.'],
  ],
  'Microsoft 365 enablement': [
    ['Can you work with our current Microsoft 365 setup?', 'Yes. The engagement can begin with your existing tenant and licensing, identify improvement opportunities, and prioritize changes that fit your environment.'],
    ['Do you include end-user adoption?', 'Adoption is part of the approach. We can shape role-based guidance and communications so people understand how to use the tools and follow agreed practices.'],
    ['How are security and collaboration balanced?', 'We design collaboration around appropriate identity, access, information handling, and governance controls, with decisions based on how your teams work.'],
  ],
  'Azure cloud solutions': [
    ['Do we need to be using Azure already?', 'No. We can support early planning and readiness as well as improvement of an existing Azure environment. The starting point depends on your workloads and goals.'],
    ['Can migration be done in stages?', 'Yes. Workloads can be assessed and prioritized so that migration or modernization follows a sequence agreed with your business and technical owners.'],
    ['How do you address cloud cost and governance?', 'Cost visibility, ownership, security guardrails, and operational responsibilities are considered as part of the cloud foundation and ongoing operating model.'],
  ],
  'Workflow automation': [
    ['Do you automate every process you review?', 'No. We first identify where automation makes sense. Some processes need clarification or simplification before automation is appropriate.'],
    ['Can this use Microsoft Power Platform?', 'Where suitable, workflows can use Power Platform capabilities. Tool selection depends on your existing environment, requirements, governance, and support model.'],
    ['What happens when a workflow needs human judgment?', 'The design can include approval steps, exception paths, and clear ownership so automation supports people rather than hiding important decisions.'],
  ],
  'Systems integration': [
    ['Which systems can be connected?', 'Potential integrations depend on available interfaces, permissions, data quality, and business requirements. We assess those factors before recommending an approach.'],
    ['How do you handle sensitive information?', 'Data access, permissions, transfer, and ownership are considered during design, with controls and safeguards appropriate to the systems and information involved.'],
    ['Who supports integrations after launch?', 'The engagement defines monitoring, documentation, change handling, and accountable owners so ongoing support is considered before implementation is complete.'],
  ],
};

const serviceDeepDives = {
  'Security assessments': {
    visual: 'surface',
    eyebrow: 'See the whole picture',
    heading: 'Understand how your security controls connect.',
    intro: 'An assessment looks across the environment rather than treating each tool as an island. Edrisync brings evidence and stakeholder context together, then traces observations back to the business risks they affect.',
    cards: [
      ['Start with critical assets', 'Identify the services, information, and business activities that matter most, then focus the review around them.'],
      ['Follow the control story', 'Connect identity, devices, cloud configuration, and operating practices to see how safeguards work together.'],
      ['Validate with the people doing the work', 'Use interviews and evidence walkthroughs to distinguish a genuine control gap from a documentation gap.'],
      ['Turn findings into an owned plan', 'Group observations by priority, effort, and responsible team so the next actions are clear.'],
    ],
  },
  'Penetration testing': {
    visual: 'attack-path',
    eyebrow: 'Test with purpose',
    heading: 'From approved test scope to useful remediation.',
    intro: 'A good penetration test is more than a vulnerability list. Edrisync agrees boundaries first, validates findings carefully, and explains the realistic path from a weakness to its potential business impact.',
    cards: [
      ['Define the boundaries', 'Agree target assets, test windows, permitted techniques, emergency contacts, and explicit exclusions.'],
      ['Test realistic entry points', 'Examine the approved application, external, or internal scope using a controlled and documented approach.'],
      ['Show the evidence', 'Give technical owners enough context to understand, reproduce, and assess each confirmed finding.'],
      ['Prioritize the response', 'Translate results into remediation actions and, where agreed, retest fixes to validate closure.'],
    ],
  },
  SOC: {
    visual: 'attack-path',
    eyebrow: 'Turn signals into decisions',
    heading: 'A SOC that brings focus to the moment it matters.',
    intro: 'Effective security operations combine well-chosen telemetry, repeatable investigation, and people who know when to involve the business. Edrisync helps turn raw events into a capability your organization can trust.',
    cards: [
      ['Start with the crown jewels', 'Identify the identities, data, applications, and operational services where fast detection makes the greatest difference.'],
      ['Make detections useful', 'Create and tune use cases around likely attack paths, so analysts spend less time on noise and more time on credible risk.'],
      ['Prepare the response', 'Agree escalation thresholds, decision rights, contacts, and containment actions before an urgent incident demands them.'],
      ['Learn from every case', 'Feed investigation findings back into detections, logging, controls, and leadership reporting to steadily improve resilience.'],
    ],
  },
  'GRC program design': {
    visual: 'governance',
    eyebrow: 'Make accountability visible',
    heading: 'Connect decisions, owners, risks, and controls.',
    intro: 'Edrisync designs governance around how your organization makes decisions. The aim is to make ownership and escalation clear, connect controls to real obligations, and give leaders a useful view of progress.',
    cards: [
      ['Decision structure', 'Clarify who sets direction, accepts risk, advises, and escalates issues across the organization.'],
      ['Risk ownership', 'Give risk owners a repeatable way to assess impact, select treatment, and review changing exposure.'],
      ['Control operation', 'Map control activities to accountable teams, supporting evidence, and a sustainable review cadence.'],
      ['Leadership reporting', 'Create concise reporting that highlights decisions needed, overdue actions, and material changes.'],
    ],
  },
  'ISO 27001 readiness': {
    visual: 'readiness',
    eyebrow: 'Prepare with confidence',
    heading: 'Turn requirements into a readiness journey.',
    intro: 'Edrisync helps your team understand what is already in place, what needs strengthening, and how to organize the work. Readiness support helps prepare for an independent audit; it does not guarantee certification.',
    cards: [
      ['Define scope and context', 'Agree which parts of the organization and which information security activities the ISMS will cover.'],
      ['Assess current practices', 'Review risk management, documented processes, control activities, and evidence against relevant requirements.'],
      ['Prioritize gap closure', 'Sequence improvement actions with owners and realistic dependencies instead of treating every gap as equal.'],
      ['Prepare for independent review', 'Organize evidence and internal checks so your team is better prepared for a certification body audit.'],
    ],
  },
  'Microsoft 365 enablement': {
    visual: 'workspace',
    eyebrow: 'Design the workday',
    heading: 'Bring collaboration, governance, and security together.',
    intro: 'Edrisync starts with how people work, then shapes Microsoft 365 around that experience. Collaboration spaces, access, information handling, and user adoption are planned as connected parts of the environment.',
    cards: [
      ['Map real collaboration needs', 'Understand how teams share information, coordinate work, and collaborate with guests or partners.'],
      ['Shape Teams and SharePoint', 'Plan spaces and information structures that are understandable, governed, and fit for ongoing ownership.'],
      ['Build in identity and protection', 'Align access and security settings with user roles, business requirements, and the information being handled.'],
      ['Help people adopt the change', 'Provide practical guidance and ownership so teams know where to work and how to use the new setup.'],
    ],
  },
  'Azure cloud solutions': {
    visual: 'cloud',
    eyebrow: 'Build a strong foundation',
    heading: 'Plan cloud architecture around the workloads.',
    intro: 'Edrisync connects workload needs to a governed Azure foundation. Architecture, identity, networking, security, cost visibility, and operating responsibilities are considered together before and during cloud adoption.',
    cards: [
      ['Understand workload dependencies', 'Review application requirements, data, integrations, availability needs, and migration constraints.'],
      ['Establish the landing zone', 'Plan subscriptions, network patterns, identity, policy, and the guardrails teams need to deploy responsibly.'],
      ['Migrate in manageable stages', 'Prioritize workloads and validate the approach with technical owners before scaling the migration.'],
      ['Prepare for day-two operations', 'Clarify monitoring, incident response, backup, cost review, and service ownership after workloads move.'],
    ],
  },
  'Workflow automation': {
    visual: 'workflow',
    eyebrow: 'Make work flow better',
    heading: 'Improve the process before automating it.',
    intro: 'Edrisync works with the people closest to the process to identify delays, rework, and handoff issues. We simplify where possible, then design and validate automation that supports the real workflow.',
    cards: [
      ['Observe the current process', 'Map tasks, decisions, handoffs, exceptions, and the information people need at each step.'],
      ['Choose the right opportunity', 'Prioritize processes by user friction, business value, feasibility, and appropriate controls.'],
      ['Design a human-friendly flow', 'Make approvals, notifications, exceptions, and ownership clear in the proposed automation.'],
      ['Pilot, learn, and improve', 'Test with realistic scenarios, support users, and refine the workflow based on feedback.'],
    ],
  },
  'Systems integration': {
    visual: 'integration',
    eyebrow: 'Connect the ecosystem',
    heading: 'Design dependable links between business systems.',
    intro: 'Edrisync helps make information flow more predictably between applications. The work starts with data owners and dependencies, then defines secure integration patterns and a support model that can handle change.',
    cards: [
      ['Map the application landscape', 'Identify systems, interfaces, owners, data sources, dependencies, and manual workarounds.'],
      ['Choose a suitable pattern', 'Select an approach based on available APIs, data needs, security boundaries, and maintainability.'],
      ['Plan for failure and change', 'Consider retries, errors, permissions, data quality, version changes, and operational monitoring.'],
      ['Document ongoing ownership', 'Make support responsibilities, change control, and escalation paths clear before handover.'],
    ],
  },
};

const serviceDelivery = {
  'Security assessments': {
    image: null,
    imageAlt: 'Illustration of a security assessment',
    intro: 'Edrisync combines evidence review, stakeholder conversations, and technical context to create an assessment that reflects how your organization actually operates.',
    stages: [
      ['Scope around your business', 'Agree the systems, teams, business priorities, and assessment boundaries before work begins.'],
      ['Review evidence and controls', 'Examine relevant configurations, policies, workflows, and existing assurance material.'],
      ['Validate what we find', 'Discuss observations with the people closest to the work so findings are accurate and actionable.'],
      ['Turn findings into action', 'Prioritize recommendations by business impact, effort, and ownership, then walk your team through the roadmap.'],
    ],
  },
  'Penetration testing': {
    image: null,
    imageAlt: 'Illustration of a controlled security test',
    intro: 'Edrisync plans each test with your technical and business owners, works within agreed rules, and explains findings in language both engineers and leaders can use.',
    stages: [
      ['Agree scope and safeguards', 'Define the assets, test window, points of contact, and activities that are explicitly out of scope.'],
      ['Test approved assets', 'Conduct controlled testing and record evidence while communicating significant issues through agreed channels.'],
      ['Explain risk and remediation', 'Share reproducible findings, likely impact, and practical remediation guidance with the right owners.'],
      ['Validate priority fixes', 'Retest agreed changes and provide a concise view of what has been resolved and what remains.'],
    ],
  },
  SOC: {
    image: null,
    imageAlt: 'Illustration of a security operations center',
    intro: 'Edrisync works alongside security, IT, and business stakeholders to build operations that are measurable, repeatable, and proportionate to the risks you need to manage.',
    stages: [
      ['Establish the operational baseline', 'Map critical assets, current tools, available telemetry, existing procedures, and the people accountable for action.'],
      ['Design coverage that matters', 'Prioritize log sources and detection use cases around business risk, common attack paths, and the evidence needed to investigate them.'],
      ['Operationalize response', 'Create analyst workflows, escalation criteria, communication plans, and practical incident playbooks with the teams who will use them.'],
      ['Tune, measure, and mature', 'Review alert quality, investigation trends, response readiness, and remediation outcomes to guide the next improvements.'],
    ],
  },
  'GRC program design': {
    image: governanceImage,
    imageAlt: 'Governance and compliance service illustration',
    intro: 'Edrisync works with leadership, risk owners, and technical teams to design a proportionate program that fits existing responsibilities instead of adding process for its own sake.',
    stages: [
      ['Understand the operating context', 'Map business objectives, obligations, decision-makers, and the risk topics that matter most.'],
      ['Design roles and routines', 'Define ownership, escalation paths, governance forums, and a useful review cadence.'],
      ['Connect risks to controls', 'Create practical links between risk statements, policies, controls, evidence, and accountable teams.'],
      ['Embed and improve', 'Support rollout, establish meaningful reporting, and help owners keep the program current.'],
    ],
  },
  'ISO 27001 readiness': {
    image: governanceImage,
    imageAlt: 'Information security readiness illustration',
    intro: 'Edrisync helps your team interpret readiness requirements, assess existing evidence, and build an achievable work plan without implying certification is guaranteed.',
    stages: [
      ['Set the ISMS scope', 'Clarify organizational boundaries, services, interested parties, and the context for the management system.'],
      ['Review current readiness', 'Compare existing practices and evidence with applicable requirements and identify gaps to address.'],
      ['Build the improvement plan', 'Prioritize work across risk treatment, documented processes, control ownership, and evidence routines.'],
      ['Prepare for independent audit', 'Help organize internal review and audit preparation; certification decisions remain with the independent certification body.'],
    ],
  },
  'Microsoft 365 enablement': {
    image: cloudWorkplaceImage,
    imageAlt: 'Microsoft 365 workplace service illustration',
    intro: 'Edrisync brings together collaboration design, security configuration, governance, and user adoption so Microsoft 365 supports the way your teams need to work.',
    stages: [
      ['Discover how teams work', 'Review current tools, collaboration patterns, tenant configuration, and user needs.'],
      ['Design the secure experience', 'Plan identity, information structure, Teams and SharePoint usage, and governance guardrails.'],
      ['Configure and enable', 'Implement agreed improvements in manageable stages with testing and practical user guidance.'],
      ['Measure and optimize', 'Review adoption and operational feedback, then refine the environment as needs change.'],
    ],
  },
  'Azure cloud solutions': {
    image: cloudWorkplaceImage,
    imageAlt: 'Azure cloud service illustration',
    intro: 'Edrisync aligns cloud architecture with your workloads, security expectations, operating model, and cost responsibilities—from the landing zone to ongoing optimization.',
    stages: [
      ['Assess workloads and readiness', 'Understand application dependencies, constraints, data needs, and migration priorities.'],
      ['Design cloud foundations', 'Establish architecture and guardrails for identity, networking, security, monitoring, and cost.'],
      ['Move in controlled stages', 'Plan and validate workload migrations or modernization around agreed service needs.'],
      ['Operate and optimize', 'Set ownership and operating practices for reliability, security, governance, and cost visibility.'],
    ],
  },
  'Workflow automation': {
    image: automationImage,
    imageAlt: 'Workflow automation service illustration',
    intro: 'Edrisync starts with the people and process—not the tool. We identify where automation can remove friction, then design and validate a workflow that teams can support.',
    stages: [
      ['Map the work as it happens', 'Document handoffs, decisions, exceptions, and sources of delay with the people doing the work.'],
      ['Select the right opportunity', 'Prioritize candidate workflows by business value, feasibility, risk, and user impact.'],
      ['Design and validate a solution', 'Build an agreed workflow, test realistic scenarios, and confirm access and exception handling.'],
      ['Launch and hand over', 'Prepare users and owners, document support needs, and review performance after launch.'],
    ],
  },
  'Systems integration': {
    image: automationImage,
    imageAlt: 'Systems integration service illustration',
    intro: 'Edrisync helps teams understand how systems and data should connect, then shapes an integration approach that accounts for security, reliability, and long-term ownership.',
    stages: [
      ['Map systems and information flows', 'Identify applications, data owners, interfaces, dependencies, and pain points.'],
      ['Design the integration approach', 'Choose appropriate connection patterns and define security, error handling, and data responsibilities.'],
      ['Build and verify connections', 'Coordinate implementation and test expected flows, exceptions, access, and performance.'],
      ['Establish ongoing ownership', 'Document monitoring, support, change control, and the people responsible for each connection.'],
    ],
  },
};

// Kept as content data so every child service uses the same page rhythm while
// making the day-to-day engagement model specific to the service.
const serviceOperatingModels = {
  'Security assessments': [
    ['Business-led scope', 'We start with the services, information, decisions, and change initiatives that would carry the greatest consequence if controls failed.'],
    ['Evidence-led review', 'Configuration, process, and stakeholder evidence are tested together so the assessment reflects operation, not paperwork alone.'],
    ['Owned remediation', 'Findings are grouped into decisions, owners, dependencies, and an achievable sequence of improvement work.'],
  ],
  'Penetration testing': [
    ['Controlled engagement', 'Written rules of engagement set the target scope, permitted techniques, test windows, emergency contacts, and stop conditions.'],
    ['Validated attack paths', 'Confirmed findings are documented with enough evidence for technical teams to understand exposure and reproduce the issue safely.'],
    ['Remediation partnership', 'Priority issues are reviewed with the right owners, and agreed fixes can be retested to establish a clear closure record.'],
  ],
  SOC: [
    ['Risk-led coverage', 'Logging and detection use cases are prioritized around critical services, likely attack paths, and the decisions your team must make quickly.'],
    ['Human-led investigation', 'Analysts use defined triage, evidence, escalation, and communication paths rather than treating every alert as equally urgent.'],
    ['Continuous tuning', 'Investigation outcomes inform detection quality, telemetry gaps, playbooks, remediation, and leadership reporting.'],
  ],
  'GRC program design': [
    ['Decision-led governance', 'Leadership forums, decision rights, escalation thresholds, and risk acceptance are designed around how your organization already operates.'],
    ['Owner-led controls', 'Every important risk and control is connected to a named owner, useful evidence, and a review cadence people can sustain.'],
    ['Assurance-led improvement', 'Concise reporting surfaces material changes, overdue actions, control health, and the decisions that need leadership attention.'],
  ],
  'ISO 27001 readiness': [
    ['Scope-led ISMS design', 'We establish the organizational boundary, interested parties, risk context, and governance needed for a proportionate management system.'],
    ['Risk-led gap closure', 'Readiness work is sequenced by risk, audit dependency, effort, and ownership instead of treating every requirement as a parallel project.'],
    ['Evidence-led assurance', 'Policies, controls, records, internal review, and management oversight are organized into a routine that can support independent audit.'],
  ],
  'Microsoft 365 enablement': [
    ['Experience-led design', 'Collaboration patterns, user journeys, information needs, and support expectations shape the target workplace before configuration begins.'],
    ['Guardrails by default', 'Identity, access, information governance, lifecycle controls, and security settings are designed into the employee experience.'],
    ['Adoption with ownership', 'Role-based enablement, champions, service ownership, and feedback signals help the new ways of working stick.'],
  ],
  'Azure cloud solutions': [
    ['Workload-led planning', 'Architecture choices begin with application dependencies, resilience needs, data sensitivity, and the business value of each workload.'],
    ['Platform guardrails', 'Identity, network, policy, monitoring, recovery, and cost controls form a reusable foundation for delivery teams.'],
    ['Day-two accountability', 'Operational ownership, incident paths, change control, security review, and cost review are established before workloads are handed over.'],
  ],
  'Workflow automation': [
    ['Process before platform', 'We map the real work, including exceptions and decisions, before deciding whether automation is the right intervention.'],
    ['Human-in-the-loop design', 'Approvals, ownership, notifications, access controls, and exception routes keep important judgment visible in the flow.'],
    ['Measured handover', 'Success measures, support ownership, documentation, and a feedback cycle keep the workflow dependable after launch.'],
  ],
  'Systems integration': [
    ['Contract-first design', 'Data ownership, interface expectations, access boundaries, and failure behaviour are agreed before connections are built.'],
    ['Observable delivery', 'Testing covers expected flows, data quality, errors, retries, permissions, and the signals operators need to diagnose issues.'],
    ['Change-ready operations', 'Monitoring, support, versioning, documentation, and escalation are assigned so integrations remain dependable as systems evolve.'],
  ],
};

const focusDetails = {
  'Security assessments': [
    'Review account lifecycle, authentication, privileged access, and the controls that protect sensitive services.',
    'Consider device health, endpoint coverage, configuration, and how teams respond to protection alerts.',
    'Examine key cloud and infrastructure settings in the context of your workloads and exposure.',
    'Check whether documented security practices are understood, assigned, and followed in day-to-day work.',
  ],
  'Penetration testing': [
    'Assess externally reachable services and approved assets for weaknesses that could increase exposure.',
    'Test agreed application flows, validation, authentication, and access boundaries.',
    'Where included in scope, evaluate internal paths and segmentation with approved safeguards.',
    'Recheck agreed remediation changes and document any remaining observations.',
  ],
  SOC: [
    'Bring together identity, endpoint, cloud, network, email, and other agreed telemetry so investigations begin with the right context.',
    'Build and tune detections around meaningful attacker behaviours and the systems most important to your organization.',
    'Give analysts defined triage paths, evidence requirements, escalation thresholds, and access to the owners who can act.',
    'Use incident and alert trends to strengthen logging, controls, playbooks, and leadership-level risk decisions.',
  ],
  'GRC program design': [
    'Clarify who makes risk decisions, who advises, and how important issues are escalated.',
    'Create a consistent approach to identify, evaluate, assign, and treat risks.',
    'Align policies and control activities with obligations, systems, and accountable owners.',
    'Make evidence and reporting part of a routine teams can maintain.',
  ],
  'ISO 27001 readiness': [
    'Review ISMS boundaries, interested parties, and readiness against the relevant standard requirements.',
    'Establish how information security risks are assessed, accepted, treated, and reviewed.',
    'Connect policies and control activities with ownership and supporting evidence.',
    'Prepare internal reviews and organize evidence for an independent certification audit.',
  ],
  'Microsoft 365 enablement': [
    'Review tenant services, licensing needs, configuration, and current usage patterns.',
    'Shape Teams and SharePoint spaces, information structure, and collaboration practices.',
    'Improve identity protections, access settings, and security features to fit business requirements.',
    'Support adoption with role-based guidance, communications, and ownership.',
  ],
  'Azure cloud solutions': [
    'Evaluate application dependencies, cloud suitability, and migration constraints.',
    'Plan subscriptions, resource organization, networking, and platform guardrails.',
    'Align identity, security controls, monitoring, and recovery with workload needs.',
    'Improve cost visibility and operational responsibility across cloud services.',
  ],
  'Workflow automation': [
    'Understand process steps, decisions, exceptions, and stakeholder needs before choosing a tool.',
    'Identify suitable Power Platform opportunities where appropriate to your environment.',
    'Design approval paths, notifications, and task routing with appropriate access controls.',
    'Define ownership and monitoring so workflows remain useful after launch.',
  ],
  'Systems integration': [
    'Document application owners, data sources, interfaces, dependencies, and current manual work.',
    'Select suitable APIs, connectors, or integration patterns for the use case.',
    'Design secure data exchange, permissions, error handling, and recovery behavior.',
    'Set monitoring, support, change management, and long-term ownership expectations.',
  ],
};

export const subServicePageKeys = new Set(Object.keys(subServices));

function Reveal({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ServiceCta({ children, onClick }) {
  return (
    <div className="relative inline-block">
      <span
        className="absolute inset-0 rounded-xl animate-cta-pulse"
        style={{ backgroundColor: '#087FD1' }}
        aria-hidden="true"
      />
      <button
        onClick={onClick}
        className="relative flex min-h-[52px] cursor-pointer items-center gap-2 rounded-xl px-8 py-4 text-sm font-semibold text-white shadow-xl transition-all duration-200 hover:bg-[#2857B8] hover:shadow-2xl focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-white"
        style={{ backgroundColor: '#087FD1' }}
      >
        {children}
        <motion.span
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          className="inline-flex"
        >
          <ArrowRight className="h-4 w-4" />
        </motion.span>
      </button>
    </div>
  );
}

function ServiceBlueprint({ type, Icon, serviceKey }) {
  const visualRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: visualRef,
    offset: ['start end', 'end start'],
  });
  const prefersReducedMotion = useReducedMotion();
  const visualY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [64, -64]);
  const shell = 'relative h-[340px] overflow-hidden rounded-[28px] border border-white/10 bg-[#000741] p-6 text-white shadow-[0_24px_60px_rgba(4,7,32,.18)]';
  const tile = 'rounded-xl border border-white/10 bg-white/[.08] p-3 text-xs text-white/75 backdrop-blur';
  const center = (
    <motion.div
      animate={{ y: [0, -5, 0], boxShadow: ['0 10px 24px rgba(8,127,209,.2)', '0 16px 36px rgba(8,127,209,.4)', '0 10px 24px rgba(8,127,209,.2)'] }}
      transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      className="relative z-10 flex h-20 w-20 items-center justify-center rounded-[24px] bg-[#087fd1]"
    >
      <Icon className="h-9 w-9 text-white" strokeWidth={1.4} />
    </motion.div>
  );

  return (
    <motion.div ref={visualRef} style={{ y: visualY }} className={shell}>
      <div className="absolute -right-16 -top-24 h-64 w-64 rounded-full bg-[#087fd1]/20 blur-3xl" />
      <div className="relative flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-[.2em] text-[#7dc3ff]">EDRISYNC / {serviceKey}</span>
        <span className="flex h-2 w-2 rounded-full bg-[#4FA6FF] shadow-[0_0_14px_4px_rgba(79,166,255,.4)]" />
      </div>
      <div className="relative mt-7 h-[245px]">
        {type === 'surface' && (
          <div className="flex h-full items-center justify-center">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 36, repeat: Infinity, ease: 'linear' }} className="absolute h-52 w-52 rounded-full border border-dashed border-white/20" />
            <div className="absolute h-40 w-40 rounded-full border border-white/10" />
            <div className="absolute left-1/2 top-2 -translate-x-1/2">{center}</div>
            <div className={`absolute bottom-7 left-1 ${tile}`}>Identity</div>
            <div className={`absolute bottom-7 right-1 ${tile}`}>Devices</div>
            <div className={`absolute left-1/2 top-[145px] -translate-x-1/2 ${tile}`}>Cloud & controls</div>
            <span className="absolute left-[18%] top-[27%] h-2 w-2 rounded-full bg-[#4FA6FF]" />
            <span className="absolute right-[18%] top-[27%] h-2 w-2 rounded-full bg-white/80" />
          </div>
        )}
        {type === 'attack-path' && (
          <div className="relative flex h-full items-center justify-center">
            <svg aria-hidden="true" viewBox="0 0 440 220" className="absolute inset-0 h-full w-full">
              <path d="M48 52L150 108L250 52L380 102M150 108L250 172L380 102" fill="none" stroke="#4FA6FF" strokeOpacity=".55" strokeWidth="2" strokeDasharray="6 6" />
              <motion.circle r="5" fill="#fff" animate={{ cx: [48, 150, 250, 380], cy: [52, 108, 52, 102] }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }} />
            </svg>
            {['Entry point', 'Application', 'Identity', 'Validated'].map((node, index) => (
              <div key={node} className={`absolute ${tile}`} style={{ left: `${index * 28 + 2}%`, top: index === 1 ? '50%' : index === 2 ? '12%' : index === 3 ? '42%' : '12%' }}>{node}</div>
            ))}
            <div className="absolute left-[32%] top-[55%]">{center}</div>
          </div>
        )}
        {type === 'governance' && (
          <div className="grid h-full grid-cols-[.8fr_1.2fr] items-center gap-4">
            <div className="space-y-3">
              {['Leadership', 'Risk owners', 'Control teams'].map((item, index) => (
                <motion.div key={item} animate={{ x: [0, index === 1 ? 4 : 0, 0] }} transition={{ duration: 3, delay: index * .25, repeat: Infinity }} className={tile}>{item}</motion.div>
              ))}
            </div>
            <div className="relative flex h-full flex-col justify-center gap-3">
              <div className="absolute left-[-12px] top-[20%] h-[60%] border-l border-dashed border-[#4FA6FF]/60" />
              {['Decisions', 'Risk register', 'Controls & evidence', 'Reporting'].map((item, index) => (
                <div key={item} className={`flex items-center gap-3 ${tile}`}><span className="h-2 w-2 rounded-full bg-[#4FA6FF]" />{item}</div>
              ))}
            </div>
          </div>
        )}
        {type === 'readiness' && (
          <div className="mx-auto max-w-[300px] rounded-2xl border border-white/10 bg-white/[.07] p-4 shadow-xl">
            <div className="flex items-center justify-between text-xs font-semibold"><span>Readiness review</span><FileCheck2 className="h-4 w-4 text-[#4FA6FF]" /></div>
            <div className="mt-4 space-y-2">
              {['ISMS scope', 'Risk treatment', 'Control evidence', 'Internal review'].map((item, index) => (
                <motion.div key={item} initial={{ opacity: .55 }} animate={{ opacity: [0.55, 1, .55] }} transition={{ duration: 2.8, delay: index * .3, repeat: Infinity }} className="flex items-center gap-3 rounded-lg bg-white/[.06] px-3 py-2 text-xs text-white/75">
                  <span className={`flex h-4 w-4 items-center justify-center rounded border ${index < 2 ? 'border-[#4FA6FF] bg-[#087fd1]' : 'border-white/30'}`}>{index < 2 && <Check className="h-3 w-3" />}</span>{item}
                </motion.div>
              ))}
            </div>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10"><motion.div className="h-full rounded-full bg-[#4FA6FF]" animate={{ width: ['28%', '68%', '48%'] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} /></div>
          </div>
        )}
        {type === 'workspace' && (
          <div className="grid h-full grid-cols-[64px_1fr] gap-3">
            <div className="flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-white/[.05] p-2">
              {[Cloud, FileCheck2, UsersRound, ShieldCheck].map((Item, index) => <div key={index} className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[.08] text-[#7dc3ff]"><Item className="h-4 w-4" /></div>)}
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[.05] p-3">
              <div className="flex items-center justify-between text-xs font-semibold"><span>Team workspace</span><span className="h-2 w-2 rounded-full bg-[#4FA6FF]" /></div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {['Teams', 'SharePoint', 'Identity', 'Protection'].map((item, index) => <motion.div key={item} animate={{ y: [0, index % 2 ? -2 : 2, 0] }} transition={{ duration: 3, delay: index * .18, repeat: Infinity }} className={`${tile} min-h-[62px]`}>{item}<div className="mt-2 h-1 w-8 rounded-full bg-[#4FA6FF]/70" /></motion.div>)}
              </div>
            </div>
          </div>
        )}
        {type === 'cloud' && (
          <div className="relative flex h-full items-center justify-center">
            <div className="absolute inset-x-[12%] top-[18%] h-[66%] rounded-[32px] border border-dashed border-[#4FA6FF]/40" />
            <div className="absolute left-[8%] top-[35%] space-y-3">{['Identity', 'Network'].map((item) => <div key={item} className={tile}>{item}</div>)}</div>
            <div className="absolute right-[8%] top-[35%] space-y-3">{['Policy', 'Monitoring'].map((item) => <div key={item} className={tile}>{item}</div>)}</div>
            {center}
            <span className="absolute bottom-1 rounded-full border border-white/10 bg-white/[.06] px-3 py-1 text-[10px] text-white/65">Governed cloud foundation</span>
          </div>
        )}
        {type === 'workflow' && (
          <div className="flex h-full flex-col justify-center">
            <div className="flex items-center justify-between gap-1">
              {['Request', 'Review', 'Approve', 'Complete'].map((item, index) => (
                <div key={item} className="flex min-w-0 flex-1 flex-col items-center gap-3">
                  <motion.div animate={{ scale: [1, 1.08, 1], borderColor: ['rgba(255,255,255,.2)', '#4FA6FF', 'rgba(255,255,255,.2)'] }} transition={{ duration: 3, delay: index * .35, repeat: Infinity }} className="flex h-12 w-12 items-center justify-center rounded-2xl border bg-white/[.08] text-[#7dc3ff]"><Workflow className="h-5 w-5" /></motion.div>
                  <span className="text-center text-[10px] text-white/70">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-[-62px] flex justify-between px-[18%] text-[#4FA6FF]"><ArrowRight className="h-4 w-4" /><ArrowRight className="h-4 w-4" /><ArrowRight className="h-4 w-4" /></div>
            <div className="mt-16 rounded-xl border border-white/10 bg-white/[.06] px-4 py-2 text-center text-[10px] text-white/55">Approvals, exceptions, ownership</div>
          </div>
        )}
        {type === 'integration' && (
          <div className="relative flex h-full items-center justify-between px-2">
            <svg aria-hidden="true" viewBox="0 0 440 220" className="absolute inset-0 h-full w-full">
              <path d="M62 48L210 110L378 50M62 172L210 110L378 172" fill="none" stroke="#4FA6FF" strokeOpacity=".55" strokeWidth="2" />
              <motion.path d="M62 48L210 110L378 50" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="4 12" animate={{ strokeDashoffset: [0, -32] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }} />
            </svg>
            <div className={`relative ${tile}`}>CRM</div>
            <motion.div animate={{ scale: [1, 1.07, 1] }} transition={{ duration: 2.8, repeat: Infinity }} className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-[#087fd1]"><Network className="h-7 w-7" /></motion.div>
            <div className="relative space-y-3"><div className={tile}>Data</div><div className={tile}>Operations</div></div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function SubServiceDetailPage({ serviceKey, onParentService, onServices, onContact }) {
  const service = subServices[serviceKey];
  if (!service) return null;
  const Icon = service.icon;
  const delivery = serviceDelivery[serviceKey];
  const deepDive = serviceDeepDives[serviceKey];
  const operatingModel = serviceOperatingModels[serviceKey];
  const [activeStage, setActiveStage] = useState(0);
  const [openQuestion, setOpenQuestion] = useState(0);

  useEffect(() => {
    setActiveStage(0);
    setOpenQuestion(0);
  }, [serviceKey]);

  return (
    <div className="min-h-screen bg-[#f5f8fc] text-[#000741]">
      <header className="relative overflow-hidden bg-[#000741] px-6 pb-20 pt-32 text-white lg:pb-28">
        <div className="absolute -right-24 -top-32 h-96 w-96 rounded-full bg-[#087fd1]/30 blur-3xl" />
        <div className="absolute -bottom-36 left-[38%] h-80 w-80 rounded-full bg-[#4FA6FF]/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl">
          <button
            onClick={() => (onParentService ? onParentService(service.parent) : onServices?.())}
            className="inline-flex items-center gap-2 text-sm font-medium text-white/65 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> Back to {service.parentLabel}
          </button>
          <div className="mt-16 grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.65 }}>
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.23em] text-[#4FA6FF]">
                <Icon className="h-4 w-4" /> {service.parentLabel}
              </p>
              <h1 className="mt-6 max-w-3xl text-5xl font-light leading-[1.04] sm:text-6xl">{serviceKey}</h1>
              <p className="mt-6 max-w-2xl text-2xl font-light leading-snug text-white/90">{service.headline}</p>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/65">{service.intro}</p>
              <div className="mt-8">
                <ServiceCta onClick={onContact}>Talk through your project</ServiceCta>
              </div>
            </motion.div>
            <Reveal className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[.07] p-7 backdrop-blur sm:p-9">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#087fd1]/25 blur-2xl" />
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute -right-8 top-8 h-44 w-44 rounded-full border border-white/[.08]"
                animate={{ rotate: 360 }}
                transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
              >
                <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4FA6FF] shadow-[0_0_16px_4px_rgba(79,166,255,.45)]" />
              </motion.div>
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-white/15 bg-white/[.08] px-3 py-1.5 text-xs font-semibold text-white/75">Service overview</span>
                  <motion.div
                    animate={{ y: [0, -5, 0], boxShadow: ['0 10px 24px rgba(8,127,209,.18)', '0 14px 30px rgba(8,127,209,.36)', '0 10px 24px rgba(8,127,209,.18)'] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                    className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#087fd1] text-white"
                  >
                    <Icon className="h-6 w-6" />
                  </motion.div>
                </div>
                <p className="mt-10 text-xl font-light leading-relaxed text-white/85">{service.overview}</p>
                <div className="mt-8 grid gap-2 sm:grid-cols-2">
                  {service.focus.slice(0, 4).map((item) => (
                    <div key={item} className="flex min-h-12 items-center gap-2 rounded-xl bg-white/[.07] px-3 py-2 text-xs leading-relaxed text-white/75">
                      <Check className="h-4 w-4 shrink-0 text-[#4FA6FF]" /> {item}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[.23em] text-[#087fd1]">Where we focus</p>
              <h2 className="mt-5 text-4xl font-light leading-tight">The right work, in the right order.</h2>
              <p className="mt-5 text-base leading-relaxed text-slate-600">We shape the engagement around your current environment, priorities, and the people who will own the result.</p>
            </Reveal>
            <div className="grid gap-3 sm:grid-cols-2">
              {service.focus.map((item, index) => (
                <Reveal key={item} delay={index * 0.06} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_28px_rgba(4,7,32,.04)]">
                  <h3 className="mt-5 text-base font-semibold">{item}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{focusDetails[serviceKey][index]}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#eaf5ff] px-6 py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[.9fr_1.1fr]">
            <Reveal className="relative min-h-[380px] overflow-hidden rounded-[30px] bg-[#000741] p-7 text-white shadow-[0_24px_60px_rgba(4,7,32,.16)] sm:p-9">
              {delivery.image ? (
                <>
                  <img src={delivery.image} alt={delivery.imageAlt} className="absolute inset-0 h-full w-full object-cover opacity-75" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#000741] via-[#000741]/45 to-[#000741]/10" />
                </>
              ) : (
                <>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(8,127,209,.55),transparent_48%),linear-gradient(145deg,#000741,#071b4c)]" />
                  <div className="absolute inset-8 rounded-[24px] border border-white/10" />
                  <div className="absolute left-1/2 top-1/2 flex h-36 w-36 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[34px] border border-white/20 bg-white/10 shadow-[0_0_70px_rgba(8,127,209,.35)] backdrop-blur-sm">
                    <Icon className="h-16 w-16 text-white" strokeWidth={1.2} />
                  </div>
                  <div className="absolute left-[14%] top-[24%] h-3 w-3 rounded-full bg-[#4FA6FF] shadow-[0_0_24px_8px_rgba(79,166,255,.3)]" />
                  <div className="absolute right-[16%] top-[33%] h-2 w-2 rounded-full bg-white shadow-[0_0_18px_6px_rgba(255,255,255,.25)]" />
                  <div className="absolute bottom-[25%] left-[22%] h-2 w-2 rounded-full bg-[#4FA6FF] shadow-[0_0_18px_6px_rgba(79,166,255,.3)]" />
                  <svg aria-hidden="true" className="absolute inset-0 h-full w-full" viewBox="0 0 600 400" fill="none">
                    <path d="M105 105L300 200L490 135M130 300L300 200L470 290" stroke="white" strokeOpacity=".22" strokeWidth="1.5" strokeDasharray="5 7" />
                    <circle cx="300" cy="200" r="112" stroke="white" strokeOpacity=".12" />
                    <circle cx="300" cy="200" r="158" stroke="white" strokeOpacity=".08" />
                  </svg>
                </>
              )}
              <div className="relative flex min-h-[324px] flex-col justify-between">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full border border-white/20 bg-[#000741]/50 px-3 py-1.5 text-xs font-semibold text-white/85 backdrop-blur">EDRISYNC DELIVERY MODEL</span>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[.2em] text-[#7dc3ff]">{service.parentLabel}</p>
                  <p className="mt-3 max-w-md text-2xl font-light leading-snug">{serviceKey}, built around your environment.</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="text-xs font-bold uppercase tracking-[.23em] text-[#087fd1]">How Edrisync delivers this</p>
              <h2 className="mt-5 text-4xl font-light leading-tight">A hands-on approach, from discovery to lasting improvement.</h2>
              <p className="mt-5 text-base leading-relaxed text-slate-600">{delivery.intro}</p>
              <div className="mt-8 space-y-5">
                {delivery.stages.map(([title, description], index) => (
                  <div key={title} className="flex gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#087fd1] shadow-sm">
                      {index === 0 ? <SearchCheck className="h-4 w-4" /> : index === 1 ? <Layers3 className="h-4 w-4" /> : index === 2 ? <Workflow className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold">{title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="overflow-hidden bg-[#06102f] px-6 py-20 text-white lg:py-28">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[.92fr_1.08fr]">
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[.23em] text-[#4FA6FF]">{deepDive.eyebrow}</p>
              <h2 className="mt-5 text-4xl font-light leading-tight sm:text-5xl">{deepDive.heading}</h2>
              <p className="mt-6 text-base leading-relaxed text-white/65">{deepDive.intro}</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {deepDive.cards.map(([title], index) => (
                  <div key={title} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[.05] p-3 text-sm text-white/80">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#087fd1]/25 text-[#7dc3ff]">
                      {index === 0 ? <SearchCheck className="h-4 w-4" /> : index === 1 ? <Layers3 className="h-4 w-4" /> : index === 2 ? <Workflow className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                    </span>
                    {title}
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <ServiceBlueprint type={deepDive.visual} Icon={Icon} serviceKey={serviceKey} />
            </Reveal>
          </div>
          <div className="mx-auto mt-12 grid max-w-7xl gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {deepDive.cards.map(([title, description], index) => (
              <Reveal key={title} delay={index * 0.06} className="group rounded-2xl border border-white/10 bg-white/[.04] p-5 transition-colors hover:bg-white/[.08]">
                <p className="text-xs font-semibold uppercase tracking-[.15em] text-[#4FA6FF]">In practice</p>
                <h3 className="mt-4 text-base font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{description}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="bg-white px-6 py-20 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
              <Reveal>
                <p className="text-xs font-bold uppercase tracking-[.23em] text-[#087fd1]">What you can expect</p>
                <h2 className="mt-5 text-4xl font-light leading-tight">Useful outcomes, not just recommendations.</h2>
                <p className="mt-5 text-base leading-relaxed text-slate-600">Every engagement is designed to leave your team with clarity, practical next steps, and work products they can use.</p>
                <div className="mt-8 space-y-3">
                  {service.outcomes.map((outcome) => (
                    <p key={outcome} className="flex items-start gap-3 text-sm leading-relaxed text-slate-700">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#087fd1]" /> {outcome}
                    </p>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.1} className="rounded-[28px] bg-[#000741] p-7 text-white sm:p-10">
                <div className="flex items-center gap-3">
                  <GitBranch className="h-5 w-5 text-[#4FA6FF]" />
                  <p className="text-xs font-bold uppercase tracking-[.2em] text-[#4FA6FF]">Typical deliverables</p>
                </div>
                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {service.deliverables.map((item) => (
                    <div key={item} className="rounded-2xl border border-white/10 bg-white/[.06] p-5">
                      <p className="text-sm font-medium leading-relaxed text-white/85">{item}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="bg-[#f5f8fc] px-6 py-20 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <Reveal className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[.23em] text-[#087fd1]">How the service operates</p>
              <h2 className="mt-5 text-4xl font-light leading-tight">A delivery model built to work after the engagement.</h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">The work is structured to create clear decisions, durable ownership, and a practical rhythm your team can continue to use.</p>
            </Reveal>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {operatingModel.map(([title, description], index) => (
                <Reveal key={title} delay={index * 0.07} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_28px_rgba(4,7,32,.04)]">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e5f3ff] text-sm font-bold text-[#087fd1]">0{index + 1}</span>
                  <h3 className="mt-8 text-lg font-semibold">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{description}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#000741] px-6 py-20 text-white lg:py-28">
          <div className="mx-auto max-w-7xl">
            <Reveal className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[.23em] text-[#4FA6FF]">A clear path forward</p>
              <h2 className="mt-5 text-4xl font-light leading-tight">See how the engagement comes together.</h2>
              <p className="mt-4 text-base leading-relaxed text-white/65">A collaborative sequence connects your current needs to practical work and useful outcomes.</p>
            </Reveal>
            <div className="mt-12 grid gap-8 lg:grid-cols-[.72fr_1.28fr]">
              <div className="relative space-y-2">
                <div className="absolute bottom-7 left-[21px] top-7 w-px bg-white/15" />
                <motion.div
                  className="absolute left-[20px] top-7 z-10 h-2 w-2 rounded-full bg-[#4FA6FF] shadow-[0_0_14px_4px_rgba(79,166,255,.45)]"
                  animate={{ y: activeStage * 60 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                />
                {service.steps.map((step, index) => (
                  <button
                    key={step}
                    type="button"
                    aria-pressed={activeStage === index}
                    onClick={() => setActiveStage(index)}
                    className={`relative flex min-h-[52px] w-full items-center gap-4 rounded-xl px-4 pl-10 text-left text-sm font-semibold transition-colors ${
                      activeStage === index ? 'bg-white text-[#000741]' : 'text-white/65 hover:bg-white/[.08] hover:text-white'
                    }`}
                  >
                    {step}
                  </button>
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${serviceKey}-${activeStage}`}
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.22 }}
                  className="relative min-h-[300px] overflow-hidden rounded-[28px] border border-white/10 bg-white/[.06] p-7 sm:p-10"
                >
                  <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full border border-white/[.06]" />
                  <div className="absolute -right-8 -top-12 h-48 w-48 rounded-full border border-white/[.08]" />
                  <div className="relative">
                    <p className="text-xs font-bold uppercase tracking-[.2em] text-[#4FA6FF]">How Edrisync works with your team</p>
                    <h3 className="mt-5 max-w-xl text-3xl font-light">{delivery.stages[activeStage][0]}</h3>
                    <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70">{delivery.stages[activeStage][1]}</p>
                    <div className="mt-9 flex flex-wrap gap-2">
                      <span className="rounded-full border border-white/10 bg-white/[.06] px-3 py-2 text-xs text-white/70">Collaborative</span>
                      <span className="rounded-full border border-white/10 bg-white/[.06] px-3 py-2 text-xs text-white/70">Risk-aware</span>
                      <span className="rounded-full border border-white/10 bg-white/[.06] px-3 py-2 text-xs text-white/70">Built around your context</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
          <Reveal className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[.23em] text-[#087fd1]">Where this helps</p>
            <h2 className="mt-5 text-4xl font-light leading-tight">Practical support for real business situations.</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">Every engagement is shaped around your circumstances. These examples show the kinds of challenges this service can help address.</p>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {serviceExamples[serviceKey].map(([title, description], index) => (
              <Reveal key={title} delay={index * 0.07} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_28px_rgba(4,7,32,.04)] transition duration-300 hover:-translate-y-1 hover:border-[#087fd1]/30 hover:shadow-[0_18px_40px_rgba(4,7,32,.10)]">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e5f3ff] text-[#087fd1]">
                  {index === 0 ? <Network className="h-5 w-5" /> : index === 1 ? <Workflow className="h-5 w-5" /> : <ShieldCheck className="h-5 w-5" />}
                </div>
                <h3 className="mt-6 text-lg font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{description}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="bg-white px-6 py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.72fr_1.28fr]">
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[.23em] text-[#087fd1]">Good questions</p>
              <h2 className="mt-5 text-4xl font-light leading-tight">Before we get started.</h2>
              <p className="mt-5 text-base leading-relaxed text-slate-600">A few useful details about how this service works. We can shape the scope around your organization and answer specific questions in an initial conversation.</p>
              <div className="mt-7">
                <ServiceCta onClick={onContact}>Ask us about this service</ServiceCta>
              </div>
            </Reveal>
            <div className="space-y-3">
              {serviceQuestions[serviceKey].map(([question, answer], index) => {
                const isOpen = openQuestion === index;
                const answerId = `service-answer-${serviceKey.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${index}`;
                return (
                  <Reveal key={question} delay={index * 0.05} className="overflow-hidden rounded-2xl border border-slate-200 bg-[#f8fbff]">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                      onClick={() => setOpenQuestion(isOpen ? null : index)}
                      className="flex min-h-[64px] w-full items-center justify-between gap-5 px-5 py-4 text-left text-sm font-semibold text-[#000741] transition-colors hover:bg-[#eaf5ff]"
                    >
                      {question}
                      <ChevronDown className={`h-4 w-4 shrink-0 text-[#087fd1] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={answerId}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600">{answer}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-[#eaf5ff] px-6 py-20 text-center lg:py-24">
          <div className="mx-auto max-w-3xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#087fd1] text-white shadow-lg shadow-[#087fd1]/20">
              <Icon className="h-7 w-7" />
            </div>
            <h2 className="mt-7 text-4xl font-light">Ready to explore {serviceKey.toLowerCase()}?</h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-600">Tell us what you are working toward. We’ll help you identify a practical next step for your organization.</p>
            <div className="mt-8">
              <ServiceCta onClick={onContact}>Start a conversation</ServiceCta>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
