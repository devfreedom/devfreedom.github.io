---
title: "[Study Note] Coursework: DevOps and Software Engineering - CI/CD"
date: 2023-07-26T18:53
thumb: "devops.jpg"
tags: 
    - ❮Study Note❯
    - DevOps
    - software engineering
    - cloud computing
    - web development
    - CI/CD
---

# 6. Continuous Integration / Continuous Delivery
- CI/CD is not a one single process.
    - It’s two separate and distinct processes that happen right after each other.
    - With CI, your team can work in small chunks in different areas of your application and then easily and regularly merge the code into the main branch.
    - With CD, it prepares the code for the release of your application, and automates the process that is required to deploy and build your application. 
- CI is continuously integrating your code back into the main or master or trunk branch.
    - So it shouldn't diverge too far before you merge changes back into the main branch to make sure that it works.
    - You are continuously integrating your code with the main codebase.
    - CI is an automation process that allows you to integrate your work into your repository.
- CD is then taking that integrated code and deploying it somewhere.
    - You may deploy it every time you integrate it, or you may not deploy it every time you integrate it.
    - You may have Continuous Integration on one loop testing branches and pull requests.
        - And then, when you finally merge to main, you kick off the Continuous Delivery part.
- CI/CD position in DevOps pipeline
    - DevOps = Plan → Develop → Build → Test → Deploy
        - CI/CD is about Build and Test
- Phases
    - CI = Plan → Code → Build → Test
        - This is where developers plan and then code the solution, and then build it and test it in several repeating cycles until it’s complete.
        - And then the solution is ready to be delivered.
    - CD = Release → Deploy → Operate 
        - The solution is released, and the binaries are deployed into a given environment in repeating cycles, and the solution is then in live operation from that point on. 
- Benefits
    - Faster reaction times to code changes
        - You’re no longer waiting to see the effects of a change.
        - It automatically gets built and tested and deployed.
    - Reduced code integration risk
        - The more often you integrate, the less time there is for change.
        - Integrating more often means less risk of something breaking.
    - Higher code quality with CI/CD
        - Because things are constantly being reviewed and constantly being tested, and every pull request is an opportunity for a code review.
    - Knowing that the code in version control works.
        - It’s a common practice to ensure that the code in the main or master branch is always deployable.
    - CI/CD takes less deployment time 
        - Because everything is already tested, and deployments are automated, so they happen faster with greater repeatability.

### CI/CD Tools
- Jenkins
    - Main role: CI
    - It is one of the oldest, most popular, and most complex of all the CI/CD tools.
    - Uses the Groovy language in a Jenkinsfile
    - Large ecosystem of plugins
    - Jenkins does not provide visibility into the pipeline process, and requires a lot of setup and maintenance.
        - Making it uncompetitive compared to other CD tools.
- Circle CI 
    - Main role: CI
    - A CI/CD platform that can be used to implement DevOps practices.
    - Provided as a service
    - Uses circle.yaml file to control workflow
- Travis CI
    - Main role: CI
    - Hosted CI/CD service that helps developers build and test software projects hosted on GitHub and Bitbucket.
    - Uses .travis.yml file to define workflow
    - It isn’t as feature-rich as other CD implementations, but it requires minimal maintenance. 

- Spinnaker
    - Main role: CD
    - Dedicated cloud-agnostic CD tool built in-house by Netflix.
    - It allows you to manage CD pipelines and simplifies release rollbacks.
    - It supports the creation of load balancers and scale clusters all natively.
- Concourse CI
    - Main role: CI
    - A CI tool that also contains CD capabilities.
    - Initially built with containers in mind, although you can still run things on virtual machines.
    - The containers are highly scalable, and due to the container-first approach, every step of the build is very flexible.
        - You just point to a Docker image to build from. 
- Go CD
    - Main role: CD
    - Boasts easy pipeline setup with native Docker and Kubernetes support.
    - It comes with its own Value Stream Map tool that helps you trace each pipeline through all of the stages between commit and deployment.
    - You can build pipelines with YAML or JSON files in a visual UI.
