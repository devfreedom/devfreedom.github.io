---
title: "[Study Note] Coursework: Cybersecurity Analyst - Part 7"
date: 2023-07-02T11:19
thumb: "cybersecurity.jpg"
tags: 
    - ❮Study Note❯
    - cybersecurity
---

# 1. Incident Management Response and Cyberattack Frameworks

## Computer Security Incident Handling Guide
- NIST recommendations
    - Establishing an incident response capability should include the following actions,
        - Establish a formal incident response capability.
        - Create an incident response policy.
        - Develop an incident response plan based on the incident response policy.
        - Develop incident response procedures.
        - Establish policies and procedures regarding incident-related information sharing.
        - Consider the relevant factors when selecting an incident response team model.
- Incident response team structure
    1. Team model
        - Structure
            - Central incident response team
                - Where they handle incidents throughout the organization
                - This model is usually used by small organizations usually in one geography
            - Distributed incident response team
                - Where the organization has multiple incident response teams responsible for either a business unit in a large organization or geographically dispersed
                - There should be a coordinating team identified.
        - Staffing model
            - In-house employees
            - Partial outsourcing
                - Outsource 24 hours a day, seven days a week monitoring of intrusion detection sensors, firewalls, and other security devices to an offsite managed security services provider a.k.a. MSSP
            - Full outsourcing to an on-site contractor
                - This model is most likely to be used when the organization needs a full-time on-site incident response team but doesn't have enough available qualified employees 
    2. Team model selection
        - Considerations
            - 24/7 availability
                - Whether they will have full-time versus part-time team members
            - Employee morale 
                - Incident response work is very stressful as usually it will require on-call responsibilities of the team members.
            - Willing available experience and properly skilled people 
                - Particularly in 24-hour support
                - Segregating roles particularly reducing the amount of administrative work that team members are responsible for performing can be a significant boost to that morale.
            - Costs
                - Whether employees are required to be on-site 24/7 versus using an outsourced organization that may support multiple clients
    3. Incident response personnel
        - The computer security incident response team is a group of the IT professionals that provides an organization with the services and support surrounding the prevention and management and coordination of these potential cybersecurity related emergencies.
        - Incident handling requires specialized knowledge and experience in several technical areas.
            - Knowledge required varies based on the severity of the organization's risks.
                - It's not necessary for every team member to be a technical expert.
            - Members of the incident response team should have excellent technical skills such as,
                - System administration
                - Network administration
                - Programming
                - Technical support
                - Intrusion detection
                - etc.
            - Every team member should have good soft skills such as,
                - Teamwork skills
                - Communication skills
                - Problem-solving skills
                - Critical thinking abilities
    4. Incident response team services
        - The main focus of incident response team is performing incident response.
            - But it's fairly rare for a team to perform incident response only. 
        - Some incident response teams also perform the intrusion detection, advisory distribution where a team may issue advisories within the organization regarding new vulnerabilities and threats.
- NIST incident response lifecycle
    1. Preparation
    2. Detection and analysis
    3. Containment, eradication, and recovery
    4. Post-incident activity

## IBM X-Force IRIS Cyberattack Framework

### Cyberattack preparation framework
1. Attacker determines objective 
    - 'Attack beginnings' stage
2. Prepare attack
    - 'Attack beginnings' stage
    - This stage includes all the known methods that attackers use to advance from target selection to launching their attack.
        - Conduct external reconnaissance
        - Prepare malware software tools
        - Align tactics, techniques, and procedures (TTPs) to target
        - Prepare attack infrastructure
3. Launch attack
    - 'Launch and execute attack' stage
    - Once the attack infrastructure is ready, the attacker launches an attack against the target.
        - Direct attacks
            - Stolen credentials
            - Phishing email with a malicious file or domain attached
        - Indirect attacks
            - Infection of a work laptop while connected to a home network
            - Compromise of a website or online advertisement
4. Successful compromise or failed attempt

### Cyberattack execution framework
1. Access environment
    - 'Launch and execute attack' stage
    - Once the attack is determined successful, the attacker will work quickly to establish a foothold.
        - Initial compromise
            - The attacker gains access to at least one host on the network or has logging in to a user's account.
        - Establish foothold
            - The attacker ensures continued access to, and control of, at least one host or user account within the network.
2. Expand access
    - 'Continuing attack and expanding network access` stage
        - Escalate privileges
        - Conduct internal reconnaissance
        - Move laterally
        - Maintain persistence
3. Strengthen attacks
    - 'Continuous phase' stage
        - Operational security
            - Throughout attack preparation, operational security represents all the actions attackers take to hide their attack preparations from the victims or defenders.
        - Defense evasion and monitoring
            - This aspect of attack activity exists throughout the execution cycle and reflects the efforts bad actors may use to evade detection.
            - Tactics include the use of malicious software designed to disguise the attack presence and data masking
        - Feedback pipeline
            - The feedback pipeline exists from the time the attack preparation begins, all the way through the execution stage.
