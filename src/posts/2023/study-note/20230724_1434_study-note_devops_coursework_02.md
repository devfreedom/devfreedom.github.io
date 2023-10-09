---
title: "[Study Note] Coursework: DevOps and Software Engineering - Part 2"
date: 2023-07-24T14:34
thumb: "devops.jpg"
tags: 
    - ❮Study Note❯
    - DevOps
    - software engineering
    - cloud computing
    - web development
---

# 3. Containerization
- Organizations are moving to containers to overcome challenges around isolation, utilization, provisioning, performance, and more.

## 3-1. Container
- A container is a standard unit of software that encapsulates everything that programmers need to build, ship, and run applications.
    - Infrastructure, operating system, and container engine are layered, from bottom to top.
        - Container engine(runtime) runs and manages multiple apps, seperately but simultaneously, on a single operating system.
- Benefits compared to physical servers
    - Isolation and allocation
        - For physical servers, there is no way to define resource boundaries for apps in a physical server.
    - Server utilization
        - Physical servers tend to be either over-utilized or under-utilized, not optimal.
        - Containers improve utilization.
    - Provisioning and costs
        - Physical server requires long periods for provisioning resources and expensive maintenance costs.
        - Containers lower costs.
    - Performance
        - Physical servers are constrained during peak workloads.
        - Containers lower deployment time.
    - Portability
        - Applications in physical servers are not portable across multiple environments and operating systems.
    - Resiliency
        - Physical servers are complex, time-consuming, and expensive.
    - Scalability
        - Physical servers have limited scalability and resiliency.
        - Containers support next-gen applications such as microservices.
    - Automation
        - Physical servers are difficult to implement for multiple platforms.
        - Containers automate processes.
- Characteristics
    - The container engine virtualizes the operating system.
    - A container is lightweight, fast, isolated, and secure.
    - Offers easy portability
        - Multiple platforms
        - Multiple operating systems
        - Multiple languages
    - Require less memory space
    - Binaries and libraries within container enable apps to run.
    - One machine can host multiple containers.
- Challenges
    - Security impacted if operating system is affected
    - Difficult to manage thousands of containers
    - Complex to migrate legacy projects to container technology
    - Difficult to right-size containers for specific scenarios
- Vendors
    - Docker
        - Robust and most popular container platform today
    - Podman
        - Daemon-less architecture providing more security than Docker containers
    - LXC
        - Preferred for data-intensive apps and ops
    - Vagrant
        - Offers hightest levels of isolation on the running physical machine

## 3-2. Docker
- Docker is an open platform for developing, shipping, and running applications as containers.
    - Written in Go
    - Uses Linux kernel's cgroups to deliver functionality
    - Docker uses namespaces technology to provide an isolated workspace called the “container.”
        - Docker creates a set of namespaces for every container and each aspect runs in a separate namespace with access limited to that namespace.
    - Docker inspired additional innovations afterwards.
- Why popular?
    - Simple architecture
    - Scalability
    - Easy portability
- Benefits
    - Consistent and isolated environments
    - Repeatibility and automation
    - Versioning for easy testing, rollbacks, and redeployments
    - Collaboration, modularity, and scaling
        - Docker supports Agile and CI/CD DevOps practices.
    - Portability and flexibility
        - Docker speeds up the deployment process across multiple environments.
- Drawbacks
    - Docker containers are not a good fit for applications such as,
        - Applications based on monolithic architecture
        - Applications that require high performance or security
        - Applications using rich GUI features

### Docker Objects
- Dockerfile
    - A Dockerfile is a text file that contains instructions needed to create an image.
        - You can create a Dockerfile using any editor from the console or terminal. 
    - A Dockerfile must always begin with a FROM instruction that defines a base image.
        - Often the base image is from a public repository, like an operating system or a specific language like Go or Node.js.
    - The RUN instruction executes commands.
    - The CMD instruction defines a default command for execution.
        - A Dockerfile should have only one CMD instruction.
        - If the Dockerfile has several CMD instructions, only the last CMD instruction will take effect. 
- Image
    - A Docker Image is a read-only template with instructions for creating a Docker container.
    - The Dockerfile provides instructions to build the image.
    - Each Docker instruction creates a new layer in the image.
        - When you change the Dockerfile and rebuild the image, the Docker engine only rebuilds the changed layers.
        - Images can share these layers, which saves a lot of disk space as well as network bandwidth when sending and receiving images. 
    - When you instantiate this image, you get a running container.
        - At this point, a writeable container layer is placed on top of the read-only layers.
        - The writeable layer is needed because containers are not immutable as images. 
    - An image name has a unique format that consists of three parts:
        - Hostname: Identifies the image registry
        - Repository: A group of related container images
        - Tag: Provides information about a specific version or variant of an image
- Container
    - A Docker container is a runnable instance of an image.
        - You can use the Docker API or CLI to create, start, stop, or delete an image.
    - You can connect to multiple networks, attach storage to the container, or create a new image based on its current state.
    - Docker keeps containers well isolated from each other and their host machine.