- Argo CD 
    - Main role: CD
    - A declarative Continuous Delivery tool that makes CD easy to automate, audit, and understand.
    - Originally developed by Intuit
        - As they were looking for a lighter tool than Spinnaker that would improve build and deployment times and streamline their GitOps workflow.
    - The UI is well made and easy to use and integrates well with a variety of CI tools such as Jenkins, GitHub Actions, CircleCI, and more. 
    - It follows the GitOps pattern of using Git repositories as the single source of truth for defining the desired application state.
    - Argo CD as a Kubernetes controller, monitors the current application state compared to the desired state, visualizes the differences, and ensures parity by automatically syncing. 
- GitHub Actions 
    - A CI/CD platform that enables you to automate your build, test, and deploy GitHub workflows. 
    - Unlike other tools, it only works with GitHub.
- GitLab CI/CD
    - GitLab's built-in CI/CD platform that you use for all of the continuous methods.
    - It’s easy to automate the process of deploying code to production since GitLab is also a source code manager.
    - It supports all major cloud platforms, making the CI/CD pipeline very flexible to build.
- Tekton
    - A flexible, open source CI/CD framework that abstracts the implementation details
        - So you can focus on building, testing, and deploying according to your projects’ requirements. 
    - Enables you to build, test, and deploy apps in Kubernetes using an open source, vendor-neutral framework.
    - Its main strength is its modularity, allowing you to deploy across multiple environments such as VMs, serverless, Kubernetes, and cloud providers.
    - By standardizing the CI/CD tooling and process, Tekton works well with other CI/CD tools such as Jenkins, Skaffold, and Knative.
    - Tekton pipelines are fully portable, so once they are created or defined, a developer in the organization can take a pipeline and reuse its components. 

### Choosing the Right CI/CD Tool
- Feature-richness
    - You may want,
        - Full audit trails
        - Proprietary integrated secrets
        - Fine-grained, role-based access control
        - etc.
    - These features may only be partially available in CD tools and not ubiquitous, as some tools may be very new and overly simplistic.
    - Having a feature-rich CD tool means that once your applications become more complex with more moving parts, you will already have the features at your disposal. 
- Compatibility
    - Picking a tool that is compatible and easily integrates with your current toolset makes setting up CD faster and reduces potential headaches. 
- Ease of setup and use
    - Tools like Tekton are easy to set up and provide clear insights into your pipelines.
    - Beyond setup, maintenance can also take up a lot of time.
    - Tools like Argo CD are easy to set up and maintain, while Jenkins is a handful to both set up and maintain.
- Security scanning
    - Within your pipeline, you need tools for application security scanning and ensure overall application health.
    - Security is often an afterthought and added at the end before an application launches.
    - By adding security checks to your pipeline, every change that you make along the way is tested to be secure. 
- Vulnerability scanning 
    - Helps identify dependencies and components vulnerabilities.
    - Applications that are not vulnerable one day suddenly become vulnerable because of exploits found in existing code or libraries.
    - It is critically important to add vulnerability scanning to your CD pipeline to ensure that you are not shipping code with known vulnerabilities. 
- Secret scanning for API keys and credentials 
    - Prevents accidental exposure of sensitive information.
    - Many times, developers inadvertently place passwords and other credentials in files that have been erroneously checked into source control.
    - Scanning for secrets ensures that credentials are not leaked. 
- Static Application Security Testing (SAST) 
    - Identifies vulnerabilities of the entire code base such as SQL injections and cross-site scripting.
    - While some of these mistakes might get identified during code reviews, it’s important to ensure that your CD pipeline is checking for them in case your developers forget to. 
- Dynamic Application Security Testing (DAST)
    - Scans for incorrect security assumptions that may be hidden in the source code.
    - Dynamic scanning checks the running application for weak spots.
    - Better to catch these in your CD pipeline than have malicious users find them in production. 
- Code deployment
    - Automating deployments ensures that they are repeatable, so that you get the same results.
        - Regardless of whether you are deploying to development, test, staging, or production. 

## 6-1. Continuous Integration
- Continuous Integration is an automation process that enables the continuous integration of code changes back into the main codebase.
    - It allows developers to regularly integrate their work into a repository so that their changes don’t drift too far from the master, or main, branch.
    - When a developer pushes their work into the source code repository, it ensures that the software continues working properly by automatically running a series of tests to detect any breakage.
    - CI helps to enable collaborative development across the teams 
        - Because even if a developer forgets to run their unit tests, the CI process will run the tests for them and alert them of any failures.
        - This helps to identify any integration bugs sooner rather than later. 
