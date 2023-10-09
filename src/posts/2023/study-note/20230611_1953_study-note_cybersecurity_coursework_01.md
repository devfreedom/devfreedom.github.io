---
title: "[Study Note] Coursework: Cybersecurity Analyst - Part 1"
date: 2023-06-11T19:53
thumb: "cybersecurity.jpg"
tags: 
    - ❮Study Note❯
    - cybersecurity
---

# 1. Introduction

## NIST's CIA Triad
- Confidentiality
    - Prevention of sensitive information from unauthorized access and attempts
        - Roughly equivalent to privacy
    - Preserving authorized restrictions on information access and disclosure, including means for protecting personal privacy and proprietary information
    - Loss of confidentiality is the unauthorized disclosure of information.
    - How to implement?
        - Encryption
        - Authentication
        - Access controls
        - Physical security
        - Permissions
- Integrity
    - The consistency, accuracy, and trustworthiness of data over its entire lifecycle
    - Guarding against improper information modification or destruction
    - Including ensuring information non-repudiation and authenticity
    - Integrity loss is the unauthorized modification or destruction of information.
    - How to implement?
        - Technical controls
            - Algorithms
            - Hashes
- Availability
    - System and information should be readily available for authorized stakeholders
    - Timely and reliable access to information
    - Loss of availability is the disruption of access to an information system
    - How to implement?
        - Technical implementations
            - RAIDs
            - Clusters
            - ISP redundancy
            - Backups

### Non-repudiation
- Valid proof of the identity of the data sender or receiver
    - Technical implementations
        - Digital signatures
        - Logs

### CIA Triad Add-ons
- Authenticity: Property of being genuine and verifiable
- Accountability: Mapping actions to an identity

## Key Terms
- Vulnerability
    - A flaw, loophole, oversight, or error that can be exploited to violate system security policy
    - e.g. A software or an application that has code vulnerable
- Exploit
    - A defined way to breach the security of an IT system through a vulnerability
- Risk
    - The probability of an event or that an event could actually happen, involving exposure to a danger
- Threat
    - An event, natural or man-made, able to cause negative impact to an organization

## Security Threat Sources
- Internal factors
    - Personnel with huge risks
    - e.g. Internal employees and former employees
- External factors
    - Human factors from outside
    - Malicious events
        - e.g. Attack coming from a specific country, targeting one of our DMZ servers
    - Malwares
        - e.g. Viruses, Trojans, or worms created by hackers
- Natural factors
    - e.g. Lightning, hurricanes, tornadoes, tsunami

## Vulnerability Assessment
- The process of identifying, analyzing, and ranking vulnerabilities in the specific environment
    - e.g. Many systems are shipped with known and unknown security holes and bugs, for instance. 
        - This is also associated with misconfigurations like when you get a modem and these modem has, for instance, the username and password admin

## Cybersecurity Programs

### Approach
- Security program
    - Evaluate, identify and model threats
    - Use cases, risk, monitoring, and control
- Asset management
    - Classification
    - Documentation
    - Asset control
    - Implementation steps
- Administrative controls
    - Policies, standards, compliance, and procedures
    - User education and incident response
    - Disaster recovery and physical security
- Technical controls
    - Network infrastructures and endpoints
    - Identity and vulnerability management
    - Monitoring and logging

## Security Challenges
- Security is not as simple as it seems
- Protection of enforcement structure can complicate solutions
- Solutions can be attacked themselves
- Security architectural decisions can be difficult
    - We already know what to do, but where to do that?
- Key management is really hard
- Protectors have to be right all the time
    - ...while attackers just once
- No one likes security until its needed
    - ...just like a seat belt
- Security architectures require constant effort
    - Strategic vs tactical perspectives
- Security is often a decision after thought
    - Iced on rather than baked in
- Security is viewed as in the way

## Critical Thinking in Cybersecurity

### Importance
- The controlled and purposeful goal-oriented mindset where there are no clear answers
- Critical thinking is very important due to the nature of cybersecurity
    - Multifaceted and diverse
    - Fast-paced and constantly-changing environment
    - Multiple stakeholders and adversaries
    - Subjected and impossible to measure
        - = Art + Science