- Network
    - When using Docker, networks help isolate container communications.
- Storage
    - By default, data doesn’t persist when the container no longer exists.
    - Docker uses volumes and bind mounts to persist data even after a container stops.
- Plugins and Add-ons
    - Plugins, such as storage plugins, provide the ability to connect to external storage platforms. 

### Docker Container Images
- Workflow
    1. Create a Dockerfile
    2. Use the Dockerfile to create a container image
        - The `build` command is used with a Dockerfile to build a container image.
            - e.g. `docker build -t my-app v1`
        - To verify the creation of the image, use `docker images` command.
    3. Use the container image to create a running container
        - The `run` command is used with an image to create a running container.
            - e.g. `docker run my-app:v1`
        - To verify the details of the container created, use `docker ps -a` command.
    4. To store images in a configured registry, use `docker push` command.
        - e.g. `docker push my-app:v1`
    5. To retrive images from a configured registry, use `docker pull` command.
        - e.g. `docker pull nginx`

### Docker Architecture
- The Docker client-server architecture provides a complete application environment.
    - Docker components include the client, the host, and the registry. 
- Workflow
    1. You’ll use either the Docker command line interface or REST APIs via the Docker client to send instructions to the Docker host server, commonly called the host.
        - The Docker host contains the daemon, known as `dockerd`.
        - The Docker host also includes and manages,
                - Images
                - Containers
                - Namespaces
                - Networks
                - Storage
                - Plugins and add-ons
    2. The daemon listens for Docker API requests or commands such as `docker run` and processes those commands.
    3. The daemon does the heavy lifting to build, run, and distribute Docker containers.
    4. Docker stores the container images in a registry.
- Communications   
    - The Docker ​client can communicate with local ​and remote Docker hosts.
        - You can run the Docker client and daemon on the same system, or​ connect your Docker client to a remote Docker daemon.​
        - Docker daemons can also communicate with other daemons to manage Docker services.
- Registry
    - Docker stores and distributes images in a registry.
        - Registry access is either public, such as Docker Hub, which is accessible by everyone, or private.
        - Enterprises usually opt to use a private registry for security reasons.
        - Registry locations are hosted using a third-party provider, such as IBM Cloud Container Registry, or self-hosted in private data centers or on the cloud.
- Registry Access    
    1. Developers build and push the images using automation or a build pipeline into a registry, where Docker stores these images.
        1. Use an existing base image or a Dockerfile.
        2. Issue the build command that creates a container image with a name.
        3. issue the push command to store the image to the registry.
        4. The host first checks locally if the image is already available, and then issues the run command with the image name to create the container.
            - If the image is unavailable within the host, the Docker client connects to the registry and pulls the image to the host.
            - The daemon then creates a running container using the image. 
    2. Local machines, cloud systems, and on-premises systems can pull those images.

## 3-3. Container Orchestration
- Container orchestration is a process that automates the container lifecycle of containerized applications.
    - Lifecycle
        - Deployment
        - Management
        - Scaling
        - Networking
        - Availability
    - Container orchestration is a critical part of an organization's orchestration, automation, and response (SOAR) requirements.
- Features
    - Defines container image and registry
    - Improves provisioning and deployment
    - Secures network connectivity between containers
    - Ensures availability and performance
        - by relocating the containers to another host if an outage or shortage of system resources occurs.
    - Manages scalability and load balancing
    - Resource allocation and scheduling to the underlying infrastructure
    - Rolling updates and rollbacks
    - Health checks and automated error handling
- Benefits
    - Streamlines complexity
    - Enables hands-off deployment and scaling
    - Increases speed, agility, and efficiency
    - Seamlessly integrates into CI/CD workflows
    - Allows development teams to use resources more efficiently
- Workflow
    - Configuration files
        - YAML or JSON files configure containers to,
            - Find resources
            - Establish a network
            - Store logs
    - Deployment scheduling
        - Automatically schedules new container deployment
        - Finds the right host based on predefined settings or restrictions
    - Manages container lifecycle
        - Configuration file specs inform container decisions
            - System parameters (e.g. CPU, memory)
            - File parameters (e.g. proximity, metadata)
    - Scaling and productivity
        - Automation is used to,
            - Maintain productivity
            - Support scaling
- Tools
    - Marathon
        - Open-source cluster manager
        - Scales container infrastructure by automating management and task monitoring
    - Nomad
        - Free, open-source cluster management and scheduling tool
        - Supports various app types on all major operating systems
    - Docker Swarm
        - Open-source container orchestration platform
        - Automates deployment of containerized apps
    - Kubernetes
        - Standard for open-source container orchestration platforms
        - Robust feature set, broadly supported