- CI vs. Traditional development
    - Traditionally, developers work on large features or fixes and commit them into their own development branches.
        - These branches can exist for a long time, have a large scope, and generally require many code changes and edits.
    - When development is completed on these branches, only then are they tested and merged into the main branch and built for production.
        - This development method can cause drift between the main branch and the development branch, among other issues. 

### CI Features
- Short-lived branches
    - Reduces drifts
        - In CI, developers work in short-lived feature branches where they develop their code.
        - These branches are only meant for developing small features that contribute to the code so they can be merged back into the main or master branch quickly.
            - The branch is deleted after it’s merged as its only purpose was to develop that small feature.
        - It reduces drift that may occur between feature branches and the main branch.
    - Reduces parallel changes
        - Critical or essential fixes may be implemented differently by multiple developers when working on their features.
        - With CI, developers can quickly implement a single fix that will be tested and merged, reducing parallel changes.
            - Ultimately, this means you can deploy your code faster overall, as you don’t need to run through a large code review because you have been checking the changes every time they’ve been pushed.
- Frequent pull requests
    - Making frequent pull requests back to the master or main branch is a best practice.
        - These pull requests are meant to contain code updates that serve a specific purpose.
    - It makes code changes cleaner and easier to understand.
    - A pull request requires approval from a repository maintainer or owner to be successfully merged.
        - At a minimum, no one should be able to approve their own pull request.
        - You want to ensure that every change has at least two sets of eyes on it.
    - These frequent pull requests serve as small pieces of a much bigger puzzle, making it easy to build upon the most updated code.
    - Benefits
        - Facilitates increased collaboration among developers
            - Because each pull request needs to be reviewed.
        - Enables developers to react quickly
            - Required changes can be tested and put into production faster, so solutions can get to the customer faster.
        - Reducing management risk
            - Due to the frequency of Continuous Integration, you know exactly how much functionality you have built to date.
            - It improves your ability to predict when and if you will deliver the necessary functionality on time. 
- Automated CI tools
    - Automated CI tools subscribe to events such as pull requests and file changes using webhooks that can then trigger a workflow.
        - That workflow can be anything, such as building an application.
    - Once complete, these tools report back with messages of a successful or failed build.
        - These tools can run tests that ensure your file changes or pull requests don’t break the entire application.
    - With these automation tools, you can streamline your development process so that testing and checking your code is never tedious. 

### CI Benefits
- Faster reaction times to code changes
    - Every time you make a change to your code and push it to a remote branch,
        - The change gets tested
        - The change gets built
        - You can deliver the proven solution into your customers’ hands more quickly
- Reduced code integration risk
    - Changing and integrating smaller and smaller things mean less risk of something going wrong.
- Higher code quality
    - Changes are constantly being reviewed and constantly being tested.
        - Every pull request is an opportunity for a code review. 
            - Check test cases.
            - Check test results.
            - Check code coverage.
- Code in version control works
    - Unless you test every change, you could be deploying broken code into production.
    - You ran your continuous integration tests and they all passed.
    - So it’s very important to know that everything that's in that master branch in Git works.

### GitHub Actions
- Process
    1. You create a folder called .github/workflows/ in the root of your project.
    2. Place a .yaml file in that folder.
    3. Depending on how you configure GitHub Actions,
        - Whenever you push to master, a build is executed.
        - Whenever you issue a pull request, tests are run.
    4. Job runs in an isolated environment, VM or Docker container.
- Workflow composition
    1. Event
        - Something that activates the execution of a workflow
    2. Jobs
        - Made up of steps that are performed on the same runner
        - Each workflow can have multiple jobs
            - Jobs are named whatever you want
            - Jobs run in parallel unless dependencies specified using 'needs' keyword
        - Each job contains,
            - Runner
            - Services (optional)
                - Services are defined as Docker containers.
                    - Database, message queues, etc.
                - The name you use becomes the DNS name used to access it.
            - Steps
    3. Runner
        - A server that performs jobs on a specific platform or OS
    4. Steps
        - Tasks comprising one or more shell commands or actions
        - Steps can have,
            - `name:` an optional name displayed in the report
            - `id:` an optional ID to refer to other steps
            - `uses:` actions
            - `run:` shell commands
            - `env:` environment variables
        - Each job can have multiple steps.
    5. Actions
        - Procedures that can be executed within a step
        - Actions require the `uses:` keyword
        - Actions can have arguments, by specifying `with:` keyword followed by name-value pairs.

