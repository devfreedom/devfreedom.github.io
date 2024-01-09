---
title: "[Study Note] Coursework: Cybersecurity Analyst - Part 6"
date: 2023-06-24T11:30
thumb: "cybersecurity.jpg"
tags: 
    - ❮Study Note❯
    - cybersecurity
---

# 1. Cyber Threat Intelligence

## Threat Intelligence Strategy Map
1. Collect
    - Integrate data
    - Sources
        - Internal and external
        - Technical and human
        - Raw and packaged
2. Process
    - Put data in context
        - Normalize
        - Correlate
        - Confirm
        - Enrich
3. Analyze
    - Find insight and actions
        - Investigate
        - Contain
        - Remediate
        - Prioritize
4. Share
    - Inform decisions
    - Personalize, based on
        - Who, for what purpose
        - What, how often
        - What kind of format and medium

### Sharing Threat Intelligence
- Level 1 analysts
- Level 2/3 analysts
- Operational leaders
- Strategic leaders

## Intelligence Areas by Crowdstrike
- Tactical
    - Role: Mechanic
    - Focused on performing malware analysis and enrichment
    - As well as ingesting atomic, static, and behavioral threat indicators into defensive cybersecurity systems.
    - Stakeholders
        - SOC analyst
        - SIEM
        - Firewall
        - Endpoints
        - IDS/IPS
- Operational
    - Role: Race car driver
    - Focused on understanding adversarial capabilities, infrastructure, TTPs
    - And then leveraging that understanding to conduct more targeted and prioritized cybersecurity operations.
    - Stakeholders
        - Threat hunter
        - SOC analyst
        - Vulnerability management
        - Incidence response
        - Insider threat
- Strategic
    - Role: The owner
    - Focused on understanding high-level trends and adversarial motives
    - And then leveraging that understanding to engage in strategic security and business decision-making
    - Stakeholders
        - CISO
        - CIO
        - CTO
        - Executive board
        - Strategic intel

## Threat Intelligence Sources
- BleepingComputer
- DARKReading
- Trend Micro
- Krebs on Security
- InfoSecurity Magazine
- X-Force Exchange

## Threat Intelligence Platform Capabilities
- Primary feature areas
    - Collect
    - Correlate
    - Enrichment and Contextualization
    - Analyze
    - Integrate
    - Act
- Platforms
    - Recorded Future
        - Centralize and contextualize all sources of threat data
        - Collaborate on analysis from a single source of truth
        - Customize intelligence to increase relevance 
    - FireEye
        - Subscriptions include,
            - Fusion intelligence
            - Strategic intelligence
            - Operational intelligence
            - Vulnerability intelligence
            - Cyber physical/crime/espionage intelligence
    - IBM X-Force Exchange
        - Cloud-based threat intelligence sharing platform
        - Access and share threat data
        - Integrate with other solutions
        - Boost security operations
    - TruSTAR
        - Intelligence Management Platform
        - Streamlined workflow integrations
        - Secure access control
        - Advanced search
         Automated data ingest and normalization

## Threat Intelligence Framework 

### Mitre ATT&CK
- Levels
    - Level 1
        - For those just starting out who may not have many resources
        - Cyber threat intelligence is all about knowing what your adversaries do and using that information to improve decision-making.
    - Level 2
        - For mid-level teams starting to mature
        - If you have a team of threat analysts who regularly review information about adversaries, a next-level action you can take is to map intelligence to ATT&CK yourself rather than using what others have already mapped.
    - Level 3
        - For more advanced cybersecurity teams and resources
        - If your CTI team is advanced, you can start to map more information to ATT&CK, and then use that information to prioritize how you defend.
- Process
    1. Understand ATT&CK
    2. Find the behavior
    3. Research the behavior
    4. Translate the behavior into a tactic
    5. Figure out what technique applies to the behavior
    6. Compare your results to other analysts

### U.S. Office of Director of National Intelligence
1. Preparation
    - External actions
    - Objectives
        - Plan activity
        - Conduct research and analysis
        - Develop resources and capabilities
        - Acquire victim-specific knowledge
        - Complete preparation
2. Engagement
    - External actions
    - Objectives
        - Deploy capability
        - Interact with intended victim
        - Exploit vulnerabilities
        - Deliver malicious capability
3. Presence
    - Internal actions
    - Objectives
        - Establish controlled access
        - Hide
        - Expand presence
        - Refine focus of activity
        - Establish persistence
4. Effect/Consequence
    - Internal actions
    - Objectives
        - Enable other operations
        - Deny access
        - Extract data
        - Alter data and/or computer, network, or system behavior
        - Destroy HW/SW/data

## Intelligent Detection Best Practices
1. Predict and prioritize security weaknesses
    - Gather threat intelligence information
    - Manage vulnerabilities and risks
    - Augment vulnerability scan data with context for optimized prioritization
    - Manage device configurations
        - Firewalls, switches, routers, IPS/IDS
2. Detect deviations to identify malicious activity
    - Establish baseline behaviors
    - Monitor and investigate anomalies
    - Monitor network flows
3. React in real time to exploits
    - Correlate logs, events, network flows, identities, assets, vulnerabilities, and configurations, and add context to it
    - Use automated and cognitive solutions to make data actionable by existing staff

## Security Intelligence
- The real-time collection, normalization, and analytics of the data generated by users, applications, and infrastructure that impacts the IT security and risk posture of an enterprise

### Exploit Timeline
(↓ Vulnerability)
1. Pre-exploit
    - Prediction/Prevention phase
        - Gain visibility over the organization's security posture and identify security gaps
        - Detect deviations from the norm that indicate early warnings of APTs
        - Prioritize vulnerabilities to optimize remediation processes and close critical exposures before exploit
    - "What are the major risks and vulnerabilities?"
    - "Are we configured to protect against advanced threats?"
(↓ Exploit)
2. Post-exploit
    - Reaction/remediation phase
        - Automatically detect threats with prioritized workflow to quickly analyze impact
        - Gather full situational awareness through advanced security analytics
        - Perform forensic investigation, reducing time to find the root cause
        - Use results to drive faster remediation
(Remediation)

### 3 Pillars of Effective Threat Detection
- See everything
- Automate intelligence
- Become proactive

### Security Effectiveness Reality
- Bloat
    - Average number of tools organizations report in their IT environment = 50-70
- Overlap
    - Average number of tools with overlapping capabilities = 35%
- Misconfiguration
    - Average number of tools left underutilized at default settings = 80%
- 53% of attacks successfully infiltrate without detection.
- Alerts are generated for only 9% of attacks.