4. Attacker meets objective
    - 'Attack objective execution' stage
    - Once the execution phases are completed successfully, the attacker moves towards the final goal which could include,
        - Disruption through financial or data theft
        - Ideological messaging
        - Industrial espionage
        - etc.

### Defense Tips - Increase Network Security
- To effectively prevent bad actors from entering your network, take a holistic view of cyberattack techniques, from the attacker's perspective.
- 'Attack beginnings' stage
    - Threat profile
        - Build a threat profile of adversarial actors who are likely to target the company. Consider,
            - Have threat actors targeted the organization?
            - What type of attacker would be interested in the organization?
            - Where are these threat groups?
            - What are the attacker's goals?
    - Assets safeguard
        - Take steps to safeguard the assets attackers are likely to target, such as your most critical data.
            - Determine whether threat actors have interest in the organization and its assets, intellectual property, customers or proprietary data.
    - Domain management
        - To prevent C&C servers from crafting domains that look legitimate to unsuspecting targets, purchase all the likely typo-changed domains associated with your company name, and monitor for suspicious domain registrations.
- 'Launch and execute attack' stage
    - Hardening
        - Harden the attack surface and deter most attackers from viewing the organization as an easy target with methods, such as efficient and timely patch management.
            - Include patch management performance metrics in the system administration process and use automated checks for patches.
    - Privilege control
        - Apply the concept of least privilege.
            - Make sure users and systems only have access privileges that correspond with their role.
                - Remove excess privileges.
                - Only allow users and systems to perfrom authorized tasks.
    - Endpoint security
        - To disrupt attacks, implement strong endpoint detection and mitigation strategies.
    - Threat hunting
        - Employ a threat-hunting program to aid in threat identification and mitigation.
- 'Continuing attack and expanding network access' stage
    - Threat hunting
        - Refine your threat-hunting program.
            - As unknown threats are discovered, migrate associated threat indicators as signatures into detection and protection platforms, to automatically identify any other instances.
    - Analytics
        - Invest in a centralized logging and analysis platform to automatically prioritize data, and place it into tiers ranging from benign activities to those likely indicating maliciousness.
        - Whitelist and create a baseline for normal activity, and perform frequency analysis.
    - Policies
        - Enforce strong user password policies by,
            - Enabling multi-factor authentication (MFA)
            - Restricting the ability to use the same password across systems
            - Storing password hashes in secured locations to prevent password-stealing methods
- 'Continuous phase' stage
    - Analytics
        - To disrupt defense evasion and monitoring tactics, analyze all network traffic and endpoints, and search often for anomalous behavior.
    - Honeypot
        - Set up a honeypot, a deceptive file or system designed to trick attackers into accessing it.
            - To trigger an immediate alert to security teams with details regarding the activity on the honeypot, including user information and logged keystrokes.
    - Monitoring
        - Monitor or restrict unusual data transfers. specifically,
            - Monitor for and inspect the creation of RAR files, which can be used to exfiltrate information.
            - Investigate spikes in emails to external addresses.
            - Monitor for the creation of auto forward rules and new email delegates.
            - Monitor for excessive traffic leaving through file transfer protocol (FTP) or domain name sever (DNS).
- 'Attack objective execution' stage
    - Organize
        - Build and train a dedicated team to respond to security incidents.
        - Practice relevant attack scenarios using tabletop exercises or simulations that mimic a cyberattack.
        - Thoroughly examine available forensics to...
            - Understand attack details
            - Establish mitigation priorities
            - Provide data to law enforcement 
            - Plan risk reduction strategies
        - Consider an incident response retainer with trusted security partners.

## Data Breach
- A data breach involves data either belonging to the organization only, but more often both inside and outside the organization.
    - Organization only
        - This type of breach will cause profits and new business.
    - Data inside and outside of the organization
        - This type of breach will involve loss of business revenue and typically legal sanctions.
- Technical aspects
    - Isolating network segments
    - Removing malware
    - Limiting system access to downed systems
- Communications
    - Federal organizations or law enforcement agencies
- Who should be involved?
    - Management and technical incident response team
        - The team must be defined in the incident response strategy prior to a data breach.
    - Legal personnel
    - Public relations

## Data Breach Case Study - Target Corporation
- In November and December 2013, there was a successful cyberattack against Target, which is one of the largest retail companies in the United States.
- The attacker gaind access to Target's computer network, stole the financial and personal information of 110M Target customers, and removed this information from Target's network to a server in Eastern Europe.

### Kill Chain Timeline
1. Target had been certified in September 2013 as compliant with the PCI-DSS.
    - Attackers steal Fazio credentials
    - Attackers first breach Target network
    - Attackers test malware on Target POS