## 3-4. Kubernetes
- An open-source system for automating deployment, scaling, and management of containerized applications
    - a.k.a. K8s
    - The de facto choice for container orchestration
    - It is easily portable across clouds and on-premises 
    - "Containers-as-a-service" concept
    - Kubernetes facilitates declarative management in which it automatically performs the necessary operations towards achieving the called for state. 
- Key factors
    - Kubernetes is NOT a traditional, all-inclusive platform as a service.
    - Kubernetes is NOT rigid or opinionated.
        - But, more of a flexible model that supports an extremely diverse variety of workloads, including stateless, stateful, and data-processing workloads.
    - Kubernetes does NOT provide continuous integration/continuous delivery pipelines to build applications or deploy source code.
    - Kubernetes does NOT prescribe logging, monitoring, and alerting solutions.
        - Organizations are free to select and integrate third-party and open source tools.
    - Kubernetes does NOT provide built-in middleware, databases, or other services.
- Ecosystem
    - Services, support, and tools that are widely available
    - Provides additional K8s services
        - Building container images
        - Storing images in a container registry
        - Application logging and monitoring
        - CI/CD
    - Public cloud
        - Prisma
        - Google
        - Amazon
        - IBM
    - Open source frameworks
        - Red Hat
        - VMware
        - SUSE
        - D2iQ
        - Docker
        - Cloud Foundry
    - Management
        - Digital Ocean
        - Supergiant
        - Kubermatic
        - CloudSoft
        - Techtonic
        - Weaveworks
    - Tools
        - JFrog
        - Univa
        - Aspen
        - Mesh
        - Bitnami
        - Cloud 66
    - Monitoring & logging
        - sumalogic
        - New Relic
        - Grafana
        - sysdig
        - Datadog
        - iguazio
        - SignalFX
        - Dynatrace
    - Security
        - Guardcore
        - Blackduck
        - yubico
        - TwistLock
        - cilium
        - alcide
    - Load balancing
        - VMware
        - AVI networks
        - nginx

### K8s Concepts
- Pods
    - The smallest deployable compute object in K8s and the higher-level abstractions to run workloads
- Services
    - Exposes application running on a set of pods
- Storage
    - K8s supports both persistent and temporary storage for pods
- Configuration
    - Resources that K8s provides for configuring pods
- Security
    - Security for cloud-native workloads enforces security for pod and API access
- Policies
    - Policies for groups of resources help ensure that pods match to the nodes
        - so that the kubelet can find and run the pod
- Schedule/Eviction
    - Runs and proactively terminates one or more pods on resource-starved nodes
- Preemption
    - Terminates lower priority pods so that higher priority pos can run on nodes
- Administration
    - Management details necessary to administer a Kubernetes cluster

### K8s Capabilities
- Automated rollouts and rollbacks
    - Progressively rolls out changes to application or configuration
    - Monitors application health and ensures instances are running
    - Rolls back changes
- Storage orchestration
    - Automatically mounts your chosen storage system whether from local storage, network storage, or public cloud
- Horizontal scaling
    - Scales loads automatically based on metrics or via commands
- Automated bin packing
    - Increases resource utilization and cost savings using a mix of critical and best-effort workloads
    - Performs container auto-placement based on resource requirements and conditions without sacrificing high availability (HA)
- Secret and configuration management
    - Stores and manages sensitive information (credentials, keys, or tokens) securely
    - Deploys and updates secrets/configuration without rebuilding images
    - IPv4/IPv6 dual stack support
- Batch execution
    - Manages batch and CI workloads, and replaces failed containers if configured
- Self-healing
    - Restarts, replaces, reschedules, and kills failing or unresponsive containers
    - Exposes containers to clients only if healthy and running
- Service discovery and load balancing
    - Discovers pods using their own IP addresses or a single DNS name
    - Load-balances traffic across pods for better performance and high availability
- Designed for extensibility
    - Easily-extensible by adding or providing additional features to your K8s cluster without any source code modifications.

### K8s Architecture
- K8s cluster
    - A deployment of Kubernetes is called a Kubernetes cluster.
        - A Kubernetes cluster is a cluster of nodes that runs containerized applications.
        - Each cluster has one master node (the Kubernetes Control Plane) and one or more worker nodes.
- Node
    - Nodes are the worker machines in a Kubernetes cluster. In other words, user applications are run on nodes.
        - Nodes can be virtual or physical machines.
    - Nodes are not created by Kubernetes itself, but rather by the cloud provider.
        - This allows Kubernetes to run on a variety of infrastructures.
    - Each node is managed by the control plane and contain the services necessary to run applications. 
    - Nodes include pods, which are the smallest deployment entity in Kubernetes.
        - Pods include one or more containers.
        - Containers share all the resources of the node and can communicate among themselves. 
