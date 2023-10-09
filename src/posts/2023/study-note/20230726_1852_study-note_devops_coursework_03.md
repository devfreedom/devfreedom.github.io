---
title: "[Study Note] Coursework: DevOps and Software Engineering - Part 3"
date: 2023-07-24T14:34
thumb: "devops.jpg"
tags: 
    - ❮Study Note❯
    - DevOps
    - software engineering
    - cloud computing
    - web development
    - CI/CD
---

# 4. Microservices and Serverless Development

## 4-1. Microservices
- Modern Software Development
    - Delivered as a service
    - Centrally hosted and accessed through the internet
- Microservice
    - An approach to create a single application composed of,
        - Many loosely coupled
        - Independently deployable
        - Smaller services 
    - Characteristics
        - Each have their own technology stack
            - Inclusive of the database and data management model
        - Components communicate with one another
            - Over a combination of REST APIs, event streaming, and message brokers
        - Functional segregation by business functionality (bounded context)
    - Benefits
        - No interdependency = Easy updates
        - Different stack = Varied expertise
        - Smaller components = Scale independently
    - Scaling
        - Horizontal
            - Scaling by adding more instances of resources, also described as "scaling out"
        - Precise
            - Microservices require less infrastructure because they enable precise scaling of only the components that require it, instead of the entire application in the case of monolithic applications.
            - An API call is often an effective way of initially establishing the state for a given service.
        - Event-driven
            - It’s not a particularly effective way of staying up to date on progress.
            - This is where event streaming can help broadcast the state change, which helps in scaling the microservice by introducing this message broker. 

### Monolith vs SOA vs Microservices
- Monolithic application
    - A monolithic application has all or most of its functionality within a single process.
        - The layers are tightly connected and dependent on each other. 
    - Simplicity and less cross-cutting of features and functionalities
    - Over time, most products develop and increase in scope, and the design becomes more complex and difficult to modify.
    - It also becomes a barrier to adapting to new technology which would mean re-writing the whole application. 
- Service-oriented architecture
    - Designed and built with a service provider and consumer approach.
    - The services provided work as a discrete unit of functionality, integrated seamlessly, and are easily reused.
    - Each SOA service consists of three components.
        - Interface 
            - Defines how a service provider will execute requests from a service consumer
        - Contract 
            - Defines how the service provider and service consumer should interact
        - Implementation 
            - The service code
    - They help increase reliability and support parallel development due to a fixed contract between the services.
    - However, due to these expectations and requirements, an SOA design can become complex and obstruct rapid application development.
        - SOA design is an expensive investment, and therefore usually only suits enterprise teams, who can invest the required resources and expertise.
        - SOA is an enterprise-wide concept.
- Microservice
    - Microservices architectures comprise loosely coupled, reusable, and specialized components that often work independently of one another, like SOA.
        - Even the data in a microservice is not shared with other services.
        - It does not define how applications talk to one another.
        - Helps you to scale individual microservices independently
        - Gives the liberty to select the underlying technology
    - Flexible and ease of development
    - Security concerns
        - So many different services independently hosted, each will need its own security paradigm.
            - e.g. A simple requirement such as transport layer security (or TLS), to secure network communications.
    - Debugging and isolating issues can also become harder.
        - Since each service runs independently, meaning you may find it challenging to locate the root cause.
    - Microservices architecture is an application-scoped concept. 

### 12-factor App Methodology
- Code
    - Factor 1. Codebase
        - Track in a version control system
        - Maintain one-to-one relationship between codebase and app
        - Deploy multiple instances of the app
        - Develop different versions of the codebase in each deploy
    - Factor 2. Dependencies
        - Assume an app is only as reliable as its least reliable dependency
        - Explicitly declare any dependencies
    - Factor 5. Build, release, run
        - Build
            - Transform a codebase into an executable unit called a build
        - Release
            - Combine build with configuration so that it's ready for execution
        - Run the application
        - All three stages should be strictly seperated.
    - Factor 10. Dev/Prod parity
        - Minimize differences between development and production environments
        - Use same backend services across environments
