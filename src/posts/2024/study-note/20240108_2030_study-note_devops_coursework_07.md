---
title: "[Study Note] Coursework: DevOps and Software Engineering - SDLC"
date: 2024-01-08T20:31
thumb: "devops.jpg"
tags: 
    - ❮Study Note❯
    - DevOps
    - software engineering
    - cloud computing
    - web development
    - SDLC
---

# 7. Software Engineering
- Software engineering is the application of scientific principles to the design and creation of software.
    - The field uses a systematic approach to collect and analyze business requirements in order to design, build, and test software applications to satisfy those business requirements.
- When computing began in the late 1950s, software engineering was a relatively undefined discipline, but over time it transformed into a modernized engineering field.
    - Initially, the creation of software lacked a formal development process.
        - This led to what is known as the “Software Crisis” which began in the mid-1960s and lasted until the mid-1980s.
        - During this period, software development often ran over budget, behind schedule, and consisted of unmanageable, buggy code.
    - The software engineering field became a discipline in the 1960s and evolved as new technologies were developed and the approach to software development became more scientific.
        - The mid 1980s also saw a rise in the growth of computer-aided software engineering or CASE which also helped to relieve the software crisis.
            - CASE tools can be divided into six categories,
                - Business analysis and modeling
                - Development tools such as debugging environments
                - Verification and validation tools
                - Configuration management
                - Metrics and measurement
                - Project management
- Trends in software engineering transformed from ad hoc programming towards more formal and standardized methods.
    - Today, the development process is typically guided by the Software Development Lifecycle or SDLC.
        - The SDLC identifies the steps needed to develop high-quality software.

## 7-1. Software Development Life Cycle (SDLC)
- The Software Development Life Cycle, known as the SDLC, is a systematic process to develop high-quality software in a predictable timeframe and budget.
    - The goal of the SDLC is to produce software that meets a client’s business requirements.
    - The software development life cycle began to take shape in the mid-1960s as software development began to necessitate a more detailed approach because of its growing complexity.
        - The SDLC led to a more deliberate approach as large corporations needed to manage complex business systems requiring heavy computational resources.
        - In its initial conception, it used what is called the “waterfall method” to manage projects where the development of software follows a linear pattern through discrete stages.
            - The SDLC has since been adapted, however, to more iterative methods in response to addressing customer needs and shifting requirements.
- The SDLC defines phases of the software development process that encompass their own process and deliverables.
    - It is a cycle of planning, design, and development that can be implemented as an iterative approach to software development.
- Adherence to the SDLC minimizes risks and costs to the development of high-quality, deployable software.

### SDLC Adavantages
- SDLC is a roadmap to the software development process.
    - Therefore it gives development teams a process to follow rather than using an ad hoc approach to improve efficiency and reduce risks.
- There are discrete phases to the SDLC and each phase is well defined.
    - So that team members know what they should be working on and when.
    - Because of the well-defined phases, it facilitates communication between the customer, other stakeholders, and the development team.
        - The SDLC offers an overview of the process, so stakeholders know where they fit in to that process.
        - Since each phase is discrete, cross-domain teams know when they have completed their tasks and when development can move to the next phase.
- The SDLC provides room for iteration where, at the end of a cycle, the process can circle back to incorporate additional requirements as needed.
    - Problem solving is incorporated early in the cycle so problems are addressed in a timely fashion and can be addressed in the design phase rather than during coding.
    - Each team member has a well-defined role which reduces conflict and overlapping responsibilities.

### SDLC Phases
- There are generally six phases in the SDLC process.
    1. Planning
        - Requirements are gathered, analyzed, documented and prioritized.
        - When planning a software solution, the following factors must be considered:
            - users of the solution
            - the overall purpose of the solution
            - data inputs and outputs
            - legal and regulatory compliance
            - risk identification
            - quality assurance requirements
            - allocation of human and financial resources
            - project scheduling
        - As part of the planning process, labor and material costs are estimated and weighed against time constraints.
            - Also, project teams are identified, and roles of each team member are proposed.
            - If stakeholders are struggling to define requirements, often the development team may produce prototypes during the planning stage to tease out those requirements.
                - A prototype is a small-scale replica of the end product used to get stakeholder feedback and establish requirements.
                - A prototype is used to test basic design ideas.
                - Though prototyping usually occurs during the planning stage, prototyping can occur at various phases of the SDLC whenever requirements need to be reconsidered or clarified as the project develops.
        - After requirements have been gathered, they are combined into a document called a software requirements specification, or SRS, document.
            - The SRS needs to be clearly understood and approved by all stakeholders.
            - The developers are also involved at this stage so they can gain a clear understanding of these requirements.
    2. Design
        - The requirements gathered from the SRS are used to develop the software architecture. 
        - Several team members work together at this stage to design the architecture.
            - The architecture is reviewed by the stakeholders and team.
        - During this phase, prototypes can be designed.
            - A prototype is a preliminary mock-up of the system, or parts of the system, used for demonstration purposes.
        - The document created in this phase is called a design document, and is used by developers during the next phase, which is the development phase.
    3. Development
        - Sometimes called the “building" phase or the "implementation" phase, is when the developers start the coding process once the design document is completed.
        - The project planners use the design document to determine and assign coding tasks.
        - This phase often requires the use of programming tools, different programming languages, and software stacks.
        - Organizations may also have standards or guidelines that need to be followed.
    4. Testing
        - Some large projects have dedicated testing teams.
        - Code needs to be thoroughly tested to ensure it is stable, secure, and meets the requirements outlined in the SRS.
        - Testing can be manual, automated, or a hybrid of both.
        - Product bugs are reported, tracked, and fixed, and code is retested until the software is stable.
        - Some common levels of testing include,
            - Unit testing
            - Integration testing
            - System testing
            - Acceptance testing
    5. Deployment
        - The deployment phase is where the application is released into the production environment and made available to users.
        - This can also happen in stages,
            - First, it is released onto a user acceptance testing, also called UAT, platform 
            - And once the customer signs off on the functionality, it is released to production.
                - This approach can be used for making software available on a website, mobile device app store, or a software distribution server on a corporate network.
    6. Maintenance
        - Once the code has been deployed into a production environment, this phase helps to find any other bugs, identify user interface issues, or UI for short, and identify other requirements that may not have been listed in the SRS.
        - Code enhancements can also be identified at this stage.
        - If bugs are discovered in this phase that were missed during testing, these errors may need to be fixed for high-priority issues or incorporated into the requirements as part of a future software release and the process can start over again.