- K8s control plane
    - Control plane maintains the intended cluster state by making decisions about the cluster and detecting and responding to events in the cluster.
        - Like a thermostat, you specify the desired temperature, and the thermostat regulates heating and cooling systems continuously to achieve the specified state.
    - Elements
        - Kube-controller manager
            - Runs all the controller processes that monitor the cluster state, and ensure the actual state of a cluster matches the desired state.
        - cloud-controller manager
            - Runs controllers that interact with the underlying cloud providers.
                - These controllers effectively link clusters into a cloud provider’s API.
            - Allows both Kubernetes and the cloud providers to evolve freely without introducing dependencies on the other. 
        - kube-api-server
            - Exposes the Kubernetes API
            - The API server serves as the front-end for the control plane.
                - All communication in the cluster utilizes this API.
                - e.g. The Kubernetes API server accepts commands to view or change the state of the cluster. 
        - kube-scheduler
            - Assigns newly created Pods to nodes
                - This basically means that the kube-scheduler determines where your workloads should run within the cluster.
                - The scheduler selects the most optimal node according to Kubernetes scheduling principles, configuration options, and available resources. 
        - etcd
            - A highly available, distributed key value store that contains all the cluster data.
            - When you tell Kubernetes to deploy your application, that deployment configuration is stored in etcd.
            - Etcd defines the state in a Kubernetes cluster, and the system works to bring the actual state to match the desired state. 
- Kubelet
    - This controller communicates with the kube-apiserver to receive new and modified pod specifications, and ensure that the pods and their associated containers are running as desired.
    - The kubelet also reports to the control plane on the pods’ health and status.
    - In order to start a pod, the kubelet uses the container runtime.
- Container runtime
    - The container runtime is responsible for downloading images and running containers. 
    - Rather than providing a single container runtime, Kubernetes implements a Container Runtime Interface that permits pluggability of the container runtime.
        - e.g. Runtimes
            - Docker
            - Podman
            - Cri-o
- K8s proxy
    - A network proxy that runs on each node in a cluster.
    - This proxy maintains network rules that allow communication to Pods running on nodes.
        - i.e. communication to workloads running on your cluster
        - This communication can come from within or outside of the cluster.

### K8s Objects
- Entity
    - A person, place, or thing with an identity and associated data
- Object
    - A bundle of software data that has an identity, a state, and a behavior
        - Variables, data structures, and specific functions
- K8s objects are "persistent" entities
    - e.g.
        - Pods
        - Namespaces
        - ReplicaSets
        - Deployments
    - K8s object main fields
        - Object spec
            - Provided by user
            - Defines desired state
        - Status
            - Provided by K8s
            - Defines current state
    - How to manage K8s objects using K8s API
        - via client libraries
        - via kubectl CLI
- Pods
    - The simplest unit in Kubernetes
    - A Pod represents a process or a single instance of an application running in the cluster.
        - A Pod usually encapsulates one or more containers
    - Creating replicas of a Pod serves to scale an application horizontally.
    - YAML files are often used to define the objects that you want to create.
        - The “kind” field specifies the kind of object to be created. 
        - The “spec” field provides the appropriate fields for the object to be created, such as the containers that will run in this Pod.
            - A PodSpec must contain at least one container.
        - The image field dictates which image will run in the Pod.
        - And the ports array lists the ports that the container exposes. 
- Labels
    - Labels are key/value pairs attached to objects, for identification.
    - However, a label does not uniquely identify a single object.
        - Many objects can have the same labels.
        - This helps to organize and group objects.
    - Label selectors are the core grouping method in Kubernetes.
        - They allow you to identify a set of objects. 
- Namespaces
    - Namespaces provide a mechanism for isolating groups of resources within a single cluster. 
        - This is useful when teams share a cluster for cost-saving purposes or for maintaining multiple projects in isolation. 
        - Namespaces are ideal when the number of cluster users is large.
    - Namespaces provide a scope for the names of objects.
    - Each object must have a unique name for that resource type within that namespace. 
- ReplicaSets
    - A set of identical running replicas of a Pod that are horizontally scaled.
        - The configuration files for a ReplicaSet and a Pod are different from each other. 
    - ReplicaSet does not own pods, it uses pod labels instead.
    - The replicas field specifies the number of replicas that should be running at any given time.
        - Whenever this field is updated, the ReplicaSet creates or deletes Pods to meet the desired number of replicas.
    - A Pod template is included in the ReplicaSet spec which defines the Pods that should be created by the ReplicaSet. 
    - Creating ReplicaSets directly is not recommended. Instead, create a Deployment.
- Deployment
    - A higher-level object that provides updates for both Pods and ReplicaSets
    - Deployments run multiple replicas of an application using ReplicaSets and offer additional management capabilities on top of these ReplicaSets.
    - Deployments are suitable for stateless applications.
        - For stateful applications, Stateful Sets are used.
    - One key feature provided by Deployments but not by ReplicaSets is rolling updates.
        - A rolling update scales up a new version to the appropriate number of replicas and scales down the old version to zero replicas.
    - The ReplicaSet ensures that the appropriate number of Pods exist, while the Deployment orchestrates the roll out of a new version. 