### 5 Key Skills
- Challenge assumptions
    - List systematically and then challenge
        1. Explicitly list all assumptions
        2. Examine each with key questions
        3. Categorize based on evidence
        4. Refine and remove
        5. Identify additional data needs
- Consider alternatives
    - Brainstorm full of possibilities
        - From negative to positive
        - The six Ws
            - Who/what/when/where/why/how
        - Null hypothesis
            - Establish the opposite of your main hypothesis
                - Useful for anomalous data
- Evaluate data
    - Scientific approach
    - Lookout for inconsistent data
        - Establish a baseline for normality
            - And then detect anomalies
        - Be proactive
- Identify key drivers
    - What are the driving forces at play?
        - Technology
        - Regulatory
        - Society
        - Supply chain
        - Employees
        - Threat actors
- Understand context
    - Most important
    - Reframe the problem by putting yourself in other's shoes
        - Problem framing technique
            - "The elevator is too old and slow."
                - Make the elevator faster
            - "Waiting is boring."
                - Shorten perceived wait time
    - Key components
    - Factors at play
    - Relationships
    - Similarities/differences
    - Redefine

## Cybersecurity Organizations
- Women in Cybersecurity (WiCys)
- The SANS Institute
- The Open Wep Application Project (OWASP)
- Information Systems Security Association (ISSA)
- Forum of Incident Response and Security Teams (FIRST)

---

# 2. Security Attacks, Actors and their Motive

## Main Types of Actors and their Motivation
- Actors
    - Internal users
        - Most likely to cause security problems
            - either intentionally or not
    - Hackers
        - Have enough knowledge and time to attack
        - Could be paid by private or public organizations
    - Hacktivism
        - Motivated by political action and movements
    - Governments
        - Have enough power to cause large financial and operational losses
- Motivation
    - Just play
    - Political action and movements
    - Gain money
    - For hire

## Organizational Threats
- Threat by purpose
    - Accidental threats do not involve malicious intent
    - Intentional threats require a human with ill intent
        - If an intentional threat results in action, it becomes an attack
- Threat by activity
    - Passive threats do not involve any change to a system
    - Active threats involve significant change to a system
        - If an organization responds to an intentional threat, then the threat is classified as both open case and active threat.
- e.g. Data communication threat
    - Destruction of information and resources
    - Corruption/modification of information
    - Theft/removal/loss of information
    - Disclosure of information
    - Interruption of services

### Internet Security Threats
- Mapping
    - Finding out what services are implemented on network, before attacking
        - Ping: determine what hosts have addresses on network
        - Port scanning: Attempt on establishing TCP connections to each port in sequence to see what happens
    - Countermeasure
        - Record traffic entering network
        - Look for suspicious activities
            - IP address
            - Sequentially-scanned ports
        - Use a host scanner
- Packet sniffing
    - Broadcast media using broadcast UD methods such as UDP
    - Network interface controller (NIC) running in promiscuous mode can read all unencrypted data packets
        - Prosmiscuous mode (often shortened to "promisc mode") is a mode for a wired or wireless NIC that causes the controller to pass all traffic it receives to the CPU, rather than passing only the frames that the controller is intended to receive.
    - Countermeasure
        - Set up only one host per segment of broadcast media
            - switched Ethernet at hub
- IP Spoofing
    - Can generate raw IP packets directly from application, putting any value into IP source address field, to impersonate
        - Receiver can't tell if source is spoofed
    - Countermeasure
        - Ingress filtering
            - Blocking the router from forwarding outgoing packets with invalid source addresses
                - e.g. datagram source address not in routrer's network
            - However, ingress filtering can't be mandated for all networks
- Denial of Service (DOS)
    - Flood of maliciously generated packets swamps receiver
    - Distributed DOS (DDOS) = multiple coordinated sources swamp receiver
    - Countermeasure
        - Filter out and remove flooded packets before reaching the host 
        - Use traceback to identify the source of floods