- Each phase is discrete meaning that tasks from a previous phase do not overlap with tasks in the next phase. 
- Some organizations may have different names for each stage.
    - For example, “planning” may be called “requirements” or “strategy” or “analysis”.
    - Also, some organizations may have additional or fewer stages.

### Building Quality Software
- Software requirements specification (SRS)
    - Encompasses the process of collecting and documenting the set of requirements that the software needs to adhere to.
    - It may include a set of use cases that describe the business needs and user flows that the software must implement.
    - Software requirements can be classified into four broad categories:
        - Functional
        - External and User Interface
        - System features
        - Non-functional
- Software design
    - The process of transforming the requirements into a structure that is implementable using code.
    - The software design process translates the requirements into a language the developers can use to write the code. 
        - It transforms the requirements into a software solution.
    - The technical lead breaks down requirements into sets of related components with clearly defined behaviors, boundaries, and interactions. These components define the system architecture.
        - The system design incorporates guidance on system functions, performance, security, and platform characteristics.
        - The design communicates business rules and application logic, application programming interface design, which is how apps talk to each other or communicate with the database, user interfaces, and database design.
- Code quality 
    - Refers to the characteristics of the code including attributes such as,
        - Maintainability
        - Readability
        - Testability
        - Security
    - Quality code must fulfill the intended requirements of the software without defects.
    - Additionally, it should be clean and consistent, easy to read and maintain, well documented, and efficient.
- Coding for quality 
    - Entails following a set of coding practices during development such as,
        - Following common coding standards, conventions, patterns and styles
        - Using automated tools, known as linters, to detect programmatic and stylistic errors
        - Commenting in the code itself to make it easy for others to understand and modify
- Software testing
    - The process of verifying that the software matches established requirements and is free of bugs.
    - Its purpose is to identify errors, gaps, or missing requirements when compared with stated requirements.
        - Properly tested software ensures reliability, security, performance, and efficiency.
    - Software testing can often be automated or done manually.
    - Levels
        - Unit testing is often done by the developer and tests the smallest component of code that can be isolated from the rest of the system.
        - Once the components are integrated into the larger product, integration testing occurs.
        - Then, after the larger product is deemed completed, system testing can take place.
        - User acceptance testing, or UAT for short and sometimes called beta testing, is when the software is tested by the intended end user. 
    - Types
        - Functional
        - Non-functional
        - Regression
- Releases
    - When the newest version of the software is distributed, it is referred to as a “release.”
    - Different types of releases are intended for different audiences.
        - The alpha release is the first functioning version of the system released to a select group of stakeholders.
            - The alpha release likely contains errors and may not contain the full feature set but does contain most of the desired functionality.
            - Design changes may still occur during this release stage.
        - The beta release, also called a limited release, is given to the stakeholders outside of the developing organization.
            - One of the intents of the beta release is to try out the software under real conditions, test the functionality, and identify any outstanding bugs or errors.
            - The beta release should meet all the functional requirements.
        - After beta release changes are agreed upon, made, and tested, and a stable version is released.
            - The audience for the General Availability release is all users.
- Documentation
    - Software documentation 
        - Should be provided to both non-technical end-users and technical users.
    - System documentation 
        - Geared towards the technical user. 
            - Technical users may be other engineers, developers, or architects. 
        - System documentation explains how the software operates or how to use it. 
            - It consists of README files, inline comments, architecture and design documents, verification information, and maintenance guides.
    - User documentation
        - Provided to the non-technical end-users to assist them in the use of the product. 
            - Generally, user documentation is provided in the form of user guides, instructional videos and manuals, online help, and inline help.

### Requirements
- Requirement gathering is a six-step process of defining a problem to be solved and documenting how to go about solving that problem. 
    1. Identifying stakeholders
        - Generally, the stakeholders work for the organization that requests the development of the software product.
        - Key personnel from the organization may include,
            - Decision-makers
            - End-users
            - System administrators
            - Engineering
            - Marketing
            - Sales
            - Customer support personnel
        - It is good to have a representative from every group that the product affects.
    2. Establishing goals and objectives
        - The goals of the product should be clearly defined.
            - Goals are broad, long-term achievable outcomes.
            - Goals can include customer outcomes and business goals.
        - Then, objectives should be identified. 
            - Objectives are more specific than goals and they are actionable and measurable actions that achieve the stated goals.
    3. Eliciting requirements from the stakeholders
        - Elicitation can be accomplished through surveys, questionnaires, and interviews. 
    4. Documenting the requirements
        - As the requirements emerge, they should be documented and checked to ensure they align with the goals and objectives.
        - Documented requirements should be easily understood by stakeholders and the project team.
    5. Analyzing and confirming the requirements
        - In order to confirm the requirements, they should be analyzed to ensure consistency, clarity, and completeness.
        - After analysis, the requirements should be shared with and approved by the stakeholders.
    6. Prioritizing
        - After confirmation, requirements should be prioritized. 
        - Labels such as “must-have,” “highly desired,” and “nice to have” are helpful. 
        - If possible, order the requirements within those categories. 