2. Target's Symantec software identifies malicious activity and first FireEye alerts triggered
    - POS malware fully installed
    - Attackers install data exfiltration malware
3. More FireEye alerts were triggered
    - Attackers install upgraded versions of exfiltration malware
    - Attackers begin exfiltrating data
4. DOJ notifies Target
5. Target confirms breach and removes most malware
    - Attackers lose foothold in Target network
6. Target publicly announces 40M credit and debit card records stolen afger story broken on 2013-12-18
7. Target confirms a further 70M data records stolen

### Red Flags
- First trigger - already compromised
    - FireEye event
    - False position prone
        - Users do not fully trust
    - No additional activity information
        - What traffic preceded and followed, from and to where?
    - Business context
        - Are critical assets exposed?
    - Network context
        - Can the attackers reach critical assets?
    - No business process for triaging and analyzing was defined.
    - The attack was ignored.
- More alerts - no linkage
    - Different areas of network
    - Not correlated with other activity or in the context of the business or network
    - Not enough visibility or context
    - Still ignored
- DOJ notification - 40M records are gone
    - Too late
    - Nightmare business scenario unfolds
- Continued breaches undetected - 70M extra records are gone
    - Worst case scenario for business

### Vulnerabilities
- Attackers took advantage of weak security at a Target vendor, gaining a foothold in Target's inner network.
    - Recon - Weaponize - Deliver 
- Target missed warnings from its anti-intrusion software that attackers were installing malware in its network.
    - Deliver - Exploit
- Attackers took advantage of weak controls within Target's network and successfully maneuvered into the network's most sensitive areas.
    - Deliver - Exploit - Install
- Target missed information provided by its anti-intrusion software about the attackers' escape plan, allowing attackers to steal as many as 110M customer records.
    - Command and control - Action

### Aftermath 
- Target reached a settlement in a class-action lawsuit brought by banks for about $58M in May 2016
- In May 2017, Target paid $18.5M to settle claims by 47 states.
- Target reached a confidential settlements with several card issuers and individual banks
- Target incurred total $292M expenses related to the data breach and $90M were offset by insurance.

### Prevention
- Security logs and events
- Network flow data
- Vulnerability data
- Network topology
- Asset profile with business context, risk, ownerships
- Correlation rules
- User behavioral analysis
- Increased incident relevance
- One incident case and analysis workflow
- Integrated forensics and rapid confirmation of attack
- Massive reduction of window of exposure

## Watering Hole Attack
1. Stake out the watering hole
    - e.g. Insert iframe that redirects visitors to a zero-day malware download
2. Catch the visiting "gazelles"
3. The prey returns to the herd

### Watering Hole Attack Case Study - U.S. Regional Financial Institutes
- In July 2012, several regional consumer financial services websites were hacked.
    - The hackers planted a hidden iframe on the consumer portal.
    - Customers of the bank were redirected to a malicious download site when they visited to do their online banking.
- Attackers used different variants of the Gh0st RAT trojan horse, making detection very hard.
    - Variant A
        - Exploited a known Microsoft vulnerability (CVE-2012-1889)
        - Patch for all Microsoft operation systems was released on 2012-07-10.
        - Variant was not recognized by any antivirus vendor.
    - Variant B
        - Exploited a known Java vulnerability (CVE-2012-1723)
        - Patch was released by Oracle, 2012-06-12.
        - Variant was recognized by McAfee VSE as of 2012-07-17.
- After being infected, compromised hosts made contact with a remote command-and-control server in China.
    - Infected machines attempted to communicate with one of two Chinese C&C servers.
    - If communications are successfully established, the C&C server gains complete, real-time control of a system on the protected network.
    - The RAT malware allows a remote attacker to access data, log system activity, capture key logs, take screenshots, activate the system's camera, and record from the system's microphone.
- If the attack is not detected fast enough, the infected machine becomes the new launchpad of deepening the penetration.
    - The infected machine "legitimately" distributes more malware inside the enterprise network to gain a stronger foothold if detected.
    - The malware's first goal is to obtain privileged user identities, which it then uses to gain access to valuable assets inside the enterprise network.
    - Most attacks use ports and scans that typically are not executed from either the infected machines or user IDs.
    - After valuable assets are found, they are slowly exfiltrated to not raise any suspicion.

---

# 2. Phishing Scams and Point-Of-Sale Attack

## Phishing
- Fraudulent messages being sent to trick you into divulging personal information
    - Phishing comes from the analogy that Internet scammers are using e-mail lures to 'fish' for passwords and financial data from the internet users.
        - Phishing is also known as 'brand spoofing' and 'carding'.
        - First used by hackers to describe stealing AOL accounts
    - Such personal information can be used to steal your identity, bank account, credentials, and access to your computer system.
- Types
    - Phishing
    - Spear Phishing
    - Whaling
