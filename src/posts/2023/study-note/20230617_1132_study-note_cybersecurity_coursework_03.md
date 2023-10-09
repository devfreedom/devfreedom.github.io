---
title: "[Study Note] Coursework: Cybersecurity Analyst - Part 3"
date: 2023-06-17T11:32
thumb: "cybersecurity.jpg"
tags: 
    - ❮Study Note❯
    - cybersecurity
---

# 1. Compliance Frameworks and Industry Standards

## Security Challenges
- Event
    - An event on a system or network detected by a security device or application
- Attack
    - A security event that has been identified by correlation and analytics tools as malicious activity that is attempting to negatively impact system, information, and resources
- Incident
    - An attack or security event that has been reviewed by security analysts and deemed worthy of deeper investigation
- How to challenge the "bad guys"
    - Outsiders
        - They want to "get in".
        - Security baseline ensures we design secure offerings but setting implementation standards
            - e.g. Logging, encryption, development practice, etc.
        - Validated through baseline reviews, threat models, pentesting, etc.
    - Inadvertent actor
        - They are "in" but are human and make mistakes
        - Automate procedures to reduce errors (technical controls)
        - Operational/procedural manual process safe guards
        - Review logs/reports to find/fix errors
        - Test automation regularly for accuracy
    - Malicious insiders
        - They are "in" but are deliberately behaving badly
        - Seperation of duties - no shared IDs, limit privileged IDs
        - Secure coding, logging, monitoring access/operations

## Security and Compliance
- Security
    - Designed protection
    - Security controls
        - Physical controls
            - For the servers in the data centers
        - Technical controls
            - Features and functions of the service (e.g. encryption)
            - What log data is collected
        - Operational controls
            - How a server is configured, updated, monitored, and patched
            - How staff are trained and what activities they perform
- Privacy
    - How information is used, who that information is shared with, or if that information is used to track users
- Compliance
    - Tests that security measures are in place
    - Which and how many depend on the specific compliance
    - Often will cover additional non-security requirements such as business practices, vendor agreements, organizational controls, etc.

### Compliance process
- General process for any compliance/audit process
    1. Establish scope
        - Controls are based on the goal and compliance
        - Ensure all components in scope are compliant to technical controls
        - Ensure all processes are compliant to operational controls
    2. Readiness assessment
    3. Gap remediation
    4. Testing/auditing
        - Internal and self assessments
        - External audit
        - Set audit recertification schedules
    5. Management assertion and reporting

## US Cybersecurity Federal Law
- Computer Fraud and Abuse Act (CFAA)
- Federal Information Security Management Act (FISMA 2002)
- Federal Information Security Modernization Act (FISMA 2014)

## EU General Data Protection Regulation (GDPR)
- Into effect on 25 May 2018
- Global impact
- 5 key GDPR obligations
    - Rights of EU data subjects
        - Data subject: An identified or identifiable living natural person
    - Security of personal data
        - Personal data: Any information relating to a data subject
    - Consent
    - Accountability of compliance
        - 4% or 20M Euros of potential penalty for non-compliance per incident    
    - Data protection by design and by default
        - Controller: Determines the purpose and means of processing of personal data
        - Processor: Processes personal data on behalf of the controller
        - Processing: Any operation performed on personal data (including storage and access) anywhere in the world

## ISO 27001
- The ISO 2700 family of standards helps organizations keep information assets secure.
- ISO/IEC 27001 is the best known standard in the family providing requirements for an information security management system (ISMS)
    - Provides requirements for establishing, implementing, maintaining, and continually improving an information security management system
    - ISO 27001 certification can provide credibility to a client of an organization.
        - For some industries, certification is a legal or contractual requirement.
        - ISO develops the standards but does not issue certifications.
            - Organizations that meet the requirements may be certified by an accredited certification body following successful completion of an audit.
- ISO 27018 is about privacy.
- ISO 27017 is about cloud security.