### Requirements Documentation
- Typically, there may be three documents that result from the requirements gathering process:
  - Software requirements specification (SRS)
    - The software requirements specification, or SRS, is a document that captures the functionalities that the software should perform and also establishes benchmarks or service levels for its performance.
    - Parts of an SRS include:
      - A purpose statement that contains the intended use of the SRS
      - Its audience and scope
        - Describes who will have access to the SRS and how they should use it.
        - The scope describes the benefits of the software, its goals, and objectives.
      - Constraints, assumptions and dependencies
        - Constraints describe how the product must operate under given conditions that may limit options in the design phase such as conformation to standards or hardware limitations.
        - Assumptions may include things like a required operating system or hardware that is needed by the software to function.
        - Dependencies on other software products should also be noted.
      - Requirements
        - Functional requirements
          - Those that cover the functionalities of the software
        - External Interface requirements
          - The requirements that address the behavior of the software in relation to external entities such as users and interactions with other hardware or software
        - System Features
          - A subset of functional requirements.
          - These are required features for the system to function.
        - Non-functional requirements
          - Such as specifying performance, safety, security, and quality standards
  - User requirements specification (URS)
    - User requirements describe the business need and expectations of the end-users from the software system.
    - The user requirements are written as “user stories” or “use cases” that answer three questions:
      - Who is the user?
      - What is the function that needs to be performed?
      - Why does the user want this functionality?
    - User acceptance testing determines if these requirements have been met.
    - Often though, the user requirements and software requirements are combined into a single SRS document. 
      - The SRS details the expectations of the software system.
  - System requirements specification (SysRS)
    - SysRS, to differentiate it from the SRS, clearly outlines the requirements of an entire system. 
    - The system requirement specification is often used interchangeably with software requirement specification, but the SysRS is actually broader in scope than the SRS.
      - Many software projects develop an SRS rather than a SysRS.
    - The SysRS contains,
      - System capabilities
      - Interfaces and user characteristics
      - Policy requirements
      - Regulation requirements
      - Personnel requirements
      - Performance requirements
      - Security requirements
      - System acceptance criteria
    - It also outlines expectations of the hardware needed for the system in addition to software requirements.

## 7-2. Software Building Process

### Software Development Methodologies
- A specific methodology for developing software is commonly used in order to assist the development team to clarify communication among team members and determine how and when information is shared.
  - Waterfall
    - In the beginning, when the SDLC was conceived, it implemented what is known as the waterfall method.
    - Waterfall is a sequential method of software development where the output of one phase is the input for the next phase of the cycle.
      - Development and work on the next phase start only after the completion of the previous phase.
    - All planning, such as defining requirements and architectural design, is done up front.
      - The customer usually does not see the product until it is in the testing phase.
    - For a major version release of the product, the same process is repeated resulting in long intervals, such as years, between releases.
  - V-model
    - The V-shape model is named as such because the phases form the shape of a V.
      - The phases going down the left side of the V are called “verification".
      - Then, going up the right side of the V, those phases are called, "validation."
    - The V-shape model is like waterfall in that it is also sequential.
      - Each phase in verification corresponds with a validation phase.
    - There are four stages that occur on each side of the V. 
      - Going down the V are 
        - Planning
        - System design
        - Architecture design
        - Module design
      - The bottom of the V is the coding phase.
      - And going back up the V are four phases that correspond to the phases going down the V
        - Unit testing
        - Integration testing
        - System testing
        - Acceptance testing
      - The tests are written during the verification phases on the left and executed during the validation stages on the right.
  - Agile
    - It focuses on a collaborative software development process over multiple short cycles rather than a strictly top-down linear process.
      - Agile is what is called an iterative approach to development.
    - It still aligns with the SDLC, but each phase is short.
      - Teams work in cycles, or sprints, which are usually one to four weeks long.
      - Unit testing happens in each sprint to minimize the risk of failure.
    - Rather than the “maintenance” stage of the SDLC, the final stage of the sprint is a feedback stage.
    - At the end of each sprint, a chunk of working code is released at a meeting called the “sprint demo” where stakeholders can see the new functionality and provide feedback.
      - After the sprint demo, the entire process is repeated for every sprint cycle.
    - After several sprint cycles, a minimum viable product, or MVP, is developed so stakeholders can provide feedback on the basic feature set.
      - The MVP contains a feature set to validate assumptions about the software.
    - The four core values of Agile development outlined in what is known as the "Agile manifesto" are:
      - Individuals and interactions over processes and tools
      - Working software over comprehensive documentation
      - Customer collaboration over contract negotiation
      - Responding to change over following a plan
- The main difference between traditional SDLC methods such as waterfall and the v-shape model compared to the Agile method of software development is the former are sequential whereas Agile is cyclical.
  - Traditional SDLC methods, such as waterfall and V-shape, center around the whole product being developed before soliciting customer feedback, 
  - whereas Agile focuses on quick, short bursts of development.
- There are pros and cons to each method, though Agile is probably the most popular method used in modern software development.
  - Regarding the pros of the waterfall method, it is easy to understand and follow.
    - Each stage is discrete and well-defined, making it easy for all team members to understand their roles.
    - Also, since planning is done upfront, it is easier than iterative methods to estimate a budget and allocate resources.
    - That said, waterfall lacks flexibility.
    - Since all planning is done upfront if a requirement is changed or overlooked that change can be hard to incorporate at a later date.
    - Inevitably, unforeseen complications happen, or agreed upon functionality shifts from what was initially envisioned.
  - Like waterfall, the V-shape model is simple and easy to use.
    - It is even more rigid than waterfall but designing test plans during the verification phase saves considerable time during coding and validation phases.
    - Drawbacks are also similar to waterfall because it does not readily accommodate changing requirements.
    - Once an application is in the testing phase it is extremely difficult to go back and change functionality.
  - Agile development is different, relying on ongoing research, planning, and testing during product development.
    - When adding new features to a project, development still goes through the same phases as in traditional SDLC, but with Agile, new, and changing requirements are handled quickly and easily because planning is initiated at the beginning of each sprint cycle.
      - Most resources are spent on the building phase.
      - At the end of each cycle, the QA team, stakeholders, and the customer have some piece of working code to test against requirements and are encouraged to provide feedback.
    - As coding languages and technologies have developed in recent years, they now allow for modular design, where developers can focus on smaller chunks of code that are readily integrated into the larger product.
      - These small chunks can be released to provide the MVP.
    - Cons of Agile are that upfront planning such as budgeting and scheduling can be challenging because the overall scope of the product is not clearly defined.

### Software Versions
- Software versions tell us a lot about programs and applications.
  - Users can determine what software version they are using, and developers can provide useful information with version numbers.
  - Version numbers indicate when the software was released, when it was updated, and if any minor changes or patches were made to the software.
  - Software versioning is how software developers keep track of new software, updates, and patches for programs and applications.
