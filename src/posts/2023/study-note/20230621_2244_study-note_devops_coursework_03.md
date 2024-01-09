---
title: "[Study Note] Coursework: DevOps and Software Engineering - Cloud Infrastructure"
date: 2023-06-21T22:44
thumb: "devops.jpg"
tags: 
    - ❮Study Note❯
    - DevOps
    - software engineering
    - cloud computing
    - web development
---

# 3. Cloud Infrastructure

## 3-1. Infrastructure Architecture
- After choosing the cloud service model and the cloud type offered by vendors, customers need to plan the infrastructure architecture. 
- A cloud region, is a geographic area or location where a cloud provider’s infrastructure is clustered, and may have names like NA South or US East.
    - The cloud regions are isolated from each other so that if one region was impacted by a natural disaster like an earthquake, the cloud operations in other regions would keep running. 
- Each Cloud Region can have multiple Zones (or Availability Zones or AZ for short), which
are typically distinct Data Centers with their own power, cooling and networking resources.
    - The isolation of zones improves the cloud’s overall fault tolerance, decreases latency, and avoids creating a single shared point of failure. 
    - The Availability Zones (and Datacenters within them) are connected to other AZs and regions, private datacenters and the Internet using very high bandwidth network connectivity. 
        - A cloud datacenter is a huge room or a warehouse containing cloud infrastructure.
        - These data centers contain pods and racks or standardized containers of computing resources such as servers, as well as storage, and networking equipment - virtually everything that a physical IT environment has.
- Computing resources
    - Virtual Servers
        - Most of the servers in a cloud datacenter run hypervisors to create virtual servers or virtual machines (also called VMs for short), that are software-based computers, based on virtualization technologies.
    - Bare Metal Servers
        - A single-tenant, dedicated physical server that aren’t virtualized.
        - Customers can provision VMs and Bare Metals servers as and when they need them and run their workloads on them. 
            - The customer is responsible for administering and managing everything else on the server.
    - Serverless
        - An abstraction layer on top of virtual machines
- Storage
    - Local drive
        - Bare Metal Servers and Virtual Servers are provisioned with default storage in local drives.
        - Since these cloud servers can be provisioned and decommissioned by customers on demand and freed up for use by other users, any information stored in a local drive can be lost when you delete or decommission a cloud server. 
    - Block storage
    - File storage
        - Block and file storage modes are commonly used in traditional data centers, but often struggle with scale, performance and distributed characteristics of cloud. 
    - Object storage
        - Object storage is the most common mode of storage in the cloud as it’s both highly distributed and resilient. 
- Networking
    - Software Defined Networking (SDN)
        - Cloud providers have SDN options where certain networking resources are virtualized or made available programmatically, through APIs.
            - This allows for easier network provisioning, configuration, and management in the cloud.
        - When servers in the cloud are provisioned, you need to setup their public and private network interfaces.
            - Public network interfaces connect the servers to the public internet.
            - Private network interfaces provide connectivity to your other cloud resources and help keep them secure. 
    - In a cloud environment, it is even more important to configure which network traffic and users can access your resources, which can be done by setting up Security Groups and Access Control Lists (ACLs)
    - Most Cloud providers provide 
        - Virtual Local Area Networks (VLANs)
        - Virtual Private Clouds (VPCs)
        - Virtual Private Networks (VPNs)
        - Some of the traditional hardware appliances such as firewalls, load balancers, gateways and traffic analyzers can also be virtualized and made available as services in the cloud. 
    - Content Delivery Network (CDN)
        - CDNs distribute content to multiple points throughout the world so users accessing the content can access it more quickly by getting it from a point nearest to them. 

## 3-2. Serverless Computing
- Serverless is an approach to computing that offloads responsibility for common infrastructure management tasks such as scaling, scheduling, patching, and provisioning application stacks to cloud providers.
    - It allows developers to focus their time and effort on the code and business logic specific to their applications or process.
        - Inherent
        - Automatic scaling
        - Rapid provisioning
- Serverless doesn’t mean there are no servers.
    - Only that the management of the underlying physical or virtual servers is removed from their users.
- Serverless computing runs code only on-demand on a per-request basis, scaling transparently with the number of requests being served. 
    - Serverless enables end users to pay only for resources being used, never paying for idle capacity.
- Code is executed as individual functions where each function runs inside a stateless container.   
    - No prior execution context is required to serve a request; and with each new request, a new instance of the function is invoked. 
- Suitable for,
    - Short-running (seconds or minutes) stateless functions
    - Seasonal workloads with varying off-peak and peaks
    - Production volumetric data that shows too much idle time
    - Event-based processing or asynchronous request processing for implementing use cases
    - Microservices that can be built as functions that are stateless
    - Data processing, IoT, microservices, and mobile backends