- Deploy
    - Factor 3. Config
        - Keep everything that varies between deploys such as credentials and backend service locations in config
        - Keep seperate from the code
        - Store config in environment variables
    - Factor 4. Backend services
        - Do not distinguish between local and 3rd-party services
        - Access all services by a URL and credentials so that they can be swapped without changing the code
    - Factor 6. Processes
        - Should be stateless and share nothing
        - Do not share memory and filesystems, so persistent data stored in backend service
        - Store data centrally
    - Factor 7. Port binding
        - Export services by port binding
        - Export HTTP and other services
        - Declare a web server library dependency
        - Become backend services for other apps
- Operate
    - Factor 8. Concurrency
        - Scale an application
        - Stateless processes can be spun up without creating dependencies on other processes
    - Factor 9. Disposability
        - Require minimal process start time and graceful termination
        - Quickly deploy code or config changes
        - Easily scale apps
    - Factor 11. Logs
        - App should not concern itself with storing logs
        - Treat logs as an event stream
        - Execution environment captures, aggregates, and routes logs to their destination
    - Factor 12. Admin processes
        - Enable one-off app management processes
        - Run against a release, using same codebase and config
        - Part of application code

### Microservices Patterns
- Single-page application (or SPA) pattern
    - Built using a combination of HTML, CSS, and JavaScript, these applications respond to user input through dynamic service calls to backend REST-based services that update portions of the screen instead of redirecting to an entirely new page.
    - This application architecture often simplifies the front-end experience, with the tradeoff of more responsibility on the backend services.
    - While a single-page application works well for single-channel user experiences, it delivers poor results across user experiences through different channels, like mobile and web.
- Backend for Frontend (or BFF) pattern
    - Inserts a layer between the user experience and the resources that the experience calls on
        - This design allows for customized user experiences between channels.
    - The BFF pattern allows developers to create and support one backend type per user interface using the best options for that interface, rather than trying to support a generic backend that works with any interface but may negatively impact frontend performance.
        - Each backend is a microservice. 
        - Instead of having a monolithic app that checks which channel is needed and then contains all the logic to prepare the user experience for that channel, you apply microservice architecture to separate the monolithic backend into distinct services that perform their specific, necessary tasks. 
- Strangler pattern
    - Helps manage the refactoring of a monolithic application in stages
        - The pattern gets its metaphorical name from the garden phenomenon of a vine that strangles a tree.
    - With the Strangler pattern, you use the structure of a web application to split an application into multiple functional domains and replace those domains with a new microservices-based implementation for one domain at a time.
        - These two aspects form separate applications that exist side-by-side in the same URL space.
        - Over time, the newly refactored application replaces the original application until finally, you can shut off the monolithic application. 
    - Steps
        1. Transform
            - This creates a parallel new site on a cloud platform or within your existing environment.
        2. Coexist
            - This leaves the existing site functional and live for a specified time.
            - It incrementally redirects from the current location to the new site for newly implemented functionality.
        3. Eliminate
            - This removes the outdated functionality from the existing site or stops maintaining that functionality when you redirect traffic from the original site. 
- Service discovery pattern
    - Helps applications and services discover each other
    - This pattern is needed because, in a microservices architecture, service instances change dynamically due to scaling, upgrades, service failure, and even service termination. 
    - A load balancer could also use this pattern to do health checks and rebalance traffic on service failures.
- Etc.
    - Entity and aggregate pattern
        - e.g. In an e-commerce site where an order would be an aggregate of products grouped by a buyer
    - Adapter pattern
        - To help translate relationships between objects that are otherwise incompatible

### Microservices Anti-pattern
- Don’t build microservices
    - The first rule of microservices is don’t start with microservices. 
        - When you determine that the monolithic application's complexity negatively affects application development and maintenance, consider refactoring that application into smaller services.
    - When the application becomes too large to update and maintain easily, these microservices will become ideal for breaking down the complexity and making the application more manageable.
        - However, until you feel that pain, you don’t even have a monolith that needs refactoring.  
- Not taking automation seriously
    - If you have a monolith application, you only need to deploy one piece of software. 
    - Once you move to a microservices architecture, you will have more than one application with each having different code, test, and deploy cycles.
    - Attempting to build microservices without either of below is asking for a lot of unnecessary trouble.
        - Proper deployment and monitoring automation
        - Managed cloud services to support your now sprawling, heterogenous infrastructure
    - When you are building microservices, always use DevOps or cloud services.