- Software version numbers
  - Software version numbers vary in length and meaning; however, most version numbers follow a similar format and represent similar information.
    - Version numbers can be short or long, depending on the software and the preference of the developer, with 2, 3, or 4 number sets.
    - Each number set is divided by a period.
  - The first release of an application or program might have a 1.0 as the version number to indicate no updates, patches, or fixes to the software.
    - Note: A version still in beta or testing could have a version number lower than 1, such as 0.9.
  - A program or application with many releases and updates will have a longer number, sometimes 4 different number sets within the version number
  - Some software developers may use dates for their versioning.
    - For example: Ubuntu Linux version 18.04.2 was released in 2018 April.
    - The third number set, point-2, designates an additional change or update.
- Semantic numbering
  - Some version numbers follow the semantic numbering system and have 4 parts separated by a period, but not all numbering systems follow this 4-part example.
  - In semantic numbering, 
    - The first number indicates major changes to the software, such as a new release.
    - The second number indicates that minor changes were made to the software.
    - The third number in the version number indicates patches or minor bug fixes.
    - The fourth number indicates a build number or a build date, and it can indicate less significant changes made.
- Version compatibility
  - Lack of compatibility between old and new versions of software is a common problem.
  - You can troubleshoot compatibility issues by viewing the software version to determine if you are using an outdated version of the software.
    - Software version numbers are identified in the About or Help section of software.
      - You can practice identifying your version number in a web browser.
  - Sometimes updating software to a newer version will resolve compatibility issues.
    - Some software is backwards compatible.
    - If a program or application is backwards compatible, then the older versions of files, programs,and systems will work properly with newer versions. 

### Software Testing
- Software Testing is the practice of integrating quality checks throughout the software development cycle.
  - The purpose of testing is to check whether the software matches expected requirements and ensure error-free software.
    - Software testing helps evaluate the software to identify whether or not the software product meets requirements and is error-free.
- In order to test software, the team writes “test cases.”
  - These test cases are written to verify the functionality of a software application and ensure requirements have been satisfied.
    - Steps
    - Inputs
    - Data
    - Expected corresponding outputs
- Test cases can be written in different stages of the SDLC and may vary depending on the type of test or the method used to develop the software, such as Agile or waterfall.
  - Regardless of the test type or development method, test cases should always be written after requirements are finalized.

### Software Testing Types
- Functional testing
  - Functional testing usually involves black box testing which is a method of testing without looking at source code or internal structure.
  - Functional testing is only concerned with inputs and corresponding outputs of the system under test, also called the SUT. 
    - It is entirely based on testing functional requirements.
  - Functional testing can be carried out manually or using automated tools.
    - Functional testing tests the SUT, to make sure it meets functional requirements.
    - Functional testing makes certain that when user errors or input edge cases do occur, the software handles those exceptions seamlessly by displaying appropriate error messages.
  - The goal is to test the functionality of the application making sure the application is usable and accessible.
- Non-Functional testing
  - Non-functional testing includes testing the application for attributes like performance, security, scalability, and availability. 
  - Non-functional testing checks to see if the SUTs non-functional behavior is performing properly.
  - Non-functional testing should answer questions like the following:
    - How does the application behave under stress?
    - What happens when many users log in at the same time?
    - Are the instructions in documents and user manuals consistent with the application’s behavior?
    - Does the application behave similarly under different operating systems?
    - How does the application handle disaster recovery?
    - How secure is the application?
- Regression testing
  - Regression testing, also called maintenance testing, confirms that a recent change to the application, such as a bug fix, does not adversely affect already existing functionality.
    - Regression testing should occur when there has been a change in requirements or when defects have been fixed.
  - In order to conduct regression testing, all or some of the test cases should be selected to test against the application. 
    - Regression test case selection and prioritization can be challenging and can depend on several factors.
    - Common reasons for regression test case selection include cases that:
      - have frequent defects
      - contain frequently used functionality
      - contain features with recent changes
      - complex test cases
      - edge cases
      - randomly successful or failed test cases

### Software Testing Levels      
- Unit testing
  - Unit testing refers to tests that verify the functionality of a specific section of code, usually at the function level.
    - It is performed by the software developer or engineer during the development phase of the software development life cycle.
  - Unit testing aims to eliminate construction errors before code is integrated with other modules. 
  - Unit testing is intended to increase the quality of the resulting software as well as the efficiency of the overall development process.
- Integration testing
  - Integration testing seeks to identify errors when two or more smaller, independent code modules are combined.
    - Integration testing is another type of black-box testing.
  - Prior to integration testing, smaller, independent code modules that passed unit testing are incorporated into the larger software application.
    - After modules are integrated together, then integration testing can occur.
  - Integration testing exposes bugs that occur when those smaller units of code interact with each other.
  - Integration testing uncovers deficiencies in communication with a new module in conjunction with other existing modules, databases, or external hardware. 
  - Integration testing uncovers situations where bugs develop due to differing programming logic between modules, for instance. 
    - Also, sometimes during module development, requirements change, and the module isn’t fully unit tested. 
      - Poor exception handling can cause problems when modules are integrated together.
    - System testing occurs after integration testing and is conducted on a complete, integrated system to evaluate the system's compliance with its specified requirements.
      - It validates the system as a fully completed software product.
- System testing
  - System testing is both functional and non-functional.
  - System testing is done in a staging environment, which should be similar to the production environment.
- Acceptance testing
  - Acceptance testing is formal testing with respect to user needs, requirements, and business processes. 
  - It determines whether a system satisfies the needs of the users, customers, and other stakeholders. 
  - Acceptance testing is usually done by the customer or the stakeholders during the maintenance stage of the SDLC.
- Each level occurs at a different time in the SDLC. 
  - There are 4 different levels in order to reduce the amount of time spent on testing by preventing overlap. 

### Software Documentation
- Software documentation is information about the software that describes what the product is and how to use it. 
  - These can be written, video, or graphical assets associated with a software product’s development and use.
    - Documentation can be in any of these three formats.
- Documentation is an essential aspect of software engineering applicable across all the phases of SDLC.
  - Software Documentation can be written for different types of audiences – such as end users, software developers, QA engineers, system administrators and other stakeholders.