### Key Takeaways
- Visibility is a key concern for many organizations, whether it's the type of data being processed within the infrastructure or uncertainty of data location.
- Organizations are concerned with privileged user and/or credential abuse.
- Endpoint alerts and network access devices are the top sources of incident information, providing alerts and investigation support, respectively.
- Many organizations (74%) have blend of on-premise and cloud environments, in many cases using multiple cloud providers.

---

# 2. Data Security and Mobile Endpoint Protection

## Data Security
- Protecting the
    - Confidentiality
    - Integrity
    - Availability
- of data
    - In transit
    - At rest
        - Databases
        - Unstructured data (files)
        - On endpoints
- against
    - Deliberate attack
        - Hackers
        - Denial of Service
    - Inadvertent attacks
        - Operator error
        - Natural disaster
        - Component failure

## Data Security Top Challenges
- Explosive data growth
- New privacy regulations
    - e.g. 
        - EU GDPR
        - US California Consumer Protection Act (CCPA)
        - Brazil Lei Geral de Proteção de Dados Pessoais (LGPD)
        - PCI DSS
- Operational complexity
- Cybersecurity skills shortage

### Industry-specific Data Security Challenges
- Healthcare
    - Process and store combination of personal health information and payment card data
    - Subject to strict data privacy regulations such as HIPAA
    - May also be subject to financial standards and regulations
    - Highest cost per breach record
    - Data security critical for both business and regulatory compliance
- Transportation
    - Critical part of national infrastructure
    - Combines financially sensitive information and personal identification information
    - Relies on distributed IT infrastructure and 3rd-party vendors
- Financial industries and insurance
    - Most targeted industry: 19% more cyberattacks in 2018
    - Strong financial motivation for both external and internal attacks
    - Numerous industry-specific regulations require complex compliance measures
- Retail
    - Among most highly targeted groups for data breaches
    - Large number of access points in retail data lifecycle
    - Customers and associates access and share sensitive data in physical outlets, online, mobile applications

## Common Data Security Pitfalls
- Failure to move beyond compliance
- Failure to recognize the need for centralized data security
- Failure to define who owns responsibility for the data itself
- Failure to address known vulnerabilities
- Failure to prioritize and leverage data activity monitoring

## Top 12 Critical Data Protection Capabilities
- Data discovery
    - Determine where data resides.
    - Discover databases or file sources in your network that potentially contain sensitive or regulated data.
    - To protect your data, you must know where your data lives.
    - Cross-silo, centralized efforts
- Data classification
    - Parse discovered data sources to determine the kind of data they contain, matching against a predefined set of patterns or keywords.
    - Assign labels based on the data type to inform policies.
    - Allows you to determine what protective measures are necessary.
    - Data may fall under multiple classifications.
    - Standards and regulations (SOX, HIPAA, PCI, etc.) define classifications for data.
- Vulnerability assessment
    - Scan data environments to detect vulnerabilities and exposures
        - Missing patches
        - Weak passwords
        - Unauthorized access and changes
        - Misconfigured privileges
        - Account sharing
        - Other behavioral vulnerabilities
    - Iterative process
    - Requires coordination across silos and centralized effort
- Data risk analysis
    - Identify data sources with the greatest risk of exposure or audit failure and help security professionals prioritize where to focus first.
    - Build on classification and vulnerability assessment.
- Data and file activity monitoring
    - Capture and record real-time data access activity, with visibility into transactions for platforms and protocols by users including database admins, developers, outsourced personnel and applications.
    - Centralized policies
    - Resource-intensive
        - Scanning many transactions for small number of suspicious transactions
- Real-time alerting
    - Detect abnormal activity to identify risk around sensitive data access, privileged user actions, change control, application user activities and security exceptions.
- Blocking, masking, and quarantining
    - Obscure data and/or blocking further action by risky users when activities deviate from regular baselines or pre-defined policies
    - Provide only level of access to data necessary
- Active analytics
    - Capture insight into key threats such as,
        - SQL injections
        - Malicious stored procedures
        - Denial of service
        - Data leakage
        - Account takeover
        - Schema tampering
        - Data tampering
        - Other anomalies
    - Develop recommendations for actions to reduce risk.
- Encryption
    - Render sensitive data useless to cybercriminals, unauthorized employees, and 3rd-party service providers by encoding it in such a way that only authorized individuals can read it by decrypting the encoded data with a key.
    - Protect data at-rest and in-transit
- Tokenization
    - A special type of format-preserving encryption that substitutes sensitive data with a token, which can be mapped to the original value.
    - Substitutes key data with a token that is issued by a trusted 3rd-party where the token can be accessed but not redeemed by an untrusted party.
- Key management
    - Securely distribute keys across complex encryption landscape
    - Centralize key management
    - Enable organized and secure key management that keeps data private and compliant
- Automated compliance report
    - Pre-built capabilities mapped to specific regulations such as GDPR, HIPAA, PCI-DSS, CCPA, etc.
    - Includes,
        - Audit workflows to streamline approval processes
        - Out-of-the-box reports
        - Pre-built classification patterns for regulated data
        - Tamper-proof audit repository

## Mobile Endpoint Protection
- Compared to traditional endpoints
    - Users do not interface directly with the OS.
    - A series of applications act as a broker between the user and the OS.
    - OS stability can be easily monitored and any anomalies reported that present risk
    - Anti-virus software can "see" the apps that are installed on a device, and read certain signatures, but cannot peek inside at their contents.

### Primary Threats to Mobile Endpoints
- System-based
    - Jailbreaking and Rooting
    - Systems that were previously read-only can be altered in malicious ways.
    - One primary function is gain access to apps that are not approved or bootleg.
    - Vulnerabilities and exploits in the core code can open devices to remote attacks that provide root access.
- App-based
    - Primarily comes in the form of phishing scams via SMS or email.
    - Malicious code can infect even public apps.
        - Be wary of granting apps access to sensitive data.
    - Apps may request access to hardware features irrelevant to their functionality.
    - Web content in mobile browsers, especially those that prompt for app installations, can be the root cause of many attacks.
- External
    - Network-based attacks may collect sensitive data.
    - Vulnerabilities can be exploited by tethering devices to external media.
    - Social engineering is often used to gain unauthorized access to mobile devices.

### Protecting Mobile Assets
- MDM
    - Mobile devices require constant monitoring as they are generally in use all day long.
    - Control the content allowed on devices and restrict access to extraneous, potentially hazardous features.
    - Lock devices down so they are inaccessible if lost or stolen.
- App security
    - Any number of systems can be used to monitor as much or as little information as is possible.
    - Report on the health and reliability of applications, oftentimes before they even make it on to devices.