- Use cases
    - Structured text and multimedia data processing
        - Data enrichment
        - Transformation
        - Validation and cleansing
        - PDF processing
        - Audio normalization
        - Thumbnail generation
        - Video transcoding
    - Parallel tasks 
        - Data search and processing
        - Genome processing
    - Data stream ingestion
        - Business data streams
        - IoT sensor data
        - Log data
        - Financial market data
- Concerns
    - For workloads characterized by long-running processes, managing a traditional server environment might be simpler and more cost-effective.
    - Serverless application architecture can be vendor dependent, and so there is a potential for vendor lock-in, particularly involving platform capabilities such as,
        - Authentication
        - Scaling
        - Monitoring
        - Configuration management
    - Because serverless architectures scale up and down in response to workload,, they also sometimes need to start up from zero to serve a new request.
        - For certain cases like a low-latency financial application, this delay wouldn’t be acceptable. 
- Vendors and products
    - IBM Cloud Functions (based on Apache OpenWhisk)
    - AWS Lambda
    - Microsoft Azure Functions

## 3-3. Cloud Storage
- Cloud providers host, secure, manage, and maintain the cloud storage and associated infrastructure to ensure you have access to your data when you need it. 

### Direct-attached/Local Storage
- Storage which is presented directly to a cloud-based server and is effectively either within the host server chassis or within the same rack.
- This storage is fast and normally used to store a server’s operating system.
- Ephemeral
    - It only lasts as long at the compute resource it’s attached to. If the system is not running, neither does the storage.
- Direct-attached storage  cannot be shared with other nodes, and while you can use RAID techniques, it’s not as resilient to failure as other types of storage. 

### File storage
- File storage must be attached to a compute node before
it can be accessed and have data stored on it.
    - Typically presented to compute nodes as ‘NFS Storage’.
        - NFS stands for Network File System and means that the storage is connected to compute nodes over a standard but dedicated ethernet network.
    - The speed tends to be slower and potentially vary than either direct-attached storage or block storage because the data travels over an ethernet network.
        - File storage is for workloads where consistently high network speeds are not a requirement. 
- You can also provision much larger amounts of File Storage and present it as a disk to a server.
    - File storage is mounted from remote storage appliances, managed by the service provider.
        - The physical disks are contained in a separate, specialised piece of hardware and they are then connected to the compute node via the underlying infrastructure in the datacenter. 
        - These storage appliances are not only extremely resilient to failure, the data is also far more secure in them as these storage appliances offer services such as encryption in transit and encryption at rest. 
- One advantage of File Storage is that it can be mounted or used on multiple servers at once.
    - which can be mounted onto 80 computer nodes or more.
    - Suitable for some kind of common storage
        - e.g. A departmental file share, a ‘landing zone’ for incoming files that need to be processed by an application, or a repository of files that a web service might access. 
- The speed the disks can read and write is measured by IOPS, the higher, the pricier.
    - Evaluate your need and choose the right one to avoid bottleneck and overpayment.
- File-based storage is a simple, straightforward approach to data storage and works well for organizing data in a hierarchical folder structure, that desktop users are familiar with.
    - File Storage can be less expensive, more resilient to failure, and involve lesser disk management and maintenance, compared to local storage.
    - It tends to be lower cost than either direct attached or block storage.

### Block storage
- Like direct-attached storage and file storage, block storage also must be attached to a compute node before it can be utilized for your workloads.
    - Block storage is presented to compute nodes using high-speed fibre connections.
        - Which means that read and write speeds are typically much faster and reliable than with file storage. 
            - Making block storage suitable for use with databases and other applications where disk speed is important.
    - Unlike File Storage, Block storage is normally mounted onto only one compute node at a time.
        - Block storage is not suitable for workloads where there needs to be some level of disk sharing between compute nodes. 
    - Block storage, like file storage, can be mounted from remote storage appliances to make it resilient and secure.
- Block storage breaks files into chunks (or blocks) of data and Stores each block separately under a unique address.
    - You typically provision block storage in ‘volumes’, which can then be mounted onto a compute node, which it then effectively sees as another hard drive.
- Persistence
    - When provisioning File or Block storage, the term relates to what happens to the storage once the compute node it is attached to is terminated.
    - If the storage is set to ‘persist’ then it will not be deleted along with the compute node, meaning that it and its data are preserved and available to mount onto another compute node.
        - Though you will continue to pay for the storage.
    - You can also set the storage so that it is automatically deleted with the compute node that it is mounted onto. It becomes Ephemeral Storage.
        - You will also stop paying for the storage but you will lose any data unless it is backed up somewhere.