## System and Organization Controls (SOC) Reports by AICPA
- SOC2 Principles
    - Security
        - The system is protected against unauthorized access, boty physical and logical.
        - Controls related to user provisioning, user revalidation, change management, etc.
    - Availability
        - Controls related to virus prevention, system back-ups, disaster recovery, etc.
    - Confidentiality
        - Information designated as confidential is protected by the system as committed or agreed.
    - Processing integrity
        - System processing is complete, accurate, timely, and authorized.
    - Privacy
        - With criteria set forth in Generally Accepted Privacy Principles (GAPP)
- Controls
    - Primary control: Provides the feature/function/operation of the control
    - Secondary control: Provides support or backup to ensure primary control is effective
- Some industry/jurisdictions require SOC2 or local compliance audit
- Many organizations know SOC2 Type 2 consider it a stronger statement of operational effectiveness than ISO 27001 (continuous testing)
- Many organization's clients will accept SOC2 in lieu of the right-to-audit

### SOC Versions
- SOC1
    - Used for situations where the systems are being used for financial reporting
- SOC2 Security
    - Governance: AICPA
    - Worldview: North American/International
    - Certification: CPA Firm Attest Examination Opinion
    - Report: Report containing the auditor's opinion, management's assertion, description of controls, user control considerations, tests of controls, and results
    - Best use: Measure a service organization against static security principles and criteria
    - Higher difficulty than ISO 27001
- SOC3
    - General use report to provide interested parties with a CPA's opinion about same controls in SOC 2

### SOC Types
- Type 1 report
    - Service auditor expresses an opinion on if the system's description is fairly presented and if the controls are suitably designed to meet the applicable Trust Service criteria as of a point in time.
    - Consider this the starting line.
    - Type 1 is closest to an ISO report.
- Type 2 report
    - Same as Type 1 report, but also includes an opinion on the operating effectiveness of the controls for a period of time
    - Proof you are maintaining effectiveness over time, typically 6 months, renewed either every 6 months or yearly, includes the service auditor's test result of operating effectiveness.
- Both types are available for both SOC1 and SOC2.

### SOC Auditor Process
- Auditors are looking for,
    - Accuracy
        - Are controls results being assessed for pass/fail
    - Completeness
        - Do controls implementation cover the entire offering, such as no gaps in inventory and personnel?
    - Timeliness
        - Are controls performed on time or early, with no gaps in coverage?
        - If a control cannot be performed on time, are there appropriate assessment (risk) approvals before the control is considered late?
    - Resilience notice
        - Are there checks and balences in place such that if a control does fail, would you and correct? At all? Within a reasonable timeframe?
    - Consistency
        - Shifting control implementation raises concerns about above, plus increases testing
- Continuous monitoring between audits
    - Purpose
        - Ensure controls are operating as designed
        - Identify control weaknesses and failure outside an audit setting
        - Communicate results to appropriate stakeholders
    - Scope
        - All production devices
        - Controls will be tested for operating.
        - Effectiveness over time focusing on:
            - Execution against the defined security policies
            - Execution evidence maintenance/availability
            - Timely deviation from policy documention
            - Timely temporary failures of a control or loss of evidence documentation and communication

## Health Insurance Portability and Accountability Act (HIPAA)
- HIPAA (and HITECH)
    - The US Federal laws and regulations that define the control of most personal healthcare information (PHI) for companies responsible for managing such data
        - PHI: Any information about health status, provision of healthcare, or payment for healthcare that is maintained by a Covered Entity and Business Associate, and can be linked to a specific individual.
        - Covered Entity: Companies that manage healthcare data for their customers
        - Business Associate: Any vendor company that supports the Covered Entity
- HHS-OCR
    - US Department of Health and Human Services (HHS) Office of Civil Rights (OCR) governs HIPPA compliance.
    - HHS-OCR can do unannounced audits on the CE+BA or just the BA.
    - There are significant enforcement penalties on HIPAA violations
        - HHS-OCR Breach Portal a.k.a. "Wall of Shame"
    