- User training
    - Many times though, there will be gaps that cannot be addressed due to system limitations.
        - e.g., monitoring iCloud messages
    - Educating users on the threats that can impact them is the number one line of defense.
        - This is especially on BYOD scenarios where prohibitive management isn't possible.

### Day-to-day Operations
- Monitor device OS versions.
- Monitor app installs and versions.
- Monitor and enforce encryption.
- Distribute secure payloads.
- Automate compliance actions.
- Ensure proper NAC policies are enforced.
- Educate users regularly.
- Update contingency plans.

---

# 3. Scanning

## Vulnerability Scanner
- Capabilities
    - Keeping an up-to-date database of vulnerabilities
    - Detection of genuine vulnerabilities without an excessive number of false positives
    - Ability to conduct multiple scans at the same time
    - Ability to perform trend analyses and create clear reports of the results
    - Provide recommendations for effective countermeasures to eliminate discovered vulnerabilities
- Components
    - Engine scanner
        - Performs security checks according to its installed plug-ins, identifying system information, and vulnerabilities
    - Database
        - Stores vulnerability information, scan results, and other data used by the scanner
    - Report module
        - Provides scan result reporting such as,
            - Technical reports for system administrators
            - Summary reports for security managers
            - High-level graph and trend reports for corporate executive leadership
    - User interface
        - Allows the administrator to operate the scanner
        - It may be either a GUI or just a command line interface

### Host and Network
- Internal
    - It can be through malware or virus that is downloaded onto a network through internet or USB.
    - It can be a disgruntled employee who has the internal network access.
    - It can be through the outside attacker who has gained the access to the internal network.
    - The internal scan is done by running the vulnerability scanner on the critical components of the network from a machine which is a part of the network.
        - This important component may include core router, switches, workstations, web server, database, etc.
- External
    - The external scan is important as it is required to detect the vulnerabilities to those internet-facing assets through which an attacker can gain internal access. 
    - The external scan is done by running a vulnerability scanner on the host from the internet.
    - It is always a good idea to eliminate the open issues/loopholes before it can be used and exploited by a malicious user or an attacker.

### Common Vulnerability Scoring System (CVSS)
- The CVSS is a way of assigning severity rankings to computer system vulnerabilities, ranging from zero (least severe) to 10 (most severe)
    - It provides a standardized vulnerability score across the industry, helping critical information flow more effectively between sections within an organization and between organizations.
    - The formula for determining the score is public and freely distributed, providing transparency.
    - It helps prioritize risk; CVSS rankings provide both a general score and more specific metrics.
- Score breakdown
    - Base scores
        - How easy it is to exploit the vulnerability
        - How much damage an exploit targeting that vulnerability could inflict
        - Base subscores
            - Base-Exploitability subscore
                - Attack vector
                - Attack complexity
                - Privileges required
                - User interaction
            - Base-Impact subscore
                - Confidentiality
                - Integrity
                - Availability
    - Environmental
        - Provides a more customized metric specific to an organization or work environment
        - Scores
            - Security requirements subscore
            - Impact subscore
    - Temporal
        - How aware people are of the vulnerability
        - What remedial steps are being taken
        - Whether threat actors are targeting it
        - Scores
            - Exploit code maturity
            - Remediation level
            - Report confidence
    - Overall

## Security Technical Implementation Guides (STIGs)
- The Defense Information Systems Agency (DISA) is the entity responsible for maintaining the security posture of the US DoD IT infrastructure.
    - DISA developed a security standard for various DoD agencies to utilize the same standard across all application instances that exist.

## Center for Internet Security (CIS)
- CIS Benchmarks are the only consensus-based best practice security configuration guides both developed and accepted by government, business, industry, and academia.
- CIS Controls are a prioritized set of actions that collectively form a defense-in-depth set of best practices that mitigate the most common attacks against systems and networks.
    - Critical tenets
        - Offense informs defense
        - Prioritization
        - Measurements and metrics
        - Continuous diagnostics and mitigation
        - Automation
    - Implementation groups
        - IG1
            - CIS Sub-controls for small, commercial, off-the-shelf or home office environments (low-sensitivity data)
        - IG2
            - CIS Sub-controls focused on helping security teams manage sensitive client or company information
            - IG2 organizations should follow IG1 steps as well
        - IG3
            - CIS Sub-controls that reduce the impact of zero-day attacks and targeted attacks from sophisticated adversaries
            - IG3 organizations should follow IG1 and IG2 steps as well.
- 20 CIS controls
    - Basic
    - Foundational
    - Organizational

## Port Scanning
- A port scanner is a simple computer program that checks all of ports, and responds with one of three possible responses.
    - Open, accepted
    - Closed, not listening
    - Filtered/Dropped/Blocked
- Port scanning is a method of determining which ports on a network are open and could be receiving or sending data.
    - It is also a process for sending packets to specific ports on a host and analyzing responses to identify vulnerabilities.

### Types of Scans
- Ping
    - Simplest port scan
    - Sending ICMP echo requests to see who is responding.
- TCP Half Open
    - A popular, deceptive scan
    - Also known as SYN scan
    - It notes the connection and leaves the target hanging.
- TCP Connect
    - Takes a step further than TCP Half Open by completing the TCP connection.
    - This makes it slower and noisier than half open.
- UDP
    - When you run a UDP port scan, you send either an empty packet or a packet that has a different payload per port, and will only get a response if the port is closed.
    - It is faster than TCP but doesn't contain as much data.
- Stealth
    - These TCP scans are quieter than the other options and can get past firewalls.
    - They will still get picked up by the most recent IDS.

### Common Ports
- Port 0 to 1023
    - Well-known port
- Port 1024 to 49151
    - Registered port
- Port 49152 to 65535
    - Dynamic and private port
- Port 20 
    - UDP
    - for FTP
- Port 22
    - TCP
    - for SSH
- Port 53
    - UDP
    - for DNS
- Port 80
    - TCP
    - for HTTP

### Nmap
- Network Mapper (Nmap) is an open source tool for network exploration and security auditing.
- Designed to rapidly scan large networks
- Nmap uses raw IP packets in novel ways to determine 
    - What hosts are available on the network
    - What applications and services those hosts are offering
    - What OS they are running
    - What type of packet filters/firewalls are in use
    - etc.
- Many sysadmins find it useful for routine tasks such as,
    - Network inventory
    - Managing service upgrade schedules
    - Monitoring host
    - Monitoring service uptime
    - etc.

