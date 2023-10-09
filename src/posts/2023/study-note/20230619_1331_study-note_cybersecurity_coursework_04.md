---
title: "[Study Note] Coursework: Cybersecurity Analyst - Part 4"
date: 2023-06-17T11:32
thumb: "cybersecurity.jpg"
tags: 
    - ❮Study Note❯
    - cybersecurity
---

# 1. Network Security 

## OSI 7-Layer Model

1. Physical layer
    - Physical structure
    - e.g. Coaxial, fiber, wireless, hubs, repeaters
2. Data-link layer
    - Frames
    - e.g. Ethernet, PPP, switch, bridge
3. Network layer
    - Packets
    - e.g. IP, ICMP, IPsec, IGMP
4. Transport layer
    - End-to-end connections
    - e.g. TCP, UDP
5. Session layer
    - Synch & send to port
    - e.g. APIs, sockets, WinSock
6. Presentation layer
    - Syntax layer
    - e.g. SSL, SSH, IMAP, FTP, MPEG, JPEG
7. Application layer
    - End user layer
    - e.g. HTTP, FTP, IRC, SSH, DNS

## Packet Inspection
- A packet filter is a method to decide to allow or drop each packet going through the firewall based on the header information. 

### Stateless Inspection
- Stateless means that each packet is inspected one at a time with no knowledge of previous packets.
    - Each packet is inspected independently of all other packets.
    - Doesn't know anything about sessions.
    - There are no records of packets already inspected.
```
[TRUSTED INTERNAL NETWORK] 
           ↑↓
       [FIREWALL]  does not have a session table
           ↑↓
        [SERVER]
```
- Inspection process
    - The source IP address is examined to see if it's allowed.
    - We may have an access control list (ACL) rule that will determine if that source IP address is allowed into our network, or if the destination address is allowed to be accessed.
        - To see if the destination port or the service is allowed into the network.
- Use cases
    - To protect routing engine resources
    - To control traffic going in or out your organization
    - For troubleshooting purposes
    - To control traffic routing, through the use of routing instances
    - To perform QoS/CoS (marking the traffic)

### Stateful Inspection
- Each packet is inspected with knowledge of all the other packets that have been sent or received from the same session.
    - A Session consists of all the packets exchanged between parties during an exchange.
    - Sessions have a number of elements like,
        - Source IP address
        - Destination IP address,
        - Source port
        - Destination port
        - Identifier (optional)
            - For the instance if your router supports virtualization
    - Regardless of TCP or UDP, if we see traffic coming in and out from the same IP/port, the firewall will know that these are from the same session.
        - A session ID will be assigned and the firewall maintains a database of these sessions,
        - Track all the packets in the sessions,
        - Then the firewall will automatically allow or discard the packet.
    - Firewall shows the information about
        - Session ID
        - Policy name
        - Timeout
        - Incoming interface
        - Outgoing interface

### Stateful + Stateless Inspection
- Stateless inspection is going to be performed first.
    - And then the stateful data will be evaluated.
- e.g. Juniper firewall JUNOS Flow Module
    - If we have an incoming packet that matches the session,
        - The firewall will evaluate the screens.
            - Screens are just filters that protect against flow or DoS attacks.
        - Then it will see the type of traffic and match it against a session, such as TCP and NAT.
        - Then that or other services that are required will be applied.
                - e.g.
                    - AppTrack
                    - AppDoS
                    - AppQoS
                    - AppFW
                    - AppID
                    - IDP (stream)
                    - TCP proxy
                    - SSL Fwd Proxy
        - This flow is shorter because the firewall already knows what this packet is doing.
    - If the incoming packet does not match the session, it will follow a different (and longer) flow.
        - Screens will be applied.
        - And then Static NAT will be applied if that is required (goes straight to Route if yes)
        - And then Destination NAT if it's configured,
        - Depending on the incoming and outgoing interfaces, that are defined after we know what the route should be, Zones will be defined.
        - And then Routing and Policy evaluation will be conducted.
        - Source NAT is gone after the policy evaluation.
        - In some cases of Reverse static NAT (goes straight to Services if yes), 
        - Then Services will be applied and the session will be built.

### Firewall Filters
- Firewall filter (ACL) and security policies
    - e.g. Juniper firewall
        ```
                                [ROUTING ENGINE] 
                              [RT]→[FT] [Junos OS]
           Control Plane            ↓
                           (Packet Forwarding Engine)
        Forwarding Plane            ↓
        ```
        - Control Plane is in charge of running the operating system, device, and routing table
        - Forwarding Plane is in charge of forwarding all traffic and making all the routing decisions, policy evaluations, session matching, etc.
        - Packet Forwarding Engine does not interrupt the control plane
            - If something happens to the control plane, the device will still forward traffic to the forwarding plane because it will still be running.

## IDS and IPS

### Intrusion Detection System (IDS)
- IDS is a network security technology originally built for detecting vulnerability exploits against a target application or computer.
    - IDS is a listen-only device.
        - Monitors traffic and reports its results to an administrator.
        - IDS doesn't take any actions.
            - IDS can't automatically take action to prevent a detected exploit from taking over the system.
        - IDS does not add any delay to network traffic.
- IDS Types
    - Host-based IDS (HIDS)
        - Software installed on an endpoint machine
        - Listens to the traffic being received by and sent from the endpoint, which triggers an alert or actions as appropriate.
        - Installed on every network computer that has two-way access to the outside.
    - Network-based IDS (NIDS)
        - Installed only at specific points such as servers that interface between the outside environment and the network segment to be protected.
    - Hybrid IDS
        - Combines HIDS and NIDS features
        - Gains flexibility and increases security
        - Combining IDS sensors locations
            - Put sensors on network segments and network hosts so that it can report attacks aimed at particular segments or the entire network.