- Snpashot
    - Snapshot is a point-in-time image of the storage.
        - The way to back up both File and Block storage.
    - Snapshots are usually fast to create. 
        - They don’t actually write any data, or rather they create metadata
    - Sanpshots don’t require downtime 
    - Subsequent snapshots record only changes to the data.
    - Great for returning storage to the way it was at a particular snapshot.
        - They cannot be used to recover individual files, though.
- Block storage is a good choice when supporting an application that needs consistent fast access to disk, such as databases.
    - They are perfect for workloads that need low-latency storage to work effectively.
    - Remember to consider the IOPS requirements of the application when provisioning either file or block storage. 

### Object storage
- Object storage is not attached to a compute node, rather it is accessed via an API, to upload, download, and manage your data.
- Object storage is effectively infinite in size to the end user.
    - Unlike File and Block storage where you provision a certain storage capacity and it fills up over time, you can keep adding files to it and it never fills up, you just pay for what you use.
- Object storage is by far the cheapest.
    - You do not need to specify a size for a bucket, you can just use as little or as much space as you need and just pay for that amount.
 But slowest in terms of read and write speeds.
    - Does not come with IOPS options.
    - Not be suitable for running operating systems, nor applications such as databases or anything else where the contents of the files changes. 
- The service provider also takes care of resilience and making sure that the Object Storage solution is highly available.
    - Some cloud providers offer different types of buckets with different levels of resilience. 
        - e.g. Data being stored in multiple datacenters in duplicate, more resilient but pricier
- Tiers
    - Standard tier
        - Store objects that are frequently accessed
        - Highest cost per gigabyte
    - Vault/Archive tier
        - Store objects that are accessed once or twice a month
    - Cold vault tier
        - Store data that is typically accessed once or twice a year
        - Very cheap
        - Can take hours for retrieval
    - Automatic archiving
        - Automatic archiving rules for your data
        - Automatically be moved to a cheaper storage tier if object isn't accessed too long.
- Object Storage can be a fantastic repository for storing either small or large amounts of all sorts of unstructured data types.
    - Effective solution for backup and disaster recovery
    - Replacement for offsite backups
    - Many backup solutions come with built-in options for object storage on cloud
    - More efficient that tape backups for geographic redundancy

## 3-4. Virtualization

### Hypervisor
- Type 1 Hypervisor
    - a.k.a. bare-metal hypervisors
    - A hypervisor that is installed directly on top of the physical server.
    - e.g. VMware, ESXi, Microsoft Hyper-v, KVM
- Type 2 Hypervisor
    - a.k.a. hosted hypervisors
    - There is a layer of host OS that sits between the physical server and the hypervisor.
        - Mostly used for end-user virtualization.
        - Have a higher latency than a Type 1 hypervisor
    - e.g. Oracle VirtualBox, VMware Workstation

### Virtual Machine
- A VM is simply a software based computer. 
    - They're run like a physical computer. 
- They have an operating system and applications, and they're completely independent of one another.
    - But you can run multiple of them on a hypervisor and the hypervisor manages the resources that are allocated to these virtual environments from the physical server.
- You can move a virtual machine from one hypervisor to another hypervisor on a completely different machine almost instantaneously, which gives you a lot of flexibility and a lot of portability within your environment.
- Benefits
    - Cost savings
        - You can drastically reduce your physical infrastructure footprint and save on maintenance costs.
    - Agility and speed
        - Spinning up a virtual machine is relatively easy and quick, a lot more simple than provisioning an entire new environment 
    - Lower downtime
        - If the host goes down, you can simply move your VMs very quickly to another hypervisor on a machine that is working. 

### Virtual Machine Types
- Shared/Public VMs
    - Provider-managed, multi-tenant deployments that can be provisioned on-demand with predefined sizes.
        - Being multi-tenant means that the underlying physical server is virtualized and is shared across other tenants or users.
    - To satisfy different workloads, cloud providers offer predefined sizes and configurations ranging from a single virtual core and a small amount of RAM to multiple virtual cores and much larger amounts of RAM. 
        - Rather than pick from only pre-defined sizes, some providers also offer custom configurations that allow users to define the number of cores and RAM and local storage characteristics. 
- Dedicated 
    - Single-tenant VMs
        - Only your VMs run on a given host so they can make exclusive use of full capacity and resources of the underlying hardware.
    - When provisioning a dedicated host, you need to specify the data center and POD in which you want your host placed.
        - You then assign instances, or virtual machines, to a specific host. 
        - This allows for maximum control over workload placement.
    - Dedicated hosts are typically used for meeting compliance and regulatory requirements or meet specific licensing terms.