## Sniffer
- Sniffer operates at the data-link layer of the OSI model.
    - Sniffer do not have to play by the same rules as the applications and services that reside further up the stack.
- Sniffers can capture everything on the wire and record it for later review.
- Sniffers allow users to see all of the data contained in the packet.

### Wireshark
- Wireshark is the most popular traffic analyzer in the world.
- Wireshark intercepts traffic, and converts that binary traffic into human-readable format.
    - This makes it easy to identify what traffic is crossing your network, how much of it, how frequently, how much latency there is between certain hops, and so forth.
- Use cases
    - Network administrators use it to troubleshoot network problems.
    - Network security engineers use it to examine security problems.
    - QA engineers use it to verify network applications.
    - Developers use it to debug protocol implementations.
    - People use it to learn network protocol internals.
- Features
    - Deep inspection of hundreds of protocols and more
    - Live capture and offline analysis
    - Standard 3-pane packet browser
    - Multi-platform
    - The most powerful display filters in the industry
    - Rich VoIP analysis
    - Supports many different capture file formats
        - e.g. EtherPeek, TokenPeek, AiroPeek
    - gzip-compressed capture files can be decompressed on-the-fly
    - Decryption support for various protocols
        - e.g. IPsec, ISAKMP, Kerberos, SSL/TLS, WPA2
    - Packet list rule coloring
    - Export to XML, CSV, PostScript, plaintext
- Packet Capture (PCAP) file format
    - Recorded packet data pulled from a network scan
    - Use cases
        - Monitoring bandwidth usage
        - Identifying rogue DHCP servers
        - Detecting malware
        - DNS resolution
        - Incidence response
        - etc.

---

# 4. Security Architecture
- The foundation of robust security is a clearly-communicated structure with a systematic analysis of the threats and controls.
- As IT systems increase in complexity, they require a standard set of techniques, tools, and communication.
- Architectural thinking is about creating and communicating good structure and behavior, with the intent of avoiding chaos.
- Architecture needs to be
    - described before it can be created
    - with different levels of elaboration for communication
    - include a solution for implementation and operations
    - affordable
    - secure

## High-level Architectural Models
- Levels of abstraction
    - Enterprise architecture
        - Considers the needs of the whole "enterprise" that is within scope
            - This could be an entire organization, or a large single department, if that's the scope
        - Maps the main components of problem space and solution at a very high level
        - Shows how the main components interrelate with each other and interlink to external organizations
        - Does not describe the internals of the main components or how they will be implemented
        - Instead this could include,
            - A model showing generic business processes
            - A model showing proposed generic IT components that provide high-level business services
    - Solution architecture
        - Describes the main elements of the solution
        - Describes how specific products or technologies are used
        - Adds a context that might describe the different environments
        - Adds some technology perspectives to provide further detail
        - More detailed than the enterprise architecture
        - Shows the internal data and use of reusable or off-the-shelf components
- Building blocks
    - General features
        - Package of function defined to meet a business need
        - Could be an actor, business service, application, or data entity
        - Defined boundary, but can work with other building blocks
        - Interface/boundary loosely coupled from implementation
    - Architectural Building Blocks (ABB)
        - For enterprise architecture
        - Capture and define architecture requirements
            - e.g. function, data, application
        - Product and vendor-neutral
        - Guide the development of a solution architecture
        - Components
            - Data security
            - Application security
            - Identity and access management
            - Infrastructure and endpoint security
            - Detect and respond
            - etc.
    - Solution Building Blocks (SBB)
        - For solution architecture
        - Specify technical components to implement a function
        - Add context of the platforms and environments
        - They may be product/vendor aware
        - Components
            - Key security manager
            - Certificate authority
            - Web application firewall (WAF)
            - Static application security test (SAST)
            - Hardware token
            - Privilege access manager
            - Application firewall
            - NIPS
            - Incident workflow manager
            - etc.
- Enterprise Security Architecture Example
    - e.g. Hybrid multicloud security domains
        - Governance, Risk, and Compliance
        - Multicloud Security Management
            - Application security
            - Data security
            - Identity and access management
            - Infrastructure and endpoint security
            - Threat detection and response
        - Physical security

### 6W for IT Architecture
- Who?
    - Stakeholders include the client, end users, auditors, 3rd-parties, regulators.
- Where?
    - Locations for IT applications include access points for end users, connections to any 3rd-parties andthe data centers.
- When?
    - An IT system may be required to support a new product launch or to an organizational change.
- Why?
    - Understanding the business rationale for an IT system is critical.
- What?
    - Includes words, tables, and pictures to describe the functional requirements.
        - e.g. A requirements catalogue supported by use-case diagrams and tables of detailed business rules
- hoW?
    - Describes the proposed solution in words and pictures
        - e.g. conceptual and physical models which decompose the solution into components

## Security Architecture Patterns
- A reusable solution to a commonly occurring problem
- It is a description or template for how to solve a problem that can be used in many different situations.
- It is not a finished design as it needs context.
- It can be represented in many different formats.
- Vendor-specific or agnostic
- Available at all levels of abstraction

## Application Security 
- Software development cycle
    1. Plan
    2. Develop
    3. Test
    4. Deploy
    5. Maintain
    6. Plan 
    7. ...
- Methodologies
    - Waterfall
        - Top-down approach
    - Spiral
        - Minimizing risk
            - Evaluate security at the end of each cycle
    - Agile/Scrum
    - Iterative
        - Breaks up development into smaller prototypes
        - Lessons-learned through repeated cycles 

### Pentesting for Applications
- White-box testing
    - Pentesters are provided with detailed information about the systems they target
        - Bypasses many reconnaissance steps that normally precede attacks
- Black-box testing
    - Does not provide any information prior to the attack
    - Simulates an external hacker trying to gain access to information about the business and technical background
- Gray-box testing, a.k.a. Partial knowledge test
    - Balance between cost/time efficiency and fully-fledged simulation

### Source Code Analysis Tools
- Static Application Security Testing (SAST)
    - Frequently used
    - Perform testing prior to the launch of an application to strengthen code
    - Fewer false positives
    - For more implementations, requires access to the application source code, expert configuration, and lots of processing power.
- Dynamic Application Security Testing (DAST)
    - Available to find visible vulnerabilities by feeding the URL into an automated scanner
        - Highly scalable
        - Easily integrated
        - Quick 
    - Requires expert configuration
    - High possibility of false positives and negatives 
- Interactive Application Security Testing (IAST)
    - Assesses applications from within, using software instrumentation
    - Combines the strengths of SAST and DAST
    - Providing access to code, HTTP traffic, library information, back-end connections, and configuration information
    - Some IAST products require the applications to be attacked, while others can be used during normal quality assurance testing.