- Host insertions
    - Generally an insider threat
    - A computer host with malicious intent is inserted in sleeper mode on the network
    - Countermeasure 
        - Maintain an accurate inventory of computer hosts by MAC address
        - Use a host scanning capability to match discoverable hosts against known inventory
            - Missing hosts are OK
            - New hosts are NOT OK

### Other Threats
- Malware
    - Virus
        - Requires human interaction to self-replicate
    - Worms
        - Spreads by itself
    - Trojan horses
        - Disguise as a legitimate package
    - Spyware
        - Designed to collect system and user data, and then report back to a malicious actor
    - Adware
    - Remote Administration Tool (RAT)
        - Allows the attacker to gain unauthorized access and control
    - Rootkit
        - Intended to take full or partial control of a system at the lowest level
- Ransomware
- Botnets
    - A set of compromised hosts that enables black hat hackers to exploit those computer resources to mount attacks
        - e.g. spam. DOS, phishing, spyware, etc.
- Keyloggers
- Logic bombs
- Advanced Persistent Threats (APT)
    - Low-key undetected spying for a long period of time
        - Usually targets military, governmental, and financial organizations with high value information

### Threat Protection
- Technical control
    - Antivirus
    - IPS, IDS, UTM
    - Updates
- Administrative control
    - Security policies
    - Training
    - Revision and tracking

## Attacks
- An attack is an action by a human with intent to violate security
    - Result(success/fail) doesn't matter
- Passive attacks
    - Harder to detect because the original message is unchanged and could pass an integrity check.
        - Eavesdropping
            - Attack on the confidentiality of the message
        - Traffic analysis
- Active attacks = Security architecture attack
    - Explicit interception and modification
        - Masquerade
            - Identity theft (impersonation)
            - Attack on the authentication of the origin of the message
        - Replay
            - A copy of a legitimate message is captured by an opponent and re-transmitted.
            - Attack on the integrity of the system's data
        - Modification
            - The content of a legitimate message is altered.
            - Attack on the integrity of the message
        - Denial of Service
            - Attack on the availability of the system

### The Cyber Kill Chain
- Intrusion kill chain
    1. Reconnaissance
    2. Weaponization
    3. Delivery
    4. Exploitation
    5. Installation
    6. Command & Control
    7. Actions on Objective

### Social Engineering
- The use of humans for cyber purposes
- Tools
    - The Social-Engineer Toolkit (seToolkit)
        - Open-source penetration testing framework designed for social engineering
        - https://github.com/trustedsec/social-engineer-toolkit
- Phishing
    - Phishing is a form of social engineering where attackers deceive people into revealing sensitive information or installing malware such as ransomware.
    - Tools
        - Gophish
            - Open-source phishing framework
            https://github.com/gophish/gophish
- Vishing
    - Voice phishing

## Security Service
- Definition
    - X.800: "A service provided by a protocol layer of communicating open systems, which ensures adequate security of the systems or of data transfers"
        - Authentication
            - Assurance that the communicating entity is the one claimed
                - have both peer-entity & data origin authentication
        - Non-repudiation
            - Protection against denial by one of the parties in a communication
        - Access control
            - Prevention of the unauthorized use of a resource
        - Data confidentiality
        - Data integrity
        - Availability
    - RFC 2828: "A processing or communication service provided by a system to give a specific kind of protection to system resources"
- Purpose
    - Enhance security of systems and information transfers
    - Counter security attacks
    - Often replicates functions normally associated with physical documents

## Security Mechanisms
- Combination of hardware, software, and processes that implements a specific security policy
    - e.g. protocol suppression, ID, and authentication
- Specific mechanisms
    - Cryptography
    - Digital signatures
    - Access controls
    - Data integrity
    - Authentication exchange
    - Traffic padding
    - Routing control
    - Notarization
- Pervasive mechanisms
    - Trusted functionality
    - Security labels
    - Event detection
    - Security audit trails
    - Security recovery

---

# 3. Key Security Concepts

## Access Management
- Access criteria
    - Groups
    - Timeframe and specific dates
    - Physical location
    - Transaction type
- "Need to know"
    - Allowing access to information only needed for the role
- Single Sign-On (SSO)
    - Centralized access