## HIPAA Rules
- HIPAA Privacy Rule
    - Protection of individual's medical records and PHI, applies to heatlhcare providers and health plans with certain electronic healthcare transactions.
- HIPAA Security Rule
    - A set of security standards for protecting certain health information that is held or transferred in electronic form
    - Addresses technical and non-techincal safeguards that must be put in place to secure e-PHI
- HIPAA Administrative Safeguards
    - Security management process
    - Security personnel
    - Information access management
    - Workforce training and management
    - Evaluation
- HIPAA Technical Safeguards
    - Access controls
    - Audit controls
    - Integrity controls
    - Transmission security
- HIPAA Physical Safeguards
    - Facility access and control
    - Workstation and device security

### The Purview of HIPAA
- HIPAA is a U.S. Regulation
    - Other countries have similar regulations and laws.
    - Some U.S. states have superseding regulations stricter than federal HIPAA.
    - Some international companies will require HIPAA compliance for a either a measure of confidence, or because they intend to do business with US data.

## Payment Card Industry Data Security Standard (PCI-DSS)
- Introduced in 2004 by MasterCard, Visa, American Express, and Discover
    - In response to security breaches and financial losses within the credit card industry
- Applies to all entities that store, process, and/or transmit cardholder data
- Covers technical and operational practices for system components included in or connected to cardholder data environments
- Scope
    - Cardholder data
        - Primary account number
        - Cardholder name
        - Expiration date
        - Service code
        - etc.
    - Sensitive authentication data
        - Magnetic stripe
        - IC chip
        - PINs and PIN blocks
        - etc.
- PCI requirements examples
    - Approved Scanning Vendor (ASV) scans
        - Quarterly, external, 3rd-party
    - File integrity monitoring (FIM)
    - Firewall review every 6 months
    - Responsibility matrix

## Center for Internet Security (CIS) Critical Security Controls
- CIS Controls are a prioritized set of actions that collectively form a defense-in-depth set of best practices that mitigate the most common attacks against systems and networks
    - Basic controls
    - Foundational controls
    - Organizational controls

---

# 2. Client System Administration and Endpoint Protection

## Client System Administration
- Endpoint devices are the front line of attack
    - Cloud and mobile computing
    - New devices, new applications, and new services
- Common types of endpoint attacks
    - Spear phishing
        - An email imitating a trusted source designed to target a specific person or department
        - Whaleing attack
            - A whaling attack is a special form of spear phishing that targets specific high-ranking victims within a company. 
    - Watering hole
        - Malware placed on a site frequently visited by an employee or group
    - Ad network attacks
        - Using ad networks to place malware on a machine through ad software
    - Island hopping
        - Supply chain infiltration

## Endpoint Protection
- Endpoint protection management is a policy-based approach to network security that requires endpoint devices to comply with specific criteria before they are granted access to network resources.
- Endpoint security systems work on a client/server model in which a centrally managed server or gateway hosts the security program and an accompanying client program is installed on each network device.

### Unified Endpoint Management (UEM)
- UEM is one that converges client-based management techniques with Mobile Device Management (MDM) application programming interfaces (API).
- Traditional client management systems
    - Involves an agent-based approach
    - Great for maintenance and support
    - Standardized rinse-and-repeat process
    - Applicable for some OS and servers
- Mobile device management
    - API-based management techniques
    - Security and management of corporate mobile assets
    - Specialized for over-the-air configuration
    - Purpose-built for smartphones and tablets
- Device management + Client management = UEM

### Endpoint Response
- Key mitigation capabilities for endpoints
    - Deployment of devices with network configurations
    - Automatic quarantine/blocking of non-compliant endpoints
    - Ability to patch thousands of endpoints at once