### K8s Service
- Service
    - A Service is a REST object, like Pods.
        - Services are a logical abstraction for a set of Pods in a cluster.
        - They provide policies for accessing the Pods and cluster, and act as a load balancer across the Pods.
    - Each Service is assigned a unique IP address for accessing applications deployed on Pods.
        - Service eliminates the need for a separate service discovery process.
        - A Service supports multiple protocols such as TCP, which is the default protocol, UDP, and others, and supports multiple port definitions.
        - The port number with the same name can vary in each backend Pod.
        - Service can have an optional selector and can optionally map incoming ports to a targetPort.
- Why Service?
    - A service is needed because Pods in a cluster can be destroyed and new Pods can be created at any time.
        - This volatility leads to discoverability issues because of changing IP addresses.
    - A Service keeps track of Pod changes and exposes a single IP address or a DNS name and utilizes selectors to target a set of Pods.
        - For native Kubernetes applications, API endpoints are updated whenever changes are detected to the Pods in the Service.
        - For non-native applications, Kubernetes uses a virtual-IP-based bridge or load balancer in between the applications and the backend Pods.
- ClusterIP
    - ClusterIP is the default and most common service type.
    - Kubernetes assigns a cluster-internal IP address to the ClusterIP Service that makes the Service only reachable within the cluster.
        - A ClusterIP service cannot make requests to Service from outside the cluster.
    - You can set the ClusterIP address in the Service definition file, and the ClusterIP Service provides inter-service communication within the cluster.
- NodePort
    - Creates and routes the incoming requests automatically to the ClusterIP Service
    - A NodePort exposes the Service on each Node’s IP address at a static port. 
        - For security purposes, production use is not recommended.
    - Kubernetes exposes a single Service with no load-balancing requirements for multiple services. 
- External LoadBalancer
    - Creates NodePort and ClusterIP Services automatically
    - An ELB integrates and automatically directs traffic to the NodePort Service.
    - To expose a Service to the Internet, you need a new ELB with an IP address.
        - You can use a cloud provider’s ELB to host your cluster. 
- External Name
    - Maps to a DNS name and not to any selector
        - Requires a `spec.externalName` parameter
    - The External Name Service maps the Service to the contents of the externalName field that returns a CNAME record and its value.
    - You can use an External name to create a Service that represents external storage, and enable Pods from different namespaces to talk to each other. 
- Ingress 
    - An API object that, when combined with a controller, provides routing rules to manage external users’ access to multiple services in a Kubernetes cluster.
    - In production, Ingress exposes applications to the Internet via port 80 (for HTTP) or port 443 (for HTTPS)
    - While the cluster monitors Ingress, an external Load Balancer is expensive and is managed outside the cluster. 
- DaemonSet
    - An object that makes sure that Nodes run a copy of a Pod
    - As nodes are added to a cluster, Pods are added to the nodes.
        - Pods are garbage collected when removed from a cluster.
    - If you delete a DaemonSet, all Pods are removed.
    - DaemonSets are ideally used for storage, logs, and monitoring nodes. 
- StatefulSet 
    - An object that manages stateful applications, manages deployment and scaling of Pods, and provides guarantees about the ordering and uniqueness of Pods.
    - A StatefulSet maintains a sticky identity for each Pod request and provides persistent storage volumes for your workloads. 
- Job
    - Job creates Pods and tracks the Pod completion process.
        - Jobs are retried until completed.
        - A job can run several Pods in parallel.
    - Deleting a job will remove the created Pods.
    - Suspending a Job will delete its active Pods until the job resumes.
    - CronJob is regularly used to create Jobs on an iterative schedule.

### Kubectl
- Kubectl is the Kubernetes command line interface.
    - Provides many features for users who work with Kubernetes clusters and manage running cluster workloads
    - Helps users deploy applications, inspect and manage cluster resources, view logs, and more
- Syntax
    - `kubectl [command] [type] [name] [flags]`
        - Keeping each component in order is critical.
    - Command
        - Any operation to be performed
        - e.g. create, get, apply, delete
    - Type
        - Resource type
        - e.g. pod, deployment, replicaset
    - Name
        - Resource name, if applicable
    - Flags
        - Special options or modifiers that override default values
- Key command types
    - Imperative commands
        - e.g. `kubectl run nginx --image nginx`
        - Create, update, and delete live objects directly
        - Operations should be specified as arguments or flags
        - Easiest to learn
        - No audit trail, which is important for tracking changes.
        - Not very flexible
            - Limited options, no template, no integration with change review processes
        - Useful for development and test environments
    - Imperative object configuration
        - Overcomes imperative commands' limitation by using a configuration file
            - Using the same configuration templates in multiple environments will produce identical results.
            - A configuration file may be stored in a source control system like Git, it can integrate with change processes, and it provides audit trails and templates for creating new objects.
        - kubectl command specifies required operations, optional flags, and at least one file name.
            - The specified configuration file must contain a full definition of the objects in YAML or JSON format.
            - e.g. To create the objects defined in the file, run the command `kubectl create -f nginx.yaml`.
        - Using it requires understanding of the object schema, and requires writing a YAML or JSON file. 
        - You need to specify all necessary command operations.
    - Declarative object configuration
        - Overcomes imperative object configuration's limitation by defining the desired state in a shared configuration file
            - Declarative object configuration stores configuration data in files.
                - When you deploy, Kubernetes automatically determines the necessary operations.
            - Operations are identified by Kubectl instead of being specified by the user.
            - This works on directories or individual files.
        - Configuration files define a desired state, and Kubernetes actualizes that state.
            - This approach is the ideal method for production systems.
        -  e.g. `kubectl apply -f nginx/` command mentions a directory, then applies configuration data to all files in that directory.
            - The user is not required to perform any operations since they are performed by the system automatically.