### Authentication 
- Identity proof
- Kerberos (SSO)
- Mutual authentication
    - e.g. MSCHAPv2
- Security ID (SID)
    - e.g. Active Directory
- Discretionary Access Control List (DACL)

## Incident Response
- Monitoring and detection of security events on a computer or a computer network and the execution of proper resources to those events
- Security team or incident management will regularly check and monitor the security events occuring on computer systems or network.

### Incident Response Components
- Events: An observed change
- Incident: An event negatively effects the CIA triad that impacts the business
- Response team: Computer security incident response team
- Investigation: Seeks to determine the circumstances of the incident
    - Every incident warrants or requires an investigation.

### Incident Response Key Concepts
- E-discovery 
    - Data inventory
    - Data classification
    - Data management
- Automated systems
    - SIEM, SOA, UBA
    - Big data analysis
    - Honeypots/honeytokens
- BCP & Disaster recovery
    - Business continuity process (BCP) preparedness
- Post-incident
    - Root-cause analysis
    - Differentiating between error, problem, and isolated incident

### Incident Response Process
- Prepare
    1. Conduct a criticality assessment
    2. Carry out a cyber security threat analysis supported by realistic scenarios and rehearsals
    3. Consider the implications of people, process, technology and information
    4. Create an appropriate control framework
    5. Review your state of readiness
- Respond
    1. Identify cybersecurity incident
    2. Define objectives and investigate situation
    3. Take appropriate action
    4. Recover systems, data, and connectivity
- Follow up
    1. Investigate incident more thoroughly
    2. Report incident to relevant stakeholders
    3. Carry out a post-incident review
    4. Communicate and build on lessons learned
    5. Update key information, controls, and processes
    6. Perform trend analysis

## Frameworks and their Purpose 

### IT Governance Process
- Policies
    - Strategic and tactical plans are enforced by policies.
- Procedures
    - Each policy may have a procedure associated with details regarding the operative process.
- Strategic and tactical plans
    - Each organization must have a set of strategic plans based on the goals and objectives.
- Others
    - Documentation
    - Guidelines
    - Baselines
    - Standards
    - Technical procedures

### Audit
- Audit can be internal or external.
- Sans Institutes Audit Process
    1. Define the audit scope and limitations
    2. Look for information, gathering information
    3. Do the audit via different methods
    4. Feedback based on the findings
    5. Deliver a report
    6. Discuss the results
- The OCTAVE method
    1. Organizational view
    2. Technological view
    3. Risk analysis

### OWASP Framework
- Top 10 web app risks in 2013
    1. Injection
    2. Broken authentication and session management
    3. Cross-site scripting (XSS)
    4. Insecure direct object references
    5. Security misconfiguration
    6. Sensitive data exposure
    7. Missing function level access control
    8. Cross-site request forgery (CSRF)
    9. Using known vulnerable components
    10. Unvalidated redirects and forwards
- Top 10 mobile app risks in 2016
    1. Weaker server-side controls
    2. Insecure data storage
    3. Insufficient transport layer protection
    4. Unintended data leakage
    5. Poor authentication and authorization
    6. Broken cryptography
    7. Client-side injection
    8. Security decisions via untrusted inputs
    9. Improper session handling
    10. Lack of binary protections

---

# 4. Key Security Tools

## Firewalls
- Isolates organization's internal net from larger Internet, allowing some packets to pass, blocking others
    - A filter between administered network and public Internet
- Why firewalls?
    - Prevent denial of service attacks
        - e.g. SYN flooding
            - Attacker establishes many bogus TCP connections leaving no resources for real connections
    - Prevent illegal modification/access of internal data
        - e.g. Attacker replaces the company's homepage with something else
    - Allow only authorized access to inside network
- Firewall types
    - Application-level
    - Packet-filtering

### Stateless-ness and Stateful-ness
- Firewalls are...
    - They handle packets differently.
    - They are multi-homed.
        - Multiple NICs connected to different networks
- Stateless firewalls
    - a.k.a. Packet filter
    - Based on Layer 3 and Layer 4
    - Lack of state means less secure