### Intrusion Prevention System (IPS)
- IPS is a network security/threat prevention technology that examines network traffic flows to detect and prevent vulnerability exploits.
- Often sits directly behind the firewall
- IPS is placed inline (in the direct communication path between source and destination).
    - Actively analyzing and taking automated actions on all traffic flows that enter the network.
    - Such actions include,
        - Sending an alarm to the administrator (as would be seen in an IDS)
        - Dropping the malicious packets
        - Blocking traffic from the source address
        - Resetting the connection
- IPS was originally built and released as a standalone device in the mid-2000s.
    - IPS is now commonly integrated into,
        - Unified Threat Management (UTM) solutions for small-and-medium-sized companies
        - Next Generation Firewalls (NGFW) for big enterprises

### IDS and IPS Types
- IDS and IPS detect threats by using some of these methods,
    - Signature-based method
        - IDS/IPS maintain a database of signatures that are used for detection.
            - Signatures describing common patterns of network traffic that may indicate the traffic contains some malware which warrants raising an alert.
            - A dictionary of uniquely identifiable patterns or signatures in the code of each exploit
                - The dictionary grows as an exploit is discovered and its signature is recorded.
        - Analyzes content of each packet at layer 7 with a set of predefined signatures.
            - Exploit-facing signatures
                - Identify individual exploits by triggering on the unique patters of a particular exploit attempt.
                - IPS can identify specific exploits by finding a match with an exploit-facing signature in the traffic stream
            - Vulnerability-facing signatures
                - Broader signatures that target the underlying vulnerability in the system that is being targeted.
                - These signatures allow networks to be protected from variants of an exploit that may not have been directly observed in the wild, but also raise the risk of false positives.
    - Anomaly-based method
        - Each network protocol goes about its work in a characteristic way.
            - If we find traffic that does not follow the standards of its protocol, this may indicate a threat is present and an alert is raised.
                - e.g. Many half-open TCP sessions, arriving HTTP traffic without the appropriate header
        - Monitors network traffic and compares it against an established baseline for normal use and classifying it as either normal or anomalous
    - Statistical anomaly-based detection
        - Takes samples of network traffic at random and compares them to a pre-calculated baseline performance level.
            - When the sample of network traffic activity is outside the parameters of baseline performance, the IPS takes action to handle the situation.
    - Host-based method
        - e.g. Host-based Intrusion Detection System (HIDS)
    - Network-based method
        - Hardware that listens to all traffic that is sent to or flows through it.
            - e.g. IBM RealSecure Server Sensor, Cisco IDS 4200 Series
        - Software installed on server and placed in network to monitor network traffic
            - e.g. Snort
        - Network-based IDS (NIDS) listens to a copy of network traffic from a port mirror configured to the core switch.
        - Network-based IPS (NIPS) sits in the middle of the stream of traffic.
        - Both tries to find anomalies in the data stream.

### IPS vs IDS 
- Placement in network infrastructure
    - IPS: Part of the direct line of communication (inline)
    - IDS: Outside direct line of communication (offline)
- System type
    - IPS: Active (monitors and automatically defend) and/or passive
    - IDS: Passive (monitors and notifies)
- Detection mechanism
    - IPS
        - Statistical anomaly-based detection
        - Signature-based detection
        - Network-based detection
    - IDS
        - Anomaly-based detection
        - Network-based detection
        - Host-based detection

## Next Generation Firewalls (NGFW)
- NGFW is a part of the 3rd generation of firewall technology
    - Combines traditional firewall with other network device filtering functionalities.
    - Application firewall using in-line deep packet inspection (DPI)
    - Intrusion prevention system (IPS)
    - Other techniques might also be employed.
        - e.g. TLS/SSL encrypted traffic inspection, website filtering
- NGFW vs Traditional firewall
    - Inspection over the data payload of network packets
        - NGFW uses sessions.
    - NGFW provides the intelligence for distinguish business applications and non-business applications and attacks.
        - Traditional firewalls don't have the fine-grained intelligence to distinguish one kind of web traffic from another, and enforce business policies, so it's either all or nothing.
    - NGFW is application-aware. 
        - Unlike traditional stateful firewalls, which deal in ports and protocols, NGFW drill into traffic to identify the applications traversing the network.
    - With current trends pushing applications into the public cloud or to be outsourced to Software-as-a-Service providers, a higher level of granularity is needed to ensure that the proper data is coming into the enterprise network.

### NGFW and OSI Model
- The firewall itself must be able to monitor the traffic from Layer 2 through 7, and make a determination as to what type of traffic is being sent and received.
    - Traditional packet analysis: IP + TCP
    - Deep packet inspection: IP + TCP + Application

### NGFW Packet Flow Example - Juniper SRX 240
1. On the receiving end of the traffic, we can configure traditional firewall rules that state Layer 3 and 4.
    - Filter and policer
2. Then the traffic flows the next generation firewall modules,
    - Screens
    - Static NAT
    - Destination NAT
    - Routing
    - Zone context
    - Policy
    - R. Static NAT
    - Source NAT
    - Service / ALG
    - Session
3. And then send out to the interface.
    - Filter and shaper

### NGFW comparisons
- Cisco Systems
    - Adaptive Security Appliance (ASA) by SecureX
- Palo Alto Networks
    - Aims to replace port-based traffic classification with application awareness
    - App-ID Engine
- Juniper Networks
    - AppSecure suite for SRX Services Gateway
        - AppTrack component
- Other vendors: McAfee, Barracuda, Sonic Wall, CheckPoint, Fortinet, Meraki, etc.
- Open Source NGFW
    - pfSense for FreeBSD servers
        - Stateful packet filtering
    - ClearOS
        - Scalable
        - Modular system
    - VyOS for Debian Linux
        - Supports both physical and virtual platforms
            - Paravirtual drivers for virtual platforms
        - Firewall + VPN + software-based network routing
            - Supports advanced routing features unlike OpenWRT or pfSense
                - e.g. dynamic routing protocols, CLI
    - IPCop for Linux
        - User-friendly, stable, and easy to configure
        - Web interface
        - Suitable for small businesses and local PCs

## Local Area Network (LAN)