- Don’t build nanoservices
    - If you go too far with the micro in microservices, you could easily find yourself building nanoservices.
    - The complexity of which will outweigh the overall gains of microservices architecture.
    - Lean toward creating larger services and create smaller services when,
        - Deploying changes becomes difficult
        - The common data model becomes overly complex
        - Loading and scaling requirements no longer synchronize and affect application performance
- Don’t turn into SOA
    - The two concepts; microservices and service-oriented architecture (SOA) are often confused with one another.
        - Because, at their most basic level, both build reusable individual components that can be consumed by other applications.
        - However, microservices are fine-grained with independent data storage for each, that is, the bounded context.
    - A microservices project that morphs into an SOA project will likely buckle under its own weight.
- Don’t build a gateway for each service
    - Instead of implementing end-user authentication, throttle, orchestrate, transform, route, and analytics in each service, you should use an API Gateway.
    - An API gateway is an API management tool that sits between a client and your collection of backend services.
        - This will become central to the above-mentioned non-functional concerns and will avoid re-engineering them with each service.

## 4-2. Web APIs

### REST API
- REST stands for Representational State Transfer. 
    - REST APIs provide a flexible, lightweight way to integrate applications, and have emerged as the most common method for connecting components in microservices architectures.
    - It is an architectural style that defines how applications should communicate with each other within a network. 
- RESTful characteristics
    - It manages all requests through HTTP.
        - REST APIs communicate via HTTP requests to perform standard functions (CRUD) within a resource.
    - It provides stateless, client-server communication.
        - Each request contains all the information required to process it.
        - Roy Fielding says "Each request from client to server must contain all of the information necessary to understand the request, and cannot take advantage of any stored context on the server. Session state is therefore kept entirely on the client."
            - This stateless nature of REST APIs also makes them scalable.
    - It consists of a uniform interface between components.
        - Regardless of where the request originates, the REST API should ensure that the same piece of data, such as the product id, belongs to only one uniform resource identifier (or URI).
            - And resources should contain every piece of information that the client might need.
        
### API Gateway
- An API Gateway is an API management tool that sits between a client and a collection of backend services.
    - It aggregates the various services required to fulfill them and returns the appropriate result.
- Why API gateway?
    - An API Gateway can help you to protect your APIs from malicious usage or overuse.
        - Thus, you can use an authentication service with rate limiting.
    - It also helps to understand how your APIs are used, using an analytics and monitoring service.
    - You can monetize your APIs using a billing system.
    - A gateway also presents a single point of contact to your various microservices and provides a single response to a request.
    - You can seamlessly add or remove APIs without the client’s knowledge about the services running at the back end.
- Gateway to your microservices
    - How does a client access the microservices? This is a problem when you need to interact with multiple APIs.
    - An API Gateway can remove this complication and allow you to,
        - Change hosts and their locations
        - Increase or decrease the number of service instances,
        - Replace your existing service, for example, an ordering service, with a new one.
    - The client’s access to the services remains undisturbed.
- Benefits
    - Insulates the clients from how the application is partitioned into microservices
        - It simplifies the client side by moving the logic for calling multiple services from the client to the API Gateway.
    - Provides the optimal unified API for each client, regardless of who the client is
    - Reduces the number of requests or round trips
        - The API Gateway enables clients to retrieve data from multiple services with a single round trip.
    - Standard portocol to the outside world
        - Irrespective of how your microservices communicate internally, an API Gateway will provide a standard protocol to communicate with the outside world. 
- Drawbacks
    - It’s another component that needs to be developed and maintained.
        - If not designed carefully, it can become a single point of failure in an application.
    - A gateway will increase the response time due to this additional network step in the execution of the application.
- Vendors
    - IBM DataPower Gateway
    - Google Apigee / Cloud Endpoints
    - Microsoft Azure
    - Amazon AWS
    - Open-source
        - Kong
        - Apache APISIX
        - Tyk
        - Gloo