### Social Coding via SCM/VCS
- Social Coding
    - Open source for inner source
        - What’s new is bringing 'open source' concepts into the enterprise, and coding as a community on internal projects.
        - All repositories are public, and everyone is encouraged to fork the code and contribute.
    - Workflow
        1. You open a GitHub issue and assign it to yourself so that everyone knows you’re working on it.
        2. You discuss the new feature with the repo owner, and you agree to develop it for them.
            - This allows you to leverage everything that they've done and add the feature that you need.
        3. Then you fork the repo, create a branch, and make your changes.
        4. When you’re all done and have something to contribute, you issue a pull request.
            - Signaling that you are ready for a review and the repo owner can decide whether to merge your code into the main project.
            - The repo owners are in full control.
        5. They can ask for changes because they merge the code.
            - They can ask you to write more test cases if you don’t have adequate test coverage.
    - They consider you an equal team member and this is a win-win situation.
        - You get to leverage another team’s code and functionality.
        - The other team gets a new feature added for free.
    - The company saves money because code is being reused instead of rewritten, and everyone is happy.
- Source Code Management with Version Control System
    - The practice of tracking versions of source code as it is developed.
        - This makes it easy to roll back to a previous version if errors occur.
        - It also allows multiple people to work on different parts of the code and merge these changes into a single source of truth. 
    - Centralized SCM 
        - Stores the code repository and version history centrally
        - Developers check out pieces of the code and work on it and commit changes back to the central repository.
            - Builds must be done at the central repository because that’s the only place that all of the code exists.
    - Distributed SCM
        - Each developer has a local clone of the entire code repository and version history.
            - This means they can perform local builds because each developer has the complete code locally.

## 6-2. Continuous Delivery
- Continuous Delivery can be defined as a series of practices designed to ensure that code can be rapidly and safely deployed to production by delivering every change to a production-like environment.
    - It doesn’t have to be a production environment.
        - Continuous Delivery just means that you are deploying the code to a development, or test, or staging environment to ensure that the code can be deployed.
        - This also gives everyone a chance to see the code working. 
    - The main or master branch must always be deployable.
- The most important keyword : "automated"
    - Nobody performed any manual steps to deploy the code. It is continuously deployed automatically. 
    - Use Continuous Integration to run the tests every time there's a pull request. 
        - Working in separate feature branches and using pull requests ensures that any code you have written is working correctly before you merge it back into the main branch.
- Benefits
    - Automated SDLC
        - Enabling your development teams to automate the steps that transport software through the various stages of the software development lifecycle (or SDLC). 
        - Enabling you to deploy code automatically into the various stages of the software development lifecycle.
            - Once you have deployed to the development environment without incident, and to the test environment, and then the staging environment all without incident, the chances are pretty good that when you deploy to production that will also be without incident. 
    - Reducing the deployment time by nonstop testing and deployment cycles.
        - The more you deploy, the more confidence you have that your next deployment will work, and the less time you spend debugging deployments. 
    - Reducing the costs
        - People costs, infrastructure costs, and the cost of lost time due to manual failures
    - Scalability
        - Enables your development team to scale their software deployments based on the size of the project.

### CD Key principles
- Build in quality
    - You need to ensure that you have quality built in at every step.
        - Quality isn’t free; you must plan for it.
    - This can be achieved by continually reviewing your code.
        - Every pull request is an opportunity for a code review and quality check.
        - This is critical to make sure that everything looks good all the way along your pipeline. 
- Work in small batches
    - You should make your user stories small.
        - It’s best to make small changes because less change means less risk.
    - And you should continuously integrate these changes with the base code so that the changes never drift too far from the base that everyone else is working from. 
- Know that people are great at solving problems, but not so good at repetition
    - People shouldn’t be required to perform repetitive tasks.
    - With test-driven development, you could constantly pull people’s code and run tests against it manually.
        - Computers can perform these tasks more quickly and efficiently.
- Pursue relentless continuous improvement
    - The more often you do something, the better you get at it, and the less likely it is to fail.
    - By delivering each change to a known working environment, you should continually know where you are and when things are broken. 