### Collision Domain
- How do devices know when it's their turn to transmit data?
    - Most modern equipment has technology to avoid collisions all together.
        - Modern equipments use full-duplex.
        - Routers, switches, channel saturation avoidance, etc.
    - Collisions happen when two nodes on a half duplex network attempt to send data at the same time.
        - Older devices used to use half-duplex.
        - When this happens, the network discards the collision and each node attempts to retry again. 
            - Carrier Sense Multiple Access Collision Detection (CSMA/CD)
                - Each node does this at a random interval in an attempt to avoid another collision.
    - Collision domain is a network segment containing nodes that are capable of causing collisions with each other.
        - If two nodes are able to cause collisions but not with each other, they are on different collision domains.

### Ethernet Frame
- Destination Layer 2 address
- Source Layer 2 address
- Type
    - Indicates the layer 3 protocol that is being transported on the frame such as IPv4, IPv6, AppleTall, etc.
- Data
    - Contains the original data as well as the headers added during the encapsulation process.
- Checksum
    - This contains a Cyclic Redundancy Check to check if there are errors on the data.
- Preamble and start delimiter?
    - Preamble: The first 8 byte of an ethernet frame
        - First 7 bytes are used as a buffer to seperate adjacent ethernet frames, and regulate the speed.
        - The last byte of the preamble is called Start Frame Delimiter (SFD)
            - SFD lets the receiving computer know that the preamble is over and what follows is the actual frame contents.

### MAC Address
- Data-link Layer address
    - 48-bit address that uniquely identifies a device's NIC
        - Two to the 48th power is about 281 trillion, so at the current rate of consumption, we have just under a million months to go before we run into trouble with MAC addresses.
    - First 3 bytes are for the OUI and last 3 bytes are reserved to identify each NIC.
- MAC spoofing
    - The MAC address is burned into a NIC and cannot be changed. 
    - But many operating systems can be tricked or configured into representing the MAC address of their interfaces using a different address. This is known as Mac spoofing
    - MAC spoofing can be used to bypass MAC address filtering that set up on a firewall to protect assets by limiting access to only those machines that have been previously granted access.
- Address Resolution Protocol (ARP)
    - The process of using Layer 3 (IP) addresses to determine Layer 2 (MAC) addresses, vice versa

### Network Devices
- Ethernet bridge
    - Main functions
        - Forwarding frames
        - Learning MAC addresses
        - Controlling traffic
    - Half-duplex
    - End-user devices share bandwidth on each port.
    - Virtual LANs are not possible.
- Ethernet switch
    - Full-duplex
    - Each port is dedicated to a single device.
        - Bandwidth is not shared.
    - Virtual LANs are possible.
        - VLANs provide a way to seperate LANS on the same switch.
        - Devices in one VLAN do not receive broadcast from devices that are on another VLAN.
    - Limitations
        - Network loops are still a problem.
        - Might not improve performance of multicast/broadcast traffic.
        - Cannot connect geographically dispersed networks.

### Network Address Translation (NAT)
- NAT masquerades the real IP address.
    - e.g. When IP addresses from an internal network are translated, from the private IP address that is on the computer, to an external public IP address that is routable across the internet.
        - From public IP address to private IP address as well, vice versa.
- Remapping one IP address space into another by modifying network address information in IP datagram packet headers, while they are in transit across a traffic routing device.
- NAT gives you an additional layer of security.
- NAT allows the IP network of an organization to appear from the outside to use a different IP address space than what it is actually using.
    - Thus, NAT allows an organization with non-globally routable addresses to connect to the internet by translating those addresses into a globally routable address space.
- NAT has become a popular and essential tool in conserving global address space allocations in face of IPv4 address exhaustion,
    - by sharing one internet-routable IP address of a NAT gateway for an entire private network.

### NAT Types
- Static address stranslation (Static NAT)
    - Allows one-to-one mapping between local and global addresses
    - The organization will need as many registered IP addresses as it has computers that need internet access.
- Dynamic address translation (Dynamic NAT)
    - Maps unregistered IP addresses to registered IP addresses from a pool of registered IP addresses, as they are needed.
- Overloading
    - Maps multiple unregistered IP addresses to a single registered IP address (many to one) using different ports
    - This method is also known as Port Address Translation (PAT).
    - By using overloading, thousands of users can be connected to the internet by using only one real global IP address.

---

# 2. Network Security - OSI Layer 3 and above

## IP Protocol
- Layer 3 devices use the IP address to identify the destination of the traffic.
- Stateful firewalls use the IP address to identify where traffic has come from.
- A routable protocol is a protocol whose packets may leave your network, pass through your router, and be delivered to a remote network.

### IP Protocol Header
```
────────────────────────────────────────────────────────
[Version] [IHL] [Service Type] [     Total Length      ]
────────────────────────────────────────────────────────
[       Identification       ] [Flags] [Fragment Offset]
────────────────────────────────────────────────────────
[    TTL   ] [    Protocol   ] [    Header Checksum    ]
────────────────────────────────────────────────────────
[                   Source IP Address                  ]
────────────────────────────────────────────────────────
[                 Destination IP Address               ]
────────────────────────────────────────────────────────
[               Options              ] [    Padding    ]
────────────────────────────────────────────────────────
[                         Payload                      ]
────────────────────────────────────────────────────────
```
- Time-to-live (TTL)
    - The number of Layer 3 devices (hubs, routers, etc.) the packet is allowed to pass through before it is dropped.


## IPv4 Address
- 32-bit address divided in 4 octets.

### IPv4 Header
```
────────────────────────────────────────────────────────
[Version] [IHL] [DSField][ECN] [     Total Length      ]
  4-bit   4-bit   6-bit  2-bit           16-bit
────────────────────────────────────────────────────────
[       Identification       ] [Flags] [Fragment Offset]
            16-bit              3-bit        13-bit
────────────────────────────────────────────────────────
[    TTL   ] [    Protocol   ] [    Header Checksum    ]
    8-bit          8-bit                16-bit
────────────────────────────────────────────────────────
[                   Source IP Address                  ]
                          32-bit
────────────────────────────────────────────────────────
[                 Destination IP Address               ]
                          32-bit
────────────────────────────────────────────────────────
[                         Options                      ]
             variable up to 320bits (40bytes)
────────────────────────────────────────────────────────
[                         IP Data                      ]
           variable up to 524120bits (65515bytes)
────────────────────────────────────────────────────────
```