- Tactics
    - Using a message
        - 'From:' address that looks very close to one of the legitimate addresses
    - Situational persuasion
        - An alarm, financial lure, or otherwise attractive situation that either makes the recipient panic, or tempts the recipient into taking an action.
    - Stolen identity
        - Sending the email from an email using a legitimate account holder's software or credentials
- How they get you
    - Say they've noticed some suspicious activity or log-in attempts
    - Claim there's a problem with your account or your payment information
    - Say you must confirm some personal information
    - Include a fake invoice
    - Want you to click on a link to make a payment
    - Say you are eligible to register for a government refund
    - Offer a coupon for free stuff
- Spoofed domains
    - Spoofed domains can be difficult for users to visually discern, and often mirror legitimate domains used by the impersonated company.
    - An authentic-looking website can help convince a user to divulge personal data on a malicious website if it resembles the original closely enough.
- Encryption can be misleading
    - HTTPS doesn't mean everything is secure.
        - HTTPS only encrypts the data exchanged between a user's browser and the website the user is visiting.
        - HTTPS links in phishing emails are still very dangerous and can't protect you against phishing attacks.
    - Studying HTTP on phishing sites provides insight into how phishers are fooling internet users by turning an internet security feature against them.
- Look at the email
    - Suspicious sender's address
    - Generic greetings and signature
    - Spoofed hyperlinks and websites
    - Spelling and layout
    - Suspicious attachments

### Impact of Phishing
- The nature of phishing itself has changed into more sophisticated cybercrime attacks that mount advanced persistent threats (APTs) against organizations, and steal individuals' financial identities with devastating consequences for both users and organizations.
- Phishing statistics
    - The average financial cost of a data breach is $3.86M.
    - Phishing accounts for 90% of data breaches.
    - 15% of people successfully phished, will be targeted at least one more time within a year.
    - 76% of businesses reported being a victim of a phishing attack in the last year.
    - BEC scams accounted for over $12B in losses.
    - Phishing attempts have grown 65% in the last year.
    - Around 1.5M new phishing sites are created each month.
    - 30% of phishing messages get opened by targeted users.
- Identity theft
    - There were 650K cases of identity theft in 2019.
    - Those aged 30 to 39 reported the most cases of identity theft in 2019.
    - Credit card fraud was the most common type of identity theft in 2019, more than doubled from 2017.
    - Almost 165M records containing personal data were exposed through data breaches in 2019.
    - The Capital One incident was the biggest data breach of 2019, exposing the personal data of 100M U.S. customers.
- Business impact
    - Phishing e-mails are still the main weapon.
    - Phishing attacks are no longer isolated incidents.
    - An attack occurs on average every 39 seconds.
    - Nearly half of all small businesses have been attacked with disastrous results.
    - 60% of small-and-medium-sized business that get hacked go out of business after just 6 months.

## Phishing Case Study - Google & Facebook
- Scammers stole over $100M from Facebook and Google.
    - They just emailed the tech giant and asked for it.
    - The scheme included setting up a fake business and sending phishing emails to employees of Facebook and Google.
    - The scheme ultimately duped those multi-billion-dollar companies out of more than $100M in total between 2013 and 2015.

### Timeline
- Prosecutors accused Rimasauskas in 2016 of incorporating a company that posed as Taiwan-based Quanta Computer which actually does business with Facebook and Google.
- Rimasauskas served as the "sole member of the board of directors" of the fake company.
- Starting in 2013, Rimasauskas and his co-conspirators created fairly convincing forgery emails using fake email accounts.
- They sent phishing emails with fake invoices to employees at Facebook and Google.
- Rimasauskas' work also involved forged invoices, contracts, and letters that falsely appeared to have been executed and signed by executives and agents of the companies he was impersonating.

### Vulnerabilities
- Spear phishing
    - This type of attack targets specific users or groups.
    - Finance team in this case
- Systems
    - The tough part about this attack was that all the systems were bypassed.
- People
    - Given the large transactions this team was used to facilitating, these requests were not unusual.
- Delayed response
    - $100M+ in payments was taken due to lack of detection.

### Cost
- The scam took $98M from Facebook in 2015 and $23M from Google.
- Both companies have recovered most of that money, since the scheme was discovered and the ring leader was arrested.
- He was sentenced to 30 years in July 2019.

### Prevention
- Early detection
- Review invoices and payment-related communications
- Create payment processes
- Implement two-factor authentication
- Email system automation
- Employee education and training
- SPAM filter
- Critical patches
- Antivirus
- Encryption

## Point-of-Sale (POS) Breach
- The main objective of point-of-sale (POS) breaches is to steal 16-digit credit card numbers.
    - 60% of POS transactions are performed via credit card, which is big business for cybercriminals.
- The industries most affected by POS data breaches are restaurants, retail stores, grocery stores, hotels, etc.
    - Data breaches happen more frequently to small-and-medium-sized businesses because they are easier to compromise than the computer networks or large retailers.
