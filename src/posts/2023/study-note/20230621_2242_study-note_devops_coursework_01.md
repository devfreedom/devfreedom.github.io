---
title: "[Study Note] Coursework: DevOps and Software Engineering - DevOps"
date: 2023-06-21T22:42
thumb: "devops.jpg"
tags: 
    - ❮Study Note❯
    - DevOps
    - software engineering
    - cloud computing
    - web development
---

# 1. DevOps 101

## 1-1. What is DevOps?

DevOps is primarily a recognition that Dev and Ops must work together during the entire development life cycle.

- Dimensions of DevOps 
    - Culture (most important)
        - Stop working in silos, just work together
    - Method
    - Tools

- Essential characteristics of DevOps 
    - Cultural change
    - Automated pipelines
    - Infrastructure as code
    - Microservices
    - Containers
    - Immutable infrastructure

- Working DevOps means pushing small releases faster in order to gain feedback, minimize risk, and maximize learning.
    - Working in small batches reduces waste and means quickly delivering something useful to the customer. 

- Social coding is coding as a community and public repositories and pair programming result in higher code quality. 

## 1-2. Approaches

### Taylorism vs. Craftwork
- Taylorism is about applying science to management.
    - In Taylorism, organizations be divided into independent functional silos.
    - Taylorism was designed for factory work, while software development is like craftwork.
- To be DevOps, teams must stop working in silos and work together with a common goal.
    - Handoffs created by working in silos results in mistakes, bottlenecks, and delays.
        
### Civil Engineering vs. Software Engineering
- Software development is often viewed as a project to be completed and then passed on to operations to maintain.
    - We continue to treat software engineering as if it were a civil engineering project.
        - The project model is fundamentally flawed as a way of doing software development.
        - When a project is complete and people move on, there is no ownership. 
        - This is not the way to create great software.
- In DevOps, we want stable, long-lasting team membership with end-to-end ownership. 
    - Software engineering and the behavior of the system are constantly changing.
    - Team ownership and stable teams make software development more like product development and less like project management. 

### Traditional Ops vs. DevOps
- Enterprises see change as complex and time-consuming.
    - Traditional Ops "builds once" and maintains.
- DevOps breaks big projects into a series of small, manageable changes.
    - Ephemeral infrastructure is created for each new deployment.
    - Dev wants innovation, while Ops wants stability. 
- Required DevOps behaviors include shared ownership, collaboration, embracing change, and data-driven responses. 

### Organizational Impact of DevOps
- Agile is a fundamental tenet of DevOps.
    - "Is the culture of my organization truly embracing the Agile mindset?"
        - Agile teams must be small. 
            - Make it small.
        - Agile teams should be dedicated.
            - You can’t have people committed to several projects and expect all of those projects to move at the same speed, or for your people to remain focused on any one project for too long. 
        - Agile teams should be cross-functional.
            - “development team” includes all of the people responsible for developing the product. 
            - This means software engineers, test engineers, operations engineers, business analysts, whatever it takes. 
            - These people need to be on the same team and not working in silos getting each other’s attention through ticketing systems. 
        - Agile teams need to be self-organized.
            - They commit to work one sprint at a time.
- Conway's Law
    - "Any organization that designs a system (defined broadly) will produce a design whose structure is a copy of the organization's communication structure."
- Successful DevOps teams should be organized around business domains.
    - Each team should have a mission that aligns with a business domain. 
- The organizational objective of DevOps is to attain a shared mindset and empower everyone to deliver customer value. 
    - Actions without consequences can lead to apathy. 

### There is no DevOps "Team"
- DevOps is a mindset that the whole organization adopts.
    - DevOps is not a job title, but cultural transformation on an organizational scale.
        - Having a seperate DevOps team is an antipattern, it rather seperates Dev and Ops.
    - DevOps solves the problems caused by siloed teams.
        - When people work in silos they do not see or feel the effect of their poor work.
- DevOps is the practice of development and operations engineers working together during the entire software lifecycle, following Lean and Agile principles that allow them to deliver high-quality results. 

## 1-3. Methodologies