### IPv4 Addressing Schemes
- Unicast: one-to-one
- Broadcast: one-to-all
    - Broadcast address is determined by setting all host bits to 1 and then converting the octet to a decimal number.
    - e.g. 192.168.2.255
- Multicast: one-to-many
    - Most multicast addresses start with 224.xxx.xxx.xxx and are considered Class D addresses

### Classful Addressing
- When the internet's address structure was originally defined, every unicast IP address had,
    - A network portion, to identify the network on which the interface using the IP address was to be found,
    - And a host portion, used to identify the particular host on the network given in the network portion.
- This kind of partitioning of the address space involved 5 classes.
    - Each class represented a different trade-off in the number of bits of a 32-bit IPv4 address devoted to the network number, versus the number of bits devoted to the host number.
- IP classes
    - Class A
        - Range: 0.0.0.0 ~ 127.255.255.255
        - Use: Unicast/Special
        - Default mask: 255.0.0.0
        - 1st octet is used for the network portion
        - 2nd~4th octet are used for the host portion
    - Class B
        - Range: 128.0.0.0 ~ 191.255.255.255
        - Use: Unicast/Special
        - Default mask: 255.255.0.0
        - 1st~2nd octet are used for the network portion
        - 3rd~4th octet are used for the host portion
    - Class C
        - Range: 192.0.0.0 ~ 223.0.0.0
        - Use: Unicast/Special
        - Default mask: 255.255.255.0
        - 1st~3rd octet are used for the network portion
        - 4th octet is used for the host portion
    - Class D
        - Range: 224.0.0.0 ~ 239.255.255.255
        - Use: Multicast
        - Default mask: N/A
    - Class E
        - Range: 240.0.0.0 ~ 255.255.255.255
        - Use: Reserved
        - Default Mask: N/A

### Network Mask
- The subnet mask is an assignment of bits used by a host or router to determine how the network and subnetwork information is partitioned from the host information in a corresponding IP address.
    - The number of bits occupied by the network portion
- It is possible to use a shorthand format for expressing masks that simply gives the number of contiguous 1 bits in the mask (starting from the left).
    - This format is now the most common format and is sometimes called the "prefix length".
- Masks are used by routers and hosts to determine where the network/subnetwork portion of an IP address ends and the host part begins.
- e.g. 192.168.52.3/24
    - 24 means the first 24 bits (or 3 octets) are for the network portion,
        - which also means the rest (last 8 bits, or 1 octet) are for the host portion.

### Default Gateway
- When we create a packet that has to go outside of our local network, when we need to communicate with a host outside of the network, it'll be sent to the default gateway.
    - The gateway will forward the packet on outside of our network segment.
- To communicate with a host inside the network segment, any switch or hub can do the job.
    - Instead of sending the packet to the default gateway, the system will look in the MAC table and translate the IP address to a MAC address.
        - The packet will be forwarded directly to the local recipient.

### Broadcast Address
- In each IPv4 subnet, a special address is reserved to be the subnet broadcast address. 
    - The subnet broadcast address is formed by setting the network/subnet portion of an IPv4 address to the appropriate value and all the bits in the host portion to 1.
        - e.g.  
            - IP address: (network portion) 00001010.11000011.01111001. / (host portion) 00001010
            - Broadcast address: (network portion) 00001010.11000011.01111001. / (host portion) 11111111

## IPv6 Address
- 128-bit address divided into 8 hexadecimal values, seperated by a colon
- IPv6 is not case-sensitive.
- No need to specify leading zeros.
- Use a double-colon instead of a group of consecutive zeros
    - e.g. 0:0:0:0:0:0:0:1 = ::1
    - Exception: You can only use the double-colon replacement once.
        - Use the one double-colon only for the most abbreviation

### IPv6 Adressing Schemes
- Unicast: one-to-one
- Multicast: one-to-many
- Anycast: one-to-nearest

## TCP and UDP
- TCP
    - Connection-based
        - 3-way handshake
    - Reliable
    - Secure
    - Relatively slow
    - Ordered data
        - Duplicate detection
    - Multiplexes data using ports
    - Flow control
    - Unit: TCP/IP Segment
        - Source port number
        - Destination port number
        - Length
        - Checksum (optional)
        - Data
        - Source IP address
        - Destination IP address
        - Other IP header fields
- UDP
    - Connection-less
    - Unreliable
    - Unsecure
    - Relatively fast
    - Unordered data
        - Possible duplicates
    - Multiplexes data using ports
    - No flow control
    - Unit: UDP Datagram
        - Source port number
        - Destination port number
        - Length
        - Checksum (optional)
        - Data

## HTTP
- Request-response cycle
- 3-block structure
    - Start-line
    - Headers
    - Body
- HTTPS
    - Uses SSL certificates to secure and encrypt HTTP communication.

## DNS and DHCP
- Domain Name Server (DNS)
    - A lookup table of IP addresses and domain names
    - To translate domain names to IP addresses and vice versa.
    - The address of the DNS server is manually configured in the network settings by the administrator or obtained from the DHCP server.