- Endpoint detection and response
    - Automatic policy creation for endpoints
    - Zero-day OS updates
    - Continuous monitoring, patching, and enforcement of security policies across endpoints
- Key factors to consider
    - Threat hunting
    - Detection response
    - User education

## Patching
- A set of changes to a computer program or its supporting data designed to update, fix, or improve it.
    - Includes vulnerability fixes, bug fixes, usability/functionality/performance improvements
- All OSs require some type of patching.
- Patching is the fundamental and most important thing an organization can do to prevent malicious attacks

### Windows Patching
- Patch types
    - Security updates
    - Critical updates
    - Software updates
    - Service packs
- Patching process
    - Typically monthly process by most organizations
        1. Patch released
            - OS
            - Application
        2. Testing
            - Compatibility with custom applications
            - Small test group
        3. Distribute to organization
            - Send to broader group
            - Patch vulnerabilities

---

# 3. Windows RBAC and Permissions

## Windows Access Control
- After user authentication, Windows determines if the user has the correct permissions to access a resource.
    - In the access control model, users and groups (Security Principals) have assigned rights and permissions that inform OS what each user and group can do.
    - Security principals perform actions on objects.
    - Shared resources use Access Control Lists (ACL) to assign permissions to enforce access control in two ways,
        - Deny access to unauthorized users and groups
        - Set well-defined limits on the access that is provided to authorized users and groups
- Privileged accounts (e.g. administrators)
    - Administrators have direct or indirect access to most or all assets in an IT organization.
    - Administrators will configure Windows to manage access control to provide security for multiple roles and uses.
- Principle of least privileges
    - Giving a user account or process only those privileges which are essential to perform its intended function.
        - Better system stability
        - Better system security
        - Ease of deployment    
- Access control key concepts
    - Permissions
    - Ownership of objects
    - Inheritance of permissions
    - User rights
    - Object auditing

### Local User Accounts
- Local user accounts are stored locally on the Windows workstation or server
    - Default local user accounts
        - Administrator
        - Guest
        - HelpAssistant
        - DefaultAccount
    - Default local system accounts
        - SYSTEM
        - NETWORK SERVICE
        - LOCAL SERVICE
- The default local user accounts, and the local user accounts that you create are located in the Users folder.
    - Security considerations
        - Restrict and protect local accounts with administrative rights
        - Enforce local account restrictions for remote access
        - Deny network logon to all local administrator accounts
        - Create unique passwords for local accounts with administrative rights

### Windows Security App
- A client interface on Windows 10 1703 and later
    - Virus and threat protection
    - Account protection
    - Firewall and network protection
    - App and browser control
    - Device security
    - Device performance and health
    - Family options

## Windows Active Directory (AD)
- AD Domain Services (ADDS) stores information about objects on the network and makes this information easy for administrators and users to find and use
- Objects typically include shared resources such as servers, volumes, printers, and the network user and computer accounts
- Security is integrated with Active Directory through authentication and access control to objects in the directory via policy-based administration
- Features
    - A set of rules, the schema
    - Global catalog
    - Query and index mechanism
    - Replication service

### Active Directory Accounts
- Default local accounts
    - Administrator
    - Guest
    - HelpAssistant
    - KRBTGT
        - KRBTGT is an account used for Microsoft's implementation of Kerberos.
