---
title: "[Study Note] Coursework: Cybersecurity Analyst - Part 2"
date: 2023-06-15T17:51
thumb: "cybersecurity.jpg"
tags: 
    - ❮Study Note❯
    - cybersecurity
---

# 1. IT Security - Frameworks

## Frameworks and Their Purpose

### Best Practices, Baselines, and Frameworks
- Used to improve the controls, methodologies, and governance for the IT departments or the global behavior of the organization
- Seeks to improve performance, controls, and metrics
- Helps to translate the business needs into technical or operational needs
- e.g.
    - COBIT
    - ITIL
    - ISOs
    - COSO
    - Project manager methodologies
    - Industry best practices
    - Developer recommendations

### Normative and compliance
- Rules to follow for a specific industry
- Enforcement for the government, industry, or clients
- Event if the company or the organization do not want to implement those controls, for compliance
- e.g.
    - SOX (financial)
    - HIPPA (healthcare)
    - GLBA (financial)
    - PCI/DSS (financial)

### Roles in Information Security
- Chief Information Security Officer (CISO)
    - High-level management position responsible for the entire security department
- Information Security Analyst
    - Conducts information security assessments for organizations and analyzes the events/alerts/alarms/information that could be useful to identify any threats that could compromise the organization
- Information Security Auditor
    - In charge of testing the effectiveness of computer information systems, including the security of the systems and reports their findings
- Information Security Architect
- Information Security Consultant/Specialist
- Security Software Developer
- Pentester/Ethical hacker
- Vulnerability Assessor

## Process and IT Security
- Cyberattacks and alerts are increasing, and growing exponentially complex and targeted.
    - Requires more time and attention from security analysts
    - Threat management with proactive approach is needed.
- Security Operations Centers (SOC)
    - SOC needs to have the current key skills, tools, and processes to be able to detect, investigate, and stop threats before they become costly data breaches.
        - More burden is placed upon security analysts and incident response teams.

### Business Process Management
- Business process is a set of defined, repeatable steps that take inputs, add value, and produce outputs that satisfy a customer's requirements.
    - Inputs
        - Information or materials that are required by the process to get started
    - Outputs
        - Services, or products that satisfy customer requirements
    - Bounds/Scope
        - The process starts when (starting point) and ends when (ending point)
    - Tasks/Steps
        - Actions that are repeatable
- Successful process
    - Charter
    - Clear objectives
    - Governance/Ownership
    - Repeatability (reduced variation)
    - Automation
    - Established performance indicators (metrics)
        - Process performance metrics
            - Cycle time
            - Cost
            - Quality (defect rate)
            - Rework
- Continual process improvement
    1. Process metrics
    2. Customer feedback
    3. Maturity assessments
    4. Financial performance

## IT Infrastructure Library (ITIL)
- ITIL is a best practice framework that has been drawn from both the public and private sectors internaiontally
    - Describes how IT resources should be organized to deliver business value
    - Models how to document processes, functions, and roles of IT Service Management (ITSM)

### ITIL service lifecycle phases
- Service strategy
    - Service portfolio management
    - Financial management
    - Demand management
    - Business relationship management
- Service design
    - Service catalogue management
    - Service level management
        - This involves the planning, coordinating, drafting, monitoring, and reporting on Service Level Agreements (SLAs).
        - It is the ongoing review of service achievements to ensure that the required service quality is maintained and graudally improved.
    - Information security management
        - This deals with having and maintaining an Information Security Policy (ISP) and specific security policies that address each aspect of strategy, objectives, and regulations.
    - Supplier management
- Service transition
    - Change management
        - Manages changes to baseline service assets and configuration items across the ITIL lifecycle
    - Project management
    - Release & deployment management
    - Service validation & testing
    - Knowledge managemenet
- Service operations
    - Event management
        - Events are any detectable or discernible occurrence that has significance for the management of IT infrastructure, or the deliver of an IT service.
    - Incident management
        - An incident is an unplanned interruption to an IT service, a reduction in the quality of an IT service, and/or a failure of a configuration item.
            - Log, Assign, Track, Categorize, Prioritize, Resolve and Close
    - Problem management
        - The process responsible for managing the lifecycle of all problems
        - ITIL defines a problem as "an unknown cause of one or more incidents".