- Transient/Spot VMs
    - Take advantage of unused capacity in a cloud data center.
        - Cloud providers make this unused capacity available to users at a much lower cost than regular VMs of similar sizes.
    - Although the Transient VMs are available at a huge discount, the Cloud provider can choose to de-provision them at any time and reclaim the resources for provisioning regular, higher-priced VMs.
        - Because you run the risk of losing these VMs when capacity in the data center decreases, these VMs are great for non-production workloads such as testing and developing applications.
        - They are also useful for running stateless workloads, testing scalability, or running big data and high performance computing (HPC) workloads at a low cost.
- Reserved VMs
    - This virtual server instances allow you to reserve capacity and guarantee resources for future deployments.
        - You reserve desired amount of virtual server capacity, provision instances from that capacity when you need them, and choose a term, such as 1 year or 3 years, for your reserved capacity.
        - You're guaranteed this capacity within the data center of your choice for the life of the contract term.
            - By committing to a longer term, you can also lower your costs compared to hourly or monthly instances.
    - This can be useful when you know you require at least a certain level of cloud capacity for a specific duration.
    - If you exceed your reserved capacity, you can always choose to supplement your unplanned usage and capacity requirements with hourly or monthly VMs.
        - Note however that not all predefined VMs families or configurations may be available as reserved.

## 3-5. Containerization
- In 2008, Linux kernel introduced 'C groups' that basically paved the way for all the different container technologies like Docker, Cloud Foundry, Rocket, etc.
- Containers are an executable unit of software in which application code is packaged, along with its libraries and dependencies in common ways.
    - So that it can be run anywhere - desktops, traditional IT, or the cloud.
- Containers are lighter weight and consume fewer resources than Virtual Machines.
    - Helping streamline the development and deployment of cloud native applications. 
- With container-based technology, we can truly take advantage of cloud native based architectures. 
- Advantages
    - Lightweight
    - Portable
    - Modular
    - Scalable
    - DevOps and Agile-friendly
    - CI/CD-friendly

### Problems with Traditional VMs
- Bloat
    - Even though we're working with a really lightweight application, to create that Linux VM, we have to put that guest OS in there in a set of binaries and libraries. That really bloats it out.
        - e.g. The smallest node .js VM would be 400 plus megabytes, whereas the node.js runtime and app itself would be under 15.
- Scalability
    - In order to deploy duplicate applications built for the same environment, we have to use and deploy that separate guest OS and libraries every time.
        - This is going to consume all of the resources on the hardware.
- Compatibility 
    - Where things might be working on your local machine, but when you try to push it into production, things start to break.
        - This really gets in the way of doing agile DevOps, and continuous integration and delivery. 

### Container Deployment Process
1. Manifest
    - Something that describes the container itself.
        - e.g. Dockerfile (Docker), Manifest Channel (Cloud Foundry)
2. Create a container image
    - e.g. Docker Image (Docker), Application Container Image (Rocket)
3. Push the image to a registry to deploy out containers
4. Run the deployed container
    - Run the actual container itself, that contains all of the runtimes, and libraries, and binaries needed to run an application.
    - That application runs on a very similar set up to the VMS. But instead of using a hypervisor, it uses a runtime engine.
        - e.g. Docker Engine (Docker)

## 3-6. Bare Metal Server for Cloud Computing
- The cloud provider actually takes the physical server and plugs it into a rack in a data center for customers.
    - The cloud provider manages the server up to the operating system or OS, which means if anything goes wrong with the hardware or rack connection, they will fix or replace it and then reboot the server. 
- The customer is responsible for administering and managing everything else on the server.
    - Fully customizable, software-wise.
    - Bare metal servers are dedicated and intended for long term, high performance use in highly secure and isolated environments.
    - Clients have full access and control of bare metal servers because there’s no hypervisor required.
- Bare metal servers are either preconfigured by the cloud provider to meet workload packages, or they can be custom-configured as per customer specifications.
- Because bare metal servers are physical machines, they take longer to provision than virtual servers.
- Unlike virtual servers, not all cloud providers provide Bare Metal servers.
- Use cases
    - Long term, high performance use in highly secure and isolated environments
    - Systems with sensitive data, such as ERP and CRM
    - Big data analytics applications and GPU-intensive solutions
        - AI, Deep Learning, and virtualization