- Best practices for restricting and protecting sensitive domain accounts
    - Seperate administrator accounts from user accounts
        - Allocate privileged accounts to perform these duties only,
            - Minimum: Create seperate accounts for domain admin, enterprise admin, appropriate admin
            - Better: Create seperate accounts for admins that have reduced admin rights, such as workstation admin, and accounts with user rights over designated AD organizational units (OU).
            - Ideal: Create multiple seperate accounts for an admin who has a variety of job responsibilities that require different trust levels.
        - Standard user account
            - For standard user tasks and line-of-business (LOB) applications
    - Create dedicated workstation hosts without internet and email access
        - Admins need to manage job responsibilities that require sensitive administrator rights from a dedicated workstation because they do not have easy physical access to the servers.
            - Minimum: Build dedicated admin workstations and block internet access.
            - Better: Do not grant administrators membership in the local administrator group on the computer in order to restrict the administrator from bypassing these protections.
            - Ideal: Restrict workstations from having any network connectivity, except for the domain controllers and servers that the administrator accounts are used to manage.
    - Restrict administrator logon access to servers and workstations   
        - It is a best practice to restrict administrators from using sensitive administrator accounts to sign in to lower-trust servers and workstations. The guidelines are,
            - Minimum: Restrict domain administrators from having logon access to servers and workstations. Before starting this procedure, identify all OUs in the domain that contain workstations and servers. Any computers in OUs that are not identified will not restrict administrators with sensitive accounts from signing-in to them.
            - Better: Restrict domain administrators from non-domain controller servers and workstations
            - Ideal: Restrict server administrators from signing in to workstations, in addition to domain administrators.
    - Disable the account delegation right for administrator accounts
        - Although user accounts are not marked for delegation by default, accounts in an AD domain can be trusted for delegation.
            - This means a service or computer can impersonate an account that authenticates to them to access other resources across the network.
        - It is a best practice to configure the user objects for all sensitive accounts in AD by selecting the "Account is sensitive and cannot be delegated" checkbox under "Account Options" to prevent these accounts from delegated.

### Active Directory Groups
- Security groups are used to collect user/computer accounts, and other groups into manageable units.
    - Distribution groups
        - Used to create email distribution lists
    - Security groups
        - Used to assign permissions to shared resources
- There are two types of administrative responsibilities
    - Service administrators
    - Data administrators
- Group scope
    - Universal
    - Global
    - Domain local
- Default groups such as Domain Admins group are security groups that are created automatically when you create an AD domain.
    - Use these predefined groups to control access to shared resources and delegate specific domain-wide admin roles.

### Windows Admin Center
- A new, locally-deployed, browser-based Windows Server management tool without cloud dependency.
    - Particularly useful for managing servers on private networks that are not connected to the internet

## Kerberos Authentication and Logs
- Kerberos is an authentication protocol that is used to verify the identity of a user or host.
    - Kerberos Key Distribution Center (KDC) is integrated with other Windows Server security services and uses the domain's AD domain services database.
    - Key benefits
        - Delegated authentication
        - Single Sign-on
        - Interoperability
        - More efficient authentication to servers
        - Mutual authentication
- Logging
    - Windows Event Log contains logs from the operating system and several applications such as SQL server or Internet Information Server (IIS).
        - Use Windows Event Viewer to check the logs.

## Windows Server Audit
- 9 types of events you can audit for audit policy
    - Account logon events
        - See each instance of a user login/logout from another computer
    - Account management
        - Check any changes of account name, status, password, user group, etc.
    - Directory service access
        - Check users' access to AD directory service object that has its own system access control list (SACL)
    - Logon events
        - See when someone has login/logout your computer, either physically or over a network
    - Object access
        - See when someone has used a file, folder, printer, or other object such as Windows registry keys
    - Policy change
        - See attempts to change local security policies
    - Privilege use
        - See when events such as program activiation or a process exiting occur
    - System events
        - Audit to see when someone has shutdown or restarted the computer, or when a process or program tries to do something that it does not have permission to do.

## Samba
- Samba is a free and open source software that provides seamless file and print services by using TCP/IP protocol installed on the host server.
    - Samba allows the host to interact with a Microsoft Windows client or server as if it is a Windows file and print server.
    - Allows interoperability between Linux/Unix servers and Windows-based clients.

---

# 4. Cryptography and Compliance Pitfalls

## Encryption
- Encryption is a process of encoding data in a way that only authorized parties can access it.
    - Provides confidentiality, but not integrity
- Data can be encrypted,
    - At rest
    - In use
    - In transit