- Stateful firewalls
    - Have state tables that allow firewall to compare current packets with previous packets
    - Could be slower than packet filters but far more secure.
    - Application firewalls can make decision based on Layer 7 information.
- Proxy firewalls
    - Acts as intermediary servers
    - Proxies terminate connections and initiate new ones, like a MITM.
    - Two 3-way handshakes between two devices

### Packet-filtering
- Internal network connected to Internet via router firewall
- Router filters packet-by-packet, decision to forward/drop packet based on,
    - Source/destination IP address
    - TCP/UDP source and destination port numbers
    - ICMP message type
    - TCP SYN and ACK bits
- e.g.
    - Block incoming and outgoing datagrams with IP protocol field = 17 and with either source or destination port = 23
        - All incoming and outgoing UDP flows and telnet connections are blocked
    - Block inbound TCP segments with ACK = 0
        - Prevents external clients from making TCP connections with internal clients, but allows internal clients to connect to outside

### Application Gateways
- Filters packets on application data as well as on IP/TCP/UDP fields.
- e.g.
    - Allow select internal users to telnet outside
        1. Require all telnet users to telnet through gateway.
        2. For authorized users, gateway sets up telnet connection to destination host. Gateway relays data between 2 connections.
        3. Router filter blocks all telnet connections not originating from gateway.

### Limitations of Firewalls and Gateways
- IP spoofing
    - Router can't know if data really comes from claimed source
- Each app might need its own gateway for special treatment
- Client software must know how to contact gateway
- Filters often use all-or-nothing policy for UDP
- Tradeoff based on degree of communication with outside world, level of security
- Many highly-protected sites still suffer from attacks

### XML Gateway, A New Bird
- XML traffic passes through a conventional firewall without inspection
    - All across normal web ports
- XML gateway examines the payload of the XML message
    - Well-formed (meaning to spec) payload
    - No executable code
    - Target IP address makes sense
    - Source IP is known

## Antivirus/Antimalware
- Specialized software that can detect, prevent, and destroy malwares
- Scans the system and search for matches against the malware definitions (hashes)
- These definitions get constantly updated by vendors

## Cryptography

### Cryptography Introduction
- Secure communication that may be understood by the intended recipient only
    - Cryptography = secret writing
- Both data in motion and data at rest need to be secured.
- Cryptography has thousands of years of history.
- Key concepts
    - CIA triad
    - Non-repudiation
    - Cryptoanalysis
    - Cipher
    - Plaintext 
    - Ciphertext
    - Encryption
    - Decryption
- Cryptographic strength
    - Relies on math not secrecy
    - Public algorithms
        - Ciphers that have stood the test of time
    - Modern ciphers use modular math.
    - XOR gate is the secret sauce behind modern encryption.
- Stream cipher encrypt/decrypt bit per bit.
- Block cipher encrypt/decrypt in blocks or several sizes depending on the algorithm.

### Types of Cryptography
- Symmetric encryption
    - e.g. DES, Triple DES, AES
    - Uses the same key to encrypt and decrypt
    - Security depends on keeping the key secret at all times.
    - Strengths include speed and cryptogrpahic strength per bit of key.
    - The bigger the key, the stronger the algorithm
    - Key needs to be shared using a secure, out-of-band method.
- Asymmetric encryption
    - Uses two keys
        - One key can be made public, the other one needs to be kept private.
        - One for encryption and one for decryption
        - Public Key Infrastructure (PKI)
    - Uses one-way algorithms to generate the two keys
        - e.g. factoring prime numbers, discrete logarithm
    - Used in digital certificates
    - Slower than symmetric encryption
- Hash functions
    - e.g. SHA-1, MD5
        - These older algorithms are prone to hash collisions.
        - SHA-2 is the newer and recommended alternative.
    - Provides encryption using an algorithm and no key
    - A variable-length plaintext is hashed into a fixed-length hash value, often called a "message digest" or "hash"
    - If the hash of a plaintext changes, the plaintext itself has changed.
        - Provides integrity verification

### Cryptographic Attacks
- Brute force
- Rainbow tables
- Social engineering
- Known plaintext
- Known ciphertext