## 3-7. Network Structures for Cloud
- In the cloud, networking functions are delivered as a service rather than in the form of rack-mounted devices. 
- To create a network in the cloud, one starts by defining the size of the network, or the IP address range that establishes the boundaries or the cloud network.
- Cloud networks are deployed in networking spaces that are logically separated segments of the networks using options, including Virtual private Cloud (VPC) that in turn can be divided into smaller segments called subnets.
    - Logically segmented cloud networks are private carveout of the cloud that offer customers the security of private clouds and the scalability of public clouds.
- Cloud resources, such as VMs or Virtual Server Instances (VSIs), storage, network connectivity and load balancers are deployed into subnets.
    - Using subnets allows users to deploy enterprise applications using the same multi-tier concepts used in on-premises environments.
    - Subnets are also the main area where security is implemented in the cloud.
        - Every subnet is protected by Access Control Lists (ACLS) that serve as a subnet-level fire wall.
        - Within the subnet, one could create Security Groups that provide security at the instance level such as VSIs.
- Once you build a subnet, add some VSIs and storage to it so that you could run your applications. 
- A public Gateway instance is added to the network to enable users’ access to the application in the internet tier.
    - While public gateways are great for Internet access to the cloud, enterprises are interested in extending their on-premises resources to the cloud by securely connecting them using Virtual Private Networks, or VPNs. 
- When building many subnets and deploying several workloads, it becomes necessary to ensure that applications continue to be responsive.
    - That is achieved with Load Balancers that ensure availability of bandwidth for the different applications.
    - Enterprises with hybrid cloud environment find using dedicated high-speed connections between clouds and on-premises resources is a more secured and more efficient way than public connectivity solutions. 

## 3-8. Content Delivery Network (CDN)
- CDN is a distributed server network that delivers temporarily stored, or cached, copies of website content to users, based on the user's geographic location. 
    - A CDN stores this content in distributed locations and reduces the distance between your website visitors, and your website server.
        - Drastically reducing the amount of time that it takes to retrieve that content. 
- The indirect benefit is that you actually see a reduction in the load, or a reduction in the amount of capacity that you need in one congested location, to serve all other users.
    - Also because the users are not really directly communicating with the servers down in congested location, you have the indirect benefit of an increase in security through obscurity. 

## 3-9. Cloud Native Applications
- Cloud native application is an application developed from the outset to work only in the cloud environment, or an existing app that has been refactored and reconfigured with cloud native principles. 
    - This consists of microservices working together as a whole to comprise an application, yet each can be independently scaled and iterated through automation and orchestration processes.
    - These microservices are often packaged in containers, which are executable units of software in which the application code is packaged along with its libraries and dependencies so that it can be run anywhere. 
        - This independence enables frequent, iterative improvement of cloud native applications, without disrupting the experience of end-users. 
- Developers adhere to a consistent set of development principles
    - Follow the microservices architectural approach by breaking applications down to single-function microservices.
    - Rely on containers for maximum flexibility, scalability, and portability.
    - Adopt Agile methods that speed the creation and improvement process through quick iterative updates based on user feedback. 
- Everything that lives in the cloud should have a cloud native app design and approach.
    - This means our application code needs to be instrumented with things like,
        - Standardized logging
        - Standardized events
        - Being able to match those logging and events to a standard catalog, that multiple microservices and cloud native apps can use.
        - Distributed tracing
            - Things like load balancing, service discovery, and routing are commoditized in this layer with, such as Istio and Knative.

## 3-10. DevOps on the Cloud
- While DevOps can apply to applications anywhere, there is especially a compelling case for DevOps when it comes to cloud-ready, and cloud-native applications. DevOps and Cloud share a symbiotic relationship.
    - With its near limitless compute power and available data and application services, cloud computing platforms come with their own risks and challenges.
    - DevOps’ tools, practices, and processes are helping tackle some of the complexities and challenges posed by the cloud and allowing solutions to be delivered—quickly and reliably. 
- DevOps best practices make it possible to programmatically provision servers, build middleware, install application code, and fully automate the installation process in a way that is documented, repeatable, verifiable, and traceable.
- Application deployments often involve considerable complexity. 
    - The DevOps’ practices of continuous integration and continuous deployment help create a fully automated deployment pipeline, which is important all through the application development lifecycle.
    - Cloud native applications form a complex distributed system with multiple moving parts, independent tech stacks, and rapid release cycles.

## 3-11. Application Modernization (AppMod)
- Application Modernization helps organizations accelerate their digital transformation, take advantage of new technologies and services, and become more responsive to changing market dynamics. 
    - Cloud computing is one of the key enablers of application modernization.
- Architecture 
    - Monoliths
        - → Distributed/service-oriented architecture
            - → Microservice
- Infrastructure
    - Physical servers
        - → Virtual machines
            - → Cloud backend