- Sensitive business and personal data should be encrypted at all times, everywhere.

### Encrypting Data at Rest
- The rule of thumb: Encrypt all sensitive data at rest: in files, config files, databases, backups, etc.
    - Symmetric key encryption is most commonly used.
    - Follow NIST guidelines for selecting appropriate algorithm.
        - Currently it's AES with CBC mode, and Triple DES
- Pitfalls
    - Some algorithms are outdated and no longer considered secure. Phase them out.
        - e.g. DES, RC4, etc.
    - Do not use hardcoded/easily-guessed/insufficiently-random keys.
        - Select cryptographically-random keys.
        - Do not reuse keys for different installs.
    - Do not store keys in clear text in proximity to data they protect (a.k.a. key under the doormat)
        - Store keys in secure keystores.
    - Do not use initialization vectors (IV) incorrectly.
        - Use a new random IV every time.
    - Do not use insufficient key size.
        - Preferable to select the biggest key size you can handle, but watch out for export restrictions.

### Encrypting Data in Use
- This is unfortunately a rarely-followed practice.
- Memory could be leaked by attacker.
    - e.g. 2014 OpenSSL Heartbleed incident
- Keep data encrypted up until it must be used
    - Decrypt data as needed, and then promptly erase it in memory after use
    - Keep all sensitive data encrypted except a brief moment of use
    - Consider homomorphic encryption if possible.

### Encrypting Data in Transit
- There is no excuse for communicating in cleartext in this modern age.
    - All communications, not just HTTP, should be encrypted
        - Including RCPs, database connections, etc.
    - TLS/SSL is most commonly used protocol
        - Public key crypto (e.g. RSA, DH) for authentication and key exchange
        - Symmetric key crypto to encrypt the data
        - Server Digital Certificate references certificate authority (CA) and the public key.
    - Sometimes just symmetric key encryption is employed.
        - But this requires pre-sharing of the keys.
- Pitfalls
    - Do not use self-signed certificates.
        - Less problematic for internal communications but still dangerous
        - Use properly generated certificates verified by established CA
    - Do not accept arbitrary certificates without verification.
        - Attacker can issue their own certificate and snoop on communications via MITM attacks.
    - Use certificate pinning.
        - Attacker may present a properly-generated certificate and still snoop on communications.
        - Certificate pinning can help because presented certificate is checked against a set of expected certificates.
    - Do not use outdated versions of the protocol or insecure cipher suites.
        - Old version SSL/TLS are vulnerable.
            - e.g. DROWN, POODLE, BEAST, CRIME, BREACH, etc.
        - Review your TLS support
            - There are tools that can help you
                - e.g. Nessus, Qualys SSL Sever Test, sslscan, sslyze
    - Do not allow TLS downgrade to insecure versions, or even to HTTP.
        - Lock down the versions of TLS that you support
        - Do not allow downgrade and HTTP altogether.
    - Safeguard your private keys.
        - Do not share private keys between different customers.
        - Store keys in secure keystores.
- Additional recommendations
    - Consider implementing forward secrecy.
        - Some cipher suites protect past sessions against future compromises of secret keys or passwords.
    - Do not use compression under TLS.
        - CRIME and BREACH attacks showed that using compression with TLS for changing resources may lead to sensitive data exposure.
    - Implement HTTP Strict Transport Security (HSTS)
        - Implement `Strict-Transport-Security` header on all communications.
    - Stay informed of latest security news.
        - A protocol or cipher suite that is secure today may be broken in the future.

## Hashing
- Hash function maps data of arbitrary size to data of a fixed size
    - Provides integrity, but not confidentiality
    - Original data is deliberately hard to reconstruct
    - Used for integrity checking and sensitive data storage (e.g. passwords)
    - Use secure hash functions.
        - e.g. NIST recommendations 
            - SHA-2 (SHA-256 and above)
            - SHA-3