- Everyone is responsible for their part in the story.
    - If a build does break, it’s not a case of finger-pointing and asking, “Whose fault is it?”.
    - What you should be asking is, “What went wrong?” and “How can we prevent this from happening in the future?”
    - What you need to consider is more about the system’s failings rather than the people’s failings.
        - How did the system fail the people? Not the other way around.

### CD Best Practices
- Make every change releasable
    - This means you should always include user documentation, operations runbooks, and information about what your change does.
    - This ensures that every change will work and be documented well enough to be delivered to customers as well as serve any audit that may occur. 
- Embrace trunk-based development
    - Continuous Delivery is built upon Continuous Integration.
        - You should avoid delaying any integration caused by long-lived branches.
    - You want to use short-lived feature branches that are continuously integrated into the main codebase.
        - This is also called trunk-based development because you always come back to the trunk, otherwise known as the master or main branch.
        - Every change is built, tested, and deployed together for the fastest feedback.
- Deliver through an automated pipeline
    - A well-constructed, automated delivery pipeline is integral to a successful Continuous Delivery implementation.
        - This ensures that all code releases move into the test and production environments in a consistent, predictable way.
- Automate as many processes as possible
    - You must automate as many processes as possible in your software development lifecycle to create a good, reliable delivery pipeline.
        - This pipeline is not only for code builds and deployments, but for the creation of new development environments as well. 
- Aim for no downtime
    - To ensure application availability while you make frequent Continuous Delivery updates, when you push a new function to production, you must first validate it before deploying it to public-running application instances. 
- Release at the granularity of test
    - If two parts of the system must be tested together, they should be released together.
        - So that you know that the parts of your system are compatible.
        - Release automation tools are good at coordinating this kind of delivery.
        - Alternatively, you can fully decouple.

### CD Requirements
- Code repository 
    - To host and manage all source code.
    - Your source code management system is the single version of the truth.
        - Everything you need to build and release your code must be checked into version control.
- Build server
    - To manage the building of the application.
    - You want that environment to perform clean builds, starting from the same state every time.
- Integration server/orchestrator
    - Handles the build automation and runs tests against your code. 
    - There should be no manual steps. Everything should be automated.
- Storage repository 
    - To store all the binaries and artifacts of the application.
        - So that once built and tested, they can be deployed easily.

## 6-3. Continuous Deployment/Release
- Continuous Deployment is NOT the same as continuous delivery.
- CD
    - "Continuous Delivery" is the automated movement of code through the development lifecycle (or delivery lifecycle) once it passes the required automation tests.
        - Delivering it somewhere other than production.
            - e.g. A development/staging/test/pre-production server.
- CR
    - "Continuous Deployment/Release" is reserved for when you actually continuously push to production.
        - Taking that delivered code and deploying it to actual production.
- Whether and how Continuous Delivery is implemented all depends on your business needs.
    - If your business needs the delivery team to release new or updated software to production repeatedly, reliably, and quickly, then Continuous Deployment/Release will be of great benefit. 

## 6-4. Infrastructure as Code
- IaC provides a great way for you to describe your infrastructure in a textual format.
    - A textual file format that you could actually use to configure your systems much like code.
        - Textual code that you can hand to an IaC tool. 
        - Textual code is normally written in the common YAML format
    - IaC tool reads the code and then builds your servers, and networks, and storage, etc.
        - Essentially the core infrastructure elements that you need. 
        - Using these tools with this textual code means that everyone gets the same environment every time, so it’s consistent and repeatable. 
- Why IaC?
    - Reduces manual system and software configurations
        - You can use templates or commands to describe how to install and configure the system according to your needs.
        - Configuration Management System (CMS) made this possible.
    - Rapid provision of the same platform repeatedly
        - Due to repeatable configuration, you can rapidly provision the same platform over and over again and be sure that it will be in the same state every time.