- Delivery
    - Waterfall
        - → Agile
            - → DevOps

## 3-12. Cloud Security
- In the cloud model, that's a shared responsibility between you and the cloud provider.
    - It's very important to understand the adoption model, whether you're consuming Iaas, or PaaS, or if you're consuming SaaS, where the club provider manages all the applications.
        - And the security of it, the data that you bring in, and plan accordingly.
            - Is it confidential data?
            - Is it public data or sensitive data, that may deal with private information? 

### Data security
- Encryption for data at rest
    - Make sure you have data at rest encryption so that the data is always encrypted regardless of storage types.
- Key management
    - If you are bringing confidential data, you want to bring your own keys, that's professional.
        - Having more control of your keys, provide you the ability in the context of shared responsibility model that you own your data.
        - How much control of the keys you have and the hardware security module in which the key processing the encryption/decryption operations happen.
- Encryption for data in motion
    - Your request and API requests coming all the way - data in motion - needs to be encrypted too.
- Memory protection for data in use
    - In the new world you need to start thinking about when the application is actually processing the data, that is going to be data in this memory.
        - Protect data using hardware based technologies where you can protect in-memory data as well.
        - When the data is in use, and in memory by the applications, you can protect it.
- Take a holistic approach to data protection at rest, in motion, in use, with full control of your keys.

### Application security
- Make sure there are no vulnerabilities in your application. So scan your applications.
    - Have an AppSec, application security, approach so that you can do dynamic scanning or static scanning of your application before you deploy it into the production. 

### Container security    
- Scan your images.
    - You can scan it for vulnerabilities before you deploy, and set your policies so that you only have secured images in production any time.
- If there is any vulnerability in the new world, you don't need to patch these systems, you just spin up a new container and off you go.
    - That's the beauty of a cloud native approach; that you have security built in in every step, at a container level and the applications that serves the business logic.

### Access Control
- Access control for data and application 
    - Make sure the data access is only on need by need basis.
        - Do not open up your data services to the whole world, be it network access, or everybody to access the data.
        - Make sure you exactly know which applications need to access, or which users need to access the data to run your cloud applications.
    - You need to make sure who the user is, or which service it is, based on the identity of those services or users, so that you can maintain access control to your application or data.
- Access control for network
    - Also from the perspective of network access, you want to make sure only authorized users can get in.
        - If there are intruders out there, you can make sure you set it up so that they are prevented from accessing your application and your data in the cloud.
            - Through web application firewalling, network access control, or distributed denial of service protection, and have intelligence built into these network protections as well.

### Security Monitoring
- You need to have a continuous security monitoring so that you know at any point whether you're compliant, your policies, you can watch out for threats that you need to manage. 
    - Having an approach and set of tools to manage security and compliance posture is very important.
- Gain insight
    - Gain insights through security events, audit logs, flow logs from network or system that can be fed in so that you can figure out what your posture, and complaints, and threats are.
- Actionable intelligence 
    - You may figure out there's a vulnerability; a container image that you have deployed is vulnerable, so you can remediate and respin up a new container. 
    - There may be a particular access from a network that seems to be coming in from a suspicious network IP address. You can block that.
- SecDevOps approach
    - Security needs to be a forethought, not an afterthought.
        - It should become SecDevOps approach to the way you build, manage, and run your applications. 
    - You need to embed security into the entire lifecycle, what we call "shift left". 
        - Not only will you manage security, but shift left through the entire process. You need to have a secure design.
    - Take that into account along with what integrations you need to do, so that you can plan it and architect it. Then as you build it, embed security as part of that process.
        - What kind of data am I going to put, what level of classification? 
        - What kind of applications am I building? Is it container-based? Is it a workload that I'm migrating? 
    - Do you have security aware applications? 
        - For example, you may want to encrypt data, or the sensitive data. You may want to encrypt the data from your applications before you even store it into a data store. 
        - As part of SecDevOps, as you have secure design and architecture, you pass on that and build secure applications and deploy and manage security in continuous fashion.
            - Then you have a closed loop so that whatever you find, you may need to remediate, or rearchitect your application, or implement certain things as the threats landscape evolves.

### Cloud Monitoring and Assessment
- Cloud monitoring
    - Cloud monitoring includes the strategies, practices, and processes that need to be in place for analyzing, tracking, and managing cloud-based services and applications.
        - It also serves to provide actionable insights that can help improve availability and user experience. 
    - Cloud monitoring needs to be a priority for organizations looking to leverage the benefits of cloud technologies.
        - There needs to be active monitoring of all connected systems and cloud-based services to maintain visibility of all data exchanges between public, private, and hybrid cloud environments. 
            - This ensures that the cloud provides a trusted platform that can securely integrate with your enterprise data centers.
        - It will help you manage and optimize your cloud resources for cost and performance, and create better customer experiences. 