- PCI-DSS is the main payment card industry information security standard, created in 2006 by PCI security standards council.
    - The goal is to protect cardholder data and sensitive authentication data wherever it is processed, stored, or transmitted.
    - Security controls and processes for PCI-DSS requirements
        - Build and maintain a secure network and systems.
        - Protect cardholder data.
        - Maintain a vulnerability management program.
        - Implement strong access control measures.
        - Regularly monitor and test networks.
        - Maintain an information security policy.
    - Other PCI-DSS requirements
        - Install and maintain a firewall configuration to protect cardholder data.
        - Do not use vendor-supplied defaults for system passwords and other security parameters.
        - Encrypt transmission of cardholder data across open, public networks.
        - Use and regularly update antivirus software.
        - Develop and maintain secure systems and applications.
        - Restrict access to cardholder data by business need-to-know
        - Assign a unique ID to each person with computer access.
        - Restrict physical access to cardholder data.
        - Track and monitor all access to network resources and cardholder data.
        - Any commercial entities involved with payment card processing must never store sensitive authentication data after authorization.
            - 3-digit CVC/CVV
            - Magnetic stripe or IC chip data, a.k.a. Full Track Data
            - Cardholder's PIN
- Being only PCI Compliant is not enough.
    - Semi-integrated payment approach
    - Mobile device management (MDM)
    - Point-to-point encryption
    - Employee education
    - Tokenization

## POS Malware
- POS systems require network connection in order to contact external credit card processors so that the transactions are validated.
    - Sufficiently skilled and determined attackers can go after a business's POS terminals on a large scale and compromise the credit cards of thousands of users at a time.
    - The same network connectivity can also be leveraged to help exfiltrate any stolen information.
- Operating systems
    - Most POS run on Windows or Linux, making them small computers.
- How?
    - Once inside, the POS malware can select which data to steal and upload to a remote server.
    - Most POS malwares come equipped with backdoor and command-and-control features.
- When?
    - Industry uses end-to-end encryption of sensitive payment data, which comes from the card's magnetic strip or chip, when it's transmitted, received, or stored.
    - Decryption only occurs in the POS device's RAM, where it's processed.

### Common POS Malware Types
- Alina
    - This malware scans the system's memory to check if the contents match regular expressions, which indicate the presence of card information that can be stolen.
    - Evolved into JackPOS and Backoff malware.
- vSkimmer
    - If it does not find its server, it checks for the presence of a removable drive with the label 'KARTOXA007'. If this drive is found, it drops a file that contains any stolen information into it, allowing a method of offline data exfiltration.
- Dexter
    - Its information theft activities are not limited to just stealing card information.
    - It also steals various system information and installs a keylogger onto affected systems.
    - Evolved into Soraya malware.
- FYSNA
    - Using the Tor network to communicate with its C&C server makes detection and investigation difficult, by making all of the network traffic made by the malware extremely difficult to analyze.
- Decebel
    - Decebel checks if sandboxing or analysis tools are present on a machine before running.
    - This aims to make detection and analysis more difficult.
- BlackPOS
    - BlackPOS uses FTP to upload information to a server of the attacker's choosing.
    - This allows attackers to consolidate stolen data from multiple POS terminals on a single server.
    - Evolved into BrutPOS and BlackPOS v2 malware.
- Other malwares
    - Rdasrv
        - Evolved into BrutPOS
    - ChewBacca

### End goals
- Criminals sell the information to brokers who buy the information in bulk.
- Brokers sell the information to carders.
- Carders use a carder website to obtain payment information, which they will purchase prepaid credit/debit cards with.
    - Those prepaid cards will be used to buy gift cards, which are used to buy goods and sell for profit.
    - The items are shipped to a re-shipper, making the transaction from end to end very difficult to follow.

## POS Breach Prevention Best Practices
- More often, hackers can gain entry to your network via a phishing attack, unpatched vulnerabilities in your POS software, etc.
- The smartest method of prevention is to utilize tools for real-time detection and PCI compliance monitoring.
    - Actively monitoring your POS network for changes.
    - Using compliant, best-of-class, end-to-end encryption around cardholder data.
    - Limiting the hosts that can communicate with POS systems.
    - Adopting POS terminals that support payment cards equipped with an IC chip, which is more secure than magnetic stripes.
    - Utilizing employee screening and training to minimize insider threats.
    - Training employees to immediately detect and report possible signs of tampering.

## POS Attack Case Study - Home Depot
- The attack was completed using stolen credentials from one of the retailer's vendors.
    - Those credentials were used to obtain access to the network, privileges elevated, and access to POS systems, to record credit card details.
    - The malware infection went unnoticed for 5 months between April and September 2014.

### Timeline
- Stolen credentials were used to obtain access to the network.
- Those privileges were subsequently elevated.
- Access to the POS system was obtained and malware was downloaded to record credit card details.
- The malware infection went unnoticed for 5 months.
- Home Depot began an investigation on September 2nd.
- On September 8th, 2014, Home Depot released a statement indicating that its payment card systems were breached.