- Commonly used commands
    - apply
    - create
    - describe
    - get
    - delete
    - autoscale
    - edit
    - exec
    - expose
    - label

### Hands-on : ReplicaSet
1. Create a deployment.
    - `kubectl create -f deployment.yaml` 
2. Deployment automatically creates a pod. Check the status.
    - `kubectl get pods`
3. Check the deployment status.
    - `kubectl get deploy`
4. Scale the deployment horizontally.
    - `kubectl scale deploy hello-world --replicas=3`
    - 2 more pods are created automatically.
5. If you delete or add pods manually after this, which won't match the desired numbers of pods, the ReplicaSet will maintain the desired state by replacing the deleted pod or removing the added pod.

### Autoscaling
- Horizontal Pod Autoscaler (HPA)
    - Adjusts the number of replicas of an application by increasing or decreasing the number of pods.
    - Automatically updates a workload resource (like a deployment) by horizontally scaling the workload to match the demand.
        - Horizontal scaling, or “scaling out,” automatically increases or decreases the number of running pods as application usage changes.
    - An HPA uses a cluster operator that sets targets for metrics like CPU or memory utilization and the maximum and minimum desired number of replicas.
    - You can manually create the HPA object from a YAML file, but you should use the autoscale command instead. 
        - Similar to the autoscale command, you can set the minimum and maximum number of pods.
        - The CPU-percent flag shows up as “targetCPUUtilizationPercentage”.
- Vertical Pod Autoscaler (VPA) 
    - Adjusts the resource requests and limits of a container by increasing or decreasing the resource size or speed of the pods.
    - Vertical scaling, or “scaling up,” refers to adding more resources to an existing machine.
        - A VPA lets you scale a service vertically within a cluster.
    - The cluster operator sets targets for metrics like CPU or memory utilization, similar to an HPA.
        - The cluster then reconciles the size of the service’s pod or pods based on their current usage and the desired target. 
    - You should not use VPAs with HPAs on resource metrics like CPU or memory.
        - However, you can use them together on custom or external metrics. 
- Cluster Autoscaler (CA) 
    - Adjusts the number of nodes in the cluster when pods fail to schedule, or demand increases or decreases in relation to the nodes’ capacity. 
    - Autoscales the cluster itself, increasing and decreasing the number of available nodes that pods can run on.
    - Pods are autoscaled using HPA or VPA. But when the nodes themselves are overloaded with pods, you can use a CA to autoscale the nodes so that the pods can rebalance themselves across the cluster.
    - A cluster autoscaler ensures there is always enough compute power to run your tasks, and that you aren’t paying extra for unused nodes. 

### Hands-on: Autoscaling
1. Check the status of existing pods and ReplicaSets. 
    - Let's say we have one pod and one ReplicaSet for a deployment.
        - `kubectl get pods`
        - `kubectl get rs`
2. Set autoscaling using attributes.
    - `kubectl autoscale deploy hello-world --min=2 --max=5 --cpu-percent=50`
3. Check the status of ReplicaSets.
    - The deployment still uses the ReplicaSet to scale up and down.
    - There are two pods running, as desired.
        - `kubectl describe rs hello-world-7492b273a2`

### K8s Deployment Strategies
- Kubernetes deployment strategies are used to,
    - Deploy, update, or rollback ReplicaSets, Pods, Services, and Applications 
    - Pause/Resume Deployments 
    - Scale Deployments manually or automatically
- Recreate 
    - In the recreate strategy, Pods running the live version of the application are all shut down simultaneously, and a new version of the application is deployed on newly created Pods. 
    - Recreate is the simplest deployment strategy. 
    - There is a short downtime between the shutdown of the existing deployment and the new deployment. 
    - Steps
        1. A new version of the application (v2) is ready for deployment. 
        2. All Pods running the current version (v1) are shut down or deleted. 
        3. New (v2) Pods are created. 
        4. The rollback process is completed in the reverse order, replacing version 2 (v2) with version 1 (v1).
    - Pros
        - Simple setup
	    - Short downtime occurs between shutdown and new deployment
    - Cons
        - Application version completely replaced