### Applications from 3rd-party Vendors
- 3rd-party applications need to be assessed for
    - Security standards
    - Security patching
    - Testing standards being used
- Supplier risk assessment
    - Identify how any risks would impact your organization's business.
        - It could be a financial, operational, or strategic risk.
    - Next step would be to determine the likelihood the risk would interrupt the business.
    - And finally there is a need to identify how the risk would impact the business.

### Web Application Firewall (WAF)
- Regular firewall serve as a safety gate between servers.
- WAF is able to filter the content of specific web applications.
    - Filters, monitors, and blocks HTTP traffic to and from a web application.
    - By inspecting HTTP traffic, WAF can prevent attack stemming from web application flaws such as SQL injection, cross-site scripting, viral inclusion, security misconfigurations, etc.

### Common Application Threats
- Input validation
    - Buffer overflow
    - Cross-site scripting (XSS)
    - SQL injection
    - Canonicalization
- Exception management
    - Information disclosure
    - Denial of service (DOS)
- Authentication
    - Network eavesdropping
    - Brute-force attack
    - Dictionary attacks
    - Cookie replay
    - Credential theft
- Authorization
    - Elevation of privilege
    - Disclosure of confidential data
    - Data tampering
    - Luring attack
- Auditing and logging
    - User denies performing an operation
    - Attacker exploits an application without trace
    - Attacker covers his or her tracks
- Configuration management
    - Unauthorized access to administration interfaces
    - Unauthorized access to configuration stores
    - Retrieval of clear text configuration data
    - Lack of individual accountability
        - Over-privileged process and service accounts

### Threat Modeling
- Methodology
    - Microsoft STRIDE model
    - Process for Attack Simulation and Threat Analysis (PASTA)
    - Trike threat model
    - Visual, Agile, Simple Threat Modeling (VAST)

- Standards
    - CERT Secure Coding
    - Common Weakness Enumeration (CWE)
    - DISA-STIG
    - ISO 27034/24772
    - PCI-DSS
    - NIST 800-53
- Regulations
    - Gramm-Leach-Bliley Act
    - HIPAA
    - Sarbanes-Oxley Act (SOX)

## DevSecOps
- DevOps + Security
    - Integrated, automated, continuous security, always.
    - Why DevSecOps?
        - Reduce risk and cost
        - Increase quality
        - Improve team synergy
        - Enhance visibility
        - Meet compliance
        - Accelerate development
        - Secure and rapid innovation
- Strategy and governance alignment
    - Define your strategy upfront, and apply it throughout
    - Consider any data sovereignty requirements
    - Address any audit & compliance requirements
    - Establish your risk management process
    - Automated checks for continuous assurance
- People and culture
    - Training and awareness
    - Explain and embrace new ways of working
    - Equip teams & individuals with the right level of ownership & tools
- Learning
    - Continuous improvement and feedback
    - Lessons learned
    - Best practices level-set
    - Ongoing collaboration
    - Blameless post-mortems

### IBM DevSecOps reference architecture
- Plan
    - NIST equivalent: Identify
        - Threat modeling & risk analysis
            - Model the threats with experimentation and validation.
            - Analyze risks to your system.
            - e.g.
                - Validate
                - Experiment
                - Data protection
                - Privacy design
        - Security backlog
            - Produce security epics informed by abuse cases. 
            - Add to project backlog.
            - e.g.
                - Common abuse cases (OWASP)
                - Contextual abuse cases
                - Compliance requirements
        - Architecture & design
            - Informed architecture & design, with security at its core
            - e.g.
                - Layered protection
                - Integrated security
    - Use tools and techniques to ensure security is integral to the design, development, and operation of all systems.
    - Enable empowerment and ownership by the Accreditor/Risk Onwer participating in Plan & Design activities.
    - Security Coach role to drive security integration.
- Code & Build
    - NIST equivalent: Protect
        - Secure app code
            - Secure coding best practice guidance
            - Real-time code feedback
            - Catch before commit
        - Secure infrastructure configuration
            - Secure infrastructure configuration best practice guidance
            - Image hardening
        - OSS/COTS validation
            - Vulnerability and license scanning
            - Remedial guidance before commit
    - Apply the model to everything-as-code.
        - Containers
        - Apps
        - Platform
        - Machines
    - Shift security to the left and embrace security-as-code.
    - Security Engineer to drive technical integration and uplift team security knowledge.
    - e.g.
        - Code
            - Static Application Security Testing (SAST)
            - Abuse case review
            - Pre-commit security hooks
            - Code/config quality
            - Compliance checks
            - Identity and access review
            - Open Source Software (OSS) Licensing
            - COTS & OSS vulnerability scanning
            - COTS & OSS hardening review
        - Build
            - Static Application Security Testing (SAST)
            - Code quality
            - Compliance checks
            - Identity and access review
            - Component control (vulnerability/licenses)
- Test
    - NIST equivalent: Protect
        - Internal/external testing
            - Integrate and automate security testing seamlessly with DevOps activities
        - Continuous assurance
            - Automated checks to ensure systems are always protected and conform with requirements
        - Compliance checking
            - Address industry-specific accreditation
    - e.g.
        - DAST/IAST
        - Penetration testing
        - Abuse case
        - Compliance checks
        - Identity and access testing
        - Vulnerability scan
        - Hardening test
- Release, Deploy & Decommission
    - NIST equivalent: Protect
        - Continuous component control
            - Monitor and act on changes to component security
            - Block vulnerable component deployment
        - Application and infrastructure orchestration
            - Orchestrate and automate the deployment of your secure application and underlying infrastructure.
        - Data cleansing and retention
            - Build data cleansing into your decommissioning activities
    - Orchestrate everything and include security
    - Manage secure creation and destruction of your workloads
    - Automate sign-off to certified levels of data destruction
    - e.g.
        - Release
            - Continuous component controls
            - Versioning of infrastructure
        - Deploy
            - Cloud provider security practices
                - IAM policies
                - Encryption
                - Inventory
            - CI/CD Toolchain is sole deployment mechanism
            - Repeatable, parameterized Infra-as-Code patterns for environment creation
            - Immutable images
                - Containers
                - Virtual machines
            - Centralized key-value and secret stores
            - Data sovereignty
        - Decommission
            - Pets vs Cattle; Destroy and create again
            - Infra-as-Code tools manage removal of compute instance & persistent storage
            - Deregistration to update inventory and ensure clean removal of secrets
            - IAM controls to regulate authorization
            - SaaS data removal requests and policies
            - Data backup cleansing
            - Crypto-shredding