- Dynamic Host Configuration Protocol (DHCP)
    - DHCP is a client/server protocol that automatically provides an Internet Protocol (IP) host with its IP address and other related configuration information such as the subnet mask and default gateway.
    - Handshake
        ```
                  → DHCP Discover (broadcast)  →
                  ← DHCP Offer (uni/broadcast) ←
        [Client]                                  [DHCP Server]
                  →  DHCP Request (broadcast)  →
                  ←  DHCP ACK (uni/broadcast)  ←
        ```
        1. Discover
            - Client sends a broadcast message to all the endpoints on the network segment.
                - If the endpoint had an IP address from a previous boot up, it may ask in the request to be allowed to renew at least on that address, rather than be issued a new address.
        2. Offer
            - If there is a DHCP server on the network segment, the server will send an Offer message back to the requesting endpoint. The message includes,
                - MAC address of the requesting endpoint
                - IP address being offered
                - Subnet mask
                - Least duration
                - IP address of the DHCP server 
                    - Multiple DHCP servers could exist, so the requesting endpoint might need this address to identify which server is sending the Offer message.
        3. Request
            - After receiving offers, the endpoint will reply with a request message that indicates which offer it's accepted.
        4. Acknowledgement (ACK)
            - The winning DHCP server sends a final ACK message to the endpoint confirming that it can have the offered IP address.
                - And then it marks that IP address as leased to the MAC address of the endpoint.
                - The other DHCP service will return their offered addresses to their pools of available addresses.

## Syslog Protocol
- Syslog is a standard for message logging.
    - Allows seperation of the software that generates messages
        - The system that stores them
        - The software that reports and analyzes them
    - Each message is labeled with,
        - Facility code (0~23)
            - Indicating the software type generating the message
            - Reflects the names of UNIX processes and daemons because the protocol was originally written on BSD Unix
            - If you are receiving messages from a UNIX system, consider using the User Facility as your first choice.
                - Local0 to Local7 are not used by UNIX.
                    - Traditionally used by network equipments like Cisco routers instead.
        - Assigned severity label (0~7)
    - Provides a message format that allows vendor-specific extensions to be provided in a structured way
- Purpose
    - System management
    - Security audit
    - General information
    - Analysis and debugging
- Layers
    - Syslog content
        - Information contained in the message
    - Syslog application
        - Handles generation, interpretation, routing, and storage of syslog messages
    - Syslog transport
        - Puts the messages on the wire and takes them off the wire
- Entities
    - An originator generates syslog content to be carried in a message.
        - Router, server, switch, network device, etc.
    - A collector gathers syslog content for further analysis.
        - Syslog server
    - A relay forwards messages, accepting messages from originators or other relays and sending them to collectors or other relays.
        - Syslog forwarder
    - A transport sender passes syslog messages to a specific transport protocol.
        - Most common is UDP, defined in the RFC5426
    - A transport receiver takes syslog messages from a specific transport protocol.
- Message components
    - The information provided by the originator of a syslog message includes facility code and severity level.
    - The syslog software adds information to the information header before passing the entry to the syslog receiver,
        - Originator process ID
        - Timestamp
        - Hostname or IP address of the device
- Message example
    - Originator: 192.168.1.111
    - Collector: 192.168.1.107
    - Facility: Security/authorization messages (4)
    - Severity: Information (6)
    - Content: Jan 23 12:19:59 sshd[2052]: Accepted keyboard-interactive/pam for moimonge from 192.168.1.110 port 62258 ssh2

## Port mirroring
- Sends a copy of network packets traversing on one switch port (or an entire VLAN) to a network monitoring connection on another switch port.
    - This data is used to analyze and debug data or diagnose errors on a network.
    - Helps administrators keep a close eye on network performance and alerts them when problems occur.
    - It can be used to mirror either inbound or outbound (or both) on one or various interfaces.
- Port mirroring on a Cisco switch is generally referred to as Switched Port Analyzer (SPAN) or Remote Switched Port Analyzer (RSPAN).
    - Other vendors have different names for it, such as Roving Analysis Port (RAP) on 3COM switches.

## Flow analysis
- What information is gathered in flows?
    - Usage
        - Packet count
        - Byte count
    - Time of the day
        - Start sysUpTime
        - End sysUpTime
    - Port utilization
        - Input ifIndex
        - Output ifIndex
    - QoS
        - Type of service
        - TCP flags
        - Protocol
    - To/From
        - Source IP address
        - Destination IP address
    - Application
        - Source TCP/UDP port
        - Destination TCP/UDP port
    - Routing and peering
        - Type of service
        - TCP flags
        - Protocol

## High Availability (HA)
- HA refers to a system or componenet that is continuously operational for a desirably long length of time.
    - Availability can be measured relative to "100% operational" or "never failing"
- HA architecture is an approach of defining the components, modules, or implementation of services of a system which ensures optimal operational performance, even at times of high loads.
- Although there are no fixed rules of implementing HA systems, there are generally a few good practices that one must follow to gain the most out of the least resources.

### HA Cluster Setup
- Hosts in a virtual server cluster must have access to the same shared storage, and they must have identical network configurations.
- The firewall hardware should be identical.
- Domain Name System naming is important too.
    - All hosts must resolve other hosts using DNS names, and if DNS is not set correctly, you won't be able to configure HA settings at all.
- Same OS level
    The firewall operating systems should be identical.
- There should be direct connections between the primary and secondary nodes.

### HA Requirements
- Redundancy
    - Redundancy means there are multiple components that can perform the same task.
    - This eliminates the single point of failure problem by allowing a second server to take over a task if the first one goes down or becomes disabled.
- Monitoring 
    - In a HA setup, the system needs to be able to monitor itself for failure.
        - This means that there are regular checks to ensure that all components are working properly.
- Failover    
    - Failover is the process by which a secondary component becomes primary when monitoring reveals that a primary component has failed.

### NIC Teaming
- NIC Teaming is a solution commonly employed to solve the network availability and performance challenges, and has ability to operate multiple NICs as a single interface from the perspective of the system.
    - Protection against NIC failures
    - Fault tolerance in the event of a network adapter failure

---

# 3. Database Security

## Data Model and Structure
- Data structure is a kind of repository that organizes information for that purpose.
    - In a database, each field is discrete and its information can be retrieved either seperately or along with data from other fields, in a variety of combinations.
    - The power of the database is its ability to make data comprehensive so that it yields useful information.
    - A database query language such as SQL allows a database administrator to interact with the database.