- Rolling (Revamped)
    - In a rolling strategy, each Pod is updated one at a time. 
        - A single v1 Pod is replaced with a new v2 Pod. 
        - Each v1 Pod is updated in this way until all Pods are v2. 
    - During a rolling strategy update, there is hardly any downtime since users are directed to either version.
    - Steps
        1. A new version of the application (v2) is ready for deployment. 
        2. One of the Pods running the current version (v1) is shut down or deleted. 
        3. A new (v2) Pod is created to replace the (v1) Pod that was removed. 
        4. Steps 2 and 3 are repeated until all (v1) Pods are removed and replaced with (v2) Pods. 
        5. The rollback process is reversed, where v2 Pods are replaced by v1 Pods.
    - Pros
        - Simple setup
	    - Suitable for stateful applications that need to handle rebalancing of the data
    - Cons
	    - Rollout/rollback takes time 
        - You cannot control traffic distribution
- Blue/green 
    - In a blue/green strategy, the blue environment is the live version of the application. 
    - The green environment is an exact copy that contains the deployment of the new version of the application. 
    - The green environment is thoroughly tested. Once all changes, bugs, and issues are addressed, user traffic is switched from the blue environment to the green environment.
    - Steps
        1. Create a new environment identical to the current production environment. 
        2. Design the new version and test it thoroughly until it is ready for production. 
        3. Route all user traffic to the new version. 
        4. To perform a rollback, switch the environments back.
    - Pros
        - Instant rollout/rollback (no downtime)
        - New version is available immediately to all users
	- Cons	
        - Expensive (requires double resources)
        - Rigorous testing required before releasing to production
        - Handling stateful applications is difficult
- Canary 
    - In a canary strategy, the new version of the application is tested using a small set of random users alongside the current live version of the application. 
        - Once the new version of the application is successfully tested, it is then rolled out to all users. 
    - Steps
        1. Design a new version of the application. 
        2. Route a small sample of user requests to the new version. 
        3. Test for efficiency, performance, bugs, and issues, and rollback as needed. 
        4. Repeat steps 1 to 3. Once all issues are resolved, route all traffic to the new version.  
        5. Rollback has no downtime since few users are exposed to the new version.
    - Pros
        - Convenient for reliability, error, and performance monitoring
        - Fast rollback
    - Cons
        - Slow rollout, gradual user access
- A/B testing 
    - The A/B testing strategy, also known as split testing, evaluates two versions of an application (version A and version B). 
        - With A/B testing, each version has features that cater to different sets of users. 
        - You can select which version is best for global deployment based on user interaction and feedback. 
    - Steps 
        1. Design a new version of the application by adding mostly UI features. 
        2. Identify a small set of users based on conditions like weight, cookie value, query parameters, geolocalization, browser version, screen size, operating system, and language. 
        3. Route requests from the user set to the new version. 
        4. Check for bugs, efficiency, performance, and issues. 
        5. Once all issues are resolved, route all traffic to the new version. 
        6. Rollbacks can be implemented, but downtime can impact the user.
    - Pros
        - Multiple versions can run in parallel
        - Full control over traffic distribution 	
    - Cons
        - Requires intelligent load balancer
        - Difficult to troubleshoot errors for a given session, distributed tracing becomes mandatory
- Shadow 
    - In a shadow strategy, a “shadow version” of the application is deployed alongside the live version. 
    - User requests are sent to both versions, and both handle all requests, but the shadow version does not forward responses back to the users. 
    - This lets developers see how the shadow version performs using real-world data without interrupting user experience.
    - To perform a rollback, switch the environments back.
    - Pros
        - Performance testing with production traffic
	    - No user impact
        - No downtime
    - Cons
        - Expensive (double resources) 
        - Not a true user test, can lead to misinterpreted results
        - Complex setup
        - Requires monitoring for two environments
- To create a good strategy,
    - Consider the product type and the target audience 
    - Shadow and canary strategies use live user requests, as opposed to using a sample of users.  
    - The A/B testing strategy is useful if the version of the application requires minor tweaks or UI feature changes. 
    - The blue/green strategy is useful if your version of the application is complex or critical and needs proper monitoring with no downtime during deployment. 
    - The canary strategy is a good choice if you want zero downtime and are comfortable exposing your version of the application to the public.  
    - A rolling strategy gradually deploys the new version of the application. There is no downtime, and it is easy to roll back. 
    - The recreate strategy is a good choice if the application is not critical and users aren’t impacted by a short downtime. 

### Rolling Updates
- Rolling updates are automated updates that occur on a scheduled basis.
    - Roll out automated and controlled app changes across pods
    - Work with pod templates like deployments
    - Allow for rollback as needed