- Operate & Monitor
    - NIST equivalent: Detect, Respond, Recover
        - Detect and visualize
            - Visualization of your environments adds context and clarity
        - Respond and Recover
            - Playbooks drive your response and recovery efforts
    - If you don't detect it, you can't fix it.
    - Integrated operational security helps ensure the security health of the system is as good as it can be with the latest information.
    - Playbooks-as-code run automatically, as issues are detected they are remediated and reported on.
    - e.g.
        - Detect & Visualize
            - Catalogue
            - Inventory
            - Compliance
            - User behavior analytics
            - RASP
            - Configuration monitoring
            - Continuous scanning
                - Container
                - Infrastructure
                - Network
        - Respond
            - Virtual patching
            - Automated remediation
            - Reporting
            - Feedback loop from production to engineering
            - Blue vs Red team game days
        - Recover
            - Maximize service
            - Root cause analysis
            - Attack-driven defense
            - Shift from MTBF to MTTR
            - Chaos engineering

## Application Security Defects
- Reality
    - Security bugs are being weaponized.
    - Security researchers are trying to cash in on the fame.
    - Bugs in security software are sensational.
    - All major software vendors are targets.
        - Especially security softwares
    - Actual security breaches could lead to litigation and law enforcement investigations
- Writing secure software is not easy.
    - Developers face many challenges.
        - Time
            - Developers: Under time pressures to develop and test huge amounts of functionality
            - Hackers: May have unlimited time
        - Focus
            - Developers: Have to properly develop and protect a wide surface of functionality, so security is not the primary focus
            - Hackers: Concentrate on finding security holes, often just one vulnerability is enough to compromise the product
        - Motivation and resources
            - Developers: Responsible for product's primary functionality, often not personally affected by product successes or failures
            - Hackers: Motivated by bragging rights, illicit profits, politics; sometimes are supported by nation-states
        - Specialization
            - Developers: Specialize in the functionality of the product
            - Hackers: Specialize in security penetration
    - Yet, with good security education, and solid design and implementation practices, we can make sure our products are secure.

### Mitigating Product Security Risk
- Prevent new bugs
    - Check 'SANS 25 Most Dangerous Programming Errors'.
    - Think like a hacker.
        - How can your code be abused?
    - Build software defenses into your software.
        - Input validation
        - Output sanitization
        - Strong encryption
        - Strong authentication/authorization
    - Choose secure frameworks rather than simply relying on developer security skills.
        - People make mistakes.
        - Frameworks make sure an accidental bug does not slip through.
    - Don't think that if your product is isolated from the internet then it is not at risk.
    - Don't think that if a file or a database is local then it doesn't need to be protected.
        - The majority of breaches are launched from inside.
- Address existing bugs
    - Redesign product front-end, not only to be good-looking and functional, but also secure.
    - Implement smart architectural changes that fix security flaws at the top.
    - Do not spot-fix issues.
        - Think of how the vulnerability can be fixed across the board and prevented in the future.
    - Security bugs are special, because of their potential impact.
        - Fix bugs as quickly as possible.
        - Increase their priority.
    - Deliver security patches with faster release vehicles.

## Cross-site Scripting (XSS) Attack
- XSS attack is the most common security issue found in many security products.
    - Notably WordPress and Drupal
    - XSS attack is on OWASP Top 10 list and SANS Top 25 list
- XSS attack allows attackers to inject client-side scripts into the web page.
- XSS attack can come from anywhere.
    - HTTP parameters
    - HTTP headers and cookies
    - Data in JSON and XML files
    - Databases
    - Files uploaded by users
- XSS attack can be used to,
    - Harvest credentials
    - Take over user sessions
    - CSRF
    - Steal cookies and local store data
    - Elevate privileges
    - Redirect users to malicious sites

### XSS Attack Common Scenario
- Suppose we have a web application feature that allows you to add new users.
- Let's assume we are using Java Server Pages(JSP) and the rendering code is as follows,
    ```
    <tr>
        <td><%= fullName%></td>
        <td><%= userName%></td>
        <td><%= role%></td>
    </tr>
    ```
- Suppose a malicious user enters the following specially-crafted string as user's full name.
    ```
    Joe Hacker<script>alert('GOTCHA!')</script>
    ```
    - The entered value is output as-is, the generated HTML will look like this,
        ```
        <tr>
            <td>Joe Hacker<script>alert('GOTCHA!')</script></td>
            <td>jhacker</td>
            <td>User</td>
        </tr>
        ```
        - `<script>` will be activated.
- This is very dangerous because you are letting unauthorized person inject functionality into your application.
- Once the record is added, every time it will be loaded, the dialog box will pop up.
    - This is called Stored XSS, which is more dangerous than Reflected XSS.
        - Reflected XSS is usually sent as part of an e-mail or a malicious link, and affects just one user.
        - Stored XSS is retained by the application and affects other users, such as application administrator.
- Stored XSS attack can be even used for loading fake login payload that mimics the original application's functionality.
    ```
    Joe Hacker<div id="login" style="some inline CSS styles that mimic the original UI"><form><p>Your session has expired, please log in again:</p>Username:<input type="text" name="username" size="10"/><br>Password:<input type="text" name="password" size="10"/><br><br><input type="submit" value="Login"/></form></div>
    ```
      - If there was a malicious user input like this, every time the list of users is rendered, this dialog will be displayed and trick some users into entering their credentials.
      - The stolen usernames and passwords can then be sent to an external site and used for further exploitation.

### XSS Attack Prevention
- Preventing XSS with HTML encoding
    - Output encoding works well for server-side generated pages and is quite effective in neutralizing most XSS payloads.
        - HTML encoding for labels and messages
        - URL encoding for values stored in links
    - e.g.
        - Potentially-malicious input: `<b>Test</b>`
        - HTML-encoded input: `&lt;b&gt;Test&lt;/b&gt;`
            - When HTML is rendered, the script markup is interpreted as harmless plaintext: `<b>Test</b>`
    - Enforcing the charset
        - Some XSS attacks take advantage of rare encodings such as UTF7.
        - If the charset of the page is not enforced, the browser will default to auto-detect and XSS payloads will execute.
        - To enforce the charset output header, use `Content-type: text/html; charset=UTF8`.
- Preventing XSS with JavaScript escaping
    - XSS can be introduced within JavaScript code as seen in the example below.
        ```
        <script language="javascript">
            // In this case, '-alert(1)-' is introduced as <%=search%>
            document.cookie='lastSearch=<%=search%>';
        </script>
        ```
    - Escaping single quotes will prevent injection. For example, `x=''-alert(1)-''` becomes `x='\'-alert(1)-\''`