- Continual service improvement
    - Review metrics
    - Identify opportunities
    - Test and prioritize
    - Implement improvements

---

# 2. Authentication and Access Control

## Identification and AAA
1. Identification
   - In order to use a resource, we first need to identify, to get the proper rights. 
2. Authentication
    - When we first present ourselves against a resource, the resources will not automatically authenticate us against its resources.
    - We need to prove that we are allowed to use that resource.
3. Authorization
    - Then it's going to give us the purpose rights in order to access that information.
4. Accountability
    - We are going to actually get some accountability of our actions.

### Authentication Methods
- Something you know
    - e.g. Username/Password
- Something you have
    - Upscaled security
    - e.g. Smartcard, token, One Time Password (OTP) generator, IC chip
- Something you are
    - Most secure authentication method
    - e.g. Fingerprints, retina scanners, biometric signatures

## Controls

### Control Types
- Administrative
    - e.g. Spam policy
- Technical 
    - e.g. Firewall
- Physical
    - e.g. Seperate room or building, perimetrals, card reader, biometric scanners, etc.

### Control Context
- Each control type could be
    - Corrective
        - which corrects problem after discovering it
        - e.g. Policy, training, penalties
    - Preventive
        - which prevents problems and uncover violations of internal controls
        - e.g. Random internal audits
    - Dissuasive
        - which discourages violators and violation
        - e.g. CCTV camera on a server room
    - Recovery
        - which would recover things in case of a disaster
        - e.g. Backups
    - Detective
        - which would help us identify possible violations
        - e.g. Firewalls
    - Compensatory
        - which identifies the gap in policies and fills it additionally
        - e.g. Automated firewall and antimalware actions in case of someone triggering a spam email

## Access Controls

### Access Control Models
- Mandatory Access Control (MAC)
    - Use labels to regulate the access
    - Military use
- Discretionary Access Control (DAC)
    - Each object, folder, or file, has an owner and the owner defines the rights and privilege.
- Role-based Access Control (RBAC)
    - The rights are configured based on the user roles.
        - e.g. Sales group, management group, etc.

### Other Access Control Methods
- Centralized
    - Single Sign-on (SSO)
    - Provide the authentication, authorization, and accountability
- Decentralized
    - Independent access control methods
    - Usually concealed into local power
    - Normally the military forces uses such as in the battlefields

### Best Practices for the Access Control Field
- Least privilege
    - Limit information access
- Seperation of duties
    - Verify employee activity
- Rotation of duties
    - Tracking and control

---

# 3. Operating System Fundamentals

## Microsoft Windows

### User Mode and Kernel Mode
- Drivers call routines that are exported by various kernel components.
- Drivers must respond to specific calls from the operating system and can respond to other system calls.
- For a list of kernel mode routines that drivers may need to support, see Standard Driver Routines
- User Mode
    - When you start a user-mode application, Windows creates a process for the application
        - Private virtual address space
        - Private handle table
    - Each application runs in isolation, and if an application crashes, the crash is limited to that one application.
- Kernel Mode
    - All code that runs in kernel mode shares a single virtual address space.
    - If a kernel-mode driver accidentally writes to the wrong virtual address, data that belongs to the operating system or another driver could be compromised.
    - If a kernel-mode driver crashes, the entire operating system crashes.

### Windows File Systems
- Hierarchial tree structure
    - The system specifies naming conventions and path format.
- New Technology File System (NTFS)
    - Introduced in 1993
    - Most common file system for Windows end user systems
    - Most Windows servers use NTFS as well.
- File Allocation Table (FATxx)
    - Simple file system used since the 80s
    - Numbers proceeding FAT refer to the number of bits used to enumerate a file system block.
        - eg. FAT16, FAT32
    - Now mainly used for removable storate devices under 32GB capacity

## Linux
- Free and open source (GNU General Public License)
    - Free as in freedom