- Benefits
    - Faster time to production
        - IaC automation dramatically speeds up the process of provisioning infrastructure for development, tests, and production.
            - And for scaling or taking down production infrastructure as needed.
        - It can even automate the provisioning of legacy infrastructure, which might otherwise be governed by time-consuming processes like requiring you to open a ticket and waiting for someone to manually do it.
    - Efficient development
        - Developers can quickly provision sandboxes and Continuous Integration/Continuous Delivery environments.
        - QA can quickly provide full-fidelity test environments.
    - Protection against staff churn
        - IaC ensures that provisioning intelligence always remains with the organization.
            - In the past, the knowledge of how to configure servers may have been known by only a few people in your organization.
        - Once you codify this knowledge using infrastructure as code, everyone is able to provision what they need.
            - The fear of losing tribal knowledge through staff churn is no longer an issue.
    - Lower costs and better developer
        - IaC lets organizations take maximum advantage of cloud computing's consumption-based cost structure.
            - It reduces the time, effort, and specialized skill required to provision and scale infrastructure.
        - It also enables developers to spend less time on plumbing and more time on mission-critical software solutions. 
- Approaches
    - Infrastructure as code tools can be either declarative or imperative. 
    - Declarative approach
        - You specify the desired state of the infrastructure resources you want to provision, and then the IaC tool determines how to achieve this state.
        - It handles dependencies and executes commands in the proper order without you having to specify the order of execution.
        - Tools that use this approach include Terraform, Puppet, SaltStack, CloudFormation, and to some extent, Ansible.
    - Imperative approach
        - Requires that you define the specific order of the commands needed to achieve the desired state.
        - It’s up to you to get the dependencies correct as the tool will execute commands in the order you specify.
        - Tools like Chef are imperative and to some extent, Ansible can be as well. 
- Tools
    - Terraform
        - Uses a declarative approach to IaC with a pre-execution check to ensure that it will do what you expect it to do.
        - You can use Terraform as a base tool in combination with Ansible where Terraform provisions the base infrastructure and Ansible configures the software on top of it.
        - It is a very popular tool for cloud provisioning.
    - Ansible 
        - An open source tool that automates IT tools such as intra-service orchestration, application deployment, cloud provisioning, and more.
        - It uses familiar YAML files to describe the state that you want to achieve.
        - Ansible is simple to set up because it doesn't require any client-side agents or bespoke security infrastructure, and it works by simply delivering modules to clients.
            - This makes it ideal for memory-constrained environments like configuring Internet of Things devices.
            - These modules are run on the client side and the results are sent back to the Ansible server.
    - Chef
        - Describes the necessary steps to reach a final state rather than describing the state itself.
            - Using "Cookbooks" you can describe various processes by which you can configure a system to achieve the desired state.
        - One of the strengths of Chef is that it’s a popular tool and has lots of support.
        - One of the drawbacks is that cookbooks are written in Ruby so you need to have Ruby skills on your team.
    - Puppet
        - You can use any existing platform.
        - The main difference between Puppet and Chef is that Puppet is declarative, which some consider to be a preferred method.
    - Saltstack
        - SaltStack’s remote execution capabilities allow administrators to run commands on various machines in parallel with a flexible targeting system.
        - SaltStack is designed to allow users to explicitly target and issue commands to multiple machines directly.

### IaC Example - Ansible
- Inventory files
    - These files have a list of servers or devices that can be in the form of IP addresses or hostnames.
        - They can also specify groupings of servers like all of the web servers or all of the database servers.
        - This is how Ansible knows what to operate on.
    - The inventory files make up the most basic building block of Ansible architecture.
        - You must reference the inventory files when executing Ansible or an Ansible playbook.
- VAR files
    - Contain the relevant variables that may be needed whenever a playbook is run on a device or group of devices.
    - You can control how Ansible interacts with remote hosts or devices based on how you define variables.
- Playbooks
    - Ansible has this notion of a playbook that contains any number of plays.
    - Plays
        - Plays contain the instructions to be carried out on each server or device.
        - Plays can also be targeted at specific groups of servers, like all of the web servers or all of the database servers.
    - A playbook is a collection reusable plays that are instructions that you give to Ansible to carry out.
- Workflow
    - You could determine that you need to set up a web server, an app server, and a database server, or multiple web servers, even change the existing configuration of a server.
        - Whatever you need to do, Ansible will make all of the necessary configuration changes and provision all the things you need for your infrastructure.
    - Ansible will read the playbook, determine which servers from the inventory that the plays are appropriate for.
    - And then execute the plays on each of these servers.
- Ansible is idempotent.
    - It will not affect a server if it is already in the desired state.
    - This allows you to be able to reapply a playbook and not worry about it installing things twice.
    - Ansible will take care not to do that if it isn't needed. 