### REST API Documentation
- APIs specify an interface and connect different systems providing them with consistent communication.
    - Initially, APIs were not meant for self-service consumption.
        - They were data-driven and solved a few special use cases of connection and communication.
    - Whereas the OpenAPI Specification defines a standard, language-agnostic interface to RESTful APIs.
        - The specification is language agnostic and human and machine-readable.
        - It allows people and computers to discover and understand the capabilities of a service without requiring access to source code, additional documentation, or inspection of network traffic.
        - It defines all the operations that your API supports, the required parameters and the expected return, and required API authentication.
        - It defines things like terms of service, contact information, and the license information for the exposed API.
- API documentation is like a reference manual containing instructions on effectively using and integrating systems.
- Swagger
    - Swagger saves time writing API documentation by running through the OpenAPI specification to ensure you meet the guidelines.
    - Swagger allows you to describe the structure of your APIs so that machines can read them.
    - With the API’s structure, Swagger automatically builds engaging UI and interactive API documentation.
        - This structure is defined in a JSON or YAML file that adheres to OpenAPI specifications.
    - e.g. Flask application
        1. To introduce the Swagger UI to your application, you need the flask blueprint ‘flask-swagger-ui’.
            - The command ‘pip install flask-swagger-ui’ will add the Swagger UI to your flask application by using pip.
        2. You need to import the ‘swagger_ui_blueprint’, which will help you create the Swagger UI using Flask.
        3. Then you define the basic configuration, which consists of the path where Swagger will be available.
            - The second argument displays where the swagger file is served. And the name you want to give to this Swagger.
        4. You then need to register this blueprint with the app for Flask.
        5. Swagger.json holds the definition and characteristics of your API in the form of a JSON file.
            - You need to expose this file as well with your API.
            - So, you need a route that will serve your static swagger.json file.
            - Swagger is a json file and requires some basic configurations to be present. 

### GraphQL
- GraphQL is a query language for your API.
    - It provides a standard way to allow clients to request only the data that they need from the API.
    - It can be developed using any programming language, as it is language agnostic.
    - GraphQL enables you to retrieve exactly what you need from the API.
        - You don’t receive the data that you didn’t request.
        - You receive exactly what you require, even from different resources. 
- Unlike the RESTful API, GraphQL requires just one endpoint to retrieve everything you require. 
    - With REST, your APIs are the resources that provide endpoints to perform a particular operation using an HTTP method.
        - In GraphQL, the types you define in the schema are the nodes.
    - With REST, you make multiple calls and receive whatever is sent by the server.
        - But in GraphQL, you only request and receive what you require. 
- Extending your GraphQL API doesn’t need a new version.
    - You add the new fields without breaking the existing clients, as they were only requesting what they required.
- Query
    - A Query is used for querying your data, more like a GET request in a RESTful API.
        - At its simplest, GraphQL makes requests for specific fields on objects.
- Mutation
    - A mutation is used for manipulating and modifying your data.
    - Every field in the mutation type can be thought of as a POST, PUT, or DELETE request in a RESTful API. 

## 4-3. Serverless Computing

- Serverless computing offloads the responsibility of infrastructure management to cloud providers, enabling developers to focus on the application business logic.
    - Think of serverless computing as a combination of function-as-a-service (or FaaS) platforms and backend-as-a-service (or BaaS) services.
        - FaaS platforms are used to run functions.
        - BaaS represents backend cloud services, such as cloud databases, object storage services, and message queues.
- Serverless computing is an advancement of standard cloud computing, which abstracts both infrastructure and software environments.
    - It is an architectural style where code runs using a cloud platform, and the cloud provider manages the hardware and software setup, security, scalability, and so on.
        - Serverless applications require only a serverless architecture for the core code.
        - Serverless functions take milliseconds to deploy and have a lifespan of seconds.
    - The client is billed only for usage and not for CPU idle time.
        - And developers only need to focus on their application code in the form of functions.
- Example
    1. Create a Docker or Kubernetes container.
        - The developer creates a function by writing code in a language supported by the cloud provider, such as Python, Java, Node.js, C#, or Go.
    2. The developer uploads the function to the cloud.
    3. Events are defined that trigger the function, such as a user click.
        - Once the event occurs, the trigger is invoked, and the cloud provider runs the function, resulting in the container object.