- Cloud monitoring solutions
    - Monitoring performance across an entire stack of applications and services can be time-consuming and draining on internal resources.
    - Cloud monitoring solutions assess data, application, and infrastructure behaviors for,
        - Performance
        - Resource allocation
        - Network availability
        - Compliance
        - Security risks and threats
    - Cloud monitoring solutions provide,
        - Data in real-time with round the clock monitoring of virtual machines, services, databases, and applications
        - Multilayer visibility into application, user, and file access behavior across all cloud-based applications and services
        - Advanced reporting and auditing capabilities for ensuring regulatory standards are being met
        - Large-scale performance monitoring integrations across multicloud and hybrid cloud environments
- Cloud monitoring solution types
    - Infrastructure monitoring
        - Infrastructure monitoring tools help identify minor and large-scale hardware failures and security gaps so that developers and administrators can take corrective action before problems affect user experience. 
    - Database monitoring
        - Database monitoring tools help track processes, queries, and availability of services to ensure the accuracy and reliability of database management systems. 
    - Application Performance monitoring
        - APM measures application availability and performance, providing tools needed to troubleshoot issues in an application's environment.
        - APM solutions help improve user experience, meet application and user service level agreements (SLAs), minimize downtime, and lower overall operational costs. 
- Cloud monitoring benefits
    - Accelerate the diagnosis and resolution of performance incidents.
    - Control the cost of your monitoring infrastructure.
    - Mitigate the impact of abnormal situations with proactive notifications.
    - Get critical Kubernetes and container insights for dynamic microservice monitoring.
    - Troubleshoot your applications and infrastructure.
- Cloud monitoring best practices
    - Leverage end-user experience monitoring solutions to capture the performance of an application from the point of view of its end users.
        - These solutions monitor user journeys to track parameters such as application response time and frequency of use under varied conditions.
        - These insights will help you to improve customer experience significantly.
    - Consider moving all aspects of your infrastructure, whether in private, public or hybrid clouds, under one unified monitoring platform.
        - This can help you to manage all your KPIs in one place with complete visibility into performance optimization.
    - Use monitoring tools that can help you track the usage and cost of your cloud resources and services.
    - Increase cloud monitoring automation.
        - This can help you gain significant operational efficiencies.
    - Simulate outages and breach scenarios to evaluate how well your monitoring tools capture and alert against failures.

### Identity and Access Management
- According to the Cloud Security Report by Cybersecurity Insiders, the top cloud security concern of cybersecurity professionals is data loss and leakage.
    - Unauthorized access through misuse of employee credentials and improper access controls is the single biggest perceived vulnerability to cloud security, followed by insecure interfaces and APIs. 
- Identity and Access Management, also known as access control, works as the first line of defense, allowing you to authenticate and authorize users and provide user-specific access to cloud resources, services, and applications. 
    - A comprehensive security strategy needs to encompass the security needs of a wide audience — including organizational users, internet and social-based users, third-party business partner organizations and vendors.
- Cloud providers offer Identity Access and Management services, typically including the ability to create access groups, add users to access groups, and manage access for existing users.
    - Access group
        - A group of users and service IDs created so that the same access can be assigned to all entities within the group with one or more access policies.
        - Access groups provide a more streamlined access assignment process as compared to assigning individual access to each user and help reduce the number of policies in an account.
    - Access policies 
        - Define how users, service IDs, and access groups in the account are given permission to access account resources.
        - Policies include,
            - A subject, which can be users, service IDs, or access groups.
            - A target, which is the resource or provisioned service offering, to which you want to provide access.
            - Role, which defines the actions allowed on the target of the policy, that is, the resource to which the access is being granted.
- Main types of users    
    - Administrative Users
        - Administrative users include cloud platform administrators, operators, and managers: roles that typically create, update, and delete application and service instances, and also need insight into their team members’ activities.
        - An attacker on an administrative account can steal data from production database service instances, deploy malicious applications inside the customer's domain, or even deface or destroy existing applications.
    - Developer Users
        - Developer users include cloud application developers, platform developers, and application publishers.
        - Developer users are authorized to read sensitive information and to create, update, and delete applications.
    - Application Users
        - These are the users of the cloud-hosted applications.