- Steps
    1. To prepare your application to enable rolling updates, Add liveness probes and readiness probes to deployments.
        - That way deployments are appropriately marked as "ready".
        ```
        livenessProbe:
            httpGet:
                path: /
                port: 9080
            initialDelaySeconds: 300
            periodSeconds: 15
        readinessProbe:
            httpGet:
                path: /
                port: 9080
                initialDelaySeconds: 45
                periodSeconds: 5
        ```
    2. Add a rolling update strategy to the YAML file.
        ```
        apiVersion: apps/v1
        kind: Deployment
        metadata:
            name: hello-world
        spec:
            replicas: 10
            (...)
            strategy:
                type: RollingUpdate
                rollingUpdate:
                    maxUnavailable: 50%
                    maxSurge: 2
        ```
    3. Check the rollout status
        - `kubectl rollout status deployments/hello-world`
    4. If you want to roll back due to errors and issues, undo it.
        - `kubectl rollout undo deployments/hello-world`
- Rollout scenarios
    - All-at-once rollout
    - All-at-once rollback
    - One-at-a-time rollout
    - One-at-a-time rollback

### ConfigMaps & Secrets
- ConfigMap
    - ConfigMap is an API object that stores non-confidential data in key-value pairs.
        - ConfigMap provides configuration data to pods and deployments so that the configuration data is not hard coded inside the application code.
            - Meant for non-sensitive information as they do not provide secrecy or encryption
        - Data stored in a ConfigMap cannot exceed 1 megabyte.
            - For larger amounts of data, consider mounting a volume or use a separate database or file service.
    - ConfigMap has optional data and binaryData fields.
        - In this case, there is no “spec" field in the template
        - The Config name must be a valid DNS subdomain name.
    - ConfigMap is portable.
        - Reusable for multiple deployments, thus decoupling the environment from the deployments themselves
    - You can create a ConfigMap by,
        - Using string literals
            - e.g. `kubectl create ConfigMap my-config --from-literal=MESSAGE="hello world"`
                - Reference
                    ```
                    env:
                    - name: MESSAGE
                      valueFrom:
                        configMapKeyRef:
                          name: my-config
                          key: MESSAGE
                    ```
        - Using an existing “properties” or ”key” = “value” file
            - e.g. `kubectl create cm my-config --from-file=my.properties`
                - Check the ConfigMap with `kubectl describe ConfigMap my-config`
                    ```
                    Name:         my-config
                    Namespace:    default
                    Labels:       <none>
                    Annotations:  <none>
                    Data
                    ====
                    my.properties:
                    ----
                    MESSAGE=hello from the my.properties file
                    Events: <none>
                    ```
                - Reference
                    ```
                    env:
                    - name: MESSAGE
                      valueFrom:
                        configMapKeyRef:
                          name: my-config
                          key: my.properties
                    ```
        - Providing a ConfigMap YAML descriptor file.
            - e.g. 
                1. `kubectl get cm`
                2. `kubectl apply -f my-config.YAML`
                    ```
                    apiVersion: v1
                    data:
                      my.properties: MESSAGE=hello world
                      kind: ConfigMap
                      metadata:
                        name: my-config
                        namespace: default
                    ```
                3. `kubectl describe cm my-config`
                    ```
                    Name:         my-config
                    Namespace:    default
                    Labels:       <none>
                    Annotations:  kubectl.kubernetes.io/last-applied-configuration:
                    
                    (...)

                    Data
                    ====
                    my.properties:
                    ----
                    MESSAGE=hello from the my.properties file
                    Events: <none>
                    ```
    - The deployment or Pods consume a ConfigMap by,
        - Using environment variables with the configMapKeyRef attribute
        - Mounting a file that contains all environment variables in the “key=value” format, using the volumes plugin
    - Kubernetes applies the ConfigMap to the pod or the deployment just before running the pod or deployment.
- Secret
    - Using a string literal
        1. Create a secret using a string literal.
            - `kubectl create secret generic api-creds --from-literal=key=HELLOWORLDKEY`
        2. The GET command verifies that the secret was created.
            - `kubectl get secret`
        3. To prove that our secret is indeed a secret, use the DESCRIBE command and check that you don’t see any secret, written using displayed text.
            - `kubectl describe secret api-creds`
                ```
                Name:         api-creds
                Namespace:    default
                Labels:       <none>
                Annotations:  <none>
                Type:  Opaque
                Data
                ====
                key: 13 bytes
                ```
        4. You can print out the secret in YAML format. You’ll see that the value is fully encoded.
            - `kubectl get secret api-creds -o YAML`
        5. To use the secret, add another environment to the deployment descriptor as shown and then use the application key by referring to the application as `process.env.API_CREDS`.
    - Using volume mounts
        1. Create the same secret as done previously.
        2. In the descriptor YAML file, use a volume for the secret with a corresponding volumeMount.
            ```
            volumeMounts:
            - name: api-creds
              mountPath : "/etc/api"
              readOnly: true
            volumes:
            - name: api-creds
              secret:
                secretName: api-creds
            ```
        3. Each container in the descriptor file has its own volumeMount but shares the volume.
        4. The api-creds secret is mounted as a file at /etc/api/api-creds.
        5. The application will read and process the file to extract the secret.