- Purposes
    - Validating passwords 
        - e.g. Salted hashes
    - Verifying data/code integrity 
        - e.g. Message authentication codes and keyed hashes
    - Verifying data/code integrity and authenticity
        - e.g. Digital signatures
- Pitfalls
    - There are obsolete and broken hash functions that we still frequently see in the code. Phase them out.
        - Hash functions for which it is practical to generate collisions are not considered robust. Phase them out.
            - Collision: Two or more different inputs that correspond to the same hash value
        - MD5 has been known to be broken for more than 10 years because collisions are fairly easily generated.
        - SHA-1 was recently proven to be unreliable.
            - Google implemented a practical proof of SHA-1 collision, a.k.a. SHAttered.
    - Do not use predictable plaintext.
        - When the plaintext is predictable, it can be discovered through bruteforcing.
    - Do not use unsalted hashes when validating passwords.
        - Even for large problem spaces, rainbow tables can be used to crack unsalted hashes.
        - When salt (a random byte sequence, at least 8 bytes) is added to the plaintext, the resulting hash is completely different, so rainbow tables will no longer help.
- Additional considerations
    - Use key stretching functions (e.g. PBKDF2) with a large number of iterations.
        - Key stretching functions are deliberately slow (controlled by number of iterations) in order to make bruteforce attacks impractical, both online and offline.
            - 750ms to complete the operation is proper.
    - Future-proof your hashes.
        - Include an algorithm identifier so you can seamlessly upgrade in the future if the current algorithm becomes obsolete.
- Message Authentication Codes (MAC)
    - MAC confirm that the data block came from the stated sender and has not been changed.
    - Hash-based MACs (HMACs) are based on crypto hash functions.
        - e.g. HMAC-SHA256, HMAC-SHA3
    - They generate a hash of the message with the help of the secret key.
        - If the key is not known, attacker can't alter the message and be able to generate another valid HMAC.
    - HMACs help when data may be maliciously altered while under temporary attacker's control
        - e.g. Cookies, transmitted messages
    - Even encrypted data should be protected by HMACs, to avoid bit-flipping attacks.

## Digital Signature
- A mathematical scheme for verifying the authenticity of digital messages and documents
    - Uses hashing and public key encryption
    - Ensures authentication, non-repudiation, and integrity
        - Ensures that messages and documents come from authentic source, and were not maliciously modified in transit
    - Digital signatures must be verified to be useful.
- Use cases
    - Data exchanged between nodes in the product
    - Code transmitted over network for execution at client side (e.g. JavaScript)
    - Service packs and bug fixes installed by customer
    - Data temporarily saved to customer machine (e.g. backups)

## Common Cryptography Pitfalls
- Missing encryption of data and communications
    - When you store or transmit it in clear text, it can be easily leaked or stolen
        - Also physical machine or storage may be stolen and can be accessed directly
    - There are cryptographic technology that is mature, tested, and available, there is no reason not to encrypt your data.
        - Encrypt all sensitive data you are handling, and also ensure its integrity.
        - You have to assume that the files containing sensitive information may be exposed and analyzed.
- Implementing your own crypto
    - Bruce Schneier's Law
        - "Anyone, from the most clueless amateur to the best cryptographer, can create an algorithm that he himself can’t break. It’s not even hard. What is hard is creating an algorithm that no one else can break, even after years of analysis. And the only way to prove that is to subject the algorithm to years of analysis by the best cryptographers around."
    - Do not use obfuscation schemes such as BASE64 or XOR encoding, instead of trusted crypto.
    - Do not implement your own cryptographic algorithms.
    - Rely on proven cryptography, that was scrutinized by thousands of mathematicians and cryptographers.