- Key components
    - Authentication
        - The identity service enables applications deployed to the cloud to authenticate users at an application level, based on a range of identity providers,
            - such as the cloud directory, social identity providers such as Google, LinkedIn, Facebook, and Twitter, enterprise-hosted identity provider, and cloud-hosted identity provider.
            - Sometimes API keys, or unique identifiers are passed into an API to identify the calling application or user.
        - Multifactor authentication is used to combat identity theft by adding an additional layer of authentication for application users.
            - such as single-use passwords or pins, certificates, tokens, risk-based authentication
                - Changes in the user’s location, past activity, and preferences.
    - Cloud Directory services 
        - These are used to securely manage user profiles and their associated credentials and password policy inside a cloud environment. 
        - A directory service within a cloud means that applications hosted on the cloud do not need to use their own user repository.
    - Reporting 
        - Helps provide a user-centric view of access to resources or a resource-centric view of access by users.
        - Reports typically give information about which users have access to which resources, which users have changes in access rights, which access is being exploited by each user, and under which conditions.
    - Audit and compliance
        - A critical service within identity and access management framework, both for cloud provider, and cloud consumer.
        - Auditors use these processes to validate implemented controls against an organization's security policy, industry compliance, and risk policies--and to report deviations.
    - User and service access management capability 
        - Enables cloud application and service owners to provision and de-provision customer, partner, and vendor user profiles with minimal human interaction.
        - This streamlines access control based on the role, organization, and access policies defined by the owner. 
- Maximum control for mitigating risks
    - Provisioning users by specifying roles on resources for each user
    - Password policies that control the usage of special characters, minimum password lengths and other similar settings
    - Multifactor authentication like time-based one-time passwords
    - Immediate de-provisioning of access when users leave or change roles

### Cloud Encryption
- Encryption ensures that only authorized users have access to sensitive data, and when accessed or intercepted without authorization, data is unreadable and meaningless.
    - The encryption algorithm defines the rules by which data will be transformed so that it becomes illegible.
    - The decryption key defines how the encrypted data will be transformed back to legible data. 
        - Data is encrypted upon receipt, and encryption keys are passed to the customers to decrypt data when needed. 
            - Keys need to be managed securely. If you lose your keys, you will not be able to read your data. 
- Cloud providers offer various cloud encryption services.
    - This could be limited encryption of data that is identified as sensitive, or end-to-end encryption of all data uploaded to the cloud.
- Encrypting data at rest
    - e.g. encryption for block and file storage, built-in encryption in object storage, and database encryption services. 
- Encrypting data in transit
    - e.g. Encrypting the data before transmission, authenticating endpoints, and decrypting and verifying data on arrival. 
        - Secure Sockets Layer (or SSL) and Transport Layer Security (TLS) are commonly used protocols for encryption in transit.
- Encrypting data in use
    - Encryption in use protects data when it is in use in memory for computations. 
        - It allows computations to be performed on encrypted text without needing to decrypt the data.
    - Cloud storage encryption could be server-side or client-side.
        - Server-side encryption 
            - Occurs after cloud storage receives your data, but before the data is written to disk and stored
            - For server-side encryption, you can either,
                - Create and manage your own encryption keys, known as Customer-supplied encryption keys.
                - You can generate and manage your encryption keys using key management services offered by the cloud storage provider, known as Customer-managed encryption keys.
        - Client-side encryption 
            - Occurs before data is sent to cloud storage
                - This way, users can utilize encryption keys and algorithms that are not visible to the cloud provider, making it virtually impossible for cloud providers to decrypt hosted data. 
- Multi-cloud data encryption
    - There is a need to implement a singular data protection strategy across an enterprise on-premise, hybrid, and multi-cloud deployments.
    - Some cloud providers offer multi-cloud data encryption services with a range of features such as data access management, integrated key management, and sophisticated encryption that combine to deliver the scalability and flexibility to help protect the most sensitive workloads across the enterprise, regardless of where the data resides. 
        - Using a multi-cloud data encryption console, you can define and manage access policies, create, rotate, and manage encryption keys, and aggregate access logs. 
- Encryption key management
    - Encryption does not eliminate data security risk.
        - It just separates the security risk from the data itself by moving security to the encryption keys.
    - These keys need to be managed and protected against threats in order to keep the data secure.
        - Key Management Services offered by some cloud providers help perform life cycle management for encryption keys that are used in cloud services or customer-built applications.
        - They enable customers to encrypt sensitive data at rest and to easily create and manage the entire lifecycle of cryptographic keys that are used to encrypt data. 
            - Since the keys remain in possession of the customer, the data is protected from cloud service providers as well as from other users.
- Key management best practices
    - Storing encryption keys separately from the encrypted data
    - Taking key backups offsite and auditing them regularl
    - Refreshing the keys periodically
    - Implementing multi-factor authentication for both the master and recovery keys