### Vulnerabilities
- Vulnerability management program
    - No regularly scheduled scan
- Systems
    - Configuration of the hardware, software, and network
- Vendor credentials
    - Credentials were not properly managed
- Delayed response
    - Lack of monitoring capabilities led to 5-month delay
- The attackers exploited a zero-day vulnerability in Windows, which allowed them to pivot from the vendor-specific environment to the Home Depot corporate environment.

### Cost
- 56M payment cards stolen
- $19.5M payout to customers that had been impacted by the breach, including credit monitoring services.
- A minimum of $134.5M to credit card companies and banks
- The total cost of the retail data breach is approximately $179M, not including legal fees, which would expect the total cost close to $200M.

### Prevention
- Following the breach, changes were implemented with a focus on making retail transactions more secure.
    - The chip-and-PIN card is embedded with security chip in addition to the traditional magnetic stripe.
    - Vendors began promoting an alternative method to payment cards using mobile payment methods, like Apple Pay and Google Wallet.
    - Additional security was also provided by point-to-point (P2P) encryption.
- The only risk that still remains with P2P encryption is, if someone were to install a credit card skimmer on the actual PIN pad, which is still occuring.

---

# 3. 3rd Party Breach and Ransomware

## 3rd Party Breach
- Supply-chain attacks, a.k.a. Value-chain/3rd-party attacks, are attacks originated from one of your 3rd parties that has access to your system.
    - e.g. Data management companies, law firms, e-mail providers, web hosting companies, subsidiaries, vendors, subcontractors, external software/hardware companies, analytics partner, etc.
- Statistics
    - $2.1M is the average annual spend on vetting 3rd parties.
        - However, 64% say the processes used are only somewhat or not effective.
    - 40% of organizations use manual procedures like spreadsheets, and 51% employ risk scanning tools to vet their 3rd parties.
        - However, 34% said results of these tools are only somewhat valuable, while 20% said results don't provide any insights.
    - 3rd parties are spending 15,000 hours a year on completing assessments, at an average cost of $1.9 million annually.
        - However, over 55% said these assessments only somewhat or do not accurately reflect their security posture.
    - Only 8% of assessments result in action, such as disqualification of a vendor or a requirement to remediate gaps.
        - However, if assessments revealed gaps, only 26% of respondents say their organizations terminated the relationship.
- 3rd-party breach types
    - Cloud-based services
        - e.g. Cloud storage, web hosting
    - Payment
        - e.g. Credit card processing, point-of-sale systems 
    - JavaScript library
        - e.g. Web analytics
- 3rd-party breaches in 2020
    - Instagram
        - Usernames and passwords
    - Carson City, United States
        - Residents' personal and payment information
    - Amazon
        - 8M sales records
    - GE
        - Direct deposit forms, IDs, marriage and birth certificates
    - radio.com
        - Listener's personal information and credentials
    - T-Mobile
        - Customer names, phone numbers, addresses
    - MSU
        - Names, phone numbers, addresses, credit card information
    - Marriot
        - 5.2M customer information

### Cyber supply-chain risks
- When companies began extensively outsourcing and globalizing the supply chain in the 1980-1990s, they did so without understanding the risks suppliers posed.
- Lack of physical or cyber security at supplier sites could result in a breach of corporate data systems or product corruption.
- How well do suppliers vet their own personnel?
    - Of particular concern are personnel in supplier companies that have access to the data, systems, or facilities of their customers.
- How well do the vendors vet their service providers?
    - Any service provider, from janitorial services to system maintenance, or any provider with access to company information poses a potential cyber risk.
- How well do the vendors vet their products and software?
    - Of particular concern are products with embedded IT that will be integrated into their customer's systems.

### 3rd Party Breach Impacts
- Over 63% of breaches linked to a 3rd party.
    - Financial services 
        - Reported the second most 3rd-party breaches despite their 3rd parties spending the most time on assessments (over 17,000 hours per year).
    - Health & Pharmaceuticals
        - Less likely to have a 3rd-party breach and most likely to use a combination of tools to assess 3rd parties.
    - Public sector
        - Use a combination of tools to assess 3rd parties and tend to believe their results are valuable.
    - Retail
        - Reported the most 3rd-party data breaches despite their 3rd parties spending over 16,578 hours on assessments.
    - Technology & Software
        - Most likely to have multiple 3rd-party data breaches, and over 41% still use manual procedures to assess 3rd parties.