### The Language of Cryptography
- Fictional characters used in network security and cryptography
    - Bob and Alice want to communicate securely.
    - Trudy may intercept, delete, add messages
        - Alice = friend
        - Bob = friend
        - Trudy = intruder
- Process
    ```
        Alice                                               Bob
    (encryption key) ↴                              ⬐ (decryption key)

    [PLAINTEXT] → Encryption → [CIPHERTEXT] → Decryption → [PLAINTEXT]
                  algorithm                   algorithm
                                    ↕
                              (crypto attack)    
                                  Trudy
    ```
    - Symmetric key cryptography
        - Both Alice and Bob have the same identical key
    - (Asymmetric) Public key cryptography, from Alice to Bob
        - Alice's encryption key (Bob's public key)
        - Bob's decryption key (Bob's private key)
        1. Alice requests Bob’s public key and uses it to encrypt her message. 
        2. Alice then sends the encrypted message to Bob who decrypts it using his private key.
    - (Asymmetric) Public key cryptography, between Alice and Bob
        - Both Alice and Bob needs their own encryption and decryption keys.
            - Total 4 unique keys are needed.

### Data Encryption Standard (DES)
- Symmetric key crypto
    - 56-bit symmetric key
    - 64-bit plaintext input
- Former US encryption standard
- Operation
    1. Initial permutation
    2. 16 identical rounds of function application, each using different 48 bits of key
    3. Final permutation
- DES challenge
    - An 8-word sentence got brute-forced in 4 months
    - How to make DES more secure?
        - Use 3 keys sequentially on each datum (3-DES)
        - Use cipher-block chaining

### Advanced Encryption Standard (AES)
- New US/NIST encryption standard replacing DES
- Processes data in 128-bit blocks
- 128, 192, 256-bit keys available
- Brute force taking 1 second on DES, takes 149 trillion years for AES

## Hackers
- White Hat
    - Ethical hackers
    - Work done under contract for security reasons
- Grey Hat
    - They may look for vulnerabilities in an unauthorized manner and report back to the possible victim
- Black Hat
    - Bad guys
    - For personal recognition, money, political agenda, social change, etc.

### Threat (malicious) Actors
- An entity that is partially or wholly responsible for an incident that affects or potentially affects an organization's security
- Script kiddies
- Hacktivists
- Organized crime
- Insiders
- Competitors
- Nation states
    - Notable APTs
        - Fancy Bear (APT28)
        - Lazarus Group (APT38)
        - ScarCruft (APT37)
        - Cozy Bear (APT29)

## Penetration Testing
- A method of evaluating computer and network security by simulating an attack on a computer system or network from external and internal threats
- Finding security vulnerabilities that an attacker could exploit
    - = ethical hacking
    - e.g. Mile 2 CPTE training

### Pentest Methodologies
- Open Source Security Testing Methodology Manual (OSSTMM)
- NIST SP 800-42 Guideline on Network Security Testing
- FFIEC Information Technology Examination
- Information Systems Security Assessment Framework (ISSAF)

## Vulnerability Test
- Vulnerability assessment methodology
    1. Identify indicators
    2. Exposure
    3. Sensitivity
        - Exposure and sensitivity determine potential impacts
    4. Adaptive Capacity
        - Vulnerability

## Digital Forensics
- A branch of forensic science
    - Locard's principle 
        - The perpetrator of a crime will bring something into the crime scene and leave with something from it, and that both can be used as forensic evidence. 
- Includes the identification, recovery, investigation, validation, and presentation of facts regarding digital evidence found on computers or similar digital storage media devices

### Chain of Custody
- Refers to the chronological documentation or paper trail that records the sequence of custody, control, transfer, analysis and disposition of physical or electronic evidence
- It is often a process that has been required for evidence to be shown legally in court

### Forensic Tools
- Hardware
    - Faraday cage
    - Tool sets
        - Forensic laptops and power supplies
        - Digital camera
        - Case folder
        - Blank forms
        - Evidence collection and packaging supplies
        - Empty hard drives
        - Hardware write blockers
- Software
    - Volatility
    - FTK
    - Encase
    - dd
    - Autopsy (The Sleuth Kit)
    - Bulk Extractor