- Documentation, in any form, must be kept up to date. 
  - Take for instance online user manuals. If a cloud-based application user interface changes, then the accompanying online documentation must be updated accordingly. 
    - Businesses need to ensure they allot resources for this step.
  - With regards to the software development and the SDLC, updating documentation happens during the maintenance phase.
    - Ideally, documentation should also be reviewed periodically to ensure its accuracy. 
- There are two types of documentation.
  - Product documentation relates to the product’s functionality.
  - Process documentation describes how to complete a task.
    - Process documentation should provide the requirements for the quality implementation of a business process.

### Software Documentation Types
- Product documentation
  - Requirements documentation
    - Requirements documentation is written during the planning phase of the SDLC and is intended for the development team including the developers, architects, and QA personnel.
    - Requirements documentation describes the expected features and functionality of the software system.
      - It includes the software requirements specifications, system requirement specifications, and user acceptance specifications.
  - Design documentation
    - Design documentation is written by the software architects and the development team to explain how the software will be built to meet the requirements.
      - It consists of both conceptual and technical design documents.
  - Technical documentation
    - Technical documentation includes comments written in the code to help other developers read the code to understand its behavior. 
    - It also may include working papers that explain how the code works and documents that record engineers’ ideas and thoughts during project implementation.
  - Quality assurance documentation
    - Quality assurance documentation includes all documents that pertain to a testing team’s strategy, progress, and metrics.
    - Types of test documentation include test plans, test data, test scenarios, test cases, test strategies, and traceability matrices. 
      - Traceability matrices map test cases to their requirements.
  - User documentation documentation
    - User documentation is intended for end-users and explains how to operate the software or help them to install or troubleshoot the system.
      - End-user documentation includes frequently asked questions, installation and help guides, tutorials, and user manuals.
- Process documentation    
  - Standard operating procedures
    - SOPs often accompany process documentation.
      - Process documentation provides an overview of a process, but SOPs go through much greater detail. 
      - The SOP is written documentation that explains step-by-step how to accomplish a common, yet complex task that is organization specific. 
    - For example, checking in code using a code repository is common knowledge for a software engineer.
      - However, an organization might have specific steps to follow for that organization in order to get code merged into the main branch.
        - The SOP documentation explains those steps in detail. 
    - SOPs can be in the form of a flowchart, a hierarchical outline, or step-by-step instructions.

## 7-3. Software Architecture
- Software design and documentation take place during the design phase of the SDLC.
- Software architecture, simply put, is the organization of the system.
  - Software architecture serves as a blueprint for the software system that the programmers use to develop the interacting components of the software.
    - The architecture comprises the fundamental structures of a software system and explains the behavior of that system.
    - The architecture defines how components should interact with each other, the operating environment, and the principles used to design the software.
- The software architecture captures early design decisions that are often costly to change once implemented.
  - A software’s architecture addresses non-functional aspects of the application such as performance, scalability, maintainability, interoperability, security, and manageability.
- Importance
  1. It balances the differing needs of the stakeholders and serves as a basis for communication among team members.
  2. The architecture represents the earliest design decisions, and those decisions conflate other coding implementation decisions later in the development process.
  3. The well-designed architecture allows for agility due to changing requirements.
  4. A well-organized architecture increases the lifespan of the software system even when implementation details change.
- Architectural design also guides the choice of technology stacks used for the system.
  - Remember that architecture addresses non-functional capabilities so choosing stacks that address these requirements is paramount in the design phase.
    - Recall that a tech stack is a list of all the technologies including software, programming languages, libraries, and frameworks that will be used to create the system.
  - The architects must be aware of the stack’s advantages and disadvantages to anticipate development needs.
- Production Deployment Considerations
  - The architecture drives choices about the environment in which the software is released.
  - The production environment is comprised of the infrastructure that runs and delivers the application to the end-user such as the servers, load balancers, and databases.

### Architectural Design Artifacts
- Much like blueprints communicate design decisions to the builders of a house, there are also several artifacts produced during the architectural design phase that are used to communicate the software design to the stakeholders.
  - A software design document, or SDD
    - The SDD is a collection of technical specifications that indicate how the design should be implemented.
    - It provides a functional description of the software and design considerations such as assumptions, dependencies, constraints, requirements, objectives, and methodologies.
  - An architectural diagram
    - The architectural diagram displays components, their interactions, their constraints, and their confines.
    - It displays the architectural patterns used in the design.
      - Architectural patterns are general, reusable solutions to commonly occurring problems
  - Unified modeling language, or UML Diagrams
    - UML diagrams are diagrams that communicate structure and behavior using common programming language agnostic notation.
  
### Software Design
- Software Design is a process during which structural components and behavioral attributes of the software are documented before it can be developed.
  - One of the key activities of the design process is modeling the software to express its design.
    - This involves creating visual or diagrammatic representations of the bigger software solution, and its sub-components, as well as the interactions between them.
    - This can be done using simple flowcharts or more standardized methods like UML.
- A software system can be construed in terms of structural elements. 
  - Structured design conceptualizes a software problem into well-organized smaller solution elements called modules and sub-modules.
  - Structured design stresses organization in order to achieve a solution. 
  - A well-structured design should contain modules that are cohesive and loosely coupled.
    - Cohesion means that all functionally related elements are grouped together.
    - Coupling is the communication between different modules. 
      - For a system to be loosely coupled the modules should be weakly associated so changes in one component have minimal effect on another. 
      - Loose coupling is an architectural principle often used in service-oriented architectures and microservices based architectural patterns.
- The diagram shows a simplified example billing system. 
  ```
       [Services rendered] → (services rendered) →     [   Billing   ]    → (total owed) → [Output total]
                                                 🡗            ↑
                             (services rendered)   (amount insurance paid)
                           🡗                                  ↑
  [Insurance verification] → (services rendered) →     [ Submit claim ]
  ```
  - Modules are arranged in a hierarchy and communicate with each other.
  - The rectangles represent the modules and sub-modules.
    - You can see that “billing” is the main module, and the other rectangles are sub-modules to the main billing module. 
    - In this example the sub-modules are “insurance verification,” “submit claim,” and “output total.”
  - The arrows represent the flow of the data in the system.
- Behavioral models
  - It describes what a system does, without explaining how it does it.
  - The overall behavior of a system can be communicated through behavioral models.
  - There are a number of different UML diagrams that can be used to communicate the behavior of a system. 
    - State transition diagram
    - Interaction diagram