- Characteristics 
    - Hostless
        - Developers do not have to procure, manage, and maintain servers.
    - Elastic
        - Autoscaling is immediate and inherent for serverless.
    - Load-balanced
        - It offers automated load balancing that distributes the incoming traffic across multiple backend systems.
    - Stateless
        - Results in faster performance and higher scalability.
    - Event-driven
        - Functions are triggered only when events occur.
    - Highly-available
        - It provides high availability with no extra effort or cost.
    - Usage-based
        - With granular billing
- Developer's role
    - Having developers spend more time creating high-quality and optimized applications greatly benefits organizations.
    - Developers can
        - Build functions using any popular programming language
        - Extend the functionality of apps by adding additional features
        - Perform better testing since functions perform only one task at a time
        - Optimize apps and functions
        - Improve the user experience
- Cloud provider's role
    - To accomplish the goal of zero operational considerations, cloud providers take responsibility for routine infrastructure management and maintenance tasks such as,
        - Maximizing compute, memory, and networking utilization while minimizing costs
        - Providing server management that includes OS updates and security patches
        - Enabling autoscaling
        - Maintaining high availability
        - Implementing security
        - Configuring high performance (or low latency)
        - Setting up monitoring and logging

### Serverless Pros
- Hassle-free
    - There are no infrastructure setup and maintenance requirements as a cloud provider manages the same, thereby reducing costs.
        - Cloud providers ensure reliability, which results in high availability and fault tolerance.
        - With no infrastructure to manage, greener computing also becomes a definite possibility.
- Focus on development
    - Developers benefit because they focus on applications and do what they enjoy best.
- Efficiency
    - Without serverless, all parts of your applications are constantly running, thereby wasting resources.
    - Serverless functions allow you to configure your application to only run certain parts when needed.
        - e.g. An application’s front end must run continuously to keep users logged in, But an authentication service saves resources and costs since it is only invoked occasionally.
- Performance
    - Functions run in milliseconds, while run times for containers or virtual machines (VMs) are in seconds and minutes, respectively.
- Convenience
    - Many cloud providers include a built-in code editor called an Integrated Development Environment, or IDE, for faster developments, deployments, and updates.
- Usage-based billing
    - You are charged on a pay-per-request basis and not for any idle resources.
- Language support
    - You can use any popular programming language for development.
- Ecosystem
    - Plenty of third-party support is available for authentication, database, and other backend services.
- Innovation
    - Since developers purely focus on development, organizations can focus on their business and release products faster than the competition.
    - The serverless environment allows more innovation and experimentation, even if subject to failures.

### Serverless Cons
- Not for long-running processes
    - Many organizations realize significant cost savings for spiky workloads, but for workloads characterized by long-running processes, the benefits diminish from the pay-per-use model.
    - For such applications, a traditional environment can be more cost-effective.
- Vendor lock-ins
    - Dependencies on cloud providers’ technologies or environments lead to vendor lock-in risks.
- Cold starts
    - If requests are received after long intervals, the applications must often restart all processes, known as a cold start.
        - This increases the function run time.
- Latency
    - Serverless latency is unacceptable for time-critical applications such as banking, health care, or edge-related applications.
- Security
    - Security concerns increase due to changes in the attack surfaces from endpoints to source code and the limitations in the provider’s security implementations.
- Complex monitoring/testing/debugging
    - Monitoring and debugging are complex in any distributed system.
    - Since you cannot imitate the backend-as-a-service (or BaaS) environment in your local system, it’s challenging to test the complete functionality and debug application issues.
- Language support dependency
    - Not all cloud providers offer support for all programming languages
        - You are limited to the languages supported by your cloud provider.
- Optimization loss
    - There are no servers to optimize for utilization or performance since you have no control over the servers.
- No state persistence
    - There is no state persistence.
        - e.g. The previous run state will not be available in the next invocation of the same function.
    - Since local cache lasts only a few hours, it’s better to include low-latency external caches like Redis or Memcached.

### Serverless vs. Containers vs. Traditional
- Hybrid solution = Serverless + Containers
- Follow the standard industry advice
    - "Build serverless first. If needed, move to containers."
- Architecture 
    - Serverless: Developers focus on writing high-quality code
    - Traditional: Organizations are responsible for all computing aspects