### Data Model Types
- The structured-ness is considered to exist on a continuum.
    - Data is increasingly amenable to processing as it is increasingly structured.
        - Structured data
        - Semi-structured data
        - Unstructured data
- Structured data
    - Data that has been organized into a formatted repository, typically a database, so that its elements can be made addressable for more effective processing and analysis
- Semi-structured data
    - Data that has not been organized into a specialized repository (such as a database) but that nevertheless has associated information (such as metadata) that makes it more amenable to processing than raw data
    - e.g. Microsoft Word documents tagged with metadata
- Unstructured data 
    - Data that has not been organized into conventional data models, a format that makes it easier to access and process.
        - In reality, very little data is completely unstructured.
        - Structured data is basically unstructured data that has been reformatted and organized into a data structure.
    - Unstructured data is not a good fit for a mainstream relational database.
    - e.g. Text documents, image/audio/video files

### Structured data
- Flat file databases
    - It takes all the information from all the records and store everything in one table.
        - If you have hundreds or thousands of records related to multiple topics, the database quickly becomes difficult to use.
- Relational databases
    - rDB seperates this mass of information into numerous tables.
        - All the columns in each table should be about one topic.
        - Multiple tables are linked to each other through the use of "keys".
            - Each table may have one primary key and any number of foreign keys.
            - A foreign key is simply a primary key from one table that has been placed in another table.
    - Normal forms
        - The most important rules for designing rDB
    - SQL is the language used to interact with data inside a database.

## Data Source Types
- Distributed databases
    - For structured data
    - e.g. Oracle, IBM DB2, Microsoft SQL Server, MySQL
- Data warehouses
    - For structured data
    - e.g. Netezza, Exadata, Amazon Redshift, Apache Hive
- Big-data database
    - For semi-structured data
    - e.g. Apache Hadoop, MongoDB, BigTable
- Fileshares
    - For unstructured data
    - e.g. EMC, NetApp, Amazon S3, Google Drive, Network-attached Storage (NAS)

## Data Source Vendors and Solutions
- Applications
    - IBM CICS WebSphere
    - Oracle Siebel / PeopleSoft / E-Business
    - SAP
- Databases
    - IBM DB2 / Informix / IMS
    - MariaDB
    - PostgreSQL
    - (formerly Oracle) MySQL
    - Microsoft SQL Server
    - Sybase
- Data Warehouses
    - IBM Netezza / PureData / DB2 BLU
    - Oracle Exadata
    - Teradata
    - Greenplum DB
- Big Data Environments
    - Apache Hadoop
    - IBM InfoSphere / BigInsights
    - Apache Cassandra
    - MongoDB
    - Cloudera
    - CouchDB
    - Hortonworks
    - Pivotal
- Cloud Environments
    - Amazon Web Services
    - Google Cloud
    - Windows Azure
- Database Tools
    - IBM Optim / Archival / Master Data Management / Data Stage
- Enterprise Content Managers
    - Microsoft SharePoint
- Fileshare
    - FTP
    - Operating systems
    - IBM VSAM / z/OS Datasets

## Securing Your Crown Jewels
- Process
    1. Discover
    2. Harden
    3. Monitor and Protect
    4. Repeat
1. Identification and baseline
    - Discovery and classification
        - "Where is the sensitive data?
    - Entitlements reporting
        - "Who can access?"
    - Vulnerability assessment
        - "How to secure the repository?"
2. Raise bar
    - Reconfigure, mask, and encrypt
        - "How to protect sensitive data?"
3. Real-time monitoring and protection
    - Activity monitoring
        - "What is actually happening?"
    - Blocking quarantine
        - "How to prevent unauthorized activities?"
    - Dynamic data masking
        - "How to protect sensitive data to reduce risk?"

### Leverage Security Industry Best Practice and Benefits
- Enforce
    - US DoD STIG / SRG
    - Center for Internet Security (CIS)
    - Common Vulnerabilities and Exposures (CVE)
- Secure
    - Privileges
    - Configuration settings
    - Security patches
    - Password policies
    - OS-level file permission
- Established baseline
    - User-defined queries for custom tests to meet baseline for, 
        - Organization
        - Industry
        - Application
        - Ownership and access for your files
- Forensics
    - Advanced forensics and analytics using custom reports
    - Understand your sensitive data risk and exposure

### Database Vulnerability Assessment (VA) Report
- Summary test results
    - Result history shows trends
- Detailed test results
    - Detailed remediation suggestions
- In a vulnerability assessment test, it is not uncommon to fail more than 50% of the tests before the operating system and database are hardened.

### Securing Data Sources by Type
- On-premise
    - Everything is managed by user/enterprise.
- IaaS
    - Managed by user/enterprise
        - Application
        - Data
        - Runtime
        - Middleware
        - Operating system
    - Managed by provider
        - Virtualization
        - Networking
        - Storage
        - Servers
- PaaS
    - Managed by user/enterprise
        - Application
        - Data
    - Managed by provider
        - Runtime
        - Middleware
        - Operating system
        - Virtualization
        - Networking
        - Storage
        - Servers
- SaaS
    - Everything is managed by provider.

---

# 4. Injection Vulnerability

## Injection Attacks
- Injection flaws allow attackers to relay malicious code through the vulnerable application to another system.
    - e.g. OS, database server, LDAP server, etc.
- They are extremely dangerous, and may allow full takeover of the vulnerable system.
    - Injection vulnerabilities are consistently considered to be #1 on OWASP lists.
        - At the top of CWE/SANS list as well.
- Injection flaws appear internally and externally as a top issue.

## OS Command Injection
- Abuse of vulnerable application functionality that causes execution of attacker-specified OS commands
    - Applies to all operating systems
    - Made possible by lack of sufficient input sanitization, and by unsafe execution of OS commands.
- OS command injection can lead to,
    - Full system takeover
    - Denial of service
    - Stolen sensitive information
        - e.g. passwords, crypto keys, personal and confidential data
    - Lateral movement on the network
        - Launching pad for attacks on other systems
    - Use of system for botnets or cryptomining