- Preventing XSS by using safe DOM elements
    - XSS in modern rich client UIs is often made possible by unsafe handling of the DOM.
    - Using the innerHTML attribute allows the user input to be rendered as HTML, and XSS with JavaScript events is possible. such as,
        - `searchResult.innerHtml = <img src=error onerror=alert(1)>`
    - The safe alternative is to use textContent.
- Use Eval and Dynamic Code Generation with care.
    - JavaScript eval() function which accepts a JavaScript expression as a string argument and executes it.
        - Use of eval() function is discouraged.
        - If it's unavoidable, its parameter must be carefully scrutinized.
    - Same care is needed when the code generates pieces of JavaScript dynamically.
        - This practice is discouraged as well.
        - For example, the code below will simply execute whatever is provided as the `searchObj` query parameter.
            ```
            <script language="javascript">
                // In this case, alert(1); is introduced as searchObj
                var searchObj = eval("<%=request.getParameter("searchObj");%>");
            </script>
            ```
- Input validation
    - Whitelisting (recommended)
        - Reduces the attack surface to a known quantity
        - If possible, most input should be whitelisted to alphanumeric to prevent XSS (and many other attacks)
        - In some cases, may be relaxed to allow single quotes or other characters, to allow input names like O'Brien.
        - Special characters should only be allowed on an exception basis.
    - Blacklisting (not recommended)
        - Creative attacker may bypass blacklist by trying a previously-unknown method.
        - OWASP XSS Evasion page should give you a good idea on the staggering number of possible XSS variations that is impossible to cover by blacklists.
    - Client-side input validation (not recommended)
        - Can only be used to assist with product usability.
        - Attackers can easily bypass it by sending the request directly to the server.
- Use proven validation and encoding functionality
    - Protect both input and ouput.
        - Defense-in-depth principle
    - As you validate the input and encode the output, use proven and reputable libraries.
    - It is preferable not to roll your own functionality.
        - It is very easy to make a mistake that does not cover some edge case, and that will render your defense ineffective.
    - It is best to implement a framework that has one central set of functionality that validates and encodes data.
        - Peppering your code with checks may lead to some missed unprotected case that attacker will take advantage of.

### XSS Attack Prevention Key Takeaways
- DO NOT use blacklists or rely on client-side validation.
- DO NOT roll your own validation or encoding functionality.
    - Rely on proven libraries.
- DO encode all data output as part of HTML and JavaScript.
- DO use strict whitelists on accepting the input.

## SIEM Platforms
- A SIEM system collects logs and other security-related documentation for analysis.
    - The core function is to manage network security by monitoring flows and events.
    - SIEM consolidates log events and network flow data from thousands of devices, endpoints, and applications distributed throughout a network. 
        - It then uses an advanced Sense Analytics engine to normalize and correlate this data and identifies security offenses requiring investigation.
    - Capture log event and network flow data in near real-time, and apply advanced analytics to reveal security offenses.
- A SIEM system can be rules-based or employ a statistical correlation engine to establish relationships between event log entries.
- It can be available on-premises and in a cloud environment
- SIEM tuning
    - To get the SIEM to sort out all false-positive offenses so only those that need to be investigated are presented to the investigators

## SIEM Concepts
- Key terms
    - Log collection
    - Normalization
    - Correlation
    - Aggregation
    - Reporting
- Events
    - Typically a log of a specific action such as a user login, or a FW permit
        - occurs at a specific time and the event is logged at that time.
- Flows
    - A record of network activity between two hosts that can last for seances to days depending on the activity within the session
    - For example, a web request might download multiple files such as images, ads, video, and last for 5 to 10 seconds. Or a user who watches a Netflix movie might be in a network session that lasts up to 2 hours.
- Data Collection
    - The process of collecting flows and logs from different sources into a common repository
    - It can be performed by sending data directly into the SIEM, or an external device can collect data from the source and move it to the SIEM system on-demand or scheduled.
    - Considerations
        - CPU
        - Memory
        - Storage capacity
        - License
        - Number of sources
- Normalization
    - The normalization process involves turning raw data into a format that has fields such as IP address that the SIEM can use.
    - Normalization involves parsing raw event data and preparing the data to display readable information.
    - Normalization allows for predicable and consistent storage for all records, and indexes these records for fast searching and sorting.
- License throttling
    - Monitors the number of incoming events to the system, to manage input queues and EPS licensing.
- Coalescing
    - Events are parsed and then coalesced based on common attributes across events.
        - In IBM QRadar, event coalescing starts after three events have been found with matching properties within a 10 second period.
    - Event data received by QRadar is processed in to normalized fields, along with the original payload.
        - When coalescing is enabled, the following five properties are evaluated.
            - QID
            - Source IP
            - Destination IP
            - Destination port
            - Username
- Rule
    - A programmed procedure that attempts to correlate events and generates new events that report on correlation when it occurs.
- Rule threshold
    - The point at which a rule is triggered and a correlation event generated
- Event threshold
    - The number of times the event must occur before triggering the rule threshold.
- Rule action
    - An automatic procedure that occurs when all rule conditions and threshold settings have been met.
- Trend
    - A resource that defines how and over what time period data will be aggregated and evaluated for trends.
    - A trend executes a specified query on a defined schedule and time duration.

### SIEM and AI
- Business security difficulties
    - Unaddressed threats
        - Information is often overlooked simply because analysts do not know how it's connected
    - Insights overload
        - Volume, variety, and speed of insights overwhelms us
    - Lack of cybersecurity talent
        - Overworked, understaffed and overwhelmed
    - Worsening dwell times
        - Lack of consistent, high-quality and context-rich investigations leads to a breakdown of existing processes and high probability of missing crucial insights. This can expose your organization to risk.
    - Stakes are at an all-time high
- With the help of A.I.
    - Human expertise
        - Common sense
        - Morals
        - Compassion
        - Abstraction
        - Dilemmas
        - Generalization
    - Security analytics
        - Data correlation
        - Pattern identification
        - Anomaly detection
        - Prioritization
        - Data visualization
        - Workflow
    - Artificial intelligence
        - Cognitive capabilities
        - Unstructured analysis
        - Natural language
        - Machine learning
        - Bias elimination
        - Tradeoff analytics
- e.g. IBM QRadar Advisor with Watson

## SIEM Deployment
- Considerations
    - Compliance
    - Cost-benefit
    - Cybersecurity