### Test-driven Development (TDD)
- TDD means test case drives the design and development of code.
- TDD allows you to develop faster and with more confidence.
- The Red, Green, Refactor workflow has to do with red as a fail and green as a pass, and it increases the quality of the code.
    - In order to create a DevOps CI/CD pipeline, you must first automate your testing unless you want to push bugs to production faster.

### Behavior-driven Development (BDD)
- BDD focuses on the behavior of the system from the outside in.
    - It looks at the system as a consumer of it.
- BDD uses an approachable syntax that everyone can understand.
- Key benefits of BDD include improvement in communications, a common syntax, and acceptance
criteria for user stories. 
- Gherkin 
    - A business readable language which helps you to describe business behavior without going into details of implementation.
        - It is a domain specific language for defining tests in Cucumber format for specifications. 
        - It uses plain language to describe use cases and allows users to remove logic details from behavior tests.
        - The text in Gherkin langauge acts as documentation and skeleton of your automated tests. 
        - Gherkin format is based on TreeTop Grammar which exists in 37+ languages.
    - Primary purpose
        - Documents user scenarios
        - Writing an automated test (BDD)

### Minimum Viable Product (MVP)
- Minimum viable product is as much about delivery as it is about building what the customer really desires.
    - An MVP is the minimal thing that you can do to test your hypothesis. 
    - An MVP is not about delivery as much as it is about learning.
        - It's okay if the MVP fails — make sure that you learn from it. 

### Cloud Native Microservices
- Microservices are loosely coupled and independently deployable, smaller components or services, designed for scalability and communicate with APIs. 
    - Microservices breakdown large applications into their core functions.
        - Application components can be developed and updated more efficiently by multiple developers working independently.
    - Teams can use different stacks and runtime environments for different components.
    - Components facing too much load can be scaled independently, reducing the waste and cost associated with having to scale entire applications.
- Stateless microservices each maintain their own state in a separate database or persistent object-store.
- Microservices are built around business capabilities and are independently deployable by fully automated deployment machinery.  
- Cloud native architecture is a collection of independently deployable microservices.
    - A container is the distribution method for each microservice, meaning it delivers the code where it needs to go.
        - Containers are plug-and-play, so if one microservice isn’t working for an application, developers can take it out and put in a different one without disrupting how the rest of the app functions.
    - Resilience through horizontal scaling
    - Failing instances are killed and respawned.

### Designing For Failure
- Failure is inevitable, so we design for failure rather than trying to avoid failure.
- Developers need to build in resilience to be able to recover quickly.
    - Retry patterns work by retrying failed operations.
    - Circuit breaker patterns are designed to avoid cascading failures.
        - Circuit breaker patterns trip once failures reach a certain limit or threshold. It detects a problem and avoids cascading failures.
    - Bulkhead patterns can be used to isolate failing services to limit the scope of failure.
        - Separate thread pools help recovery by directing traffic to active connection pools.
    - Monkey testing is deliberately killing services for testing.
    - Chaos engineering is deliberately causing services to fail to see how other services
    are affected. 

### Infrastructure-as-code
- Infrastructure as code describes infrastructure in an executable textual format.
    - Ephemeral infrastructure can be used and then discarded.
        - Because servers are built on demand, via automation.
    - Rather than patching a running container, immutable delivery is making changes to the container image, then redeploying a new container. 
- Configuration management systems
    - These are tools like Ansible, Puppet, and Chef that allow you to describe your infrastructure as code, and then they create that infrastructure and keep it in that state. 
- Technology like Docker, Vagrant, Terraform, and even Kubernetes, also allow you to describe your infrastructure as code, and this code should be checked into version control.
- Server drift is a major source of failure. 
    - Servers get updated for various reasons, and not always by the same people. 
        - This causes them to drift from their original configuration.
        - Sometimes the accumulation of these changes cause failures in unpredictable ways.
    - "Servers are cattle, not pets."

### CI/CD
- Continuous Integration (CI)
    - The process of continuously building, testing, and integrating every developer change into the master branch after a set of tests have passed. 
        - The result is potentially deployable code. 
    - CI reduces the risk of integrating code because you are integrating smaller changes.
        - Working in small batches aids continuous integration by reducing the number of conflicting changes.
    - Benefits include faster reaction time, moving faster, and reducing the risk of integrating code. 
    - Most CI tools like Travis CI, Circle CI, Jenkins, and GitHub Actions have the capability to monitor your version control system for changes as well as automate the build process.