### OS Command Injection Attack Examples
- A case where application allows user to delete log files
    - The deletion of a file `auditlog9.log` sent as a POST request that may look like this.
        - `action=delete&file=auditlog9.log`
    - On the server, the following code is executed.
        - e.g. Java
            - `Runtime.getRuntime().exec("/bin/sh -c \"/bin/rm/var/app/logs/"+logFile+"\"");`
    - Which translates to the following command,
        - `/bin/sh -c "/bin/rm /var/app/logs/auditlog9.log"`
- Attack 1. Attacker can replace file to be deleted.
    - `/bin/sh -c "/bin/rm /var/app/logs/../../../lib/libc.so.6"`
- Attack 2. Attacker can inject arbitrary malicious OS command
    - `/bin/sh -c "/bin/rm /var/app/logs/x;rm -rf /"`

### OS Command Injection Prevention
- Do not execute OS commands.
    - Sometimes OS command execution is introduced as a quick fix, to let the command or group of commands do the heavy lifting.
        - This is dangerous, because insufficient input checks may let a destructive OS command slip in.
        - Resist the temptation to run OS commands.
    - Use built-in or 3rd party libraries instead.
        - Instead of `rm`, use `java.nio.file.Files.deleteIfExists(file)`.
        - Instead of `cp`, use `java.nio.file.Files.copy(source, destination)`.
    - Use of library functions significantly reduces the attack surface.
- Run at the least possible privilege level
    - It is a good idea to run under a user account with the least required rights.
    - The more restricted the privilege level is, the less damage cna be done.
    - If an attacker is able to sneak in an OS command (e.g. `rm -rf /`), there is much less damage when the application is running as tomcat user, instead of root user.
    - This helps in case of many vulnerabilities, not just injection.
- Do not run commands through shell interpreters.
    - When you run shell interpreters like sh, bash, cmd.exe, powershell.exe, it is much easier to inject commands.
    - The following command will allow injection of an extra rm,
        - `/bin/sh -c "/bin/rm /var/app/logs/x;rm -rf /"`
        - But in this case below, without `sh`, injection will not work, the whole command will fail.
            - `/bin/rm /var/app/logs/x;rm -rf /`
    - Running a single command directly executes just that command
        - Note that it is still possible to influence behavior of a single command.
            - e.g. `/usr/bin/nmap 1.2.3.4 -oX /lib/libc.so.6`
                - for `nmap`, when injected, could overwrite a vital system file.
    - Also note that the parameters that you pass to a script may still result in command injection.
        - `processFile.sh "x;rm -rf /"`
- Use explicit paths when running executables.
    - Applications are found and executed based on system path settings.
    - If a writeable folder is referenced in the path before the folder containing the valid executable, an attacker may install a malicious version of the application there.
    - In this case, the following command will cause execution of malicious application.
        - `nmap 123.45.67.89`
    - This can be avoided by referencing the executable by full path.
        - `/usr/bin/nmap 123.45.67.89`
    - Same considerations apply to shared libraries.
        - Explicit references help avoid DLL hijacking.
- Use safer functions when running system commands
    - If available, use functionality that helps prevent command injection.
    - For example, the following function call is vulnerable to new parameter injection.
        - `Runtime.getRuntime().exec("/usr/bin/nmap " + ipAddress);`
            - An attacker could include more parameters, seperated by spaces, in `ipAddress`.
    - On the other hand, this call is not vulnerable.
        - `Runtime.getRuntime().exec(new String[] {"/usr/bin/nmap", ipAddress});`
- If possible, do not let user input reach command execution unchanged.
    - Modifying user input, or replacing user-specified values with others (e.g. using translation tables) helps protect against injection.
    - For example, instead of allowing user to specify file to delete, let them select a unique file ID.
        - `action=delete&file=457`
    - When submitted, translate that ID into a real file name.
        ```
        realName = getRealFileName(fileID);
        Runtime.getRuntime().exec(new String[] {"/bin/rm", "/var/app/logs/" + realName})
        ```