- Cost 
    - Serverless: Low, usage-based
    - Container: High, pay when running or idle
    - Traditional: High, costs are always required to run and maintain
- Scalability
    - Serverless: Provider-managed
    - Container: Developer-managed
    - Traditional: Limited, can't scale on a flicker
- Integration
    - Serverless: Libraries and integrations are available within the application
    - Traditional: Application integration dependent on 3rd-party libraries
- Vendor dependency
    - Serverless: Can be affected by vendor lock-in
    - Traditional: Vendor lock-in is quite rare
- Networking
    - Serverless: Required to set up private APIs
    - Traditional: Access via regular IP addresses
- Security
    - Serverless: Vulnerabilities are exposed to wider surface in the cloud
    - Traditional: Security only needs to be implemented within the organization's network perimeter
- Maintenance
    - Serverless: Provider-managed
    - Container: Developer-managed
- Deployment time
    - Serverless: Miliseconds
    - Container: Seconds
- Speed to market
    - Serverless: Rapid
    - Container: Initial DevOps required
- Testing
    - Serverless: Hard, with low local backend replication
    - Container: Easy, same container locally and in cloud
- Portability
    - Serverless: Hard to port
    - Container: Easy, provider-agnostic
- Latency
    - Serverless: Cold start happens, unideal for time-critical workloads
    - Container: Low-latency, ideal for time-critical workloads
- Batch jobs
    - Serverless: Unideal for long-running apps (function time limit)
    - Container: Best for long-running apps with no time restrictions
- App control
    - Serverless: Lack of control, only CPU and memory are configurable
    - Container: Can configure anything including apps and resources
- Data control
    - Serverless: Lack of control, provider-managed
    - Traditional: Full control
- Language support
    - Serverless: Popular languages only
    - Container: Any language

### FaaS Model
- Function-as-a-Service or FaaS, is a type of cloud-computing service that allows you to execute code in response to events without the complex infrastructure typically associated with building and launching microservices applications.
- Characteristics
    - It is a subset of serverless computing. 
        - It creates applications in the form of multiple functions where a function is a piece of software written in any programming language.
    - FaaS can be deployed on hybrid clouds as well as on-premises environments.
    - It is stateless but can maintain state using external caches.
    - Functions execute in milliseconds and process individual requests in parallel, thus making them instantaneously scalable.
    - It is lightweight and uses the decoupling architecture mechanism.
    - FaaS is billed on the time taken to run functions and not on server instance sizes.
    - With FaaS, you can divide the server into functions that can be scaled automatically and independently so you don’t have to manage infrastructure.
        - This allows you to focus on the app code that reduces time-to-market.
- Benefits
    - Cost
        - You pay only when an action occurs.
        - When the action is complete, everything stops.
            - No code runs, no server idles, and no costs are incurred.
    - Scalability
        - Since the functions are stateless, small and independent pieces of code, they can be scaled automatically, independently, and instantaneously, as required.
        - If demand drops, they automatically scale back down.
    - Availability
        - FaaS offers inherent high availability because it is spread across regions and availability zones and can be deployed without incremental costs. 
- Faas + BaaS + API Gateway
    1. Event requests are received from different channels like an HTTP request, webhooks from repositories such as Github and Docker Hub, and scheduled jobs.
    2. These requests go through the API Gateway which identifies and forwards them to the respective functions.
    3. The functions then process these requests, and they are further directed (if necessary) toward the backend services (such as file and object storage, block storage, notification services, and so on) for further processing and/or storage.
    4. The output or response is then sent back to the client through the FaaS component and the API Gateway.
- Principles
    - FaaS functions should be designed to do a single piece of work in response to an event.
        - Make your code scope limited, efficient, and lightweight so that functions load and execute quickly.
    - Too many functions will increase your costs and remove the value of the isolation of your functions.
        - The value of FaaS is in the isolation of functions.
    - Using too many third-party libraries can slow down the initialization of a function and make them harder to scale.
- Vendors
    - Google Cloud Functions
    - Amazon AWS Lambda
    - Microsoft Azure Functions
    - IBM Cloud Functions
    - RedHat OpenShift Cloud Functions
    - Self-hosted
        - Fission (on Kubernetes)
        - Fn Project (container-native)
        - Knative (on Kubernetes)
        - OpenFaaS (on Linux/Windows process)