- Key findings
    - Third-party breaches remain an expensive problem.
    - IT security professionals still believe their TPCRM programs are immature.
    - Using a combination of automated tools provides better results.
    - Risk prioritization processes are viewed as critical, but current processes are ineffective.
    - If 3rd-party security gaps are discovered, organizations are not proactive in mitigating these risks.
    - No one function-controls the budget for 3rd-party cyber risk management (TPCRM) programs.
    - Investing in better assessment and vetting tools can increase effectiveness in TPCRM, while decreasing the cost of maintaining the program.
    - There is a massive disparity between the resources invested (both human and financial), and the value received from today's approach to TPCRM.
- Issues with vendors
    - Statistics
        - Mitigation or remediation is requested - 33%
        - Relationship is terminated - 28%
        - Collaborate with 3rd party to improve its security measures - 27%
        - Risk is transferred using insurance - 12%
- Consumer impact
    - Loss of trust and business
        - 65% of data breach victims lost trust in an organization.
        - 80% of consumers will defect from a business if their information is compromises in a breach
    - Negative word of mouth
        - 85% tell others about their experience
        - 33.5% use social media to complain about their experience.
        - 20% comment directly on the company's website.
    - Lose out to competitors
        - 52% of consumers would consider paying for the same products or services from a provider with better security.
        - 52% of consumers said security is an important or main consideration when purchasing products or services.
- The need of risk management controls
    - Assessing compliance with regulations
    - Vetting 3rd-party security practices
    - Establishing data breach and cyber exploit incident response procedures

### NIST SCRM Guidance
- A primary objective of cyber SCRM is to identify, assess, and mitigate products and services that may contain potentially malicious functionality, are counterfeit, or are vulnerable due to poor manufacturing and development practices within the cyber supply chain.
- Cyber SCRM activities may include,
    - Determining cybersecurity requirements for suppliers
    - Enacting cybersecurity requirements through formal agreement
    - Communicating to suppliers how those cybersecurity requirements will be verified and validated
    - Verifying that cybersecurity requirements are met through a variety of assessment methodologies

### Best Practices
- Evaluation of the security and privacy practices of all 3rd parties
    - Conduct regular audit and assessments to evaluate security and privacy practices of 3rd parties.
- Frequent review of 3rd-party management policies and programs
    - Implement formal processes to regularaly evaluate security and privacy practices of 3rd and Nth parties, particularly to address new technologies and innovations like IoT devices.
- Oversight by the board of directors
    - Involve senior leadership and boards of directors in 3rd-party risk management programs.
    - High-level attention to 3rd-party risk may increase the budget available to address these threats.
- An inventory of all 3rd parties with whom you share information
    - Track all 3rd parties that have access to sensitive data and how many of these parties are sharing this data with others.
- 3rd-party notification when data is shared with Nth parties
    - Mandate that 3rd parties provide information and transparency into their Nth-party relationships prior to sharing sensitive data.

## 3rd Party Breach Case Study - Quest Diagnostics
- Quest is one of the largest providers of clinical laboratory testing services in the United States.
- The sensitive data of 11.9M patients was accessed, ranging from credit card numbers to bank account information and even social security numbers.

### Timeline
- Quest's discovery of the 3rd-party data breach appears to have been internal.
- An unauthorized user gained access to Quest Diagnostic's sensitive data via a billing collections vendor named American Medical Collection Agency (AMCA).
- The hacker had access to the information for roughly 7 months, from August 2018 to March 2019.
- AMCA discovered the breach on May 14 and reported it to Quest.
- The first the public heard of the breach was when Quest disclosed it as part of an early June filing with the Securities and Exchange Commission (SEC).

### Vulnerabilities
- 3rd party auditing
    - No review of policies and procedures of their 3rd party providers
    - No tracking of data provided to 3rd parties
- Disclosure of breach data once discovered
    - Very strict guidelines from the U.S. Department of Health and Human Services (HHS) must be followed.

### Cost
- 3rd party data breach at Quest Diagnostics exposed the trifecta of data; PII, medical conditions, and financial account information.
- Financial cost to Quest is not yet known, there are several class-action lawsuits against Quest Diagnostics at this time.
- AMCA was unable to recover, and filed for Chapter 11 protection after the 8-month long breach.

### Prevention
- Evaluation of the security and privacy practices of all 3rd parties
- An inventory of all 3rd parties with whom you share information
- Frequent review of 3rd-party management policies and programs
- 3rd party notification when data is shared with Nth parties
- Oversight by the board of directors

## Ransomware
- Ransomware types
    - Crypto
        - The ransomware that will encrypt specific (groups of) files on your computer and refuses you access until you pay the ransom.
    - Locker
        - The ransomware that will just lock you out of your entire device until the ransom is paid.
    - Leakware/Doxware
        - The ransomware that threatens to release footage of you from your own webcam or any incriminating files that you may have on your computer, unless the ransom is paid.
- Attack vectors
    - Phishing
    - Remote Desktop protocol (RDP)
    - Software vulnerabilities
    - Malicious links