### UML Diagrams
- When developing a complex software system with interconnected modules, it can be difficult to remember the relationships, behaviors, and hierarchies among different elements.
- UML, which stands for Unified Modeling Language, is a way to visually represent the architecture, design, and implementation of complex software systems. 
  - UML is a standardized modeling language that can be used throughout development processes.
- UML is programming language agnostic, so software developers can readily interpret and apply it to their work no matter which language they are developing in.
- Advantages
  - They allow you to plan out features before any coding takes place which saves time and money. 
  - The diagrams can be used to bring new team members or developers switching teams to get up to speed quickly.
  - The diagrams can be used to facilitate communication between technical and non-technical audiences more easily.
  - Having a visual representation of the system allows developers to navigate the source code because they can see the relationships among modules. 
- Classes
  - Structural UML Diagram
    - Refer to the next Object-oriented Analysis and Design section for details.
  - Behavioral UML Diagram
    - State Transition Diagram 
      - The behavior of a system can be explained and represented with the help of a UML diagram called a state transition diagram.
      - The state transition diagram is a collection of states and events that describes the different states that a system has and the events which cause a change of state in the system.
      - The diagram shown is an example of a state transition diagram that models a patient going to see a doctor at a clinic. 
        ```
            ♦ → /start                         /start
                patient check-in → [Waiting] → called for testing → [Testing]
                                 🡗                                🡗     🡓 
                /start                                   result       result
                called to see doctor                    positive     negative
              🡗                                      🡗
        [With the doctor]  ← yes ←  [Is Dr. ready?]
        ```
        - The different states include “waiting,” “testing,” and “with the doctor.”
        - The arrows represent possible transitions from one state to another and names the event that triggers the transition.
      - Interaction Diagram
        - An interaction diagram is used to model the dynamic nature of a software system. 
        - They help visualize objects and their relationships. 
        - A sequence diagram, which is the type of interaction diagram shown here, displays the communication between objects with respect to time. 
          ```
             [User]       [Appointment] [Server]
          1. Select             |           | 
             doctor  →→→        |           |
                                |           |
          2. Offer              |           |
             times   ←←←        |           |
                                |           |
          3. Submit          Submit         |
             appt.   →→→     appt.     →→→  |
                                |           |
          4. Confirm         Confirm        |
             appt.   ←←←     appt.     ←←←  |
          ```
            - This example shows a patient making an appointment in an online portal.
                - This is another example of a behavioral UML diagram.

### Object-oriented Analysis and Design
- Object-oriented analysis and design, or OOAD for short, is an approach for analyzing and designing a software system when the system will use object-oriented programming languages to develop it.
  - At the heart of OOAD are objects. 
    - Objects contain data, and they also have behaviors that prescribe the actions the object can take.
- e.g. A patient named Naya Patel. Naya needs to cancel an appointment she made.
    1. Before creating Naya object, we must first create a generic version of a patient object.
        ```
        Patient
        -------
        - AccountNumber
        - LastName
        -------
        - MakeAppointment()
        - CancelAppointment()
        ```
        - The generic version of an object is called a “class”.
        - Specific objects, also called instances, are created from “classes” which are blueprints or templates for an object.
            - Considering Naya Patel, Naya would be an instance of the patient class.
        - The class contains the object’s generic attributes – the properties and methods.
            - But it is only when the object is created, which is called “instantiation,” inside the code that these generic attributes are set to particular values.
            - So, the patient class might have a variable called LastName, which is a property but does not specify what that last name is.
                - LastName is just a placeholder until that object is created and assigned a name.
    2. Once the object has been instantiated its methods can be called to make the object perform some action such as making or canceling an appointment.
- OOAD is used for a system that can be broken down into objects that interact with each other.
  - In this way, multiple developers can work on different aspects of the application at the same time.
- OOAD-based Structural UML diagram 
  - Class diagram
    ```
                        [Medical personnel]
                        - Name
                        - Address
                        - Employee ID
                    🡗           ↓           🡖
    [Nurse]             [Doctor]                [X-ray Technician]
    - callPatient()     - makeDiagnosis()       - takeXRay()
    - TakeVitals        - getTestResults()
                                ↓  
                        [Specialist]
                        - Specialty
    ```
      - Class diagrams are commonly used to communicate a software system’s structure in OOAD.
        - The class diagram shows how the classes in an object-oriented design relate to one another.
        - Each box represents a class and shows its attributes.
          - Recall that an object’s attributes are both its properties or its data, and its available actions, called methods.
        - A class diagram also shows the relationships between classes.
      - A subclass is said to “inherit” its parent class attributes meaning it has the same properties and methods as the parent class but also may add additional properties and methods.
      - In this diagram, the nurse, doctor, and technician classes are subclasses of medical personnel, and the specialist class is a subclass of the doctor class.
        - This means that doctors can do anything medical personnel can do and specialists can do anything a doctor can do.

### Approaches to Application Architecture
- Component
  - A component is an individual unit of encapsulated functionality that serves as a part of an application in conjunction with other components.
  - Components should be,
    - Reusable
      - Components should be designed such that they can be reused in different applications.
    - Replaceable
      - Component should be easily replaced with another component.
    - Independent
      - Component should be designed so it doesn’t have dependencies on other components.
    - Extensible
      - The ability to add behavior to a component without changing other components.
    - Encapsulated
      - Bundling a component’s data and methods to hide its internal state, so it doesn’t expose its specific implementation.
    - Non-context specific. 
      - Designing it to operate in different environments.  
      - Data that sets its internal state should be passed to the component rather than included within or accessed by the component.
  - Examples
    - API
      - An API can be packaged as a component, if it can be reused across multiple systems and applications.
        - For instance, a component could be an open-source API that connects a system to a particular database.
    - Data Access Object
      - A component can also be the interface for a database, called a data access object, that switches the user to a different database without the application knowing about the switch.
    - Controller
      - A controller is a type of component that determines which other components need to be called for a particular event. 
      - It controls the flow of data between two other components.
  - Component-based architecture
    - Component-based architecture focuses on the decomposition of the design into these logical components.
    - Component-based architecture provides a higher level of abstraction than object-oriented designs.
    - Component-based architecture should define, compose, and implement loosely coupled independent components so they work together to create an application.
