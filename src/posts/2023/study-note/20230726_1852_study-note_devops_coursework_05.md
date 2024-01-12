---
title: "[Study Note] Coursework: DevOps and Software Engineering - Microservices"
date: 2023-07-26T18:52
thumb: "devops.jpg"
tags: 
    - ❮Study Note❯
    - DevOps
    - software engineering
    - cloud computing
    - web development
---

# 5. Microservices and Serverless Development

## 5-1. Microservices
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

## 5-2. Web APIs

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

## 5-3. Serverless Computing

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