- Continuous Delivery (CD)
    - A series of practices designed to ensure that code can be rapidly and safely deployed to production by delivering every change to a production-like environment.
        - “production-like" means it doesn’t have to be deployed into production. 
            - It doesn’t have to be the actual production environment, but it should be enough like it so that the same procedure can be used to deploy to production. 
        - Many people reserve the term “Continuous Deployment” for when you are deploying continuously to production. 
    - e.g. If the production environment is containers running on Kubernetes, you should deploy to a development environment in containers on Kubernetes.
    - CD key Principles
        - Built in quality
            - The CI/CD pipeline comes into play here, because it allows every code change to go through a set of rigorous checks to ensure high code quality.
        - Working in small batches
            - Smaller changes are easier to test and represent less risk of something getting broken.
        - Automate the repetitive tasks using computers
            - and then leave the problem solving to the people. 
        - Relentlessly pursue continuous improvement.
            - we need to measure, using actionable measurements, and then take action when the measurement shows what we can improve.
        - Everyone be responsible

### CI/CD pipeline
- CI (plan, code, build, test) + CD (release, deploy, operate)
    - There are automated gates that create a pipeline of checks such as unit testing, integration testing, quality checks, vulnerability scans, and security tests, to ensure the quality of the code. 
- DevOps manages risk by increasing the rate of change rather than avoiding change.
    - In DevOps, deployment is king, deployment should be painless. You want to deploy early and often.
- After CI/CD, when we use automation to deploy to production, then it is referred to as continuous deployment. 
    - The term "Continuous Deployment" is reserved for actual deploying to production

## 1-4. Measuring DevOps
 - DevOps changes the objective of problem resolution from "failure prevention" to "failure recovery".
    - We used to measure mean time to failure where you tried to make sure the server never went down. That is old-school thinking.
    - We need to go from mean time to failure to mean time to recovery. You anticipate that the server will go down. Just be sure you can recover quickly.

### Metrics
- By goal
    - Measuring social metrics leads to improved socialization.
    - Measuring DevOps metrics allows you to see the progression toward goals.
- By meaning
    - Vanity metrics may be appealing at first glance but offer limited actionable insights.
    - Actionable metrics provide meaningful ways to measure your process and work toward goals.
        - According to Dr. Nicole Forsgren, DevOps actionable metrics include mean lead time, release frequency, change failure rate, and mean time to recovery. 
- Cultural DevOps measurement
    - These are culture statements introduced by Dr. Nicole Forsgren for measuring the teams on a scale of 7, strongly agree, to 1.
        - On my team, information is actively sought.
        - On my team, failures are learning opportunities and messengers are not punished. 
        - On my team, responsibilities are shared.
        - On my team, cross-functional collaboration is encouraged and rewarded. 
        - On my team, failure causes inquiry.
        - On my team, new ideas are welcomed.
    - Failures are learning opportunities that should not be punished.
        - It is the system that fails, not the person.
        - Messengers are not punished.
        - Foster a culture of experimentation.
        
### Site Reliability Engineering vs. DevOps
- SRE and DevOps have some common goals, but SRE takes a different approach than DevOps.
- For SRE,
    - The goal of site reliability engineers is to automate themselves out of a job. 
        - One of the tenets of SRE is to only hire software engineers
    - In SRE, stability is controlled through something known as error budgets. 
        - Developers are allowed to deploy their applications into production as long as they don't causetoo many production outages. 
        - Once the developers have caused enough outages to exceed their error budget, they're no longer allowed to deploy to production. 
        - It solves the problem of developers waiting for operations, yet it still gives operations control over the stability of the production environment. 
    - Developers spend about 5% of their time rotating through the operations team so that they understand what the SRE team is doing on a daily basis.
        - Also if they cause too many outages, or the toil exceeds 50% of the site reliability engineer’s time, more developers are shifted to operations to help bring things back into balance.
    - SRE keeps those silos in place.
        - The development team is a separate and distinct team from the operations team.  
- SRE and DevOps can be used together to both maintain and use computer infrastructure. 