- Security Operations Center (SOC)
    - Triad
        - People
            - Formal training
            - On-the-job experience
            - Vendor-specific training
            - Internal training
        - Technology
            - Endpoint
            - Netflow
            - Network monitoring
            - Threat intel
            - Forensics
            - Incident detection and management
        - Process
            - Preparation
            - Identification
            - Containment
            - Eradication
            - Recovery
            - Lessons-learned
    - SOC data collection process
        1. Visibility
            - By centralizing these various sources of data into a security monitoring system, the SOC gains actionable insight into possible anomalies indicative of threat activity.
        2. Analysis
            - Security operations analysts can analyze data from various sources and further interrogate and triage devices of interest to scope an incident.
        3. Action
            - Based on findings, automated and manual interventions can be made to include patching, firewall modification, system quarantine or reimage, and credential revocation.
- Events collector
    - The event collector collects events from local and remote log sources, and normalizes raw log source events to format them for use by QRadar.
        - The event collector bundles or coalesces identical events to conserve system usage and sends the data to the event processor.
    - The event collector can use bandwidth limiters and schedules to send events to the event processor, to overcome WAN limitations such as intermittent connectivity.
- Event processor
    - The event processor processes events that are collected from one or more event collector components.
    - Processes events by using the Custom Rules Engine (CRE)
- Flow collector
    - The flow collector generates flow data from raw packets that are collected from monitor ports such as SPANS, TAPs, and monitor sessions, or from external flow sources such as netflow, sflow, jflow.
    - This data is then converted to QRadar flow format and sent down the pipeline for processing.
- Flow processor
    - Flow deduplication
        - A process that removes duplicate flows when multiple flow collectors provide data to flow processors appliances.
    - Asymmetric recombination
        - Responsible for combining two sides of each flow when data is provided asymmetrically.
        - This process can recognize flows from each side and combine them in to one record. 
            - However, sometimes only one side of the flow exists.
    - License throttling
        - Monitors the number of incoming flows to the system to manage input queues and licensing.
        - When a data stream entering a SIEM exceeds the volume it is licensed to handle,
            - The data stream is throttled to accept only the amound allowed by the license.
            - The excess data is stored in a queue until it can be processed
            - The excess data is dropped
    - Forwarding
        - Applies routing rules for the system, such as sending flow data to offsite targets, external syslog systems, JSON systems, and other SIEMs.

### SIEM Deployment Scale by Gartner
- Small
    - Around 300 log sources and 1500 EPS
- Medium
    - Up to 1000 log sources and 7000 EPS
- Large
    - More than 1000 log sources and 15000 EPS

### All-in-one Deployment
- Reasons to add event or flow collectors to an all-in-one deployment
    - Your data collection requirements exceed the collection capability of your processor.
    - You must collect events and flows at a different location than where your processor is installed.
    - You are monitoring packet-based flow sources.
    - As your deployment grows, the workload exceeds the processing capacity of the all-in-one appliance.
    - Your security operations center employs more analysts who do more concurrent searches.
    - The types of monitored data, and the retention period for that data increases, which increases processing and storage requirements.
    - As your security analyst team grows, you require better search performance.

## SIEM Vendors
- Magic Quadrant
    - Leaders
        - Splunk
        - IBM
        - Exabeam
        - Securonix
        - Rapid7
        - LogRhythm
        - Dell Technologies (RSA)
    - Visionaries
        - Logpoint
    - Niche players
        - FireEye
        - AT&T Cybersecurity
        - McAfee
        - Fortinet
        - Micro Focus
        - SolarWinds
        - HanSight
        - ManageEngine

### IBM QRadar
- Originated from the SIEM product by Q1 Labs, bought by IBM
- Based on proprietary Ariel Data Store and Ariel Query Language
- Components
    - Vulnerability manager
    - User behavior analytics
    - Network insights
- User Behavior Analytics
    - Security ecosystem
        - Detecting insider threats requires a 360 degree view of both logs and flows.
            - Threat intel
            - Network 
            - Cloud
            - Identity and access
            - Data
            - Apps
            - Mobile
            - Endpoint

---

# 5. Threat Hunting

## Security Challenges
- Almost half of breaches are caused by malicious or criminal acts
- Average 191 days to detect and 66 days to resolve a situation
- Agencies are faced with more frequent and sophisticated attacks
- Cyber skills shortage
- Too many tools from too many vendors
- The rise of advanced threats
    - Highly-resourced bad guys
    - Highly sophisticated
    - Can evade detection from rule-and-policy-based defenses
    - Dwell in the network
    - Can cause the most damage
- Countermeasure challenges
    - Outdated security platforms
    - Increasing levels of cyber crime
    - Limited marketplace skills
    - Increased citizen expectation
    - Continuous and ever-increasing attack sophistication
    - Lack of real-time correlated cyber intelligence
- The detection of advanced threats, hidden, unknown, and emerging, is challenging.
    - 20% of threats are unknown, undetected, but can cause the most (80%) damage.
    - 91% of security leaders report that threat hunting increased the speed and accuracy of response

## SOC Cyber Threat Hunting
- Cyber Threat Hunting is the act of proactively and aggressively identifying, intercepting, tracking, investigating, and eliminating cyber adversaries as early as possible in the Cyber Kill Chain.
    - The earlier you locate and track your adversaries' tactics, techniques, and procedures (TTPs), the less impact these adversaries will have on your business.
        - Problem: Humans are the transnational criminals creating cyber threats
        - Solution: Proactive cyber threat investigation and hunting
- Actionable intelligence
- Know your enemy, the cyber kill chain
    - Reconnaisance
        - Research, identify, gather, select targets
    - Weaponization
        - Prepare to deliver malware and exploit
    - Delivery
        - Initiate launch of malware to target
    - Exploitation
        - Access and exploit target vulnerabilities 
    - Installation
        - Deploy malware in target environment
        - Acquire persistent access
    - Command and control
        - Manipulate and control remotely
    - (STOP RIGHT HERE)
    - Actions on objectives
        - Take action to achieve goals
            - Exfiltration
            - Destruction
            - Intrusion
            - etc.
- Approach
    - People
        - Experienced security analysts with strong investigation skills
    - Internal data & systems
        - Foundational data from current security systems
    - External data & intelligence
        - Known indicators from outside sources
    - Statistical analysis
        - Anomaly detection with statistical modeling
    - Intelligence analysis
        - Investigation and research to make correlations and links
- Advance your SOC
    - Tier 1
        - SOC analysts
            - Firewall
    - Tier 2
        - SOC analysts and incident responders
            - SIEM
    - Tier 3
        - Threat researchers and cyber analysts
            - Threat hunting methodology
        - Indicators of concern (IoC)
            - Proactive