- Service
  - A service is like a component, also a unit of functionality, but it is designed to be deployed independently and reused by multiple systems.
    - A service focuses on a solution to a business need.
  - A key difference between a component and a service is that a service will only have one unique, always running instance with whom multiple clients communicate. 
  ```
       Service Layer             ↓[SERVICE]↑
                      ----------------------------------
     Component Layer    ↔[COMPONENT1]   [COMPONENT2]↔
                      ----------------------------------
  Object/Class Layer             ┌ [CLASS] ┐
                             [OBJECT]   [OBJECT]
  ```
    - This diagram displays the relationship between objects, components, and services in a layered architecture.
      - A service is a type of component. 
        - Services are made of components and components consist of objects.
        - It is meant to be deployed independently of the overall system.
          - Examples of services include:
            - checking a customer’s credit
            - calculating a monthly loan payment
            - processing a mortgage application.
  - Service-oriented architecture
    - In a service-oriented architecture, or SOA, services are loosely coupled and interface with each other via a communication protocol over a network.
    - SOA supports building distributed systems that deliver services to other applications through the communication protocol. 
- Distributed system
  - System with multiple services located on different machines that coordinate interactions by passing messages to each other via a communication protocol such as hypertext transfer protocol, also known as HTTP. 
    - Even though the services on a distributed system operate on multiple machines, a distributed system appears to the end-user as a single coherent system.
  - A distributed system shares resources such as hardware, software, and data.
  - They are fault-tolerant, meaning if a node or a service fails the system continues to run
    - Also implying that the system may change during execution without service interruption.
  - Multiple activities run concurrently on a distributed system reducing latency and increasing throughput.
  - They are scalable as the number of users increases. 
    - The computers running the distributed system do not need to use the same kind of hardware or operating systems.
    - A distributed system may be made up of different kinds of computers and programming languages.
  - A node is any device on a network that can recognize, process, and transmit data to other nodes on the network.
    - A distributed system consists of multiple interconnected nodes where the nodes are running one or more services in an SOA.
  - Distributed systems generally use one or more of the following basic types of architecture:
    - client-server
    - three-tier
    - peer-to-peer 
    - microservices

### Architectural Patterns
- An architectural pattern is a repeatable solution to a problem in software architecture.
  - Patterns highlight common internal elements and structures of a software system.
  - Different architecture patterns may share related characteristics.
- Examples
  - 2-tier
    - The 2-tier architecture, also called client-server, is a computing model in which the server hosts, delivers, and manages most of the resources and services delivered to the client.
    - The interface resides on the client machine and makes requests to a server for data or services.
    - This type of architecture usually has more than one client computer connected to a server component over a network connection.
    - Examples
      - A text messaging app
        - The client initiates a request to send a text message through a server and the server responds by sending that message to another different client.
      - Database clients connecting with database servers.
  - 3-tier
    - A 3-tier architecture, or an n-tier architecture when there are more than three layers, is the most common software architecture.
    - The 3-tier architecture is composed of separate horizontal tiers that function together as a single unit of software.
    - A tier only communicates with other tiers located directly above and below it.
      - Related components are placed within the same tier.
      - Changes in one tier do not affect the other tier.
    - The 3-tier architecture organizes applications into three logical and physical computing tiers
      - Presentation tier
        - user interface tier
      - Application tier
        - where business logic is processed
      - Data tier
        - where the data is stored and managed
    - Examples
      - Web apps
        - They use a web server to provide the user interface, an application server to process user inputs, and a database server that handles data management.
  - Peer-to-peer
    - The peer-to-peer architecture, or P2P for short, consists of a decentralized network of nodes that are both clients and servers.
    - The workload is partitioned among these nodes.
      - Peers make a portion of their resources directly available to other network participants, without the need for central coordination by servers.
        - Resources are things like processing power, disk storage, or network bandwidth.
      - Peers both supply and consume resources, in contrast to the traditional client-server architecture in which the consumption happens strictly by the client and the servers, supply the resources.
    - Peer-to-peer architecture is useful for file sharing, instant messaging, collaboration, and high-performance computing.
    - Example
      - Cryptocurrencies such as Bitcoin and Ethereum use a peer-to-peer pattern.
        - Each computer in the blockchain acts as both server and client.
  - Event-driven
    - An event is anything that results in a change of state.
      - An event can be thought of as an action that is triggered by the end-user, such as a mouse click, or another part of the program.
    - Event-driven architecture focuses on producers and consumers of events.
      1. Producers listen for and react to triggers while consumers process an event.
      2. The producer publishes the event to an event router.
      3. The router determines which consumer to push the event to.
      4. The triggering event generates a message, called an event notification, to the consumer which is listening for the event.
    - The components in event-driven architectures are loosely coupled making the pattern appropriate for use with modern, distributed systems.
    - Examples 
      - Ride-sharing apps such as Lyft and Uber are examples of event-driven patterns.
        - The customer sends a notification that they need a ride from a particular location to another location, and that event is routed to a consumer.
  - Microservices
    - Microservices are an approach to building an application that breaks its functionality into modular components called services.
    - An application programming interface, also called an API, is the part of an application that communicates with other applications.
      - An API defines how two applications share and modify each other’s data.
      - APIs can be used to create a microservices-based architecture.
        - The API Gateway routes the API from the client to a service.
        - Orchestration handles communication between services.
    - Examples
      - Social media sites are composed of microservices.
        - A user has an account.
          - That account can request different services such as adding friends, targeted ad recommendations, and displaying content.
  - Model-view-controller (MVC)
  - Message-broker
  - Blackboard
  - Pipe-filter
  - Controller-responder
- Architectural patterns are not necessarily mutually exclusive.
  - In other words, two or more of these patterns can be combined.
  - For instance, a three-tiered architecture can also be microservice-based, or a peer-to-peer architecture can also be event-driven.
- However, not all architectural patterns can be used in conjunction with others.
  - A peer-to-peer cannot also be two-tier because a single machine in a peer-to-peer architecture represents both a client and a server whereas a two-tier architecture separates the client from the server.