- Danger
    - Ransomware can be devastating.
    - Recovery can be a difficult process that may require the services of a reputable data recovery specialist.
        - Some victims pay to recover their files. However, there is no guarantee that individuals will recover their files if they pay the ransom.
    - Ransomware is very effective.
        - Ransomwares instill fear and panic into their victims, causing them to click on a link or pay a ransom, and users' systems can become infected with additional malware.
- Ransomware of Things (RoT)
    - As organization become increasingly dependent on tech solutions, the scope for ransomware only increases.
    - The increasing use of internet-connected industrial control systems, smart buildings, and vehicles including autonomous vehicles, is creating new areas of exploitation.
    - Remote-locking of vehicles, homes, and buildings could be abused for extortion.
        - Manipulation of BAS such as those controlling HVAC could serve as a basis for new schemes.

### Examples
- Locky
    - Encrypts over 160 file types
    - Uses phishing to target those with designer, engineering, or developer file types
- WannaCry
    - Spread across 150 countries in 2017
    - Capitalized on out-of-date software in the healthcare industry
    - 4 billion in losses worldwide
- Bad Rabbit
    - Used fake Adobe Flash website to install ransomware
- Ryuk
    - Spread in 2018
    - Disabled the Windows System Restore button
    - Encrypted networked drives as well
- Troldesh
    - Was popular in 2015 and went for quantity over quality
    - Caught victims through spam email links and attachments
- Jigsaw
    - Named after the Saw horror films
    - Tormented victims by deleting files incrementally, with each hour the ransom was not paid
- CryptoLocker
    - Spread through email attachments
    - Impacted half million computers
    - Was countered by law enforcement
- Petya
    - Precursor to GoldenEye
    - Encrypted entire hard drive
- GoldenEye
    - Resurfaced around the same time WannaCry was popular
    - Targeted high profile users and locked them out completely.
- GandCrab
    - Claimed to have used the users webcam to record personal moments, and threatened to release the footage unless a ransom was paid.

### Prevention
- Keep a backup of all your data.
    - Having a full backup removes the threat of losing your data.
- Keep your software up to date and use complex passwords for your network and computer.
    - It is your first line of defense.
- Use an anti-malware or related security software.
    - Having security software scanning for malicious attachments or changes to your computer combats phishing.
- Stay vigilant in verifying any link or attachment you click on.
    - This goes beyond emails. Websites can be spoofed, and visiting or clicking on links can download ransomware.

## Ransomware Case Study - City of Atlanta
- In the early morning of March 22, 2018, the City of Atlanta suffered a widespread ransomware attack.
- The breach shuttered many devices at City Hall for about 5 days in an extensive infection.
- The virus used to attack the city was the SamSam ransomware.
- To unlock the city's systems and data, hackers demanded $51,000 in Bitcoin, which the city refused to pay.

### Timeline
- March 22, 2018, ransomware cyberattack dealt a widespread blow to the city of Atlanta, the state capital and home to the nation's busiest airport.
- Atlanta disabled the Wi-Fi at Hartsfield-Jackson Atlanta International Airport until April 2nd.
- In May, the city restored its online water bill payment system.
- In June, the court's online bill payment option and docket boards returned.

### Vulnerabilities
- There was no plan in place if an attack occured.
- Operations during an attack
    - Business continuity and operational impact assessment was happening during the attack.
- Readiness of systems
    - Lack of spending upgrading their infrastructure
    - Large number of vulnerabilities logged in a January 2018 audit.

### Cost
- The attack could cost taxpayers $17M, up from earlier estimates of $2.7M.
- The latest cost estimate includes about $6M in existing contracts for security services and software upgrades, and $11M in potential costs associated with the attack, including new desktops, laptops, smartphones, and tablets.
- This would mark one of the U.S.' costliest cyberattacks affecting a local government in 2018, despite city officials declining to pay the ransom demanded by the hackers.

### Prevention
- IT officials must know their network architecture, invest in email infrastructure, and remain vigilant at all levels, scrutinizing emails and their attachments, and looking for browser vulnerabilities.
- Multi-factor authentication is immensely valuable, and segmentation is crucial.
- State and local governments should have security zones segmented well within their own network.
- Agencies should have a plan to do backups, to back up data regularly and make it secure.
- Agencies should consult guidelines from the NIST.

### And Moving Forward
- Atlanta officials highlight the importance of protecting government data and information.
- The city's approach to cybersecurity now rests on three pillars.
    - Governance with compliance
    - Vulnerability management
    - Overall threat management
- To limit the financial impact of an incident or breach, a cyberinsurance policy can serve as a road map.
- An organization should step back from the smaller day-to-day tasks of enterprise-level IT management and cybersecurity, to see the larger view.
- Since becoming Atlanta's CIO in October 2018, Gary Brantley has focused on building a continuity plan.
- Running through drills can reveal critical weaknesses that allow cyberattacks to take place.
    - Also simple prevention efforts can protect against extensive damage.