- Kernel is the core of the OS.
    - Kernel interacts directly with the hardware
    - Kernel manages system, user input/output, processes, files, memory, and devices.
- Shell is used to interact with the kernel.
    - Users input commands through the shell and the kernel performs the commands.
    - Internal commands are shell-dependent, built into the shell program.
    - External commands are totally shell-independent and usually found in any Linux distribution.

### Linux File Systems
- A file is the basic unit of storage for data.
- A directory is a special type of file.
- Directory structures
    - / (root)
        - Every single file and directory starts from the root directory
        - Only the root user has write privileges under this directory.
        - `/root` is not the same as `/`
    - /bin
        - Contains binary executables
            - e.g. ps, ls, ping, grep, cp, mv
    - /sbin
        - Contains binary executables more related to system maintenance
            - e.g. iptables, reboot, fdisk, ipconfig
    - /etc
        - Contains configuration files required by all programs
    - /var
        - Contains files that are expected to grow or change constantly (variable files)
            - e.g. application logs (/var/log)
    - /boot
        - Contains boot loaded files used at boot time
- File and directory permissions
    - There are three subjects that can "own" a file or directory.
        - User / Group / Everybody (Other)
    - Each subject has 1-digit octal value or 3-letter symbol that indicates the permission for reading, writing, and execution.
        - e.g. 
            - Permission symbol: drwxr-x---
            - Octal value: 754
    - Use `chmod` command to change the permission of a file or directory.
    - Use `chown` command to change the owner and group owner of a file or directory.

### Run levels
- 0 = Halt
    - Shuts down all services when the system will not be rebooted
- 1 = Single User
    - Used for system maintenance
    - No networking capabilities
- 2 = Multi User
    - Used for maintenance and system testing
    - No network support
- 3 = Multi User 
    - Non-graphical text mode operations for server systems
    - Network support
- 4 = -
    - Custom mode used by sysadmin
- 5 = Graphical
    - Graphical login with same usability of Run Level 3
- 6 = Reboot
    - Shuts down all services when the system is being rebooted

---

# 4. Virtualization
- Virtualization allows you to create multiple simulated environments or dedicated resrouces from a single, physical hardware system.

## Components
- Hypervisor (host)
    - Seperates the physical resources from the virtual environments
    - Hypervisors can sit on top of an operating system (end user) or be installed directly onto hardware (enterprise)
- Virtual machine (guest)
    - Functions as a single data file
    - The hypervisor relays requests from the VM to the actual hardware, if necessary.
    - VMs do not interact directly with the host machine.
    - Physical hardware is assigned to VMs

## Virtualization to Cloud
- Virtualization is moving to cloud as well.
    - Virtualization management
    - Service delivery automation
    - Business service catalogs
    - Real-time monitoring
    - Dynamic capacity optimization
- Deployment
    1. Consolidate and virtualize
    2. Automate and manage
    3. (migrate applications to the cloud)
    4. Integrate and optimize

## Cloud Computing
- Pros
    - Choice and agility
    - Scale and cost
    - Encapsulated change management
    - Next-generation architecture
    - Flexibility
    - Efficiency
    - Strategic value
- Cons
    - Security
    - Lack of control
    - Reliability
    - Vendor lock-in

### Cloud Security
- You should consider,
    - Governance
    - Compliance
    - Availability
    - Data security
    - Identity and access management
    - Disaster recovery and business continuity planning
- Organizations often resort to "rapid response" mode to handle accelerating and dynamic cloud requirements
    - Adopt technical solutions with disparate interfaces and disjointed processes
    - Use an assortment of services providers for uncoordinated purposes
    - Take a minimal or ad-hoc approach to governance and organizational issues
    - Unintentionally creating a sub-optimized future environments
    - An ad-hoc approach to cloud governance and organization will threaten your ability to take full advantage of cloud
- Governance ⇄ Service
    - Portfolio management
    - Service management
    - Service integration
- Service ⇄ Organization
    - Process
    - Roles
- Governance ⇄ Organization
    - Team
    - Function