- Relying on algorithms being secret
    - Even internal algorithms can be and will be discovered, it's a matter of motivation.
        - "Security by obscurity" is a bad defense mechanism.
        - The contrary is proven true all the time
            - All algorithms that keep us safe today are open source, well-studied, and severely-audited.
    - Reverse engineering is devoted to discovering hidden algorithms and data.
        - Even applications shipped only in compiled form can be decompiled.
    - Always assume that your algorithm will be known to the adversary
    - Auguste Kerckhoffs' Principle
        - "A cryptosystem should be secure even if everything about the system, except the key, is public knowledge."
- Using hardcoded/predictable/weak keys
    - Not safeguarding your keys renders crypto mechanisms useless.
        - Hardcoded keys or stored plaintexts can easily be discovered by an attacker.
        - Easily guessed keys can be found by trying commonly used passwords.
        - When keys are generated randomly, they have to be generated from cryptographically-secure source of randomness, not the regular random number generator (RNG) which is not technically random.
    - Rely on hard to guess, randomly generated keys and passwords that are stored securely.

## Safeguarding Encryption Keys
- Encryption is futile if the encryption keys are not safeguarded.
    - Do not store them in your code, in plaintext, in config files, in databases, etc.
    - Proper way to store keys and certificates is secure cryptographic storage. 
        - e.g. Java KeyStore (JKS)
- Securing Key Encrypting Key (KEK) is a tricky problem.
    - How do we secure the key that is used to encrypt the keystore?
        - Use Hardware Secure Modules (HSM)
        - Use Virtual HSM (unbound vHSM)
        - Derive KEK from user-entered password
            - e.g. Symantec Encryption Desktop software
        - Derive KEK from data unique to machine product is running on
            - e.g. File system metadata, random file names, file timestamps
            - Attacker that downloads the database or the keystore will not be able to easily obtain such information.

## OpenPGP
- OpenPGP is a commonly used open-source encryption standard. 
    - It works with all data types, including text files, data files, disk partitions, directories, and emails. 
    - It is used to store shared data and transmit data across non-secured networks.
    - Because it is open-source, OpenPGP is free for anyone to use. 
    - It provides a high level of security and is almost unbreakable. 
- OpenPGP is based on PGP (Pretty Good Privacy), a form of asymmetric encryption. 
    - Asymmetric encryption involves using a cryptographic key pair, consisting of a public key and a private key, to encrypt and decrypt text.
- Using OpenPGP can be tedious because of the need to generate and share key pairs. While it might not be necessary for most communication, OpenPGP is valuable when sharing sensitive data.

### OpenPGP Email Encryption
- OpenPGP will not work if only one side uses it. Both the sender and receiver must have an OpenPGP-compliant program installed to exchange encrypted emails. Also, they must each have a public and private key.
- Process
    1. The sender and receiver must each establish their own key pair: a public key and a private key.
    2. The sender and receiver share their public keys.
    3. The sender writes an email, encrypts it using the receiver’s public key, and then sends the email to the receiver.
    4. The receiver receives the email and decrypts it using their private key.
- OpenPGP encryption does not prevent an attacker from intercepting the email. 
    - However, the attacker won’t be able to read the email’s content. Instead, they will see only the encrypted form of the message, known as ciphertext. 
    - The ciphertext will make the email’s text appear as useless gibberish. 
    - Even if the attacker has the recipient’s public key, they cannot read the email’s contents without the recipient’s private key.

## Impact of Quantum Computing
- Risks to existing crypto
    - Symmetric encryption (e.g. AES) will be weakened
        - To maintain current levels of security, double the encryption key size.
            - e.g. from 128-bit to 256-bit keys
    - Public key encryption that relies on prime number factorization will be broken.
        - e.g. RSA used in SSL/TLS, blockchain, digital signatures
        - Plan on switching to quantum-resistant algorithms.
            - e.g. Lattice-based cryptography, homomorphic encryption
- Attacker can capture conversations now and decrypt them when quantum computing becomes available.
- General good practice
    - Make your encryption, hash, signing algorithms "replaceable"
        - So that you could exchange them for something more robust if a weakness is discovered.