- It is up to the system architect to determine which architectural patterns the software
system should adhere to.

### Application Deployment Environments
- An application environment is the combination of the hardware and software resources required to run an application. This includes: 
    - The application code and/or binary executables for its various components or modules
    - The software stack it requires for running the application such as modules and libraries it depends on, third party applications and middleware, and the operating system,
    - Any networking components and infrastructure, as well as any physical or virtual hardware including computing or processing resources, memory, and storage.
- Environment types depending on the application’s stage in the lifecycle are,
    - Pre-production environments 
        - Those platforms that the application resides on in various forms as it gets prepared for production. 
        - Common pre-production environments are “development,” “QA,” which stands for quality assurance, and “staging.”
            - The development environment is the platform on which the application is being actively coded, and in many cases it may just be the developer's workstation.
            - The QA environment, sometimes called “testing” is the environment that allows the QA team to test the application’s components.
            - The staging environment is the environment that is as close to replicating the production environment as possible but is not meant for general users. 
    - Production environments
        - Often just called “production” includes the entire solution stack consisting of both hardware and software on which the application runs as additional infrastructure components.
        - The production environment is intended for all users.
        - Unlike the pre-production environments, this robust environment must take the application “load” into consideration,
            - Because it is the environment intended for general use, possibly by thousands or millions of people at the same time for enterprise-level applications.
        - Production environments must also take into account non-functional requirements like security, reliability, and scalability.
            - This makes the production environment more complicated than the pre-production ones.
- Infrastructure
    - On-premise
        - In on-premises deployment, the system and its infrastructure reside in-house, within the organization’s physical location, often behind a firewall. 
            - Firewalls prevent unauthorized access to or from a private network.
        - If an organization desires greater security or control of an application and the data in use by that application, it may deploy the application on-premises.
        - For on-premises software deployments, an organization is responsible for the system, hardware, related infrastructure, and maintenance required to run the application.
        - On-premises deployment is usually more expensive when compared to cloud deployment. 
    - Cloud deployments
        - Public cloud 
            - when you leverage the software’s supporting infrastructure over the open internet on hardware owned by the cloud provider. 
                - That hardware and the associated services are shared with other companies. 
                - Public cloud providers include Amazon Web Services (AWS), Microsoft Azure, Google Cloud Platform, and IBM Cloud. 
                - The public cloud is the most common due to its scalability and cost.
        - Private cloud
            - The cloud infrastructure is provisioned for exclusive use by a single organization. 
                - The software system can be run on-premises, or the infrastructure could be owned, managed, and operated by a service provider. 
                    - For example, AWS is also a private cloud service provider. 
                - The main advantage of a private cloud is increased security, but it also allows for more flexibility because it can be fully customized.
        - Hybrid cloud
            - A mix of both public and private clouds, working together seamlessly
            - A hybrid cloud potentially optimizes the advantages of both public and private cloud models with regard to cost, security, scalability, and flexibility. 

### Production Deployment Components
- Let’s consider an n-tier architecture required to deploy an application in a production environment and represent the infrastructure using a diagram.
    ```
    Presentation Tier            [USER/CLIENT APP]         
                        -----------------------------------
             Web Tier           [WEB LOAD BALANCER]
                              🡗          ↓          🡖   
                         [SERVER1]   [SERVER2]   [SERVER3]
                        -----------------------------------
             App Tier           [APP LOAD BALANCER]
                               🡗                   🡖
                         [APP SERVER 1]     [APP SERVER 2]
                        -----------------------------------
              DB Tier            [DATABASE SERVER]         
                                         ↕
                            [HIGH-AVAILABILITY REPLICA]    
    ```
    - The top tier is the presentation tier which contains the front-end client applications.
        - All of the other tiers are located behind a firewall.
    - The next tier is the web tier which has a web load balancer that distributes incoming traffic to several web servers.
    - The tier below the web tier is the application server tier.
        - This tier contains an app load balancer or a proxy server that routes traffic to different application servers.
    - The bottom tier is the data tier that contains the database server.
        - A high availability replica of the database is often also used to ensure reliability.
    - Some environments may have additional components or tiers.
        - Also not all of these components are necessary for every deployment. 
            - For example, in some environments there might not be a need for both application servers in addition to web servers.
- Now, let’s look at these components in further detail.
    - A firewall is a security device that monitors traffic between networks.
        - It permits or blocks requested data based on a set of security rules.
        - It acts as a barrier between networks to block viruses, malware, and hackers from accessing the internal network.
    - The purpose of load balancers is to distribute network traffic efficiently amongst multiple servers, called a server farm, on a network.
        - Load balancers are used to prevent server traffic overload and are located between clients and the servers.
        - A load balancer determines which servers are capable of fulfilling those requirements in a manner that maximizes availability and responsiveness.
        - Load balancers ensure that no one server is overworked.
        - They manage concurrent requests from clients and return the correct data in a fast and reliable manner.
    - Web and application servers are either software or machines that provides services, resources, data, or applications to another computer program, called the client. 
        - Servers store, process, and manage network data, devices, and systems.
        - A web server delivers content such as web pages, files, images, and videos to a client.
            - A web server primarily responds to hypertext transfer protocol requests coming from a web browser such as a user accessing a website.
        - An app server is a server that runs business logic and provides the application to the client rather than the client running the app on their own machine.
            - Its primary job is to enable interaction between the end-user and the server-side application code. 
            - The application code represents the business logic that determines how data can be created, stored, and changed.
                - That logic dictates things like transaction results and what data is written to and retrieved from a database.
    - A proxy server is an intermediate server that sits in between two tiers and handles requests between those tiers.
        - A proxy server can serve multiple purposes such as load balancing, system optimization, caching, acting as a firewall, obscuring the source of the request, encryption, scanning for malware, and more.
        - A proxy server can improve the efficiency, privacy, and security of data flowing through a network.
    - A database is a collection of related data, stored on a computer that can be accessed in various ways.
        - A database is usually controlled by software called a database management system or DBMS.
            - The DBMS controls a database by connecting the database to users or other programs.
    - The database server controls the flow and storage of data.
        - The DBMS connects the database server to an application so data stored in the database can be retrieved or manipulated by the application.