### Serverless Framework
- The Serverless Framework is a free and open-source web framework written using Node.js.
    - It was originally designed to provision your Amazon Web Services or AWS Lambda Functions, Events and infrastructure Resources safely and quickly.
- Serverless Framework is a command line interface or CLI that offers structure, automation and best practices out-of-the-box.
    - Allowing you to focus on building sophisticated, event-driven, serverless architectures, comprising of functions, events, resources, and services
- Elements
    - Functions
        - A function is merely code, deployed in the cloud, that is most often written to perform a single task.
        - Each function is an independent unit of execution and deployment, like a microservice.
        - A task can be saving a user to the database or performing a job at a specified time.
    - Events        
        - Functions are triggered by events, and events come from other resources.
    - Resources 
        - Resources are infrastructure components which your functions use, such as a database provided to you as a service by your cloud provider.
    - Services
        - A service is the Framework's unit of organization.
            - You can think of it as a project file, though you can have multiple services for a single application.
        - A service is configured via a serverless.yml file where you define your functions, events and resources to deploy.
            - The serverless.yml file controls everything in your service.
            - There are specific sections in serverless.yml to specify functions, events, and resources.
        - When deploying with the Framework CLI, everything in the configuration file is deployed at once.
- Example
    1. Install Serverless CLI using `npm install -g serverless`
    2. Run the `serverless` command to create your first AWS HTTP API using Python.
        - The command will take you through a wizard and once deployed, will provide you with a URL.
    3. If you open in the browser, you will see the outcome as shown.
    4. You change the function code to return Hello World on request.
        ```
        def hello(event, context):
        body = "Hello World"
        response = {"statusCode": 200, "body": body}
        return response
        ```
    5. Then you can simply redeploy using `serverless deploy` and test again. 

### Serverless Reference Architecture - To-do WebApp
- The Web Application reference architecture is a general-purpose, event-driven back-end that uses,
    - AWS Lambda, Amazon API Gateway for its business logic
    - Amazon DynamoDB as its database
    - Amazon Cognito for user management
    - All static content in the application is hosted using AWS Amplify Console. 
- Front-end 
    - Front-end Application contains all the static content generated using the Create React App which works with the help of HTML files CSS for styling JavaScript to run on the client, and images.
        - All these objects are hosted on AWS Amplify Console.
    - When a user connects to the website, the needed resources are downloaded to their browser and start to run there.
    - When the application needs to communicate with the back end, it does so by issuing REST API calls to the back end. 
- Back-end
    - The back end application is where the actual business logic is implemented.
        - The logic is hosted in Lambda functions accessed by your front end via API Gateway using REST API.
        - The data is then stored in DynamoDB.
    - The To Do application limits the users to their own to do items.
        - Thus, the users have to be registered and authenticated to access their individual To Do items.
        - To accomplish this, you use Cognito User Pools, which allows users to register to the application and authenticate them.

### Serverless Use Cases
- Event streaming
    - These applications can be written and deployed without setting up-front infrastructure.
        - And can be triggered from publisher, subscriber topics or from event logs, giving you elastic, scalable event pipelines without the maintenance of complicated clusters.
    - These event streaming pipelines can,
        - Power your analytics systems 
        - Update secondary data stores and caches
        - Feed monitoring systems
- Post-processing
    - Such as Image and Video Manipulation
        - where you can dynamically resize images or change video transcoding for different target devices.
    - Post-processing could also be used for image recognition or artificial intelligence purposes, to detect if there are any shadows on your passport photo.
- Multi-language
    - Serverless applications can be multi-lingual.
        - When you build an application, you need to decide on the language to use in the application.
            - They prevent teams from language lock-in, where they have to indefinitely use the same language as their legacy software.
    - Usually, the language chosen to build the application is not what suits the project best, but rather depends on the available resources. 

---

# 5. Continuous Integration / Continuous Delivery
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

## 5-1. Continuous Integration
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

## 5-2. Continuous Delivery
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

## 5-3. Continuous Deployment/Release
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

## 5-4. Infrastructure as Code
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