- Sanitize user input with strict whitelists, NOT blacklists.
    - We often see blacklists used for parameter sanitization, and some of them are incorrect.
        - It is hard to build a successful blacklist.
        - Hackers are very inventive.
    - Suppose we want to blacklist characters used in a filename for command `rm /var/app/logs/file`
        - Mitigation: Blacklist ; & |
            - Evasion: /bin/rm /var/app/logs/x`rm- -rf /`
        - Mitigation: Blacklist ; & | `
            - Evasion: /bin/rm /var/app/logs/x$(rm -rf /)
        - Mitigation: Blacklist spaces
            - Evasion: /bin/rm /var/app/logs/x;rm${IFS:0:1}-rf${IFS:0:1}/
        - Mitigation: Enclose value in double quotes, escape them in value
            - Evasion: /bin/rm "/var/app/logs/x\\";rm -rf /;echo \"
    - A more robust and simpler solution is to whitelist filename as [A-Za-z0-9.]+

### Prevention, Summarized
- DO NOT use OS commands.
    - If possible, use built-in or secure/approved 3rd-party libraries instead.
- DO NOT run commands with shell interpreters
    - Instead, run commands directly.
- DO NOT let user input reach OS command unchanged.
    - If possible, replace user input with generated IDs.
- DO run your code with least possible privilege.
- DO use explicit paths when running applications and using shared libraries.
- DO use safe library functions when running OS commands.
- DO sanitize all user input.
    - ONLY use whitelists for sanitization.
    - Blacklists are unsafe.

## SQL Injection
- Abuse of vulnerable application functionality that causes execution of attacker-specified SQL queries
- Possible in any SQL database
- Made possible by lack of sufficient input sanitization
- Consequences
    - Bypassing of authentication mechanisms
    - Data exfiltration
    - Execution of OS commands
        - e.g. in PostgreSQL, 
            - COPY (SELECT 1) TO PROGRAM '<u>rm -rf /</u>'
    - Vandalism and DoS
        - e.g. `DROP TABLE sales`
        - Injected statements may sometimes be chained.
            - e.g. SELECT * FROM users WHERE user='<u>';DROP TABLE sales;--</u>' AND pass=''

### SQL Injection Attack Example
- Suppose our application has a login dialog.
    - Username:
    - Password:
- On the back-end, the code may be as follows,
    - `stmt.executeQuery( "SELECT * FROM users WHERE user='"+user+"' AND pass='"+pass+"' ")`
- With regular input, the query would be as follows, selecting a record only if the match is found.
    - `SELECT * FROM users WHERE user='bob' AND pass='secret'`
- In case of malicious input, hacker can login without valid credentials.
    - SELECT * FROM users WHERE user ='<u>' OR 1=1;--</u>' AND pass=''

### SQL Injection Types
- Error-based
    - Attacker may tailor his actions based on the database errors the application displays.
- UNION-based
    - May be used for data exfiltration
    - e.g. SELECT name, text FROM log WHERE date='<u>2020-01-01' UNION SELECT user, password FROM users --</u>'
- Blind injection
    - The query may not return the data directly, but it can be inferred by executing many queries whose behavior presents one of two outcomes.
    - Can be Boolean-based (1 of 2 possible responses) and Time-based (immediate vs delayed execution)
    - e.g. The following expression, when injected, indicates if the first letter of password is 'a'.
        - `IF(password LIKE 'a%', sleep(10), 'false')`
- Out-of-band
    - Data exfiltration is done through a seperate channel.
        - e.g. by sending an HTTP request

### SQL Injection Prevention
- Use prepared statements.
    - Most SQL injection happens because queries are pieced together as text.
    - Use of prepared statements seperates the query structure from query parameters.
        - Instead of this,
            - `stmt.executeQuery(" SELECT * FROM users WHERE user='"+user+"' AND pass='"+pass+"' ")`
        - Use this to mitigate SQL injection risk.
            ```
            PreparedStatement ps = conn.prepareStatement("SELECT * FROM users WHERE user=? AND pass=?");
            ps.setString(1, user);
            ps.setString(2, pass);
            ```
    - Note that prepared statements must be used properly.
        - e.g. We occasionally see bad examples like,
            - conn.prepareStatement("SELECT * FROM users WHERE user=? AND pass=? ORDER BY " <u>+column</u>);
- Sanitize user input
    - Just like for OS command injection, input sanitization is important.
    - Only restrictive whitelists should be used, not blacklists.
    - Where appropriate, do not allow user input to reach the database.
        - Instead use mapping tables to translate it.
- Do not expose native database errors to the user.
    - Application errors should not expose internal information to the user.
    - Details belong in an internal log file
    - Exposed details can be abused for tailoring SQL injection commands.
    - e.g. The following error message exposes both the internal query structure and the database type, helping attackers in their efforts.
        - ERROR: If you have an error in your SQL syntax, check the manual that corresponds to your MySQL server version for the right syntax to use near `"x" GROUP BY username ORDER BY username ASC` at line 1.
- Limit database user permissions.
    - When user queries are executed under a restricted user, less damage is possible if SQL injection happens.
    - Consider using user with read-only permissions when database updates are not required, or use different users for different operations.
- Use stored procedures.
    - Use of stored procedures mitigates the risk by moving SQL queries into the database engine.
    - Fewer SQL queries will be under direct control of the application, reducing likelihood of abuse.
- Use ORM libraries.
    - Object-relational mapping (ORM) libraries help mitigate SQL injection.
        - e.g. Java Persistence API (JPA) implementations like Hibernate
    - ORM helps reduce or eliminate the need for direct SQL composition.
    - However, if ORM is used improperly, SQL injection may still be possible.
        - e.g. `Query hqlQuery = session.createQuery("SELECT * FROM users WHERE user='"+user+"' AND pass='"+pass+"'")`

### Prevention, Summarized
- DO NOT expose native database errors to the user.
- DO use prepared statements, and do it correctly.
- DO sanitize user input.
- DO limit database user permissions.
- DO use stored procedures.
- DO use ORM libraries correctly.

## NoSQL Injection
- In MongoDB, `$where` query parameter is interpreted as JavaScript.
    - Suppose we take an expression parameter as input,
        - $where: "$expression"
    - In simple cases, it is harmless.
        - $where: "<u>this.userType==3</u>"
    - However, an attacker can perform a DoS attack like this.
        - $where: "<u>d = new Date; do { c = new Date; } while (c-d<100000);</u>"

## XPath Injection
- Suppose we use XPath expressions to select user on login,
    - `//Employee[UserName/text()='" + Request ("Username") + "' AND Password/text()='" + Request ("Password") + "']`
- In the benign case, it will select only the user whose name and password match.
    - //Employee[Username/text()='<u>bob</u>' AND Password/text()='secret']
- In the malicious case, it will select any user.
    - //Employee[UserName/text()='<u>' or 1=1 or '1'='1</u>' AND Password/text()='']

## LDAP Injection
- LDAP is a common mechanism for managing user identity information.
- The following expression will find the user with the specified username and password.
    - `find("(&(cn="+user+")(password="+pass+"))")`
- In the regular case, the LDAP expression will work only if the username and password match.
    - find("(&(cn=<u>bob</u>)(password=<u>secret</u>))")
- Malicious users may tweak the username to force expression to find any user.
    - find("(&(cn=<u>∗)(cn=∗))(|cn=∗</u>)(password=<u>any</u>)")

## Other Injections
- Injection flaws also exist in many other technologies.
    - e.g. Template engines
- Other injection attacks
    - DLL highjacking
    - File inclusion attack
- Recommendations for avoiding all of them are similar to what is proposed for OS and SQL Injection.

## Overall Injection Prevention, Summarized
- DO NOT let user input reach critical resource unchanged, as much as possible.
- DO use functionality with reduced scope 
    - e.g. specific library functions instead of arbitrary OS command execution
- DO execute with least privilege.
- DO use safe functionality that prevents injection.
- Do sanitize user input with strict whitelists, NOT blacklists.
